import "./ArticleSoftwareEngineering.scss"
import React, {useMemo, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"

const noteModules = import.meta.glob("/src/content/software-engineering/**/*.mdx", {
    eager: true,
    query: "?raw",
    import: "default"
})

const CATEGORY_LABELS = {
    learning: "Learning",
    projects: "Projects",
    work: "Work",
    leetcode: "LeetCode",
    english: "English",
    drafts: "Drafts",
    archive: "Archive"
}

function ArticleSoftwareEngineering({ dataWrapper }) {
    const notes = useMemo(() => parseNotes(noteModules), [])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedSlug, setSelectedSlug] = useState(notes[0]?.slug)

    const visibleNotes = selectedCategory === "all" ?
        notes :
        notes.filter(note => note.frontmatter.category === selectedCategory)

    const selectedNote = notes.find(note => note.slug === selectedSlug) || visibleNotes[0] || notes[0]
    const categories = buildCategoryFilters(notes)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-software-engineering`}
                 selectedItemCategoryId={null}
                 setSelectedItemCategoryId={() => {}}>
            <div className={`software-notes-shell`}>
                <aside className={`software-notes-sidebar`}>
                    <div className={`software-notes-sidebar-header`}>
                        <span className={`software-notes-eyebrow text-2`}>Knowledge base</span>
                        <h5 className={`software-notes-sidebar-title mb-0`}>Software Engineering</h5>
                    </div>

                    <div className={`software-notes-category-list`}>
                        {categories.map(category => (
                            <button key={category.id}
                                    className={`software-notes-category ${selectedCategory === category.id ? "software-notes-category-active" : ""}`}
                                    onClick={() => {
                                        setSelectedCategory(category.id)
                                        const firstNote = category.id === "all" ?
                                            notes[0] :
                                            notes.find(note => note.frontmatter.category === category.id)
                                        setSelectedSlug(firstNote?.slug)
                                    }}>
                                <span>{category.label}</span>
                                <span>{category.count}</span>
                            </button>
                        ))}
                    </div>

                    <nav className={`software-notes-list`}>
                        {visibleNotes.map(note => (
                            <button key={note.slug}
                                    className={`software-notes-list-item ${selectedNote?.slug === note.slug ? "software-notes-list-item-active" : ""}`}
                                    onClick={() => setSelectedSlug(note.slug)}>
                                <span className={`software-notes-list-title`}>{note.frontmatter.title || note.title}</span>
                                <span className={`software-notes-list-meta`}>
                                    {CATEGORY_LABELS[note.frontmatter.category] || note.frontmatter.category}
                                    {note.frontmatter.subcategory && note.frontmatter.subcategory !== "index" ? ` / ${note.frontmatter.subcategory}` : ""}
                                </span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className={`software-note-view`}>
                    {selectedNote ? (
                        <SoftwareNote note={selectedNote}/>
                    ) : (
                        <div className={`software-note-empty`}>
                            No software engineering notes found.
                        </div>
                    )}
                </main>
            </div>
        </Article>
    )
}

function SoftwareNote({ note }) {
    const {frontmatter} = note
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []

    return (
        <article className={`software-note`}>
            <div className={`software-note-header`}>
                <div className={`software-note-meta-row text-2`}>
                    <span>{CATEGORY_LABELS[frontmatter.category] || frontmatter.category}</span>
                    {frontmatter.subcategory && <span>{frontmatter.subcategory}</span>}
                    {frontmatter.status && <span>{frontmatter.status}</span>}
                    {frontmatter.visibility && <span>{frontmatter.visibility}</span>}
                </div>

                <h4 className={`software-note-title mb-2`}>{frontmatter.title || note.title}</h4>

                {frontmatter.description && (
                    <p className={`software-note-description text-3 mb-0`}>{frontmatter.description}</p>
                )}

                <div className={`software-note-footer-row`}>
                    <div className={`software-note-tags`}>
                        {tags.map(tag => (
                            <span key={tag} className={`software-note-tag text-2`}>{tag}</span>
                        ))}
                    </div>

                    <div className={`software-note-dates text-2`}>
                        {frontmatter.updated && <span>Updated {frontmatter.updated}</span>}
                    </div>
                </div>
            </div>

            <div className={`software-note-body`}
                 dangerouslySetInnerHTML={{__html: markdownToHtml(note.body)}}/>
        </article>
    )
}

function parseNotes(modules) {
    return Object.entries(modules)
        .filter(([path]) => !path.includes("/templates/"))
        .map(([path, raw]) => {
            const parsed = parseFrontmatter(String(raw || ""))
            const slug = path
                .replace("/src/content/software-engineering/", "")
                .replace(/\/index\.mdx$/, "")
                .replace(/\.mdx$/, "")

            return {
                path,
                slug: slug || "software-engineering",
                title: extractMarkdownTitle(parsed.body),
                ...parsed
            }
        })
        .sort((a, b) => {
            const aCategory = a.frontmatter.category || ""
            const bCategory = b.frontmatter.category || ""
            if(aCategory !== bCategory) return aCategory.localeCompare(bCategory)

            const aUpdated = a.frontmatter.updated || ""
            const bUpdated = b.frontmatter.updated || ""
            if(aUpdated !== bUpdated) return bUpdated.localeCompare(aUpdated)

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
    return titleLine ? titleLine.replace("# ", "").trim() : "Untitled Note"
}

function buildCategoryFilters(notes) {
    const categories = [{
        id: "all",
        label: "All Notes",
        count: notes.length
    }]

    Object.entries(CATEGORY_LABELS).forEach(([id, label]) => {
        const count = notes.filter(note => note.frontmatter.category === id).length
        if(count > 0) {
            categories.push({id, label, count})
        }
    })

    return categories
}

function markdownToHtml(markdown) {
    const lines = markdown.split("\n")
    const html = []
    let inCodeBlock = false
    let codeBuffer = []
    let inList = false

    const closeList = () => {
        if(inList) {
            html.push("</ul>")
            inList = false
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
            return
        }

        const heading = line.match(/^(#{1,6})\s+(.+)$/)
        if(heading) {
            closeList()
            const level = Math.min(heading[1].length + 1, 6)
            html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
            return
        }

        const listItem = line.match(/^-\s+(.*)$/)
        if(listItem) {
            if(!inList) {
                html.push("<ul>")
                inList = true
            }

            const checked = listItem[1].startsWith("[x] ")
            const unchecked = listItem[1].startsWith("[ ] ")
            const content = (checked || unchecked) ? listItem[1].slice(4) : listItem[1]
            const checkbox = (checked || unchecked) ?
                `<input type="checkbox" disabled ${checked ? "checked" : ""}/>` :
                ""

            html.push(`<li>${checkbox}${inlineMarkdown(content)}</li>`)
            return
        }

        closeList()
        html.push(`<p>${inlineMarkdown(line)}</p>`)
    })

    closeList()
    return html.join("")
}

function inlineMarkdown(text) {
    return escapeHtml(text)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\[\[([^\]]+)]]/g, "<span class=\"software-note-wiki-link\">$1</span>")
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;")
}

export default ArticleSoftwareEngineering
