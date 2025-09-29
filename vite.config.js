// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Adicione esta seção:
  server: {
    host: true, // Opcional: torna o servidor acessível na rede local
    hmr: {
        host: 'localhost',
        protocol: 'ws',
    },
    // A linha mais importante:
    allowedHosts: [
      'blogfiap-front.onrender.com'
    ],
  },

  // ...sua configuração de teste, se estiver aqui
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.js',
  },
});