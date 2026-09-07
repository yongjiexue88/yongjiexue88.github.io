/**
 * @description The two post collections, in one place.
 *
 * Pages ask this module for posts rather than each re-globbing the content
 * directory.
 *
 * Metadata and body are split on purpose. Titles, dates, tags and descriptions
 * come from `virtual:post-index`, built once at build time (see
 * postIndexPlugin in vite.config.js), so index pages carry no body text.
 * Bodies load per-route through lazy globs below.
 */

import {useMemo} from "react"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {filterPostsByLanguage} from "/src/hooks/posts.js"
import postIndex from "virtual:post-index"

/**
 * Bodies are loaded per-route, not bundled.
 *
 * These globs are deliberately NOT eager: an eager glob inlines every post's
 * full text into the main chunk, which meant ~930KB of markdown reaching every
 * visitor of every page. Vite gives each file its own chunk instead, and
 * loadPostBody() fetches exactly the one the reader opened.
 */
const bodyLoaders = {
    journal: import.meta.glob("/src/content/blog/**/*.mdx", {query: "?raw", import: "default"}),
    notes: import.meta.glob("/src/content/booknotes/**/*.mdx", {query: "?raw", import: "default"})
}

/** Fetch one post's markdown body. Returns "" when the file is missing. */
export function loadPostBody(collectionKey, modulePath) {
    const loader = bodyLoaders[collectionKey]?.[modulePath]
    return loader ? loader() : Promise.resolve("")
}

/**
 * A collection is a physical taxonomy bucket — the "where does this primarily
 * belong?" axis. Tags provide the cross-cutting axis separately.
 */
export const COLLECTIONS = {
    journal: {
        key: "journal",
        path: "/journal",
        contentRoot: "/src/content/blog/",
        faIcon: "fa-solid fa-feather",
        /** Optional banner, e.g. "/images/covers/journal.jpg". Empty = no hero. */
        cover: "",
        locales: {
            en: {title: "Journal", blurb: "Diary entries, reflection, and slow thoughts."},
            zh: {title: "日志", blurb: "日记、自省，以及缓慢的思考。"}
        }
    },
    notes: {
        key: "notes",
        path: "/notes",
        contentRoot: "/src/content/booknotes/",
        faIcon: "fa-solid fa-book-open",
        cover: "",
        locales: {
            en: {title: "Notes", blurb: "Reading notes, study material, and things worth keeping."},
            zh: {title: "笔记", blurb: "读书笔记、学习材料，以及值得留存的东西。"}
        }
    }
}

export const COLLECTION_LIST = Object.values(COLLECTIONS)

/** Metadata comes from the build-time index — no body text is loaded here. */
function parseCollection(collection) {
    return postIndex[collection.key] || []
}

/**
 * Posts for one collection, filtered to the active language.
 * Each post is tagged with its collection so shared views (tags, home) can
 * link back to the right permalink.
 */
export function useCollection(key) {
    const {selectedLanguageId} = useLanguage()

    return useMemo(() => {
        const collection = COLLECTIONS[key]
        if(!collection)
            return {collection: null, posts: []}

        const posts = filterPostsByLanguage(parseCollection(collection), selectedLanguageId)
            .map(post => ({...post, collection: collection.key, href: `${collection.path}/${post.slug}`}))

        return {collection, posts}
    }, [key, selectedLanguageId])
}

/** Every post across both collections, newest first — for home and tag views. */
export function useAllPosts() {
    const {selectedLanguageId} = useLanguage()

    return useMemo(() => {
        return COLLECTION_LIST
            .flatMap(collection =>
                filterPostsByLanguage(parseCollection(collection), selectedLanguageId)
                    .map(post => ({...post, collection: collection.key, href: `${collection.path}/${post.slug}`}))
            )
            .sort((a, b) => {
                const dateA = a.frontmatter.created || a.frontmatter.updated || ""
                const dateB = b.frontmatter.created || b.frontmatter.updated || ""
                return dateB.localeCompare(dateA)
            })
    }, [selectedLanguageId])
}

/**
 * Tag index across both collections.
 * frontmatter.tags is already populated on every post but has never been
 * indexed — this turns it into the cross-cutting taxonomy.
 */
export function useTagIndex() {
    const posts = useAllPosts()

    return useMemo(() => {
        const byTag = new Map()

        posts.forEach(post => {
            const tags = Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : []
            tags.forEach(tag => {
                const key = String(tag).trim()
                if(!key) return
                if(!byTag.has(key)) byTag.set(key, [])
                byTag.get(key).push(post)
            })
        })

        return Array.from(byTag.entries())
            .map(([tag, tagPosts]) => ({tag, slug: encodeURIComponent(tag), posts: tagPosts, count: tagPosts.length}))
            .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    }, [posts])
}

/** Localized title/blurb for a collection, with an English fallback. */
export function collectionLocale(collection, languageId) {
    return collection?.locales?.[languageId] || collection?.locales?.en || {title: "", blurb: ""}
}
