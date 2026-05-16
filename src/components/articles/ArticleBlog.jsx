import "./ArticleBlog.scss"
import React, {useMemo, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

const postModules = import.meta.glob("/src/content/blog/**/*.mdx", {
    eager: true,
    query: "?raw",
    import: "default"
})

function ArticleBlog({ dataWrapper }) {
    return (
        <ArticlePostCollection dataWrapper={dataWrapper}
                               modules={postModules}
                               contentRoot={`/src/content/blog/`}
                               backLabel={`All entries`}/>
    )
}

function ArticlePostCollection({ dataWrapper, modules, contentRoot, backLabel = "All entries" }) {
    const {selectedLanguageId} = useLanguage()
    const allPosts = useMemo(() => parsePosts(modules, contentRoot), [modules, contentRoot])
    const posts = useMemo(
        () => filterPostsByLanguage(allPosts, selectedLanguageId),
        [allPosts, selectedLanguageId]
    )

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
                                 backLabel={backLabel}
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

function ReadingMode({ post, backLabel, onBack }) {
    const {frontmatter} = post
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const created = frontmatter.created || frontmatter.updated

    return (
        <article className={`journal-entry`}>
            <button className={`journal-back-link`} onClick={onBack}>
                <span aria-hidden="true">←</span> {backLabel}
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

function parsePosts(modules, contentRoot) {
    return Object.entries(modules)
        .map(([path, raw]) => {
            const parsed = parseFrontmatter(String(raw || ""))
            const fileSlug = path
                .replace(contentRoot, "")
                .replace(/\/index\.mdx$/, "")
                .replace(/\.mdx$/, "")
            const slug = parsed.frontmatter.slug || fileSlug

            return {
                path,
                slug,
                fileSlug,
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

function filterPostsByLanguage(posts, languageId) {
    if(!languageId) return posts

    const matchesLanguage = post => (post.frontmatter.language || "en") === languageId
    const inLanguage = posts.filter(matchesLanguage)
    const slugsInLanguage = new Set(inLanguage.map(post => post.slug))

    const fallbackPosts = posts.filter(post =>
        !matchesLanguage(post) && !slugsInLanguage.has(post.slug)
    )

    const dedupFallback = []
    const seenSlugs = new Set()
    fallbackPosts.forEach(post => {
        if(seenSlugs.has(post.slug)) return
        seenSlugs.add(post.slug)
        dedupFallback.push(post)
    })

    return [...inLanguage, ...dedupFallback].sort((a, b) => {
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
    let listType = null
    let inQuote = false
    let skippedFirstH1 = false

    const closeList = () => {
        if(listType) {
            html.push(`</${listType}>`)
            listType = null
        }
    }

    const closeQuote = () => {
        if(inQuote) {
            html.push("</blockquote>")
            inQuote = false
        }
    }

    const openList = (type) => {
        if(listType === type) return
        closeList()
        html.push(`<${type}>`)
        listType = type
    }

    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]

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
            continue
        }

        if(inCodeBlock) {
            codeBuffer.push(line)
            continue
        }

        if(isTableStart(lines, i)) {
            closeList()
            closeQuote()
            const table = parseTable(lines, i)
            html.push(table.html)
            i = table.endIndex
            continue
        }

        if(!line.trim()) {
            closeList()
            closeQuote()
            continue
        }

        const quote = line.match(/^>\s?(.*)$/)
        if(quote) {
            closeList()
            if(!inQuote) {
                html.push("<blockquote>")
                inQuote = true
            }
            html.push(`<p>${inlineMarkdown(quote[1])}</p>`)
            continue
        }

        const heading = line.match(/^(#{1,6})\s+(.+)$/)
        if(heading) {
            closeList()
            closeQuote()
            const level = heading[1].length
            if(level === 1 && !skippedFirstH1) {
                skippedFirstH1 = true
                continue
            }
            const tag = Math.min(level + 1, 6)
            html.push(`<h${tag}>${inlineMarkdown(heading[2])}</h${tag}>`)
            continue
        }

        const unorderedListItem = line.match(/^-\s+(.*)$/)
        if(unorderedListItem) {
            closeQuote()
            openList("ul")

            html.push(`<li>${inlineMarkdown(unorderedListItem[1])}</li>`)
            continue
        }

        const orderedListItem = line.match(/^\d+\.\s+(.*)$/)
        if(orderedListItem) {
            closeQuote()
            openList("ol")

            html.push(`<li>${inlineMarkdown(orderedListItem[1])}</li>`)
            continue
        }

        closeList()
        closeQuote()
        html.push(`<p>${inlineMarkdown(line)}</p>`)
    }

    closeList()
    closeQuote()
    return html.join("")
}

function isTableStart(lines, index) {
    const current = lines[index]?.trim() || ""
    const next = lines[index + 1]?.trim() || ""
    return isTableRow(current) && isTableSeparator(next)
}

function isTableRow(line) {
    return line.startsWith("|") && line.endsWith("|") && line.includes("|")
}

function isTableSeparator(line) {
    if(!isTableRow(line)) return false

    return splitTableCells(line).every(cell => /^:?-{2,}:?$/.test(cell.trim()))
}

function parseTable(lines, startIndex) {
    const headers = splitTableCells(lines[startIndex])
    const rows = []
    let endIndex = startIndex + 1

    for(let i = startIndex + 2; i < lines.length; i++) {
        const line = lines[i].trim()
        if(!isTableRow(line)) break

        rows.push(splitTableCells(line))
        endIndex = i
    }

    const colCount = headers.length
    const renderCell = (cell, tag) => `<${tag}>${inlineMarkdown(cell)}</${tag}>`
    const renderRow = (cells, tag) => {
        const normalized = Array.from({length: colCount}, (_, index) => cells[index] || "")
        return `<tr>${normalized.map(cell => renderCell(cell, tag)).join("")}</tr>`
    }

    return {
        endIndex,
        html: [
            `<div class="journal-table-wrap"><table>`,
            `<thead>${renderRow(headers, "th")}</thead>`,
            `<tbody>${rows.map(row => renderRow(row, "td")).join("")}</tbody>`,
            `</table></div>`
        ].join("")
    }
}

function splitTableCells(line) {
    return line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(cell => cell.trim())
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

export {ArticlePostCollection}
export default ArticleBlog
