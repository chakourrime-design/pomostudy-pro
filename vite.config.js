import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'Club-Logo.png',
                'backgrounds/**/*',
                'sounds/**/*'
            ],
            manifest: {
                name: 'PomoStudy — Club Productivité ENSAB',
                short_name: 'PomoStudy',
                description: 'Timer Pomodoro enrichi pour étudiants ENSAB',
                theme_color: '#EF4444',
                background_color: '#0a0a0a',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/Club-Logo.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/Club-Logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/Club-Logo.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                // ✅ Mettre en cache tous les assets
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,jpg,jpeg,jfif,mp3,woff,woff2}'
                ],
                // ✅ Cache les backgrounds et sons pour offline
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|jfif|svg|gif|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:mp3|wav|ogg)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'audio-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 30
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: { '@': '/src' }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.test.ts', 'src/**/*.test.tsx']
    }
});
