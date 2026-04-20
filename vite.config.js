import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const financeApiTarget = process.env.FINANCE_API_PROXY_TARGET || "http://localhost:3001"

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    server: {
        proxy: {
            "/api": financeApiTarget
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Split the swiper plugin library into a separate chunk to avoid a large chunk size on index.js
                        if (id.includes('swiper'))
                            return 'swiper';
                        return;
                    }
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["mixed-decls", "color-functions", "global-builtin", "import"],
            },
        },
    },
})
