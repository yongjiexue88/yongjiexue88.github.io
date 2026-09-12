import React from 'react';

const SIZES = { xs: 22, sm: 28, md: 36, lg: 48, xl: 64 };

/** Avatar — initials on a tinted disc, or an image. Ring optional. */
export function Avatar({ name = '', src, size = 'md', ring = false, tone, style = {}, ...rest }) {
  const d = SIZES[size] || SIZES.md;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const hues = ['var(--lg-azure)', 'var(--lg-orchid)', 'var(--lg-mint)'];
  const hue = tone || hues[(name.charCodeAt(0) || 0) % 3];

  return (
    <span
      title={name}
      style={{
        width: d, height: d, flex: '0 0 auto', borderRadius: 999, overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: src ? 'transparent' : `color-mix(in oklch, ${hue} 55%, var(--lg-neutral-900))`,
        color: '#fff',
        font: `var(--lg-weight-medium) ${Math.round(d * 0.38)}px/1 var(--lg-font-sans)`,
        boxShadow: ring ? '0 0 0 2px var(--lg-bg-base), 0 0 0 3.5px ' + hue : 'inset 0 0 0 0.5px rgba(255,255,255,0.25)',
        ...style,
      }}
      {...rest}
    >
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </span>
  );
}
