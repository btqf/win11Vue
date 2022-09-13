import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
const config = loadEnv('development', './');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: config.VITE_PROT,
    proxy: {
      '/api': {
        target: config.VITE_BACKEND, // 目标接口地址,env文件下配置
        changeOrigin: true,
        ws: true,
        secure: false, // https检查
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  resolve: {
    alias: {
      '@': getPath('src'),
      view: getPath('src/view'),
      store: getPath('src/store'),
      comp: getPath('src/component'),
      style: getPath('src/assets/style'),
      router: getPath('src/router'),
      request: getPath('src/services/request.js'),
    },
    extensions: ['.vue', '.js', '.jsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/global.scss";`
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
    vueJsx(),
  ],
});

function getPath(pathName = '') {
  return path.resolve(__dirname, pathName);
}
