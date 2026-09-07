import "./pages.scss"
import React from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useParser} from "/src/hooks/parser.js"
import SectionBody from "/src/components/sections/SectionBody.jsx"
import NotFoundPage from "./NotFoundPage.jsx"

/**
 * Renders one JSON-defined section (about, contact) as a routed page.
 *
 * These sections keep their existing article components and their existing
 * copy in public/data/sections/*.json — only the shell around them changed,
 * so nothing here reaches into the content.
 */
function SectionPage({ sectionId }) {
    const data = useData()
    const parser = useParser()

    const section = data.getSections().find(item => item.id === sectionId)

    if(!section)
        return <NotFoundPage/>

    const title = parser.parseSectionTitle(section)

    return (
        <div className={`page page-read`}>
            <header className={`page-header`}>
                {title?.prefix && <span className={`page-eyebrow`}>{title.prefix}</span>}
                <h1 className={`page-title`}>{title?.title || ""}</h1>
            </header>

            <SectionBody section={section}/>
        </div>
    )
}

export default SectionPage
