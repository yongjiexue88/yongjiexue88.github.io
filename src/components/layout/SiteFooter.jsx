import {taxonomyLabel} from "/src/hooks/taxonomy.js"
import "./SiteFooter.scss"
import React from 'react'
import {Link} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {COLLECTION_LIST, collectionLocale, useTagIndex} from "/src/hooks/collections.js"

/**
 * Footer acting as a secondary sitemap, the way vonng.com's does — sections on
 * one side, cross-cutting indexes on the other, contact last.
 */
function SiteFooter({ profile }) {
    const {selectedLanguageId} = useLanguage()
    const tags = useTagIndex()
    const isZh = selectedLanguageId === "zh"

    const topTags = tags.slice(0, 6)

    return (
        <footer className={`site-footer`}>
            <div className={`site-footer-inner`}>
                <div className={`site-footer-brand`}>
                    <span className={`site-footer-mark`}>YX</span>
                    <p className={`site-footer-tagline`}>
                        {isZh ? "全栈与 AI 工程师 · 美国奥斯汀" : "Full Stack & AI Engineer · Austin, Texas"}
                    </p>
                </div>

                <div className={`site-footer-col`}>
                    <h2 className={`site-footer-heading`}>{isZh ? "专栏" : "Writing"}</h2>
                    {COLLECTION_LIST.map(collection => (
                        <Link key={collection.key} to={collection.path} className={`site-footer-link`}>
                            {collectionLocale(collection, selectedLanguageId).title}
                        </Link>
                    ))}
                </div>

                <div className={`site-footer-col`}>
                    <h2 className={`site-footer-heading`}>{isZh ? "索引" : "Indexes"}</h2>
                    <Link to="/tags" className={`site-footer-link`}>{isZh ? "全部标签" : "All tags"}</Link>
                    {topTags.map(entry => (
                        <Link key={entry.tag} to={`/tags/${entry.slug}`} className={`site-footer-link`}>
                            {taxonomyLabel(entry.tag, selectedLanguageId)}
                        </Link>
                    ))}
                </div>

                <div className={`site-footer-col`}>
                    <h2 className={`site-footer-heading`}>{isZh ? "更多" : "More"}</h2>
                    <Link to="/about" className={`site-footer-link`}>{isZh ? "关于" : "About"}</Link>
                    <Link to="/contact" className={`site-footer-link`}>{isZh ? "联系" : "Contact"}</Link>
                    {profile?.email && (
                        <a href={`mailto:${profile.email}`} className={`site-footer-link`}>{profile.email}</a>
                    )}
                </div>
            </div>

            <div className={`site-footer-base`}>
                <span>© {new Date().getFullYear()} Yongjie Xue</span>
                <span>{isZh ? "职业主页与公开写作" : "Professional home and public writing"}</span>
            </div>
        </footer>
    )
}

export default SiteFooter
