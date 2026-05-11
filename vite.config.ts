import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Club-Logo.png'],
      manifest: {
        name: 'PomoStudy — Club Productivité ENSAB',
        short_name: 'PomoStudy',
        description: 'Timer Pomodoro enrichi pour étudiants ENSAB',
        theme_color: '#EF4444',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/Club-Logo.png', sizes: '192x192', type: 'image/png' },
          { src: '/Club-Logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
      }
    })
  ],
  resolve: {
    alias: { '@': '/src' }
  },
  // ✅ BLOC TEST — ajouter ici
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        lines: 95,
        functions: 95,
        branches: 95,
        statements: 95,
      },
      include: [
        'src/hooks/**',
        'src/utils/**',
        'src/components/timer/**',
      ],
    },
  },
})