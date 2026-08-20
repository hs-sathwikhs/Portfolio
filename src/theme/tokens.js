/**
 * Two complete worlds, one geometry.
 *
 * PAPER ("Signed Record") is the primary: cool bond paper, oxblood seal.
 * TRACE ("Packet Trace") is the same document read off a terminal at night:
 * near-black stock, amber seal.
 *
 * Every pairing below was contrast-checked by hand. Text pairs clear AA and
 * mostly AAA; anything used as a control boundary clears the 3:1 required by
 * WCAG 1.4.11. Do not introduce a colour that is not in one of these maps.
 */

const font = {
  // Didone display - enormous stroke contrast, so it only earns its keep large.
  display: "'Bodoni Moda Variable', 'Bodoni Moda', 'Didot', Georgia, serif",
  // Grotesque with a slightly condensed lower case; sets dense text well.
  body: "'Archivo Variable', 'Archivo', system-ui, -apple-system, sans-serif",
  // Reserved for real data: IDs, dates, counts, coordinates, labels on diagrams.
  mono: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
};

const ease = {
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
};

const dur = {
  press: '140ms',
  hover: '180ms',
  menu: '220ms',
  theme: '160ms',
  reveal: '760ms',
  draw: '900ms',
};

const z = {
  base: 0,
  raised: 10,
  sticky: 50,
  nav: 100,
  overlay: 200,
  toast: 300,
  skip: 400,
};

const radius = {
  none: '0',
  sm: '2px',
  md: '4px',
  lg: '10px',
  pill: '999px',
};

const type = {
  d1: 'clamp(2.75rem, 8.5vw, 5.25rem)',
  d2: 'clamp(2rem, 5vw, 3.25rem)',
  d3: 'clamp(1.5rem, 3.2vw, 2rem)',
  d4: 'clamp(1.25rem, 2.2vw, 1.5rem)',
  lead: 'clamp(1.0625rem, 1.5vw, 1.1875rem)',
  body: '1rem',
  small: '0.875rem',
  micro: '0.75rem',
  label: '0.6875rem',
};

const space = {
  section: 'clamp(4.5rem, 11vh, 8.5rem)',
  block: 'clamp(2.5rem, 6vh, 4rem)',
  gutter: 'clamp(1.25rem, 5vw, 2.5rem)',
};

const shared = { font, ease, dur, z, radius, type, space, maxw: '1180px' };

/** Signed Record - cool bond paper. Deliberately not the AI cream (#F4F1EA). */
export const paperTheme = {
  ...shared,
  mode: 'paper',
  label: 'PAPER',

  paper: '#E7E8EA', //  page stock
  paper2: '#DCDEE1', //  recessed band
  paperInk: '#F1F2F3', //  raised sheet, hover fill
  ink: '#101317', //  15.3:1 on paper
  graphite: '#565C66', //   5.4:1 on paper
  rule: '#C3C7CC', //  decorative hairline
  ruleStrong: '#7C828C', //   3.2:1 on paper - control boundaries
  seal: '#7A1F2B', //   8.4:1 on paper - oxblood
  sealInk: '#F1F2F3', //   9.2:1 on seal
  sealWash: 'rgba(122, 31, 43, 0.08)',

  shadow: 'rgba(28, 34, 44, 0.13)',
  shadowDeep: 'rgba(28, 34, 44, 0.2)',
  overlay: 'rgba(231, 232, 234, 0.86)',
  grain: 'rgba(16, 19, 23, 0.028)',

  // Didone hairlines hold at 400 on light stock.
  displayWeight: 400,
  displayWeightBold: 600,

  diagram: {
    stroke: '#101317',
    // Annotations and captions inside a drawing are text, so this carries the
    // same 4.5:1 floor prose does - not the 3:1 a hairline would get away with.
    dim: '#565C66', //   5.4:1 on paper
    fill: '#DCDEE1',
    node: '#F1F2F3',
    live: '#7A1F2B',
  },
};

/** Packet Trace - the same record on a terminal. */
export const traceTheme = {
  ...shared,
  mode: 'trace',
  label: 'TRACE',

  paper: '#0E0F11',
  paper2: '#16181B',
  paperInk: '#1A1D21',
  ink: '#E9EAEC', //  15.8:1 on paper
  graphite: '#9AA1AB', //   7.4:1 on paper
  rule: '#292D33',
  ruleStrong: '#5A606A', //   3.1:1 on paper
  seal: '#D98A2B', //   7.0:1 on paper - amber
  sealInk: '#0E0F11', //   7.0:1 on seal
  sealWash: 'rgba(217, 138, 43, 0.12)',

  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowDeep: 'rgba(0, 0, 0, 0.66)',
  overlay: 'rgba(14, 15, 17, 0.88)',
  grain: 'rgba(233, 234, 236, 0.022)',

  // Optical compensation: light-on-dark thins a Didone's hairlines, so the
  // display face carries one extra step of weight in this world.
  displayWeight: 500,
  displayWeightBold: 700,

  diagram: {
    stroke: '#E9EAEC',
    dim: '#7E858F', //   5.2:1 on paper
    fill: '#16181B',
    node: '#1A1D21',
    live: '#D98A2B',
  },
};

export const themes = { paper: paperTheme, trace: traceTheme };

/** Painted into <meta name="theme-color"> so mobile browser chrome matches. */
export const browserChrome = {
  paper: paperTheme.paper,
  trace: traceTheme.paper,
};
