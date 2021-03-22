//  编译，选择编译哪一个项目
const { build } = require('esbuild')
const fs = require('fs')
const path = require('path')

exports.buildConfig = async function (filePath){
  const result = await build({
    entryPoints: [filePath],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: false ? 'esm' : 'cjs',
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const id = args.path
            if (
              (id[0] !== '.' && !path.isAbsolute(id)) ||
              id.slice(-5, id.length) === '.json'
            ) {
              return {
                external: true
              }
            }
          })
        }
      },
      {
        name: 'replace-import-meta',
        setup(build) {
          build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')
            return {
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
              contents: contents.replace(
                /\bimport\.meta\.url\b/g,
                JSON.stringify(`file://${args.path}`)
              )
            }
          })
        }
      }
    ]
  })
  const { text } = result.outputFiles[0]
  return text
}
