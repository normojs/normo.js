import type { Plugin, ResolvedConfig } from 'vite'
import { Options } from './types'

const ID = '@normojs/package';
export default function PackagePlugin(userOptions: Options = {}): Plugin{
  let config: ResolvedConfig | undefined;
  let options: Options = userOptions;
  const styles: string[] = options.styles || [];
  const modules: string[] = options.modules || [];

return {
  name: '@normojs/package',
  enforce: 'pre',
    configResolved(_config) {
      config = _config;
    },
    resolveId(id) {
      if (id === ID) return ID;
    },
    async load(id) {
      if (id === ID) {
        return `
          import store from '@normo/store'; 
          
          ${modules.map((module, index) => `import _package_${index} from '${module}'`).join(';\n')}
          ${styles.map(style => `import '${style}'`).join(';\n')}

          const install = (app) => {
            app.config.globalProperties = {
              ...app.config.globalProperties,
            };
            app.use(store);
            ${modules.map((_module, index) => `app.use(_package_${index})`).join(';\n')}
            window.__APP__ = app;
          };

          export default {
            install
          };
        `;
      }
    },
}
}