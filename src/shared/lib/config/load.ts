// import fs from 'fs'
// import { Config } from '@config/types.ts'
// import deepmerge from 'deepmerge'
// import yaml from 'js-yaml'
// import { ViteDevServer } from 'vite'
//
// const INITIAL_CONFIG_PATHS = ['config/frontend.yaml']
//
// function loadConfig(filePath: string): Record<string, any> {
//   console.log('file path', filePath)
//   return fs.existsSync(filePath) ? (yaml.load(fs.readFileSync(filePath, 'utf8') as string) as Record<string, any>) : {}
// }
//
// export async function loadConfigYaml() {
//   const virtualModuleId = 'config-yaml'
//   const resolvedVirtualModuleId = '\0' + virtualModuleId
//   const initData = deepmerge.all(INITIAL_CONFIG_PATHS.map(loadConfig)) as Config
//
//   console.log('initData', initData)
//
//   const data = deepmerge.all([
//     initData,
//     ...Object.values(initData.config.added)
//       .map((paths: string[]) => paths.map((p) => loadConfig(p)))
//       .flat(),
//   ])
//
//   const dataString = JSON.stringify(data)
//   const toWatch: string[] = [...INITIAL_CONFIG_PATHS, ...Object.values(initData.config.added).flat() as string[]]
//
//   return {
//     name: 'load-config-yaml',
//
//     load(id: string) {
//       if (id === resolvedVirtualModuleId) {
//         return `export const config = ${dataString}`
//       }
//     },
//
//     configureServer(server: ViteDevServer) {
//       server.watcher.add(toWatch)
//
//       function onWatchChange() {
//         server.ws.send({ type: 'full-reload' })
//         server.moduleGraph.invalidateAll()
//       }
//
//       server.watcher.on('change', onWatchChange)
//     },
//   }
// }
