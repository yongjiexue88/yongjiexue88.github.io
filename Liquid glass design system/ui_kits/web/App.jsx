import React, { useEffect, useState } from 'react';
import { Backdrop } from '../../components/media/Backdrop.jsx';
import { Icon } from '../../components/media/Icon.jsx';
import { GlassSurface } from '../../components/glass/GlassSurface.jsx';
import { LiquidGlass } from '../../components/glass/LiquidGlass.jsx';
import { Button } from '../../components/forms/Button.jsx';
import { IconButton } from '../../components/forms/IconButton.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Checkbox } from '../../components/forms/Checkbox.jsx';
import { Card } from '../../components/surfaces/Card.jsx';
import { Panel } from '../../components/surfaces/Panel.jsx';
import { Divider } from '../../components/surfaces/Divider.jsx';
import { Avatar } from '../../components/surfaces/Avatar.jsx';
import { ImagePlaceholder } from '../../components/surfaces/ImagePlaceholder.jsx';
import { Badge } from '../../components/feedback/Badge.jsx';
import { Tag } from '../../components/feedback/Tag.jsx';
import { Breadcrumbs } from '../../components/navigation/Breadcrumbs.jsx';
import { SegmentedControl } from '../../components/navigation/SegmentedControl.jsx';

const NAV = [
  { value: 'home', label: 'Writing' },
  { value: 'essay', label: 'Essay' },
  { value: 'library', label: 'Books' },
  { value: 'auth', label: 'Sign in' },
];

const ESSAYS = [
  {
    eyebrow: 'ESSAY · 12 MIN · MAR 2025',
    title: 'The cost of a transparent surface',
    description:
      'Refraction is the most expensive thing you can put on a screen. A note on when it earns the spend, and when it is just fog.',
    tags: ['Interface', 'Rendering'],
  },
  {
    eyebrow: 'ESSAY · 8 MIN · FEB 2025',
    title: 'Edges do the work',
    description:
      'Thickness in a flat medium comes from a 1.5px ring, not from a shadow. What that constraint teaches about every other border.',
    tags: ['Craft'],
  },
  {
    eyebrow: 'NOTE · 4 MIN · JAN 2025',
    title: 'Against animated backgrounds',
    description: 'If the ground moves, the glass has nothing to hold still against. Spend the motion budget on the control.',
    tags: ['Motion'],
  },
];

const BOOKS = [
  { title: 'Surface Tension', sub: 'Twelve essays on interface craft', meta: '218 pages · epub, pdf', price: '$18', badge: 'New' },
  { title: 'Quiet Systems', sub: 'Building design systems that survive', meta: '164 pages · epub, pdf', price: '$14' },
  { title: 'Field Notes 2024', sub: 'A year of shipped details', meta: '96 pages · epub', price: 'Free' },
];

function TopBar({ screen, setScreen, theme, setTheme, overLight }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', justifyContent: 'center', padding: '20px 32px 0' }}>
      <GlassSurface
        cornerRadius={999}
        padding="10px 12px 10px 24px"
        overLight={overLight}
        display="flex"
        style={{ width: '100%', maxWidth: 980 }}
        contentStyle={{ flexDirection: 'row', alignItems: 'center', gap: 0, width: '100%' }}
      >
        <span
          style={{
            font: 'var(--lg-type-heading)',
            letterSpacing: 'var(--lg-tracking-tight)',
            textShadow: overLight ? 'none' : 'var(--lg-text-shadow-glass)',
          }}
        >
          Liquidglass
        </span>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto', marginRight: 12 }}>
          {NAV.map((n) => (
            <Button
              key={n.value}
              variant={screen === n.value ? 'glass' : 'ghost'}
              size="sm"
              overLight={overLight}
              onClick={() => setScreen(n.value)}
            >
              {n.label}
            </Button>
          ))}
        </nav>
        <IconButton
          label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          variant="ghost"
          size="md"
          overLight={overLight}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
        </IconButton>
      </GlassSurface>
    </div>
  );
}

function Home({ overLight, setScreen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64, padding: '88px 32px 96px', maxWidth: 1040, margin: '0 auto' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
        <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)' }}>
          Writing and books
        </span>
        <h1
          style={{
            font: 'var(--lg-type-display)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: 'var(--lg-tracking-tighter)',
            margin: 0,
            textWrap: 'pretty',
            textShadow: overLight ? 'none' : 'var(--lg-text-shadow-glass)',
          }}
        >
          Notes on the parts of an interface nobody photographs.
        </h1>
        <p style={{ font: 'var(--lg-type-body)', fontSize: 17, color: 'var(--lg-text-secondary)', maxWidth: 'var(--lg-measure)', margin: 0 }}>
          Essays on rendering, materials and restraint. New writing every few weeks. Three books, two of them paid.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Button variant="accent" size="lg" onClick={() => setScreen('essay')} iconRight={<Icon name="arrow-right" size={18} />}>
            Read the latest
          </Button>
          <Button variant="glass" size="lg" overLight={overLight} onClick={() => setScreen('library')}>
            Browse books
          </Button>
        </div>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <h2 style={{ font: 'var(--lg-type-heading)', margin: 0 }}>Recent</h2>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>3 of 41</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {ESSAYS.map((e) => (
            <Card
              key={e.title}
              variant="glass"
              overLight={overLight}
              cornerRadius={24}
              eyebrow={e.eyebrow}
              title={e.title}
              description={e.description}
              onClick={() => setScreen('essay')}
              footer={
                <div style={{ display: 'flex', gap: 8 }}>
                  {e.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </section>

      <Panel variant="glass" overLight={overLight} cornerRadius={32} blurAmount={0.35} padding="32px">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ font: 'var(--lg-type-heading)', margin: 0 }}>One letter a month</h2>
            <p style={{ font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)', margin: 0, maxWidth: 420 }}>
              What I shipped, what broke, and the one detail worth stealing. No archive, no tracking.
            </p>
          </div>
          <form style={{ flex: '1 1 300px', display: 'flex', gap: 12, alignItems: 'flex-end' }} onSubmit={(ev) => ev.preventDefault()}>
            <Input variant="solid" type="email" label="Email" placeholder="you@domain.com" fullWidth style={{ flex: 1 }} />
            <Button variant="accent" size="md">Subscribe</Button>
          </form>
        </div>
      </Panel>
    </div>
  );
}

function Essay({ overLight }) {
  return (
    <article style={{ padding: '88px 32px 96px', maxWidth: 1040, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <Breadcrumbs items={[{ label: 'Writing' }, { label: 'Interface' }, { label: 'The cost of a transparent surface' }]} />
      <header style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 'var(--lg-measure)' }}>
        <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)' }}>
          Essay · 12 min · Mar 4, 2025
        </span>
        <h1 style={{ font: 'var(--lg-type-title)', fontSize: 48, letterSpacing: 'var(--lg-tracking-tighter)', margin: 0, textWrap: 'pretty' }}>
          The cost of a transparent surface
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="Author Name" size="sm" ring />
          <span style={{ font: 'var(--lg-type-label)' }}>Author Name</span>
          <Badge tone="accent" dot>Updated</Badge>
        </div>
      </header>

      <ImagePlaceholder label="essay hero — cool-toned, high contrast, 16:9" ratio="16 / 9" radius={24} />

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 'var(--lg-measure)' }}>
          <p style={{ font: 'var(--lg-type-body)', fontSize: 17, margin: 0 }}>
            A transparent surface costs more than any other element on a screen. It samples what is behind it, distorts that sample,
            blurs it, and then draws a specular edge on top. Every one of those steps is a compositing pass, and every pass is paid for
            in frames.
          </p>
          <p style={{ font: 'var(--lg-type-body)', margin: 0, color: 'var(--lg-text-secondary)' }}>
            Which means the question is never whether the material looks good. It looks good. The question is what the distortion is
            telling the reader. A floating control panel that bends the photograph underneath it is saying: I am above this, I am
            temporary, the thing beneath me is still there. That is useful information.
          </p>
          <blockquote
            style={{
              margin: 0,
              padding: '4px 0 4px 24px',
              borderLeft: '2px solid var(--lg-fill-accent)',
              font: 'var(--lg-type-heading)',
              fontWeight: 400,
              letterSpacing: 'var(--lg-tracking-tight)',
            }}
          >
            Glass on top of a paragraph says nothing except that the paragraph is harder to read now.
          </blockquote>
          <p style={{ font: 'var(--lg-type-body)', margin: 0, color: 'var(--lg-text-secondary)' }}>
            So the rule I have settled on is boring: glass for things that float, solid for things that hold still and get read. A dock
            floats. A toolbar floats. A dialog floats. An essay does not. When a panel is glass, the fields inside it go solid, because
            glass stacked on glass reads as mud rather than as depth.
          </p>
          <p style={{ font: 'var(--lg-type-body)', margin: 0, color: 'var(--lg-text-secondary)' }}>
            The corollary is that the ground matters more than the pane. Refraction needs strong light and dark structure behind it to
            have anything to bend. Put the same pane over a flat fill and you get a grey box with a nice border.
          </p>
        </div>

        <aside style={{ flex: '0 0 260px', position: 'sticky', top: 104, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel variant="glass" overLight={overLight} cornerRadius={24} padding="20px 22px">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)' }}>
                In this essay
              </span>
              {['What it costs', 'What it says', 'Float or hold still', 'The ground matters'].map((s, i) => (
                <a key={s} href="#" style={{ font: 'var(--lg-type-label)', color: i === 0 ? 'var(--lg-text-accent)' : 'var(--lg-text-secondary)' }}>
                  {s}
                </a>
              ))}
              <Divider />
              <Button variant="glass" size="sm" overLight={overLight} iconLeft={<Icon name="bookmark" size={16} />} fullWidth>
                Save
              </Button>
            </div>
          </Panel>
        </aside>
      </div>
    </article>
  );
}

function Library({ overLight }) {
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ padding: '88px 32px 96px', maxWidth: 1040, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ font: 'var(--lg-type-title)', margin: 0, letterSpacing: 'var(--lg-tracking-tight)' }}>Books</h1>
          <p style={{ font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)', margin: 0, maxWidth: 'var(--lg-measure)' }}>
            Long-form versions of the essays, edited and typeset. Epub and pdf, no drm.
          </p>
        </div>
        <SegmentedControl
          variant="glass"
          overLight={overLight}
          value={filter}
          onChange={setFilter}
          options={[{ value: 'all', label: 'All' }, { value: 'paid', label: 'Paid' }, { value: 'free', label: 'Free' }]}
        />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {BOOKS.map((b) => (
          <Card
            key={b.title}
            variant="glass"
            overLight={overLight}
            cornerRadius={24}
            padding="20px"
            media={<ImagePlaceholder label="cover — 2:3" ratio="2 / 3" radius={12} />}
            title={
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {b.title}
                {b.badge ? <Badge tone="accent">{b.badge}</Badge> : null}
              </span>
            }
            description={b.sub}
            footer={
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>{b.meta}</span>
                <span style={{ marginLeft: 'auto', font: 'var(--lg-type-label)' }}>{b.price}</span>
                <Button variant="accent" size="sm">{b.price === 'Free' ? 'Download' : 'Buy'}</Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}

function Auth({ overLight }) {
  const [remember, setRemember] = useState(true);
  return (
    <div style={{ minHeight: 'calc(100vh - 96px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 32px' }}>
      <Panel variant="glass" overLight={overLight} cornerRadius={32} blurAmount={0.35} padding="36px" style={{ width: 'min(420px, 100%)' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onSubmit={(ev) => ev.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <h1 style={{ font: 'var(--lg-type-heading)', margin: 0 }}>Sign in</h1>
            <p style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)', margin: 0 }}>
              Your library and reading position, on every device.
            </p>
          </div>
          <Input variant="solid" label="Email" type="email" placeholder="you@domain.com" fullWidth iconLeft={<Icon name="mail" size={16} />} />
          <Input variant="solid" label="Password" type="password" placeholder="••••••••" fullWidth hint="At least 10 characters." />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} label="Keep me signed in" />
            <a href="#" style={{ marginLeft: 'auto', font: 'var(--lg-type-caption)' }}>Forgot password</a>
          </div>
          <Button variant="accent" size="lg" fullWidth>Sign in</Button>
          <Divider label="or" />
          <LiquidGlass cornerRadius={999} padding="12px 20px" overLight={overLight} elasticity={0.3} display="flex" onClick={() => {}}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, font: 'var(--lg-type-label)', width: '100%', justifyContent: 'center' }}>
              <Icon name="key-round" size={16} /> Continue with a passkey
            </span>
          </LiquidGlass>
          <p style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)', margin: 0, textAlign: 'center' }}>
            No account? <a href="#">Create one</a>
          </p>
        </form>
      </Panel>
    </div>
  );
}

export function App() {
  const [screen, setScreen] = useState('home');
  const [theme, setTheme] = useState('dark');
  const overLight = theme === 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-lg-theme', theme);
  }, [theme]);

  return (
    <Backdrop hue={overLight ? 'pale' : 'azure'} style={{ minHeight: '100vh' }}>
      <TopBar screen={screen} setScreen={setScreen} theme={theme} setTheme={setTheme} overLight={overLight} />
      {screen === 'home' && <Home overLight={overLight} setScreen={setScreen} />}
      {screen === 'essay' && <Essay overLight={overLight} />}
      {screen === 'library' && <Library overLight={overLight} />}
      {screen === 'auth' && <Auth overLight={overLight} />}
    </Backdrop>
  );
}
