declare module 'mdast-util-to-string' {
  import { Node } from 'unist'
  const toString: (node: Node) => string
  export = toString
}

declare module 'rehype-autolink-headings' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'rehype-katex' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'rehype-raw' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'rehype-slug' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'rehype-stringify' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'remark-math' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'remark-rehype' {
  import unified from 'unified'
  const plugin: unified.Plugin
  export = plugin
}

declare module 'string-natural-compare' {
  const natcomp: (a: string, b: string, options?: {
    caseInsensitive?: boolean
    alphabet?: string
  }) => number
  export = natcomp
}

declare module 'to-vfile' {
  import { VFile as OrigVFile, VFileContents, VFileOptions } from 'vfile'
  import { WriteFileOptions } from 'fs'
  namespace toVFile {
    type VFile_ = Pick<OrigVFile, keyof OrigVFile>
    interface VFile extends VFile_ {} // to avoid expanding
    interface ToVFile {
      (input: VFileContents | VFile | VFileOptions): VFile
      <F extends Pick<VFile, keyof VFile>>(input: F): F
      read(input: VFileContents | VFile | VFileOptions, encoding?: string): Promise<VFile>
      read<F extends Pick<VFile, keyof VFile>>(input: F, encoding?: string): Promise<F>
      write(input: VFileContents | VFile | VFileOptions, fsOptions?: WriteFileOptions): Promise<void>
    }
  }
  const toVFile: toVFile.ToVFile
  export = toVFile
}
