import React, {useEffect} from 'react'
import {Routes, Route, useLocation, useNavigate} from "react-router-dom"
import Layout from "/src/components/layout/Layout.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import LayoutImageCache from "/src/components/layout/LayoutImageCache.jsx"
import HomePage from "/src/pages/HomePage.jsx"
import CollectionPage from "/src/pages/CollectionPage.jsx"
import PostPage from "/src/pages/PostPage.jsx"
import TagsPage from "/src/pages/TagsPage.jsx"
import TagPage from "/src/pages/TagPage.jsx"
import SectionPage from "/src/pages/SectionPage.jsx"
import NotFoundPage from "/src/pages/NotFoundPage.jsx"

/**
 * Legacy hash URLs from the single-page era. Anything already shared or
 * indexed as #blog / #booknotes / #about / #contact lands on the equivalent
 * route once, then the hash is gone.
 */
const LEGACY_HASH_ROUTES = {
    "#about": "/about",
    "#blog": "/journal",
    "#booknotes": "/notes",
    "#contact": "/contact"
}

function LegacyHashRedirect() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const target = LEGACY_HASH_ROUTES[location.hash]
        if(target)
            navigate(target, {replace: true})
    }, [location.hash, navigate])

    return null
}

function Portfolio() {
    const data = useData()
    const language = useLanguage()

    if(!data || !language) {
        window.location.reload()
        return
    }

    const profile = data.getProfile()
    const settings = data.getSettings()
    const sections = data.getSections()

    const backgroundStyle = settings.templateSettings.backgroundStyle

    return (
        <Layout id={"react-portfolio"}
                backgroundStyle={backgroundStyle}
                profile={profile}>

            <LayoutImageCache profile={profile}
                              settings={settings}
                              sections={sections}/>

            <LegacyHashRedirect/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route path="/journal" element={<CollectionPage collectionKey="journal"/>}/>
                <Route path="/journal/:slug" element={<PostPage collectionKey="journal"/>}/>

                <Route path="/notes" element={<CollectionPage collectionKey="notes"/>}/>
                <Route path="/notes/:slug" element={<PostPage collectionKey="notes"/>}/>

                <Route path="/tags" element={<TagsPage/>}/>
                <Route path="/tags/:tag" element={<TagPage/>}/>

                <Route path="/about" element={<SectionPage sectionId="about"/>}/>
                <Route path="/contact" element={<SectionPage sectionId="contact"/>}/>


                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Layout>
    )
}

export default Portfolio
