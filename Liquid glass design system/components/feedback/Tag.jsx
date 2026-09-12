import React, { useState } from 'react';

/** Tag — a removable or selectable keyword. Chips for filters, topics, formats. */
export function Tag({ children, selected = false, onRemove, onClick, style = {}, ...rest }) {
  const [hover, setHover] = useState(false);
  const clickable = Boolean(onClick);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: onRemove ? '6px 8px 6px 12px' : '6px 12px',
        borderRadius: 999,
        cursor: clickable ? 'pointer' : 'default',
        background: selected ? 'var(--lg-fill-inverse)' : hover && clickable ? 'var(--lg-fill-ghost-hover)' : 'var(--lg-fill-ghost)',
        color: selected ? 'var(--lg-text-inverse)' : 'var(--lg-text-secondary)',
        border: '1px solid ' + (selected ? 'transparent' : 'var(--lg-border-subtle)'),
        font: 'var(--lg-weight-medium) var(--lg-size-xs)/1.2 var(--lg-font-sans)',
        transition: 'var(--lg-transition-fast)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{
            all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 18, height: 18, borderRadius: 999, background: 'var(--lg-fill-ghost-hover)',
            font: 'var(--lg-weight-regular) 12px/1 var(--lg-font-sans)', color: 'inherit', opacity: 0.8,
          }}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
