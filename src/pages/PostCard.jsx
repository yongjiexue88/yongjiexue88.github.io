import {taxonomyLabel, translationNotice} from "/src/hooks/taxonomy.js"
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
/**
 * `headingLevel` exists because the correct level depends on context: on an
 * index page the cards sit directly under the h1, so they are h2; on the home
 * page a real h2 section heading precedes them, so they are h3. Hard-coding h3
 * skipped a level on the index pages and broke the screen-reader outline.
 */
function PostCard({ post, languageId, showCollection = false, headingLevel = "h3" }) {
    const Heading = headingLevel
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
                {date && <span>{formatShortDate(date, languageId)}</span>}
                {showCollection && collection && (
                    <>
                        <span>·</span>
                        <span>{collectionLocale(collection, languageId).title}</span>
                    </>
                )}
            </div>

            <p className="post-language-note">{translationNotice(post, languageId)}</p>
            <Heading lang={frontmatter.language || "en"} className={`post-card-title`}>{frontmatter.title || post.title}</Heading>

            {frontmatter.description && (
                <p lang={frontmatter.language || "en"} className={`post-card-desc`}>{frontmatter.description}</p>
            )}

            {tags.length > 0 && (
                <div className={`post-card-tags`}>
                    {tags.map(tag => (
                        <span key={tag} className={`tag-pill`}>{taxonomyLabel(tag, languageId)}</span>
                    ))}
                </div>
            )}
        </Link>
    )
}

export default PostCard
