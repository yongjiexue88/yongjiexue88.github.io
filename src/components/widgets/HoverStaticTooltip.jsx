import "./HoverStaticTooltip.scss"
import React, {useEffect, useState} from 'react'
import Tooltip from "/src/components/generic/Tooltip.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"
import {useInput} from "/src/providers/InputProvider.jsx"
import {useLocation} from "react-router-dom"

function HoverStaticTooltip({ id = "", targetId = "", label = "", className = "", onDesktopClick = null, forceResetFlag = null, forceVisible = false, toggleBehaviorOnTouchScreens = false }) {
    const viewport = useViewport()
    const input = useInput()
    const utils = useUtils()
    const routerLocation = useLocation()
    const isTouchDevice = utils.device.isTouchDevice()

    const [visible, setVisible] = useState(false)

    /** @constructs **/
    useEffect(() => {
        if(!targetId)
            return

        const targetEl = document.getElementById(targetId)
        if(!targetEl)
            return

        targetEl.addEventListener("mouseenter", _onTargetMouseEnter)
        targetEl.addEventListener("mouseleave", _onTargetMouseLeave)
        targetEl.addEventListener("click", _onTargetClick)

        return () => {
            targetEl.removeEventListener("mouseenter", _onTargetMouseEnter)
            targetEl.removeEventListener("mouseleave", _onTargetMouseLeave)
            targetEl.removeEventListener("click", _onTargetClick)
        }
    }, [null, targetId])

    /** @listens viewport.innerWidth **/
    useEffect(() => {
        setVisible(false)
    }, [viewport.innerWidth, forceResetFlag])

    /** @listens the active route **/
    useEffect(() => {
        if(!isTouchDevice || !toggleBehaviorOnTouchScreens)
            return
        setVisible(false)
    }, [routerLocation.pathname])

    /** @listens input.mouseUpStatus **/
    useEffect(() => {
        const lastMouseTargetId = input.lastMouseTarget?.getAttribute("id")
        if(lastMouseTargetId === targetId)
            return
        setVisible(false)
    }, [input.mouseUpStatus])

    const _onTargetMouseEnter = () => {
        if(isTouchDevice)
            return
        setVisible(true)
    }

    const _onTargetMouseLeave = () => {
        if(isTouchDevice)
            return
        setVisible(false)
    }

    const _onTargetClick = () => {
        if(!isTouchDevice && onDesktopClick)
            onDesktopClick()

        if(isTouchDevice && toggleBehaviorOnTouchScreens) {
            setVisible(visible => !visible)
        }
        else {
            setVisible(true)
        }
    }

    return (
        <>
            {(visible || forceVisible) && (
                <Tooltip label={label}
                         id={id}
                         className={`hover-static-tooltip ${className}`}/>
            )}
        </>
    )
}

export default HoverStaticTooltip