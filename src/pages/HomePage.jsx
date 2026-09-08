import "./pages.scss"
import "./HomePage.scss"
import React from 'react'
import {Link} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {COLLECTION_LIST, collectionLocale, useAllPosts, useCollection, useTagIndex} from "/src/hooks/collections.js"
import PostCard from "./PostCard.jsx"

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
    /** Optional; set templateSettings.homeCoverUrl in settings.json to enable. */
    const homeCover = data.getSettings()?.templateSettings?.homeCoverUrl
    const isZh = selectedLanguageId === "zh"
    const latest = posts.slice(0, 6)

    return (
        <div className={`page home-page`}>
            {homeCover && (
                <figure className={`page-banner`}>
                    <img src={homeCover} alt="" loading="eager"/>
                </figure>
            )}

            <section className={`home-hero`}>
                <h1 className={`home-hero-title`}>萦怀</h1>
                <p className={`home-hero-lead`}>
                    {isZh
                        ? "一个更安静的互联网角落。日记、自省、生活笔记，以及那些只存在于聊天与任务里就容易丢失的小小观察。"
                        : "A quieter corner of the internet. Diaries, self-introspection, life notes, and the small observations that are easy to lose when everything is only stored in chats, tasks, or code."}
                </p>
                <div className={`home-hero-meta`}>
                    {profile?.location && <span>{profile.location}</span>}
                    {profile?.email && (
                        <>
                            <span>·</span>
                            <a href={`mailto:${profile.email}`}>{profile.email}</a>
                        </>
                    )}
                </div>
            </section>

            <section className={`home-section`}>
                <h2 className={`home-section-heading`}>{isZh ? "专栏" : "Writing"}</h2>
                <div className={`card-grid`}>
                    {COLLECTION_LIST.map(collection => {
                        const locale = collectionLocale(collection, selectedLanguageId)
                        return (
                            <Link key={collection.key} to={collection.path} className={`post-card home-collection-card`}>
                                <div className={`home-collection-head`}>
                                    <i className={`${collection.faIcon} home-collection-icon`}/>
                                    <h3 className={`post-card-title`}>{locale.title}</h3>
                                    <span className={`home-collection-count`}>
                                        {counts[collection.key]}{isZh ? " 篇" : ""}
                                    </span>
                                </div>
                                <p className={`post-card-desc`}>{locale.blurb}</p>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {latest.length > 0 && (
                <section className={`home-section`}>
                    <div className={`home-section-bar`}>
                        <h2 className={`home-section-heading`}>{isZh ? "最新" : "Latest"}</h2>
                    </div>
                    <div className={`card-grid`}>
                        {latest.map(post => (
                            <PostCard key={`${post.collection}-${post.slug}`}
                                      post={post}
                                      languageId={selectedLanguageId}
                                      showCollection={true}/>
                        ))}
                    </div>
                </section>
            )}

            {tags.length > 0 && (
                <section className={`home-section`}>
                    <div className={`home-section-bar`}>
                        <h2 className={`home-section-heading`}>{isZh ? "按标签浏览" : "Browse by tag"}</h2>
                        <Link to="/tags" className={`home-section-more`}>{isZh ? "全部" : "All"}</Link>
                    </div>
                    <div className={`home-tag-cloud`}>
                        {tags.slice(0, 18).map(entry => (
                            <Link key={entry.tag} to={`/tags/${entry.slug}`} className={`tag-pill`}>
                                {entry.tag}<span className={`tag-pill-count`}>{entry.count}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default HomePage
