/**
 * @description Legacy hash URLs → routes.
 *
 * The site was a single page with #section hashes before it had real
 * permalinks. Those hrefs are still baked into public/data/sections/*.json
 * (and into anything anyone bookmarked), so both the router and the generic
 * Link component resolve them through this one table.
 */

export const LEGACY_HASH_ROUTES = {
    "#about": "/about",
    "#blog": "/journal",
    "#booknotes": "/notes",
    "#contact": "/contact"
}

/** Category hashes (#cat:writing) map to the first route in that category. */
export const LEGACY_CATEGORY_ROUTES = {
    "home": "/about",
    "writing": "/journal",
    "more": "/contact"
}

/**
 * Resolve any in-app href — legacy hash or plain path — to a route.
 * Returns null when the href is not internal.
 */
export function resolveInternalHref(href) {
    if(!href)
        return null

    if(href.startsWith("#cat:"))
        return LEGACY_CATEGORY_ROUTES[href.replace("#cat:", "")] || "/"

    if(href.startsWith("#"))
        return LEGACY_HASH_ROUTES[href] || null

    if(href.startsWith("/"))
        return href

    return null
}
