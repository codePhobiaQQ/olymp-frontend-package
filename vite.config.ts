import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA as vitePWA } from 'vite-plugin-pwa'
// import { loadConfigYaml } from './src/shared/lib/config/index.ts'
import path from 'path'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'

export default defineConfig({
  // preview: {
  //   allowedHosts: ['new.v-olymp.ru'],
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@app': path.resolve(__dirname, './src/app'),
      '@config': path.resolve(__dirname, './config'),
    },
  },
  plugins: [
    vitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifestFilename: 'public/manifest.json',
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      devOptions: {
        type: 'module',
        enabled: true,
      },
    }),

    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'default',
      },
      include: '**/*.svg?react',
    }),

    // loadConfigYaml(),

    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),

    // Type declarations
    dts({
      insertTypesEntry: true,
    }),

    // viteObfuscator({
    //   // конфиг можно настроить глубже, см. ниже
    //   compact: true,
    //   controlFlowFlattening: true,
    // }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'olymp-frontend',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },

    rollupOptions: {
      external: [
        ...Object.keys(packageJson.peerDependencies || {}),
        ...Object.keys(packageJson.dependencies || {}),
      ],
    },
  },
})
