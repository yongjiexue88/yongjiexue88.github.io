import "./SectionBody.scss"
import React, {useEffect, useState} from 'react'
import {useParser} from "/src/hooks/parser.js"
import ArticleBlog from "/src/components/articles/ArticleBlog.jsx"
import ArticleBookNotes from "/src/components/articles/ArticleBookNotes.jsx"
import ArticleContactForm from "/src/components/articles/ArticleContactForm.jsx"
import ArticleInfoList from "/src/components/articles/ArticleInfoList.jsx"
import ArticleInlineList from "/src/components/articles/ArticleInlineList.jsx"
import ArticleNotFound from "/src/components/articles/ArticleNotFound.jsx"
import ArticleText from "/src/components/articles/ArticleText.jsx"

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
    ArticleBlog,
    ArticleBookNotes,
    ArticleContactForm,
    ArticleInfoList,
    ArticleInlineList,
    ArticleNotFound,
    ArticleText
}

export default SectionBody
