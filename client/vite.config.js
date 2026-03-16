// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//   },
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './src/testSetup.js',
//   },
//   // test: {
//   //   environment: 'jsdom',
//   //   setupFiles: './src/testSetup.js',
//   //   coverage: {
//   //     provider: 'v8',
//   //     globals: true,
//   //     reporter: ['text', 'html'],
//   //   },
//   // },
// });


import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/tasks': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/testSetup.js',
  },
})