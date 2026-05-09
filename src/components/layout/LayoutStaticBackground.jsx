import "./LayoutStaticBackground.scss"
import React from 'react'

function LayoutStaticBackground() {
    return (
        <div className={`layout-static-background`}>
            <div className={`layout-static-background-paper`}/>
            <div className={`layout-static-background-grain`}/>

            <svg className={`layout-static-background-mountain`}
                 viewBox="0 0 1200 400"
                 preserveAspectRatio="xMidYMax slice"
                 aria-hidden="true">
                <path d="M0,360 L60,300 L130,330 L210,250 L280,290 L360,210 L430,260 L520,180 L610,240 L700,200 L790,250 L880,220 L970,260 L1060,230 L1140,270 L1200,250 L1200,400 L0,400 Z"
                      fill="currentColor"
                      opacity="0.18"/>
                <path d="M0,380 L80,340 L170,360 L260,310 L340,340 L430,290 L520,330 L620,300 L720,330 L820,310 L920,340 L1020,320 L1120,350 L1200,330 L1200,400 L0,400 Z"
                      fill="currentColor"
                      opacity="0.1"/>
            </svg>

            <svg className={`layout-static-background-sakura`}
                 viewBox="0 0 400 300"
                 preserveAspectRatio="xMinYMin meet"
                 aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" opacity="0.55">
                    <path d="M-10,40 Q60,55 110,80 Q160,105 210,150"/>
                    <path d="M70,68 Q95,55 125,40"/>
                    <path d="M140,95 Q170,90 200,75"/>
                    <path d="M180,135 Q210,135 245,120"/>
                </g>
                <g fill="currentColor" opacity="0.5">
                    <circle cx="125" cy="40" r="3.2"/>
                    <circle cx="118" cy="46" r="2.4"/>
                    <circle cx="132" cy="46" r="2.4"/>
                    <circle cx="125" cy="34" r="2.4"/>
                    <circle cx="200" cy="75" r="3"/>
                    <circle cx="206" cy="80" r="2.2"/>
                    <circle cx="194" cy="80" r="2.2"/>
                    <circle cx="245" cy="120" r="3"/>
                    <circle cx="240" cy="115" r="2.2"/>
                    <circle cx="250" cy="125" r="2.2"/>
                    <circle cx="80" cy="62" r="2.2"/>
                    <circle cx="160" cy="100" r="2"/>
                </g>
            </svg>
        </div>
    )
}

export default LayoutStaticBackground
