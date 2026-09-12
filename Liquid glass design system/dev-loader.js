/**
 * Liquidglass dev loader — OPTIONAL, development only.
 *
 * Opened straight off disk, the component sources are ES modules with relative
 * imports. Rather than serve them as modules (blob-module imports are blocked
 * in some sandboxed preview frames), this loader fetches each file, rewrites its
 * import statements into lookups against one shared namespace object, strips the
 * `export` keywords, wraps each file in an IIFE, concatenates everything, and
 * runs it through Babel once. Nothing is imported dynamically.
 *
 * Requires React, ReactDOM and @babel/standalone on the page first.
 *
 * Usage:
 *   LiquidglassDev.ready.then((Liquidglass) => { ... })          // all components
 *   LiquidglassDev.load(['ui_kits/web/App.jsx']).then((ns) => ...) // plus extra files
 *
 * In production, compile the sources with your own bundler and drop this file.
 */
(function () {
  const MODULES = [
    'components/glass/glass-engine.js',
    'components/glass/GlassSurface.jsx',
    'components/glass/LiquidGlass.jsx',
    'components/media/Icon.jsx',
    'components/media/Backdrop.jsx',
    'components/forms/Button.jsx',
    'components/forms/IconButton.jsx',
    'components/forms/Input.jsx',
    'components/forms/Textarea.jsx',
    'components/forms/Select.jsx',
    'components/forms/Checkbox.jsx',
    'components/forms/Radio.jsx',
    'components/forms/Switch.jsx',
    'components/forms/Slider.jsx',
    'components/navigation/Tabs.jsx',
    'components/navigation/SegmentedControl.jsx',
    'components/navigation/Dock.jsx',
    'components/navigation/Menu.jsx',
    'components/navigation/Breadcrumbs.jsx',
    'components/surfaces/Card.jsx',
    'components/surfaces/Panel.jsx',
    'components/surfaces/Sheet.jsx',
    'components/surfaces/Dialog.jsx',
    'components/surfaces/Avatar.jsx',
    'components/surfaces/Divider.jsx',
    'components/surfaces/ImagePlaceholder.jsx',
    'components/feedback/Badge.jsx',
    'components/feedback/Tag.jsx',
    'components/feedback/Tooltip.jsx',
    'components/feedback/Toast.jsx',
    'components/feedback/Progress.jsx',
    'components/feedback/Spinner.jsx',
  ];

  const self = document.currentScript;
  /* document.currentScript.src is a blob: URL once the page has been bundled for
     publishing, and blob: URLs are not a valid base for new URL(). Fall back to
     the document location, and resolve modules through window.__resources when
     the bundler has inlined them. */
  let ROOT;
  try {
    ROOT = new URL('.', self && self.src ? self.src : location.href).href;
  } catch (e) {
    ROOT = new URL('.', location.href).href;
  }

  const NS = (window.Liquidglass = window.Liquidglass || {});

  const IMPORT = /^import\s+([\s\S]*?)from\s*['"]([^'"]+)['"];?[ \t]*$/gm;

  function reactConsts(clause) {
    const out = [];
    const ns = clause.match(/\*\s+as\s+([A-Za-z0-9_$]+)/);
    if (ns) return `const ${ns[1]} = window.React;`;
    const def = clause.match(/^\s*([A-Za-z0-9_$]+)/);
    if (def) out.push(`const ${def[1]} = window.React;`);
    const named = clause.match(/\{([\s\S]*?)\}/);
    if (named) out.push(`const {${named[1]}} = window.React;`);
    return out.join('\n');
  }

  function wrap(path, source) {
    const names = [...source.matchAll(/^export\s+(?:function|const|let|class)\s+([A-Za-z0-9_$]+)/gm)].map((m) => m[1]);
    let code = source.replace(IMPORT, (_m, clause, spec) => {
      if (spec === 'react') return reactConsts(clause);
      const named = clause.match(/\{([\s\S]*?)\}/);
      return named ? `const {${named[1]}} = __NS;` : '';
    });
    code = code.replace(/^export\s+/gm, '');
    const assign = names.length ? `Object.assign(__NS, { ${names.join(', ')} });` : '';
    return `/* ${path} */\n;(function () {\n${code}\n${assign}\n})();\n`;
  }

  const srcCache = new Map();
  async function fetchSource(path) {
    if (!srcCache.has(path)) {
      srcCache.set(
        path,
        (async () => {
          const inlined = window.__resources && window.__resources[path];
          let url;
          if (inlined) {
            url = inlined;
          } else {
            try {
              url = new URL(path, ROOT).href;
            } catch (e) {
              url = path;
            }
          }
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${path}: ${res.status}`);
          return res.text();
        })()
      );
    }
    return srcCache.get(path);
  }

  const loaded = new Set();

  async function load(paths) {
    if (!window.Babel) throw new Error('Liquidglass dev loader needs @babel/standalone.');
    const todo = paths.filter((p) => !loaded.has(p));
    if (!todo.length) return NS;
    const parts = [];
    for (const path of todo) {
      try {
        parts.push(wrap(path, await fetchSource(path)));
      } catch (e) {
        if (!/404/.test(String(e))) console.warn('[liquidglass-dev]', path, e);
      }
    }
    const out = window.Babel.transform(parts.join('\n'), {
      presets: [['react', { runtime: 'classic' }]],
      filename: 'liquidglass-dev.jsx',
    }).code;
    new Function('__NS', out)(NS);
    todo.forEach((p) => loaded.add(p));
    return NS;
  }

  window.LiquidglassDev = { ready: load(MODULES), load, ROOT, MODULES };
})();
