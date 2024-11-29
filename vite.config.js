import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Cambia esto al directorio que desees, por ejemplo 'build'
  },
  server: {
    historyApiFallback: true,
  },
})
