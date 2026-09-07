import React from 'react'
import {Link} from "react-router-dom"
import {formatShortDate} from "/src/hooks/posts.js"
import {COLLECTIONS, collectionLocale} from "/src/hooks/collections.js"

/**
 * One post, as a card.
 *
 * Type-led by design: no post in this repo carries a cover image, so the card
 * has to read as finished without one. `frontmatter.cover` is honoured if a
 * post ever gains one.
 */
function PostCard({ post, languageId, showCollection = false }) {
    const {frontmatter} = post
    const date = frontmatter.created || frontmatter.updated
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags.slice(0, 3) : []
    const collection = COLLECTIONS[post.collection]

    return (
        <Link to={post.href} className={`post-card`}>
            {frontmatter.cover && (
                <img className={`post-card-cover`}
                     src={frontmatter.cover}
                     alt=""
                     loading="lazy"/>
            )}

            <div className={`post-card-meta`}>
                {date && <span>{formatShortDate(date)}</span>}
                {showCollection && collection && (
                    <>
                        <span>·</span>
                        <span>{collectionLocale(collection, languageId).title}</span>
                    </>
                )}
            </div>

            <h3 className={`post-card-title`}>{frontmatter.title || post.title}</h3>

            {frontmatter.description && (
                <p className={`post-card-desc`}>{frontmatter.description}</p>
            )}

            {tags.length > 0 && (
                <div className={`post-card-tags`}>
                    {tags.map(tag => (
                        <span key={tag} className={`tag-pill`}>{tag}</span>
                    ))}
                </div>
            )}
        </Link>
    )
}

export default PostCard
