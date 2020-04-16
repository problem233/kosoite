import fsSync, { promises as fs } from 'fs'
import module from 'module'
import { default as tjs } from 'typescript-json-schema'

const tsconfig = module.createRequire(import.meta.url)('../tsconfig.json')

async function createSchema(file, type, name) {
  const program = tjs.getProgramFromFiles([file], tsconfig)
  const schema = tjs.generateSchema(program, type, {
    required: true
  })
  if (! fsSync.existsSync('build')) await fs.mkdir('build')
  await fs.writeFile(`build/${name}.schema.json`, JSON.stringify(schema))
}

async function main() {
  await createSchema('src/dict.ts', 'Dict', 'dict')
}

main().catch(err => console.log(err))
