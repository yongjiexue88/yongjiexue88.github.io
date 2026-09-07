import "./TopNav.scss"
import React, {useEffect, useState} from 'react'
import {NavLink, Link, useLocation} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {COLLECTION_LIST, collectionLocale} from "/src/hooks/collections.js"
import NavToolList from "/src/components/nav/partials/NavToolList.jsx"

/**
 * Slim sticky masthead. Replaces the old 280px sidebar and the mobile bottom
 * tab bar with a single nav that behaves the same at every width — the sheet
 * below md is the only branch.
 */
function TopNav({ profile }) {
    const {selectedLanguageId} = useLanguage()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    /** Close the sheet whenever navigation happens. */
    useEffect(() => { setMenuOpen(false) }, [location.pathname])

    const links = [
        ...COLLECTION_LIST.map(collection => ({
            to: collection.path,
            label: collectionLocale(collection, selectedLanguageId).title
        })),
        {to: "/tags", label: selectedLanguageId === "zh" ? "标签" : "Tags"},
        {to: "/about", label: selectedLanguageId === "zh" ? "关于" : "About"},
        {to: "/contact", label: selectedLanguageId === "zh" ? "联系" : "Contact"}
    ]

    return (
        <header className={`top-nav`}>
            <div className={`top-nav-inner`}>
                <Link to="/" className={`top-nav-brand`}>
                    <span className={`top-nav-brand-mark`}>萦怀</span>
                    <span className={`top-nav-brand-sub`}>thoughts that linger</span>
                </Link>

                <nav className={`top-nav-links`}>
                    {links.map(link => (
                        <NavLink key={link.to}
                                 to={link.to}
                                 className={({isActive}) => `top-nav-link ${isActive ? "top-nav-link-active" : ""}`}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className={`top-nav-tools`}>
                    <NavToolList expanded={true}/>

                    <button className={`top-nav-toggle`}
                            aria-label="Menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(open => !open)}>
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}/>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav className={`top-nav-sheet`}>
                    {links.map(link => (
                        <NavLink key={link.to}
                                 to={link.to}
                                 className={({isActive}) => `top-nav-sheet-link ${isActive ? "top-nav-sheet-link-active" : ""}`}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    )
}

export default TopNav
