import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Para Vercel, NO necesitamos definir 'base' con nombres de repositorio.
  // Al dejarlo vacío o borrar la línea, usa la raíz '/' por defecto, que es lo correcto.
})