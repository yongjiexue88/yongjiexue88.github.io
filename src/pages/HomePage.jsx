import {taxonomyLabel, translationNotice} from "/src/hooks/taxonomy.js"
import "./pages.scss"
import "./HomePage.scss"
import React from 'react'
import {Link} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {COLLECTIONS, collectionLocale, useAllPosts, useCollection, useTagIndex} from "/src/hooks/collections.js"
import {formatShortDate} from "/src/hooks/posts.js"

/** Live post count per collection, for the section cards. */
function useCollectionCounts() {
    const journal = useCollection("journal")
    const notes = useCollection("notes")
    return {journal: journal.posts.length, notes: notes.posts.length}
}

function HomePage() {
    const {selectedLanguageId} = useLanguage()
    const data = useData()
    const posts = useAllPosts()
    const tags = useTagIndex()
    const counts = useCollectionCounts()

    const profile = data.getProfile()
    const isZh = selectedLanguageId === "zh"
    const latest = posts.slice(0, 4)
    const displayName = isZh ? "薛勇杰" : profile?.name || "Yongjie Xue"

    const role = isZh ? "全栈与 AI 工程师" : "Full Stack & AI Engineer"
    const signalLabel = (post) => post.frontmatter.title || post.title

    return (
        <div className={`home-page`}>
            <section className={`home-identity`} aria-labelledby="home-title">
                <h1 id="home-title" className={`home-hero-title ${isZh ? "home-hero-title-zh" : ""}`}>
                    {displayName}
                </h1>

                <div className={`home-identity-base`}>
                    <div className={`home-identity-facts`}>
                        <p>{role}</p>
                        <p>{isZh ? "美国得克萨斯州奥斯汀" : profile?.location || "Austin, Texas"}</p>
                    </div>

                    <div className={`home-identity-actions`}>
                        <a href="#writing" className={`home-action home-action-primary`}>
                            {isZh ? "阅读文章" : "Read the writing"}
                            <i className="fa-solid fa-arrow-down" aria-hidden="true"/>
                        </a>
                        <Link to="/contact" className={`home-action home-action-secondary`}>
                            {isZh ? "联系我" : "Get in touch"}
                        </Link>
                    </div>
                </div>
            </section>

            <section className={`writing-signal`} aria-labelledby="writing-signal-title">
                <div className={`writing-signal-inner`}>
                    <div className={`writing-signal-summary`}>
                        <h2 id="writing-signal-title">{isZh ? "写作" : "Writing"}</h2>
                        <Link to={COLLECTIONS.notes.path}>
                            <span>{collectionLocale(COLLECTIONS.notes, selectedLanguageId).title}</span>
                            <span>{counts.notes}</span>
                        </Link>
                        <Link to={COLLECTIONS.journal.path}>
                            <span>{collectionLocale(COLLECTIONS.journal, selectedLanguageId).title}</span>
                            <span>{counts.journal}</span>
                        </Link>
                    </div>

                    <div className={`writing-signal-map`} aria-label={isZh ? `${Math.min(posts.length, 14)} 篇文章的可视化索引` : `Visual index of ${Math.min(posts.length, 14)} published pieces`}>
                        {[posts.slice(0, 7), posts.slice(7, 14)].map((row, rowIndex) => (
                            <div className={`writing-signal-row`} key={rowIndex}>
                                {row.map((post, index) => {
                                    const signalIndex = rowIndex * 7 + index + 1
                                    return (
                                        <Link key={`${post.collection}-${post.slug}`}
                                              to={post.href}
                                              style={{"--signal-order": signalIndex}}
                                              className={`writing-signal-cell writing-signal-cell-${post.collection}`}
                                              aria-label={signalLabel(post)}>
                                            <span className={`writing-signal-index`}>
                                                {String(signalIndex).padStart(2, "0")}
                                            </span>
                                            <span className={`writing-signal-label`}>{signalLabel(post)}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        ))}
                        <p className={`writing-signal-caption`}>
                            {isZh ? "两个入口，一个持续更新的思考索引。" : "Two reading paths. One continuously growing index."}
                        </p>
                    </div>
                </div>
            </section>

            {latest.length > 0 && (
                <section id="writing" className={`home-latest`} aria-labelledby="home-latest-title">
                    <h2 id="home-latest-title" className={`visually-hidden`}>
                        {isZh ? "最新文章" : "Latest writing"}
                    </h2>
                    <div className={`home-latest-grid`}>
                        {latest.map((post, index) => {
                            const collection = COLLECTIONS[post.collection]
                            const date = post.frontmatter.created || post.frontmatter.updated
                            return (
                                <Link key={`${post.collection}-${post.slug}`}
                                      to={post.href}
                                      className={`home-latest-item ${index === 0 ? "home-latest-item-lead" : ""}`}>
                                    <div className={`home-latest-meta`}>
                                        {date && <span>{formatShortDate(date, selectedLanguageId)}</span>}
                                        {collection && <span>{collectionLocale(collection, selectedLanguageId).title}</span>}
                                    </div>
                                    <h3 lang={post.frontmatter.language || "en"}>{signalLabel(post)}</h3>
                                    <p className="post-language-note">{translationNotice(post, selectedLanguageId)}</p>
                                    <i className="fa-solid fa-arrow-right" aria-hidden="true"/>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            )}

            {tags.length > 0 && (
                <section className={`home-section home-tags`}>
                    <div className={`home-section-bar`}>
                        <h2 className={`home-section-heading`}>{isZh ? "按标签浏览" : "Browse by tag"}</h2>
                        <Link to="/tags" className={`home-section-more`}>{isZh ? "全部" : "All"}</Link>
                    </div>
                    <div className={`home-tag-cloud`}>
                        {tags.slice(0, 18).map(entry => (
                            <Link key={entry.tag} to={`/tags/${entry.slug}`} className={`tag-pill`}>
                                {taxonomyLabel(entry.tag, selectedLanguageId)}<span className={`tag-pill-count`}>{entry.count}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default HomePage
