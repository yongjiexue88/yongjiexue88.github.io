import "./pages.scss"
import "./PostPage.scss"
import React, {useEffect, useMemo, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useCollection, collectionLocale, loadPostBody} from "/src/hooks/collections.js"
import {markdownToHtml, parseFrontmatter, formatShortDate, formatLongDate} from "/src/hooks/posts.js"
import NotFoundPage from "./NotFoundPage.jsx"

/**
 * Give every h2/h3 a stable id and collect them for the table of contents.
 * Done on the rendered HTML string rather than in markdownToHtml() so the
 * renderer stays exactly as it was.
 */
function withHeadingIds(html) {
    const headings = []
    let index = 0

    const withIds = html.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (match, tag, inner) => {
        const text = inner.replace(/<[^>]+>/g, "").trim()
        if(!text) return match
        const id = `section-${++index}`
        headings.push({id, text, level: Number(tag.slice(1))})
        return `<${tag} id="${id}">${inner}</${tag}>`
    })

    return {html: withIds, headings}
}

function estimateReadingTime(body) {
    const words = String(body || "").trim().split(/\s+/).filter(Boolean).length
    const cjk = (String(body || "").match(/[一-鿿]/g) || []).length
    // CJK reads by character, latin by word; ~220wpm and ~400cpm respectively.
    return Math.max(1, Math.round(words / 220 + cjk / 400))
}

function PostPage({ collectionKey }) {
    const {slug} = useParams()
    const {selectedLanguageId} = useLanguage()
    const {collection, posts} = useCollection(collectionKey)

    const post = posts.find(item => item.slug === slug)

    if(!post)
        return <NotFoundPage/>

    return <PostView post={post}
                     posts={posts}
                     collection={collection}
                     languageId={selectedLanguageId}/>
}

function PostView({ post, posts, collection, languageId }) {
    const {frontmatter} = post
    const isZh = languageId === "zh"

    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const created = frontmatter.created || frontmatter.updated
    const fullTextUrl = frontmatter.fullTextUrl

    const [fullText, setFullText] = useState("")
    const [fullTextStatus, setFullTextStatus] = useState(fullTextUrl ? "idle" : "idle")

    /**
     * The body is not in the post index — index pages must not carry body text.
     * It is fetched as its own chunk for the post actually being read.
     */
    const [body, setBody] = useState("")
    const [bodyStatus, setBodyStatus] = useState("loading")

    useEffect(() => {
        let cancelled = false
        setBodyStatus("loading")

        loadPostBody(post.collection, post.path)
            .then(text => {
                if(cancelled) return
                // The loader returns the raw file, frontmatter block included.
                // parsePosts() used to strip that before rendering; since the
                // body is now fetched separately, strip it here or the YAML
                // renders as visible body text.
                setBody(parseFrontmatter(String(text || "")).body)
                setBodyStatus("ready")
            })
            .catch(() => { if(!cancelled) setBodyStatus("error") })

        return () => { cancelled = true }
    }, [post.collection, post.path])

    const {html, headings} = useMemo(() => withHeadingIds(markdownToHtml(body)), [body])
    const fullTextHtml = useMemo(() => fullText ? markdownToHtml(fullText) : "", [fullText])
    const readingTime = useMemo(() => estimateReadingTime(body), [body])

    /** Scroll to top when the permalink changes — routed pages do not reset it. */
    useEffect(() => { window.scrollTo(0, 0) }, [post.slug])

    /**
     * The complete-book fetch is opt-in now. Two of these targets are 31 MB and
     * 13 MB, so firing it automatically on page load would stall the main
     * thread; the reader asks for it explicitly instead.
     */
    const loadFullText = () => {
        if(!fullTextUrl) return
        setFullTextStatus("loading")

        fetch(fullTextUrl)
            .then(response => {
                if(!response.ok) throw new Error(`Could not load ${fullTextUrl}`)
                return response.text()
            })
            .then(text => {
                setFullText(text)
                setFullTextStatus("ready")
            })
            .catch(() => setFullTextStatus("error"))
    }

    const index = posts.findIndex(item => item.slug === post.slug)
    const previous = index > 0 ? posts[index - 1] : null
    const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null

    return (
        <div className={`page post-layout`}>
            <article className={`post-main`}>
                {frontmatter.cover && (
                    <figure className={`post-hero`}>
                        <img src={frontmatter.cover}
                             alt={frontmatter.coverAlt || ""}
                             loading="eager"/>
                        {frontmatter.coverCredit && (
                            <figcaption>{frontmatter.coverCredit}</figcaption>
                        )}
                    </figure>
                )}

                <nav className={`post-breadcrumb`}>
                    <Link to={collection.path}>{collectionLocale(collection, languageId).title}</Link>
                </nav>

                <header className={`post-header`}>
                    <h1 className={`post-title`}>{frontmatter.title || post.title}</h1>

                    <div className={`post-meta`}>
                        {created && <time>{formatLongDate(created)}</time>}
                        {bodyStatus === "ready" && (
                            <>
                                <span>·</span>
                                <span>{readingTime} {isZh ? "分钟" : "min read"}</span>
                            </>
                        )}
                        {frontmatter.updated && frontmatter.updated !== frontmatter.created && (
                            <>
                                <span>·</span>
                                <span>{isZh ? "更新于" : "Updated"} {formatShortDate(frontmatter.updated)}</span>
                            </>
                        )}
                    </div>

                    {frontmatter.description && (
                        <p className={`post-description`}>{frontmatter.description}</p>
                    )}

                    {tags.length > 0 && (
                        <div className={`post-tags`}>
                            {tags.map(tag => (
                                <Link key={tag}
                                      to={`/tags/${encodeURIComponent(tag)}`}
                                      className={`tag-pill`}>
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </header>

                {bodyStatus === "loading" && (
                    <div className={`post-body`}><p>{isZh ? "加载中…" : "Loading…"}</p></div>
                )}
                {bodyStatus === "error" && (
                    <div className={`post-body`}><p>{isZh ? "无法加载这篇内容。" : "Could not load this entry."}</p></div>
                )}
                {bodyStatus === "ready" && (
                    <div className={`post-body`} dangerouslySetInnerHTML={{__html: html}}/>
                )}

                {fullTextUrl && (
                    <div className={`post-fulltext`}>
                        <h2>{isZh ? "完整全文" : "Complete Book"}</h2>

                        {fullTextStatus === "idle" && (
                            <>
                                <p className={`post-fulltext-note`}>
                                    {isZh
                                        ? "完整全文是一个很大的文件，按需加载。"
                                        : "The complete text is a large file, loaded on request."}
                                </p>
                                <button className={`btn btn-primary`} onClick={loadFullText}>
                                    {isZh ? "加载全文" : "Load complete text"}
                                </button>
                            </>
                        )}
                        {fullTextStatus === "loading" && <p>{isZh ? "加载中…" : "Loading…"}</p>}
                        {fullTextStatus === "error" && (
                            <p>{isZh ? "无法加载全文：" : "Could not load the complete text from "}<code>{fullTextUrl}</code></p>
                        )}
                        {fullTextStatus === "ready" && (
                            <div className={`post-body`} dangerouslySetInnerHTML={{__html: fullTextHtml}}/>
                        )}
                    </div>
                )}

                {(previous || next) && (
                    <nav className={`post-pager`}>
                        {previous ? (
                            <Link to={previous.href} className={`post-pager-link`}>
                                <span className={`post-pager-dir`}>← {isZh ? "上一篇" : "Previous"}</span>
                                <span className={`post-pager-title`}>
                                    {previous.frontmatter.title || previous.title}
                                </span>
                            </Link>
                        ) : <span/>}

                        {next && (
                            <Link to={next.href} className={`post-pager-link post-pager-link-next`}>
                                <span className={`post-pager-dir`}>{isZh ? "下一篇" : "Next"} →</span>
                                <span className={`post-pager-title`}>
                                    {next.frontmatter.title || next.title}
                                </span>
                            </Link>
                        )}
                    </nav>
                )}
            </article>

            {headings.length > 1 && (
                <aside className={`post-toc`}>
                    <h2 className={`post-toc-heading`}>{isZh ? "目录" : "Contents"}</h2>
                    <nav>
                        {headings.map(heading => (
                            <a key={heading.id}
                               href={`#${heading.id}`}
                               className={`post-toc-link post-toc-link-l${heading.level}`}>
                                {heading.text}
                            </a>
                        ))}
                    </nav>
                </aside>
            )}
        </div>
    )
}

export default PostPage
