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
    const [readingSlug, setReadingSlug] = useState(null)

    const visiblePosts = selectedCategory === "all" ?
        posts :
        posts.filter(post => post.frontmatter.category === selectedCategory)

    const readingPost = readingSlug ?
        posts.find(post => post.slug === readingSlug) :
        null

    const categories = buildCategoryFilters(posts)
    const showFilters = categories.length > 1
    const groupedByYear = groupPostsByYear(visiblePosts)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-blog`}
                 selectedItemCategoryId={null}
                 setSelectedItemCategoryId={() => {}}>
            <div className={`journal-page`}>
                {readingPost ? (
                    <ReadingMode post={readingPost}
                                 onBack={() => setReadingSlug(null)}/>
                ) : (
                    <IndexMode showFilters={showFilters}
                               categories={categories}
                               selectedCategory={selectedCategory}
                               setSelectedCategory={setSelectedCategory}
                               groupedByYear={groupedByYear}
                               onSelectPost={slug => setReadingSlug(slug)}
                               isEmpty={visiblePosts.length === 0}/>
                )}
            </div>
        </Article>
    )
}

function IndexMode({ showFilters, categories, selectedCategory, setSelectedCategory,
                    groupedByYear, onSelectPost, isEmpty }) {
    return (
        <>
            {showFilters && (
                <div className={`journal-filters`}>
                    {categories.map((category, index) => (
                        <React.Fragment key={category.id}>
                            {index > 0 && <span className={`journal-filter-sep`}>·</span>}
                            <button className={`journal-filter ${selectedCategory === category.id ? "journal-filter-active" : ""}`}
                                    onClick={() => setSelectedCategory(category.id)}>
                                {category.label.toLowerCase()}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {isEmpty ? (
                <div className={`journal-empty`}>
                    Nothing under this filter yet.
                </div>
            ) : (
                <div className={`journal-index-list`}>
                    {groupedByYear.map(group => (
                        <section key={group.year} className={`journal-year-group`}>
                            <h2 className={`journal-year-label`}>{group.year}</h2>
                            <ol className={`journal-year-entries`}>
                                {group.posts.map(post => (
                                    <li key={post.slug}>
                                        <button className={`journal-entry-row`}
                                                onClick={() => onSelectPost(post.slug)}>
                                            <span className={`journal-entry-row-date`}>
                                                {formatShortDate(post.frontmatter.created || post.frontmatter.updated)}
                                            </span>
                                            <span className={`journal-entry-row-body`}>
                                                <span className={`journal-entry-row-title`}>
                                                    {post.frontmatter.title || post.title}
                                                </span>
                                                {post.frontmatter.description && (
                                                    <span className={`journal-entry-row-desc`}>
                                                        {post.frontmatter.description}
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    ))}
                </div>
            )}
        </>
    )
}

function ReadingMode({ post, onBack }) {
    const {frontmatter} = post
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const created = frontmatter.created || frontmatter.updated

    return (
        <article className={`journal-entry`}>
            <button className={`journal-back-link`} onClick={onBack}>
                <span aria-hidden="true">←</span> All entries
            </button>

            <header className={`journal-entry-header`}>
                {created && (
                    <time className={`journal-entry-date`}>{formatLongDate(created)}</time>
                )}
                <h1 className={`journal-entry-title`}>{frontmatter.title || post.title}</h1>
                {frontmatter.description && (
                    <p className={`journal-entry-description`}>{frontmatter.description}</p>
                )}
            </header>

            <div className={`journal-entry-body`}
                 dangerouslySetInnerHTML={{__html: markdownToHtml(post.body)}}/>

            {(tags.length > 0 || (frontmatter.updated && frontmatter.updated !== frontmatter.created)) && (
                <footer className={`journal-entry-footer`}>
                    {tags.length > 0 && (
                        <div className={`journal-entry-tags`}>
                            {tags.map((tag, idx) => (
                                <React.Fragment key={tag}>
                                    {idx > 0 && <span className={`journal-tag-sep`}>·</span>}
                                    <span className={`journal-entry-tag`}>{tag}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {frontmatter.updated && frontmatter.updated !== frontmatter.created && (
                        <span className={`journal-entry-updated`}>Updated {formatShortDate(frontmatter.updated)}</span>
                    )}
                </footer>
            )}
        </article>
    )
}

function groupPostsByYear(posts) {
    const groups = new Map()

    posts.forEach(post => {
        const date = post.frontmatter.created || post.frontmatter.updated || ""
        const year = date.slice(0, 4) || "—"
        if(!groups.has(year))
            groups.set(year, [])
        groups.get(year).push(post)
    })

    return Array.from(groups.entries())
        .map(([year, posts]) => ({ year, posts }))
        .sort((a, b) => b.year.localeCompare(a.year))
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
        label: "All",
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
    let skippedFirstH1 = false

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
            const level = heading[1].length
            if(level === 1 && !skippedFirstH1) {
                skippedFirstH1 = true
                return
            }
            const tag = Math.min(level + 1, 6)
            html.push(`<h${tag}>${inlineMarkdown(heading[2])}</h${tag}>`)
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
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;")
}

function formatShortDate(value) {
    if(!value) return ""

    const date = new Date(`${value}T00:00:00`)
    if(Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en", {
        month: "short",
        day: "numeric"
    })
}

function formatLongDate(value) {
    if(!value) return ""

    const date = new Date(`${value}T00:00:00`)
    if(Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

function titleCase(value) {
    return value
        .replaceAll("-", " ")
        .replace(/\b\w/g, char => char.toUpperCase())
}

export default ArticleBlog
