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
                {/*
                  * Section titles carry inline markup: language.parseJsonText
                  * turns {{x}} into <span class="text-primary">. Rendering it
                  * as a plain string printed the tags on screen — and only at
                  * lg and up, where parseSectionTitle switches to title_long.
                  */}
                <h1 className={`page-title`}
                    dangerouslySetInnerHTML={{__html: title?.title || ""}}/>
            </header>

            <SectionBody section={section}/>
        </div>
    )
}

export default SectionPage
