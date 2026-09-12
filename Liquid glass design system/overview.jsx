import React, { useState } from 'react';
import { Backdrop } from './components/media/Backdrop.jsx';
import { Icon } from './components/media/Icon.jsx';
import { GlassSurface } from './components/glass/GlassSurface.jsx';
import { LiquidGlass } from './components/glass/LiquidGlass.jsx';
import { Button } from './components/forms/Button.jsx';
import { IconButton } from './components/forms/IconButton.jsx';
import { Input } from './components/forms/Input.jsx';
import { Textarea } from './components/forms/Textarea.jsx';
import { Select } from './components/forms/Select.jsx';
import { Checkbox } from './components/forms/Checkbox.jsx';
import { Radio } from './components/forms/Radio.jsx';
import { Switch } from './components/forms/Switch.jsx';
import { Slider } from './components/forms/Slider.jsx';
import { Tabs } from './components/navigation/Tabs.jsx';
import { SegmentedControl } from './components/navigation/SegmentedControl.jsx';
import { Dock } from './components/navigation/Dock.jsx';
import { Menu } from './components/navigation/Menu.jsx';
import { Breadcrumbs } from './components/navigation/Breadcrumbs.jsx';
import { Card } from './components/surfaces/Card.jsx';
import { Panel } from './components/surfaces/Panel.jsx';
import { Sheet } from './components/surfaces/Sheet.jsx';
import { Dialog } from './components/surfaces/Dialog.jsx';
import { Avatar } from './components/surfaces/Avatar.jsx';
import { Divider } from './components/surfaces/Divider.jsx';
import { ImagePlaceholder } from './components/surfaces/ImagePlaceholder.jsx';
import { Badge } from './components/feedback/Badge.jsx';
import { Tag } from './components/feedback/Tag.jsx';
import { Tooltip } from './components/feedback/Tooltip.jsx';
import { Toast } from './components/feedback/Toast.jsx';
import { Progress } from './components/feedback/Progress.jsx';
import { Spinner } from './components/feedback/Spinner.jsx';

const eyebrow = {
  font: 'var(--lg-type-mono)',
  letterSpacing: 'var(--lg-tracking-caps)',
  textTransform: 'uppercase',
  fontSize: 11,
  color: 'var(--lg-text-tertiary)',
};

function Row({ name, note, children, column = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '22px 0', borderTop: '1px solid var(--lg-border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ font: 'var(--lg-type-label)', fontFamily: 'var(--lg-font-mono)' }}>{name}</span>
        {note ? <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>{note}</span> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: column ? 'column' : 'row', gap: 16, alignItems: column ? 'stretch' : 'center', flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  );
}

function Group({ id, title, count, children }) {
  return (
    <section id={id} style={{ display: 'flex', flexDirection: 'column', gap: 4, scrollMarginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <h2 style={{ font: 'var(--lg-type-heading)', margin: 0 }}>{title}</h2>
        <span style={eyebrow}>{count}</span>
      </div>
      {children}
    </section>
  );
}

export function Overview() {
  const [theme, setTheme] = useState('dark');
  const overLight = theme === 'light';
  const [tab, setTab] = useState('essays');
  const [seg, setSeg] = useState('all');
  const [dock, setDock] = useState('read');
  const [check, setCheck] = useState(true);
  const [radio, setRadio] = useState('a');
  const [sw, setSw] = useState(true);
  const [slider, setSlider] = useState(62);
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);

  const setTh = (t) => {
    setTheme(t);
    document.documentElement.setAttribute('data-lg-theme', t);
  };

  const GROUPS = [
    ['glass', 'Glass'],
    ['forms', 'Forms'],
    ['navigation', 'Navigation'],
    ['surfaces', 'Surfaces'],
    ['feedback', 'Feedback'],
    ['media', 'Media'],
  ];

  return (
    <Backdrop hue={overLight ? 'pale' : 'azure'} style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 32px 120px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={eyebrow}>Liquidglass · 31 components</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
            <h1 style={{ font: 'var(--lg-type-title)', fontSize: 40, margin: 0, letterSpacing: 'var(--lg-tracking-tighter)', flex: 1, minWidth: 260 }}>
              Everything in the system, on one page
            </h1>
            <SegmentedControl
              value={theme}
              onChange={setTh}
              overLight={overLight}
              options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
            />
          </div>
          <p style={{ font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)', margin: 0, maxWidth: 'var(--lg-measure)' }}>
            Live components, not screenshots. Hover and click them. Props for each are in{' '}
            <code style={{ font: 'var(--lg-type-mono)' }}>components/&lt;group&gt;/&lt;Name&gt;.d.ts</code>.
          </p>
          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {GROUPS.map(([id, label]) => (
              <a key={id} href={'#' + id} style={{ textDecoration: 'none' }}>
                <Tag>{label}</Tag>
              </a>
            ))}
            <a href="playground.html" style={{ textDecoration: 'none' }}><Tag selected>Parameter playground →</Tag></a>
            <a href="ui_kits/web/index.html" style={{ textDecoration: 'none' }}><Tag selected>Site kit →</Tag></a>
            <a href="ui_kits/desktop/index.html" style={{ textDecoration: 'none' }}><Tag selected>Desktop kit →</Tag></a>
            <a href="ui_kits/mobile/index.html" style={{ textDecoration: 'none' }}><Tag selected>Mobile kit →</Tag></a>
          </nav>
        </header>

        <Group id="glass" title="Glass" count="2 primitives">
          <Row name="GlassSurface" note="static pane — the base of everything">
            <GlassSurface cornerRadius={999} padding="14px 24px" overLight={overLight}>
              <span style={{ font: 'var(--lg-type-glass-label)' }}>Default · 2px blur</span>
            </GlassSurface>
            <GlassSurface cornerRadius={999} padding="14px 24px" blurAmount={0.35} overLight={overLight}>
              <span style={{ font: 'var(--lg-type-glass-label)' }}>Frosty</span>
            </GlassSurface>
            <GlassSurface cornerRadius={999} padding="14px 24px" refraction={false} overLight={overLight}>
              <span style={{ font: 'var(--lg-type-glass-label)' }}>Blur only</span>
            </GlassSurface>
          </Row>
          <Row name="LiquidGlass" note="leans toward the pointer — move your mouse near it">
            <LiquidGlass cornerRadius={999} padding="14px 24px" elasticity={0.35} overLight={overLight} onClick={() => {}}>
              <span style={{ font: 'var(--lg-type-glass-label)' }}>Elastic</span>
            </LiquidGlass>
            <LiquidGlass cornerRadius={28} padding="18px 24px" elasticity={0.15} shader="liquidGlassPanel" blurAmount={0.35} overLight={overLight}>
              <span style={{ font: 'var(--lg-type-body)', maxWidth: 320 }}>Panel shader, gentle bend — use it above 400px so text stays readable.</span>
            </LiquidGlass>
          </Row>
        </Group>

        <Group id="forms" title="Forms" count="9 components">
          <Row name="Button" note="glass · solid · accent · ghost">
            <Button variant="glass" overLight={overLight}>Glass</Button>
            <Button variant="solid">Solid</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost" overLight={overLight}>Ghost</Button>
            <Button variant="accent" iconLeft={<Icon name="download" size={16} />}>With icon</Button>
            <Button variant="glass" size="sm" overLight={overLight}>Small</Button>
            <Button variant="glass" size="lg" overLight={overLight}>Large</Button>
            <Button variant="glass" disabled>Disabled</Button>
          </Row>
          <Row name="IconButton" note="44px minimum touch target">
            <IconButton label="Play" variant="glass" overLight={overLight}><Icon name="play" size={20} /></IconButton>
            <IconButton label="Bookmark" variant="solid"><Icon name="bookmark" size={20} /></IconButton>
            <IconButton label="Add" variant="accent"><Icon name="plus" size={20} /></IconButton>
            <IconButton label="More" variant="ghost" overLight={overLight}><Icon name="more-horizontal" size={20} /></IconButton>
            <IconButton label="Large play" variant="accent" size="xl"><Icon name="play" size={24} /></IconButton>
          </Row>
          <Row name="Input · Textarea · Select" note="glass and solid — solid inside a glass panel" column>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Input label="Email" placeholder="you@domain.com" variant="glass" overLight={overLight} iconLeft={<Icon name="mail" size={16} />} style={{ flex: '1 1 240px' }} />
              <Input label="Title" placeholder="Essay title" variant="solid" style={{ flex: '1 1 240px' }} />
              <Input label="Slug" value="edges-do-the-work" variant="solid" error="Already in use." style={{ flex: '1 1 240px' }} />
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <Textarea label="Summary" placeholder="One sentence." variant="solid" rows={3} style={{ flex: '1 1 320px' }} />
              <Select label="Collection" variant="solid" value="essays" options={[{ value: 'essays', label: 'Essays' }, { value: 'notes', label: 'Notes' }]} style={{ flex: '1 1 200px' }} />
            </div>
          </Row>
          <Row name="Checkbox · Radio · Switch" column>
            <Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} label="Keep me signed in" description="On this device only." />
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <Radio name="ov" value="a" checked={radio === 'a'} onChange={() => setRadio('a')} label="Comfortable" />
              <Radio name="ov" value="b" checked={radio === 'b'} onChange={() => setRadio('b')} label="Compact" />
            </div>
            <Switch checked={sw} onChange={(e) => setSw(e.target.checked)} label="Refraction" description="Chromium only; elsewhere it falls back to blur." style={{ maxWidth: 420 }} />
          </Row>
          <Row name="Slider" note="glass knob, drag or arrow-key it" column>
            <Slider value={slider} onChange={setSlider} label="Reading position" displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>{slider}%</span>} />
          </Row>
        </Group>

        <Group id="navigation" title="Navigation" count="5 components">
          <Row name="Tabs" note="inside a view">
            <Tabs value={tab} onChange={setTab} tabs={[{ value: 'essays', label: 'Essays', count: 41 }, { value: 'notes', label: 'Notes', count: 12 }, { value: 'books', label: 'Books', count: 3 }]} />
          </Row>
          <Row name="SegmentedControl" note="sliding glass lens">
            <SegmentedControl value={seg} onChange={setSeg} overLight={overLight} options={[{ value: 'all', label: 'All' }, { value: 'paid', label: 'Paid' }, { value: 'free', label: 'Free' }]} />
            <SegmentedControl value={seg} onChange={setSeg} variant="solid" size="sm" options={['all', 'paid', 'free']} />
          </Row>
          <Row name="Dock" note="the component the whole effect exists for">
            <Dock
              value={dock}
              onChange={setDock}
              overLight={overLight}
              items={[
                { value: 'library', label: 'Library', icon: <Icon name="library" size={22} /> },
                { value: 'read', label: 'Read', icon: <Icon name="book-open" size={22} /> },
                { value: 'listen', label: 'Listen', icon: <Icon name="headphones" size={22} /> },
                { value: 'you', label: 'You', icon: <Icon name="user" size={22} /> },
              ]}
            />
          </Row>
          <Row name="Menu · Breadcrumbs" column>
            <Breadcrumbs items={[{ label: 'Writing' }, { label: 'Interface' }, { label: 'Edges do the work' }]} />
            <Menu
              width={240}
              items={[
                { label: 'Open', icon: <Icon name="book-open" size={16} />, shortcut: '⏎' },
                { label: 'Export…', icon: <Icon name="download" size={16} />, shortcut: '⌘E' },
                { divider: true },
                { label: 'Delete', tone: 'danger', icon: <Icon name="trash-2" size={16} /> },
              ]}
            />
          </Row>
        </Group>

        <Group id="surfaces" title="Surfaces" count="7 components">
          <Row name="Card" note="glass and solid" column>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
              <Card
                variant="glass"
                overLight={overLight}
                cornerRadius={24}
                eyebrow="ESSAY · 12 MIN"
                title="The cost of a transparent surface"
                description="When refraction earns the spend, and when it is just fog."
                footer={<Tag>Interface</Tag>}
              />
              <Card
                variant="solid"
                cornerRadius={24}
                media={<ImagePlaceholder label="cover 16:9" ratio="16 / 9" radius={12} />}
                title="Quiet Systems"
                description="Solid card — the right call on a flat ground or in dense grids."
              />
            </div>
          </Row>
          <Row name="Panel" note="large region; nested fields go solid" column>
            <Panel variant="glass" overLight={overLight} cornerRadius={28}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <Input variant="solid" label="Email" placeholder="you@domain.com" style={{ flex: '1 1 240px' }} />
                <Button variant="accent">Subscribe</Button>
              </div>
            </Panel>
          </Row>
          <Row name="Dialog · Sheet" note="click to open">
            <Button variant="glass" overLight={overLight} onClick={() => setDialog(true)}>Open dialog</Button>
            <Button variant="glass" overLight={overLight} onClick={() => setSheet(true)}>Open sheet</Button>
          </Row>
          <Row name="Avatar · Divider · ImagePlaceholder" column>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Avatar name="Author Name" size="xs" />
              <Avatar name="Author Name" size="sm" />
              <Avatar name="Author Name" size="md" ring />
              <Avatar name="Quiet Systems" size="lg" />
            </div>
            <Divider label="or" />
            <div style={{ maxWidth: 320 }}>
              <ImagePlaceholder label="author portrait — 3:2" ratio="3 / 2" radius={16} />
            </div>
          </Row>
        </Group>

        <Group id="feedback" title="Feedback" count="6 components">
          <Row name="Badge · Tag">
            <Badge>Neutral</Badge>
            <Badge tone="accent" dot>Live</Badge>
            <Badge tone="success">Paid</Badge>
            <Badge tone="warning">Draft</Badge>
            <Badge tone="danger">Failed</Badge>
            <Tag>Interface</Tag>
            <Tag selected>Rendering</Tag>
            <Tag onRemove={() => {}}>Removable</Tag>
          </Row>
          <Row name="Tooltip · Spinner">
            <Tooltip content="Import an epub">
              <IconButton label="Import" variant="glass" overLight={overLight}><Icon name="upload" size={20} /></IconButton>
            </Tooltip>
            <Spinner />
            <Spinner size={28} thickness={3} />
          </Row>
          <Row name="Progress" column>
            <Progress value={62} label="Surface Tension" displayValue="62%" />
            <Progress value={28} size="sm" />
          </Row>
          <Row name="Toast" column>
            <Toast title="Field Notes 2024 imported" tone="success" icon={<Icon name="check" size={18} />} action={<Button variant="ghost" size="sm">Open</Button>} onClose={() => {}}>
              Added to your library · 2.4 mb
            </Toast>
          </Row>
        </Group>

        <Group id="media" title="Media" count="2 components">
          <Row name="Icon" note="Lucide at 1.75 stroke — a flagged substitution">
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
              {['book-open', 'headphones', 'library', 'search', 'settings', 'bookmark', 'download', 'play', 'pause', 'type', 'sun', 'moon'].map((n) => (
                <span key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 64 }}>
                  <Icon name={n} size={22} />
                  <span style={{ font: 'var(--lg-type-caption)', fontSize: 10, color: 'var(--lg-text-tertiary)', textAlign: 'center' }}>{n}</span>
                </span>
              ))}
            </div>
          </Row>
          <Row name="Backdrop" note="every screen needs one — glass on a flat fill is a grey box">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, width: '100%' }}>
              {['azure', 'orchid', 'mint', 'ember', 'pale'].map((h) => (
                <div key={h} style={{ height: 90, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                  <Backdrop hue={h} style={{ width: '100%', height: '100%' }} contentStyle={{ height: '100%', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                    <span style={{ font: 'var(--lg-type-mono)', fontSize: 10, color: h === 'pale' ? 'var(--lg-neutral-1000)' : '#fff' }}>{h}</span>
                  </Backdrop>
                </div>
              ))}
            </div>
          </Row>
        </Group>
      </div>

      <Dialog
        open={dialog}
        title="Reset all settings?"
        description="Appearance and reading preferences return to their defaults. Your library is untouched."
        onClose={() => setDialog(false)}
        footer={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setDialog(false)}>Cancel</Button>
            <Button variant="accent" onClick={() => setDialog(false)}>Reset</Button>
          </div>
        }
      />
      {sheet ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-end' }}>
          <div onClick={() => setSheet(false)} style={{ position: 'absolute', inset: 0, background: 'var(--lg-scrim)' }} />
          <Sheet side="bottom" onClose={() => setSheet(false)} style={{ position: 'relative', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ font: 'var(--lg-type-heading)' }}>Text</span>
                <IconButton label="Close" variant="ghost" size="sm" onClick={() => setSheet(false)} style={{ marginLeft: 'auto' }}>
                  <Icon name="x" size={18} />
                </IconButton>
              </div>
              <Slider value={62} label="Size" displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>17pt</span>} />
            </div>
          </Sheet>
        </div>
      ) : null}
    </Backdrop>
  );
}
