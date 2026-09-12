import React from 'react';

/** Breadcrumbs — trail of links with a thin slash separator. */
export function Breadcrumbs({ items = [], onNavigate, style = {}, ...rest }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', ...style }} {...rest}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <button
              type="button"
              onClick={() => !last && onNavigate && onNavigate(item.href || item.label)}
              style={{
                all: 'unset', cursor: last ? 'default' : 'pointer',
                font: 'var(--lg-weight-' + (last ? 'medium' : 'regular') + ') var(--lg-size-sm)/1 var(--lg-font-sans)',
                color: last ? 'var(--lg-text-primary)' : 'var(--lg-text-tertiary)',
              }}
              aria-current={last ? 'page' : undefined}
            >
              {item.label}
            </button>
            {!last ? <span aria-hidden="true" style={{ color: 'var(--lg-text-disabled)', font: 'var(--lg-type-caption)' }}>/</span> : null}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
