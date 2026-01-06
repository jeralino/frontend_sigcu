import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const repoName = '/mi-proyecto-ci-sigcu/';

  return {
    plugins: [react()],
    // LÓGICA INTELIGENTE:
    // 1. Si el comando es 'serve' (npm run dev), usa la raíz '/' (para que localhost funcione normal).
    // 2. Si es 'build' (para subir a GitHub), usa la carpeta del repositorio.
    base: command === 'serve' ? '/' : repoName,
  }
})