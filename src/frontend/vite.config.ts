import { fileURLToPath, URL } from 'node:url';

import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueRouter from "unplugin-vue-router/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Vue(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8090'
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
});
