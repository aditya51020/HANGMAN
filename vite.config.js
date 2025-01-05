import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/Hangman',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: '/src/main.jsx', 
    },
  },
});



