import React from 'react';

/**
 * ImagePlaceholder — a striped slot standing in for real photography. The
 * Liquidglass sources shipped no imagery, so every kit marks where a picture
 * goes rather than inventing one.
 */
export function ImagePlaceholder({
  label = 'image', ratio = '16 / 9', radius = 20, height, style = {}, ...rest
}) {
  return (
    <div
      style={{
        position: 'relative', width: '100%', aspectRatio: height ? undefined : ratio, height,
        borderRadius: radius, overflow: 'hidden',
        border: '1px solid var(--lg-border-default)',
        background:
          'repeating-linear-gradient(135deg, var(--lg-fill-ghost-hover) 0 2px, transparent 2px 10px), var(--lg-fill-ghost)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        font: 'var(--lg-weight-regular) var(--lg-size-2xs)/1 var(--lg-font-mono)',
        letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase',
        color: 'var(--lg-text-secondary)', padding: '6px 10px', borderRadius: 999,
        background: 'var(--lg-bg-base)', boxShadow: 'inset 0 0 0 1px var(--lg-border-subtle)',
      }}>{label}</span>
    </div>
  );
}
