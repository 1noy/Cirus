import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: '/Cirus/',
  plugins: [
    react({
      // Optimisation React
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-core': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // Firebase (séparé pour cache)
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-storage': ['firebase/storage'],
          
          // UI Libraries (regroupées)
          'mui': ['@mui/material', '@mui/icons-material'],
          'emotion': ['@emotion/react', '@emotion/styled'],
          
          // Emoji (lazy load)
          'emoji': ['emoji-picker-react', '@emoji-mart/react'],
          
          // Canvas (heavy)
          'canvas': ['canvas']
        },
        // Optimisation des chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3
      },
      mangle: {
        toplevel: true,
        safari10: true
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material'
    ],
    exclude: [
      'canvas',
      'emoji-picker-react',
      '@emoji-mart/react'
    ]
  },
  esbuild: {
    target: 'es2015',
    treeShaking: true
  },
  // Optimisation du serveur de développement
  server: {
    hmr: {
      overlay: false
    }
  },
  // Optimisation des assets
  assetsInclude: ['**/*.webp', '**/*.avif']
}); 