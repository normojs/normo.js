
import { UserConfigExport, PluginOption, ProxyOptions } from 'vite'
export interface Config {
  // vite resolve.alias，default {'@/': `${path.resolve(__dirname, '')}/`}
  alias?: Object
  // vite root，default value process.cwd()
  root?: string
  // vite publicDir, default 'static'
  public?: string

  // 
  server: {
    port?: number
    host?: string
    open?: boolean | string
    proxy?: Record<string, string | ProxyOptions>
  }

  // default 'layouts'
  layouts?: string | Object
  // default 'pages'
  pages?: string | Object
  // default 'components'
  components?: string | Object
  // default 'store'
  store?: string | Object

  plugins?: (PluginOption | PluginOption[])[];

  // vite config 会覆盖上方的部分重复的配置
  viteConfig: UserConfigExport
}