import "./SectionContent.scss"
import React from 'react'
import SectionHeader from "/src/components/sections/SectionHeader.jsx"
import SectionBody from "/src/components/sections/SectionBody.jsx"

function SectionContent({ section }) {
    return (
        <div className={`section-content`}>
            <div className={`section-content-elements-wrapper`}>
                <SectionHeader section={section}/>
                <SectionBody section={section}/>
            </div>
        </div>
    )
}

export default SectionContent