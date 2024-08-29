import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    manifest: {
      name: 'ieee uon',
      short_name: 'ieee',
      description: 'Join societies and get updates on events and activities',
      theme_color: '#000000',
      background_color: '#000000',

      icons: [{
        src: 'android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: 'android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      }
        ,

      {
        src: 'maskable_icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }],

      screenshots:[{
        src: '/screenshot1.png',
        sizes:'1898x838',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Societies - IEEE UoN Branch App',
        
      },
    {
      src:"/screenshot2.png",
      sizes: '350x625',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Societies - IEEE UoN Branch App',
      
    }
    ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      navigateFallbackDenylist: [/^\/api/],
      runtimeCaching:[{
        urlPattern: /^\/api\//,
      handler: 'NetworkOnly',
      }]
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})