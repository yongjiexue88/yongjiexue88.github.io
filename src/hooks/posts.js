/**
 * @description Shared post pipeline for the journal and booknotes.
 *
 * Lifted verbatim out of ArticleBlog.jsx so the routed pages (index, post, tag)
 * can share one parser rather than each re-implementing it. Behaviour is
 * unchanged — these are the same functions that rendered the site before, only
 * exported.
 *
 * Note there is no MDX pipeline in this project: the .mdx extension is
 * cosmetic, files are read as raw strings via import.meta.glob, and
 * markdownToHtml() below is the renderer.
 */

export function groupPostsByYear(posts) {
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

export function parsePosts(modules, contentRoot) {
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

export function filterPostsByLanguage(posts, languageId) {
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

export function parseFrontmatter(raw) {
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

export function parseFrontmatterValue(value) {
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

export function stripQuotes(value) {
    return value.replace(/^["']|["']$/g, "")
}

export function extractMarkdownTitle(body) {
    const titleLine = body.split("\n").find(line => line.startsWith("# "))
    return titleLine ? titleLine.replace("# ", "").trim() : "Untitled Post"
}

export function buildCategoryFilters(posts) {
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

export function markdownToHtml(markdown) {
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

export function isTableStart(lines, index) {
    const current = lines[index]?.trim() || ""
    const next = lines[index + 1]?.trim() || ""
    return isTableRow(current) && isTableSeparator(next)
}

export function isTableRow(line) {
    return line.startsWith("|") && line.endsWith("|") && line.includes("|")
}

export function isTableSeparator(line) {
    if(!isTableRow(line)) return false

    return splitTableCells(line).every(cell => /^:?-{2,}:?$/.test(cell.trim()))
}

export function parseTable(lines, startIndex) {
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

export function splitTableCells(line) {
    return line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map(cell => cell.trim())
}

export function inlineMarkdown(text) {
    return escapeHtml(text)
        .replace(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g, "<a href=\"$2\" target=\"_blank\" rel=\"noreferrer\">$1</a>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
}

export function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;")
}

export function formatShortDate(value) {
    if(!value) return ""

    const date = new Date(`${value}T00:00:00`)
    if(Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en", {
        month: "short",
        day: "numeric"
    })
}

export function formatLongDate(value) {
    if(!value) return ""

    const date = new Date(`${value}T00:00:00`)
    if(Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString("en", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}

export function titleCase(value) {
    return value
        .replaceAll("-", " ")
        .replace(/\b\w/g, char => char.toUpperCase())
}
