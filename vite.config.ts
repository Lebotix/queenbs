import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fix: cast process to any to resolve TS error where cwd() is missing from the Process type
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Vital: This maps the system environment variables to the process.env object 
      // used in the services code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID),
      'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID),
      'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY),
    },
  };
});