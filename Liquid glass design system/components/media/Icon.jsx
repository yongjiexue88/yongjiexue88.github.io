import React, { useEffect, useRef } from 'react';

/**
 * Icon — a Lucide glyph.
 *
 * The system draws no icons of its own. Lucide is loaded from CDN by the
 * consuming page; this component only mounts a glyph into a correctly sized,
 * currentColor-inheriting box. If Lucide is absent nothing renders — no
 * emoji, no placeholder box.
 */
export function Icon({ name, size = 20, strokeWidth = 1.75, label, style = {}, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || !name) return;
    const lucide = typeof window !== 'undefined' ? window.lucide : null;
    if (!lucide) return;
    host.innerHTML = '<i data-lucide="' + name + '"></i>';
    try {
      lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: { width: size, height: size, 'stroke-width': strokeWidth },
      });
    } catch (e) { /* older UMD signature */ }
  }, [name, size, strokeWidth]);

  return (
    <span
      ref={ref}
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      role={label ? 'img' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: '0 0 auto',
        color: 'currentColor',
        ...style,
      }}
      {...rest}
    />
  );
}
