import "./pages.scss"
import React from 'react'
import {Link} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function NotFoundPage() {
    const {selectedLanguageId} = useLanguage()
    const isZh = selectedLanguageId === "zh"

    return (
        <div className={`page page-read`}>
            <header className={`page-header`}>
                <span className={`page-eyebrow`}>404</span>
                <h1 className={`page-title`}>{isZh ? "找不到这个页面" : "Page not found"}</h1>
                <p className={`page-blurb`}>
                    {isZh
                        ? "这个链接可能已经过期，或者从来没有存在过。"
                        : "That link may have expired, or it may never have existed."}
                </p>
            </header>

            <Link to="/" className={`btn btn-primary`}>
                {isZh ? "回到首页" : "Back home"}
            </Link>
        </div>
    )
}

export default NotFoundPage
