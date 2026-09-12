import React from 'react';

/** Divider — a hairline. Label optional, centred. */
export function Divider({ label, vertical = false, style = {}, ...rest }) {
  if (vertical) {
    return <span role="separator" style={{ width: 1, alignSelf: 'stretch', background: 'var(--lg-border-subtle)', ...style }} {...rest} />;
  }
  if (!label) {
    return <hr style={{ border: 0, height: 1, background: 'var(--lg-border-subtle)', margin: 0, width: '100%', ...style }} {...rest} />;
  }
  return (
    <div role="separator" style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', ...style }} {...rest}>
      <span style={{ flex: 1, height: 1, background: 'var(--lg-border-subtle)' }} />
      <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)', letterSpacing: 'var(--lg-tracking-wide)' }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: 'var(--lg-border-subtle)' }} />
    </div>
  );
}
