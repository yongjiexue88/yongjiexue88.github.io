import React from 'react';

/** Spinner — indeterminate activity. A rotating conic arc, no glass. */
export function Spinner({ size = 20, thickness = 2, label = 'Loading', style = {}, ...rest }) {
  return (
    <span
      role="status"
      aria-label={label}
      style={{
        display: 'inline-block', width: size, height: size, flex: '0 0 auto',
        borderRadius: 999,
        background: 'conic-gradient(from 0deg, transparent 0deg, currentColor 300deg, transparent 360deg)',
        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - ' + thickness + 'px), #000 calc(100% - ' + thickness + 'px))',
        mask: 'radial-gradient(farthest-side, transparent calc(100% - ' + thickness + 'px), #000 calc(100% - ' + thickness + 'px))',
        animation: 'lg-spin 0.8s linear infinite',
        opacity: 0.9,
        ...style,
      }}
      {...rest}
    />
  );
}
