import "./NavProfileCard.scss"
import React from 'react'
import {Card} from "react-bootstrap"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function NavProfileCard({ profile, expanded }) {
    const language = useLanguage()

    const expandedClass = expanded ?
        `` :
        `nav-profile-card-shrink`

    const isChinese = language.currentLanguage === "zh"
    const logoMain = "萦怀"
    const logoSub = "Thoughts that linger"
    const tagline = isChinese ? "心上停留的字句。" : "Words that stay on the mind."

    return (
        <Card className={`nav-profile-card nav-profile-card-journal ${expandedClass}`}>
            <div className={`nav-profile-card-logo`} aria-label={`${logoMain} — ${logoSub}`}>
                <span className={`nav-profile-card-logo-main`}>{logoMain}</span>
                <span className={`nav-profile-card-logo-sub`}>{logoSub}</span>
            </div>

            <div className={`nav-profile-card-info`}>
                <div className={`nav-profile-card-tagline`}>{tagline}</div>
            </div>
        </Card>
    )
}

export default NavProfileCard