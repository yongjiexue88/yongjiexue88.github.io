import "./TopNav.scss"
import React, {useEffect, useState} from 'react'
import {NavLink, Link, useLocation} from "react-router-dom"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
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
        {to: "/journal", label: selectedLanguageId === "zh" ? "日志" : "Journal"},
        {to: "/notes", label: selectedLanguageId === "zh" ? "笔记" : "Notes"},
        {to: "/about", label: selectedLanguageId === "zh" ? "关于" : "About"},
        {to: "/contact", label: selectedLanguageId === "zh" ? "联系" : "Contact"}
    ]

    const menuLabel = selectedLanguageId === "zh"
        ? (menuOpen ? "关闭导航菜单" : "打开导航菜单")
        : (menuOpen ? "Close navigation menu" : "Open navigation menu")

    return (
        <header className={`top-nav`}>
            <div className={`top-nav-inner`}>
                <Link to="/" className={`top-nav-brand`}>
                    <span className={`top-nav-brand-mark`}>Y</span>
                    <span className={`top-nav-brand-sub`}>{profile?.role || "Full Stack & AI Engineer"}</span>
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
                            aria-label={menuLabel}
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
