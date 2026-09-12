import React, { useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Tooltip — a small glass label on hover or focus. Wraps its trigger. */
export function Tooltip({ children, content, side = 'top', style = {}, ...rest }) {
  const [open, setOpen] = useState(false);

  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%, -10px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 10px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-10px, -50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(10px, -50%)' },
  }[side];

  return (
    <span
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      <span
        role="tooltip"
        style={{
          position: 'absolute', zIndex: 40, pointerEvents: 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity var(--lg-duration-fast) var(--lg-ease-standard)',
          ...pos,
        }}
      >
        <GlassSurface
          cornerRadius={12}
          padding="6px 10px"
          blurAmount={0.18}
          displacementScale={34}
          aberrationIntensity={1}
          style={{ whiteSpace: 'nowrap' }}
        >
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-primary)' }}>{content}</span>
        </GlassSurface>
      </span>
    </span>
  );
}
