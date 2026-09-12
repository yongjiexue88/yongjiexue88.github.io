import "./LayoutStaticBackground.scss"
import React from 'react'

/**
 * The ground every glass surface refracts.
 *
 * Liquidglass rule 3: glass over a flat fill is a grey box, so each screen
 * sits on a `Backdrop` — a three-stop radial colour mesh. This is that
 * component's `mesh` variant, fixed behind the document: azure in dark, pale
 * in light, both defined in the accompanying stylesheet.
 *
 * The mesh is static by design. The system spends its whole motion budget on
 * the glass itself, so there are no animated gradients and no drifting blobs
 * here — and the paper grain, mountain range and sakura branch that used to
 * occupy this slot are gone with the palette they belonged to.
 */
function LayoutStaticBackground() {
    return (
        <div className={`layout-static-background`} aria-hidden="true">
            <div className={`layout-static-background-mesh`}/>
        </div>
    )
}

export default LayoutStaticBackground
