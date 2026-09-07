import "./Layout.scss"
import React from 'react'
import {useUtils} from "/src/hooks/utils.js"
import LayoutAnimatedBackground from "/src/components/layout/LayoutAnimatedBackground.jsx"
import LayoutStaticBackground from "/src/components/layout/LayoutStaticBackground.jsx"
import TopNav from "/src/components/layout/TopNav.jsx"
import SiteFooter from "/src/components/layout/SiteFooter.jsx"

/**
 * Page shell: sticky masthead, routed content, footer sitemap.
 *
 * This replaced the slideshow shell, which stacked every section in one grid
 * cell and cross-faded between them. With real routes there is nothing to
 * cross-fade, so the document simply scrolls.
 */
function Layout({ id, children, backgroundStyle, profile }) {
    const utils = useUtils()

    const isAnimatedBackground = backgroundStyle === "animated"
    const isStaticBackground = backgroundStyle === "static"
    const isPlainBackground = backgroundStyle === "plain"

    if(!isAnimatedBackground && !isStaticBackground && !isPlainBackground) {
        utils.log.warn(
            "Layout",
            "Invalid backgroundStyle provided on settings.json. The supported values are 'animated', 'static' and 'plain'. Defaulting to 'plain'."
        )
    }

    return (
        <div id={id}
             className={`layout`}>

            {isAnimatedBackground && <LayoutAnimatedBackground/>}
            {isStaticBackground && <LayoutStaticBackground/>}

            <TopNav profile={profile}/>

            <main className={`layout-main`}>
                {children}
            </main>

            <SiteFooter profile={profile}/>
        </div>
    )
}

export default Layout
