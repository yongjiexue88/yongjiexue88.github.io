import "./ArticleBlog.scss"
import React, {useMemo, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"

const postModules = import.meta.glob("/src/content/blog/**/*.mdx", {
    eager: true,
    query: "?raw",
    import: "default"
})

function ArticleBlog({ dataWrapper }) {
    const posts = useMemo(() => parsePosts(postModules), [])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedSlug, setSelectedSlug] = useState(posts[0]?.slug)

    const visiblePosts = selectedCategory === "all" ?
        posts :
        posts.filter(post => post.frontmatter.category === selectedCategory)

    const selectedPost = posts.find(post => post.slug === selectedSlug) || visiblePosts[0] || posts[0]
    const categories = buildCategoryFilters(posts)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-blog`}
                 selectedItemCategoryId={null}
                 setSelectedItemCategoryId={() => {}}>
            <div className={`blog-shell`}>
                <aside className={`blog-sidebar`}>
                    <div className={`blog-sidebar-header`}>
                        <span className={`blog-eyebrow text-2`}>Personal archive</span>
                        <h5 className={`blog-sidebar-title mb-0`}>Blog</h5>
                    </div>

                    <div className={`blog-category-list`}>
                        {categories.map(category => (
                            <button key={category.id}
                                    className={`blog-category ${selectedCategory === category.id ? "blog-category-active" : ""}`}
                                    onClick={() => {
                                        setSelectedCategory(category.id)
                                        const firstPost = category.id === "all" ?
                                            posts[0] :
                                            posts.find(post => post.frontmatter.category === category.id)
                                        setSelectedSlug(firstPost?.slug)
                                    }}>
                                <span>{category.label}</span>
                                <span>{category.count}</span>
                            </button>
                        ))}
                    </div>

                    <nav className={`blog-list`}>
                        {visiblePosts.map(post => (
                            <button key={post.slug}
                                    className={`blog-list-item ${selectedPost?.slug === post.slug ? "blog-list-item-active" : ""}`}
                                    onClick={() => setSelectedSlug(post.slug)}>
                                <span className={`blog-list-title`}>{post.frontmatter.title || post.title}</span>
                                <span className={`blog-list-meta`}>
                                    {formatDate(post.frontmatter.created || post.frontmatter.updated)}
                                    {post.frontmatter.mood ? ` / ${post.frontmatter.mood}` : ""}
                                </span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className={`blog-post-view`}>
                    {selectedPost ? (
                        <BlogPost post={selectedPost}/>
                    ) : (
                        <div className={`blog-post-empty`}>
                            No public blog posts found yet.
                        </div>
                    )}
                </main>
            </div>
        </Article>
    )
}

function BlogPost({ post }) {
    const {frontmatter} = post
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []

    return (
        <article className={`blog-post`}>
            <div className={`blog-post-header`}>
                <div className={`blog-post-meta-row text-2`}>
                    {frontmatter.category && <span>{titleCase(frontmatter.category)}</span>}
                    {frontmatter.theme && <span>{frontmatter.theme}</span>}
                    {frontmatter.mood && <span>{frontmatter.mood}</span>}
                </div>

                <h4 className={`blog-post-title mb-2`}>{frontmatter.title || post.title}</h4>

                {frontmatter.description && (
                    <p className={`blog-post-description text-3 mb-0`}>{frontmatter.description}</p>
                )}

                <div className={`blog-post-footer-row`}>
                    <div className={`blog-post-tags`}>
                        {tags.map(tag => (
                            <span key={tag} className={`blog-post-tag text-2`}>{tag}</span>
                        ))}
                    </div>

                    <div className={`blog-post-dates text-2`}>
                        {frontmatter.created && <span>{formatDate(frontmatter.created)}</span>}
                        {frontmatter.updated && frontmatter.updated !== frontmatter.created && (
                            <span>Updated {formatDate(frontmatter.updated)}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className={`blog-post-body`}
                 dangerouslySetInnerHTML={{__html: markdownToHtml(post.body)}}/>
        </article>
    )
}

function parsePosts(modules) {
    return Object.entries(modules)
        .map(([path, raw]) => {
            const parsed = parseFrontmatter(String(raw || ""))
            const slug = path
                .replace("/src/content/blog/", "")
                .replace(/\/index\.mdx$/, "")
                .replace(/\.mdx$/, "")

            return {
                path,
                slug,
                title: extractMarkdownTitle(parsed.body),
                ...parsed
            }
        })
        .filter(post => post.frontmatter.visibility !== "private")
        .sort((a, b) => {
            const aDate = a.frontmatter.created || a.frontmatter.updated || ""
            const bDate = b.frontmatter.created || b.frontmatter.updated || ""
            if(aDate !== bDate) return bDate.localeCompare(aDate)

            return (a.frontmatter.title || a.title).localeCompare(b.frontmatter.title || b.title)
        })
}

function parseFrontmatter(raw) {
    if(!raw.startsWith("---")) {
        return {
            frontmatter: {},
            body: raw
        }
    }

    const end = raw.indexOf("\n---", 3)
    if(end === -1) {
        return {
            frontmatter: {},
            body: raw
        }
    }

    const frontmatterText = raw.slice(3, end).trim()
    const body = raw.slice(end + 4).trim()
    const frontmatter = {}

    frontmatterText.split("\n").forEach(line => {
        const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
        if(!match) return

        const [, key, rawValue] = match
        frontmatter[key] = parseFrontmatterValue(rawValue)
    })

    return {frontmatter, body}
}

function parseFrontmatterValue(value) {
    const trimmed = value.trim()

    if(trimmed.startsWith("[") && trimmed.endsWith("]")) {
        const inner = trimmed.slice(1, -1).trim()
        if(!inner) return []
        return inner.split(",")
            .map(item => stripQuotes(item.trim()))
            .filter(Boolean)
    }

    return stripQuotes(trimmed)
}

function stripQuotes(value) {
    return value.replace(/^["']|["']$/g, "")
}

function extractMarkdownTitle(body) {
    const titleLine = body.split("\n").find(line => line.startsWith("# "))
    return titleLine ? titleLine.replace("# ", "").trim() : "Untitled Post"
}

function buildCategoryFilters(posts) {
    const categories = [{
        id: "all",
        label: "All Posts",
        count: posts.length
    }]

    Array.from(new Set(posts.map(post => post.frontmatter.category).filter(Boolean)))
        .sort()
        .forEach(category => {
            categories.push({
                id: category,
                label: titleCase(category),
                count: posts.filter(post => post.frontmatter.category === category).length
            })
        })

    return categories
}

function markdownToHtml(markdown) {
    const lines = markdown.split("\n")
    const html = []
    let inCodeBlock = false
    let codeBuffer = []
    let inList = false
    let inQuote = false

    const closeList = () => {
        if(inList) {
            html.push("</ul>")
            inList = false
        }
    }

    const closeQuote = () => {
        if(inQuote) {
            html.push("</blockquote>")
            inQuote = false
        }
    }

    lines.forEach(line => {
        if(line.startsWith("```")) {
            if(inCodeBlock) {
                html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`)
                codeBuffer = []
                inCodeBlock = false
            }
            else {
                closeList()
                closeQuote()
                inCodeBlock = true
            }
            return
        }

        if(inCodeBlock) {
            codeBuffer.push(line)
            return
        }

        if(!line.trim()) {
            closeList()
            closeQuote()
            return
        }

        const quote = line.match(/^>\s?(.*)$/)
        if(quote) {
            closeList()
            if(!inQuote) {
                html.push("<blockquote>")
                inQuote = true
            }
            html.push(`<p>${inlineMarkdown(quote[1])}</p>`)
            return
        }

        const heading = line.match(/^(#{1,6})\s+(.+)$/)
        if(heading) {
            closeList()
            closeQuote()
            const level = Math.min(heading[1].length + 1, 6)
            html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
            return
        }

        const listItem = line.match(/^-\s+(.*)$/)
        if(listItem) {
            closeQuote()
            if(!inList) {
                html.push("<ul>")
                inList = true
            }

            html.push(`<li>${inlineMarkdown(listItem[1])}</li>`)
            return
        }

        closeList()
        closeQuote()
        html.push(`<p>${inlineMarkdown(line)}</p>`)
    })

    closeList()
    closeQuote()
    return html.join("")
}

function inlineMarkdown(text) {
    return escapeHtml(text)
        .replace(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noreferrer\">$1</a>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;")
}

function formatDate(value) {
    if(!value) return ""

    const date = new Date(`${value}T00:00:00`)
    if(Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

function titleCase(value) {
    return value
        .replaceAll("-", " ")
        .replace(/\b\w/g, char => char.toUpperCase())
}

export default ArticleBlog
