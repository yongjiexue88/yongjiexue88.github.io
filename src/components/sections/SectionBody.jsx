import "./SectionBody.scss"
import React, {useEffect, useState} from 'react'
import {useParser} from "/src/hooks/parser.js"
import ArticleCards from "/src/components/articles/ArticleCards.jsx"
import ArticleAccordion from "/src/components/articles/ArticleAccordion.jsx"
import ArticleContactForm from "/src/components/articles/ArticleContactForm.jsx"
import ArticleFinance from "/src/components/articles/ArticleFinance.jsx"
import ArticleFacts from "/src/components/articles/ArticleFacts.jsx"
import ArticleInfoList from "/src/components/articles/ArticleInfoList.jsx"
import ArticleInlineList from "/src/components/articles/ArticleInlineList.jsx"
import ArticleLeetCode from "/src/components/articles/ArticleLeetCode.jsx"
import ArticleNotFound from "/src/components/articles/ArticleNotFound.jsx"
import ArticlePortfolio from "/src/components/articles/ArticlePortfolio.jsx"
import ArticleStack from "/src/components/articles/ArticleStack.jsx"
import ArticleSkills from "/src/components/articles/ArticleSkills.jsx"
import ArticleTestimonials from "/src/components/articles/ArticleTestimonials.jsx"
import ArticleText from "/src/components/articles/ArticleText.jsx"
import ArticleThread from "/src/components/articles/ArticleThread.jsx"
import ArticleTimeline from "/src/components/articles/ArticleTimeline.jsx"

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
    ArticleAccordion,
    ArticleCards,
    ArticleContactForm,
    ArticleFinance,
    ArticleFacts,
    ArticleInfoList,
    ArticleInlineList,
    ArticleLeetCode,
    ArticleNotFound,
    ArticlePortfolio,
    ArticleSkills,
    ArticleStack,
    ArticleTestimonials,
    ArticleText,
    ArticleThread,
    ArticleTimeline
}

export default SectionBody
