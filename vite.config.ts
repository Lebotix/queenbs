// lebotix/queenbs/queenbs-800dadfe53fa279c1011a9dcbbec6ddff3fa9c34/vite.config.ts

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // CRITICAL FIX: Forces asset paths to be relative.
    base: './', 
    
    plugins: [react()],
    // ... rest of the config
  };
});
