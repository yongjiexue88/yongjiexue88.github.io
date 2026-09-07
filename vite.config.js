import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { parsePosts } from './src/hooks/posts.js'

/**
 * Emits `virtual:post-index` — every post's metadata, with the body stripped.
 *
 * Index, tag and home pages only need title/date/tags/description. Before this,
 * they pulled the full text of every post into the main bundle via an eager
 * glob, which shipped ~930KB of raw markdown to every visitor of every page
 * (two booknote files alone are 576KB and 336KB).
 *
 * The parsing runs through the same parsePosts() the browser uses, so slugs,
 * titles, private-post filtering and ordering stay byte-identical — only the
 * `body` field is dropped.
 */
function postIndexPlugin() {
    const VIRTUAL_ID = "virtual:post-index"
    const RESOLVED_ID = "\0" + VIRTUAL_ID

    const COLLECTIONS = [
        {key: "journal", dir: "src/content/blog", contentRoot: "/src/content/blog/"},
        {key: "notes", dir: "src/content/booknotes", contentRoot: "/src/content/booknotes/"}
    ]

    const buildIndex = () => {
        const out = {}

        for(const collection of COLLECTIONS) {
            const dir = path.resolve(process.cwd(), collection.dir)
            const modules = {}

            if(fs.existsSync(dir)) {
                for(const file of fs.readdirSync(dir)) {
                    if(!file.endsWith(".mdx")) continue
                    modules[collection.contentRoot + file] = fs.readFileSync(path.join(dir, file), "utf-8")
                }
            }

            out[collection.key] = parsePosts(modules, collection.contentRoot)
                .map(({body, ...meta}) => meta)
        }

        return out
    }

    return {
        name: "post-index",
        resolveId(id) {
            if(id === VIRTUAL_ID) return RESOLVED_ID
        },
        load(id) {
            if(id === RESOLVED_ID)
                return `export default ${JSON.stringify(buildIndex())}`
        },
        /** Rebuild the index when a content file changes in dev. */
        handleHotUpdate({file, server}) {
            if(!file.endsWith(".mdx")) return
            const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
            if(mod) server.moduleGraph.invalidateModule(mod)
            server.ws.send({type: "full-reload"})
        }
    }
}

const financeApiTarget = process.env.FINANCE_API_PROXY_TARGET || "http://localhost:3001"

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), postIndexPlugin()],
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
