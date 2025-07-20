import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Remplace 'nom-du-repo' par le nom de ton dépôt GitHub
export default defineConfig({
  base: '/nom-du-repo/',
  plugins: [react()],
}); 