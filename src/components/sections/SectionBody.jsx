import "./SectionBody.scss"
import React, {useEffect, useState} from 'react'
import {useParser} from "/src/hooks/parser.js"
import ArticleContactForm from "/src/components/articles/ArticleContactForm.jsx"
import ArticleInfoList from "/src/components/articles/ArticleInfoList.jsx"
import ArticleInlineList from "/src/components/articles/ArticleInlineList.jsx"
import ArticleNotFound from "/src/components/articles/ArticleNotFound.jsx"
import ArticleText from "/src/components/articles/ArticleText.jsx"

/**
 * Renders the article components a JSON section declares.
 *
 * ArticleBlog/ArticleBookNotes were removed from this registry: journal and
 * booknotes are routed pages now, and keeping them here kept their eager
 * content globs in the main bundle.
 */
function SectionBody({ section }) {
    const parser = useParser()
    const articleDataWrappers = parser.parseSectionArticles(section)

    return (
        <div className={`section-body`}>
            {articleDataWrappers && articleDataWrappers.map((dataWrapper, key) => {
                const Component = SectionBody.ARTICLES[dataWrapper.component] || ArticleNotFound
                return <Component dataWrapper={dataWrapper}
                                  id={key}
                                  key={key}/>
            })}
        </div>
    )
}

SectionBody.ARTICLES = {
    ArticleContactForm,
    ArticleInfoList,
    ArticleInlineList,
    ArticleNotFound,
    ArticleText
}

export default SectionBody
