import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

    server: {
        proxy: {
            "/api": {
                target: "https://api-test.sesametime.com/schedule/v1",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        },
    },

    plugins: [vue()],

    build: {
        minify: false,
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[ext]",
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name]_.js",
            },
        },
    }

})