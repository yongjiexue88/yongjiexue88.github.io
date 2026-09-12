import React, { useEffect, useRef, useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** SegmentedControl — a glass trough with a sliding lens over the active option. */
export function SegmentedControl({
  options = [], value, onChange, variant = 'glass', size = 'md', overLight = false, fullWidth = false, style = {}, ...rest
}) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const activeIndex = Math.max(0, items.findIndex((o) => o.value === value));
  const wrapRef = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const btn = wrap.children[activeIndex];
      if (btn) setRect({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [activeIndex, items.length]);

  const pad = size === 'sm' ? '7px 14px' : '9px 18px';
  const font = size === 'sm' ? 'var(--lg-size-sm)' : 'var(--lg-size-base)';

  const inner = (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex', width: '100%' }}>
      {rect ? (
        <span style={{
          position: 'absolute', top: 0, bottom: 0, left: rect.left, width: rect.width, borderRadius: 999,
          background: 'rgba(255,255,255,0.16)',
          boxShadow: '0 0 0 0.5px rgba(255,255,255,0.4) inset, 0 1px 4px rgba(0,0,0,0.3)',
          transition: 'left 0.25s cubic-bezier(0.32,0.72,0,1), width 0.25s cubic-bezier(0.32,0.72,0,1)',
        }} />
      ) : null}
      {items.map((o, i) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange && onChange(o.value)}
          style={{
            all: 'unset', position: 'relative', zIndex: 1, flex: fullWidth ? 1 : '0 0 auto',
            textAlign: 'center', padding: pad, borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
            font: 'var(--lg-weight-medium) ' + font + '/1 var(--lg-font-sans)',
            color: i === activeIndex ? 'var(--lg-text-primary)' : 'var(--lg-text-tertiary)',
            transition: 'color 0.2s ease-in-out',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  if (variant === 'solid') {
    return (
      <div style={{ display: 'inline-flex', padding: 3, borderRadius: 999, background: 'var(--lg-fill-ghost)', border: '1px solid var(--lg-border-subtle)', width: fullWidth ? '100%' : undefined, ...style }} {...rest}>
        {inner}
      </div>
    );
  }

  return (
    <GlassSurface cornerRadius={999} padding="3px" blurAmount={0.1} saturation={130} displacementScale={40}
      overLight={overLight} display={fullWidth ? 'flex' : 'inline-flex'}
      style={{ width: fullWidth ? '100%' : undefined, ...style }} {...rest}>
      {inner}
    </GlassSurface>
  );
}
