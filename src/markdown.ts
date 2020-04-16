import matter from 'gray-matter'
import { Link, List, Paragraph } from 'mdast'
import mdastTOC from 'mdast-util-toc'
import mdastToString from 'mdast-util-to-string'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKaTeX from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import stringifyRehype from 'rehype-stringify'
import remarkMath from 'remark-math'
import parseRemark from 'remark-parse'
import remarkRehype from 'remark-rehype'
import unified from 'unified'
import { Node } from 'unist'
import { VFile } from 'to-vfile'

export interface TOC {
  title: string
  href: string
  children: TOC[]
}

export interface Output {
  frontmatter: Record<string, any>
  toc: TOC[]
  html: string
}

const parser = unified()
  .use(parseRemark, {
    gfm: true,
    commonmark: true,
    footnotes: true
  })
  .freeze()
const processor = unified()
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeKaTeX)
  .freeze()
const stringifier = unified()
  .use(stringifyRehype)
  .freeze()

const extractTOC = (tree: List | null): TOC[] =>
  (tree?.children ?? []).map(({ children: [title, sublist] }) => {
    const linkNode = <Link> (<Paragraph> title).children[0]
    return {
      title: mdastToString(linkNode),
      href: linkNode.url,
      children: extractTOC(<List | null> sublist)
    }
  })

export const process = async (input: VFile): Promise<Output> => {
  const {
    content: mdString,
    data: frontmatter
  } = matter(input.contents)
  const remarkTree = await new Promise<Node>(resolve => 
    resolve(parser.parse(mdString)))
  const tocTree = mdastTOC(remarkTree, { maxDepth: 3 })
  const toc = extractTOC(tocTree.map)
  const htmlTree = await processor.run(remarkTree)
  const html = stringifier.stringify(htmlTree)
  return {
    html,
    frontmatter,
    toc
  }
}
