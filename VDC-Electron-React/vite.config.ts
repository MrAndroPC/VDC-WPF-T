import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for Electron build
  build: {
    outDir: 'build', // Specify the output directory for the build
    emptyOutDir: true, // Ensure the output directory is cleaned before each build
  },
  resolve: {
    alias: {
      // Optional: Setup alias for easier imports if needed later
      // '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Specify the port for the dev server (matches main.ts)
  },
});
