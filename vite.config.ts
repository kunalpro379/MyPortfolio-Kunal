import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import markdownPlugin from './src/vite-plugins/markdown';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    markdownPlugin()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      buffer: 'buffer/',
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  define: {
    'process.env': {},
    'global': {},
    'Buffer': ['buffer', 'Buffer']
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    },
    include: ['buffer']
  }
});
