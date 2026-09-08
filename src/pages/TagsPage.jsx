import {taxonomyLabel} from "/src/hooks/taxonomy.js"
import "./pages.scss"
import React from 'react'
import {Link} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTagIndex} from "/src/hooks/collections.js"

/**
 * The cross-cutting index. Built entirely from frontmatter.tags, which was
 * already populated on every post but had never been indexed anywhere.
 */
function TagsPage() {
    const {selectedLanguageId} = useLanguage()
    const tags = useTagIndex()
    const isZh = selectedLanguageId === "zh"

    return (
        <div className={`page`}>
            <header className={`page-header`}>
                <h1 className={`page-title`}>{isZh ? "标签" : "Tags"}</h1>
                <p className={`page-blurb`}>
                    {isZh
                        ? `按标签浏览全站内容，共 ${tags.length} 个标签。`
                        : `Browse everything by subject — ${tags.length} tags in use.`}
                </p>
            </header>

            {tags.length === 0 ? (
                <div className={`page-empty`}>{isZh ? "还没有标签。" : "No tags yet."}</div>
            ) : (
                <div className={`home-tag-cloud`} style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                    {tags.map(entry => (
                        <Link key={entry.tag} to={`/tags/${entry.slug}`} className={`tag-pill`}>
                            {taxonomyLabel(entry.tag, selectedLanguageId)}<span className={`tag-pill-count`}>{entry.count}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TagsPage
