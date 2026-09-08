import "./pages.scss"
import React, {useMemo, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useCollection, collectionLocale} from "/src/hooks/collections.js"
import {buildCategoryFilters} from "/src/hooks/posts.js"
import PostCard from "./PostCard.jsx"

/**
 * Index for one collection — the routed replacement for the old IndexMode.
 * The category chips come from frontmatter.category, exactly as before; the
 * only change is that rows became cards and clicks became links.
 */
function CollectionPage({ collectionKey }) {
    const {selectedLanguageId} = useLanguage()
    const {collection, posts} = useCollection(collectionKey)
    const [selectedCategory, setSelectedCategory] = useState("all")

    const categories = useMemo(() => buildCategoryFilters(posts, selectedLanguageId), [posts, selectedLanguageId])
    const showFilters = categories.length > 1

    const visiblePosts = selectedCategory === "all" ?
        posts :
        posts.filter(post => post.frontmatter.category === selectedCategory)

    const locale = collectionLocale(collection, selectedLanguageId)
    const isZh = selectedLanguageId === "zh"

    return (
        <div className={`page`}>
            {collection?.cover && (
                <figure className={`page-banner`}>
                    <img src={collection.cover} alt="" loading="eager"/>
                </figure>
            )}

            <header className={`page-header`}>
                <h1 className={`page-title`}>{locale.title}</h1>
                <p className={`page-blurb`}>{locale.blurb}</p>
            </header>

            {showFilters && (
                <div className={`page-filters`}>
                    {categories.map((category, index) => (
                        <React.Fragment key={category.id}>
                            {index > 0 && <span className={`page-filter-sep`}>·</span>}
                            <button className={`page-filter ${selectedCategory === category.id ? "page-filter-active" : ""}`}
                                    onClick={() => setSelectedCategory(category.id)}>
                                {category.label}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            )}

            {visiblePosts.length === 0 ? (
                <div className={`page-empty`}>
                    {isZh ? "这个筛选下还没有内容。" : "Nothing under this filter yet."}
                </div>
            ) : (
                <div className={`card-grid`}>
                    {visiblePosts.map(post => (
                        <PostCard key={post.slug}
                                  post={post}
                                  languageId={selectedLanguageId}
                                  headingLevel="h2"/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CollectionPage
