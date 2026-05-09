import "./NavSidebar.scss"
import React from 'react'
import {Card} from "react-bootstrap"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import NavProfileCard from "/src/components/nav/partials/NavProfileCard.jsx"
import NavLinkList from "/src/components/nav/partials/NavLinkList.jsx"
import NavToolList from "/src/components/nav/partials/NavToolList.jsx"

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()

    const shouldForceShrink = !viewport.isBreakpoint("lg")
    const expanded = !shouldForceShrink
    const shrinkClass = expanded ?
        `` :
        `nav-sidebar-shrink`

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${shrinkClass}`}>
            <Card className={`nav-sidebar-card-wrapper`}>
                <NavProfileCard profile={profile}
                                expanded={expanded}/>

                <NavLinkList links={links}
                             expanded={expanded}/>

                <NavToolList expanded={expanded}/>
            </Card>
        </nav>
    )
}

export default NavSidebar