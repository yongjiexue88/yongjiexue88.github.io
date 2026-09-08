import "./pages.scss"
import React from 'react'
import {Link, useParams} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTagIndex} from "/src/hooks/collections.js"
import PostCard from "./PostCard.jsx"

/** Every post carrying one tag, across both collections. */
function TagPage() {
    const {tag} = useParams()
    const {selectedLanguageId} = useLanguage()
    const tags = useTagIndex()
    const isZh = selectedLanguageId === "zh"

    const decoded = decodeURIComponent(tag || "")
    const entry = tags.find(item => item.tag === decoded)
    const posts = entry?.posts || []

    return (
        <div className={`page`}>
            <header className={`page-header`}>
                <nav className={`page-breadcrumb`}>
                    <Link to="/tags">{isZh ? "标签" : "Tags"}</Link>
                </nav>
                <h1 className={`page-title`}>{decoded}</h1>
                <p className={`page-blurb`}>
                    {isZh ? `${posts.length} 篇内容。` : `${posts.length} ${posts.length === 1 ? "entry" : "entries"}.`}
                </p>
            </header>

            {posts.length === 0 ? (
                <div className={`page-empty`}>
                    {isZh ? "没有找到这个标签下的内容。" : "Nothing found under this tag."}
                </div>
            ) : (
                <div className={`card-grid`}>
                    {posts.map(post => (
                        <PostCard key={`${post.collection}-${post.slug}`}
                                  post={post}
                                  languageId={selectedLanguageId}
                                  showCollection={true}
                                  headingLevel="h2"/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TagPage
