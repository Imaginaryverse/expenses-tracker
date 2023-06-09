import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
    },
  },
});
