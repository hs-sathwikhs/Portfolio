import { createGlobalStyle } from 'styled-components';

// Self-hosted, latin-subset, weight-axis only. No CDN request on first paint.
import '@fontsource-variable/bodoni-moda/wght.css';
import '@fontsource-variable/bodoni-moda/wght-italic.css';
import '@fontsource-variable/archivo/wght.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';

// Paper tooth. One static fixed layer, masked so it takes the theme's own
// grain colour instead of needing a blend mode over the whole document.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23g)'/%3E%3C/svg%3E\")";

const GlobalStyles = createGlobalStyle`
  :root {
    --ease-out: ${(p) => p.theme.ease.out};
    --ease-in-out: ${(p) => p.theme.ease.inOut};
    --ease-drawer: ${(p) => p.theme.ease.drawer};

    --dur-press: ${(p) => p.theme.dur.press};
    --dur-hover: ${(p) => p.theme.dur.hover};
    --dur-menu: ${(p) => p.theme.dur.menu};

    --paper: ${(p) => p.theme.paper};
    --ink: ${(p) => p.theme.ink};
    --graphite: ${(p) => p.theme.graphite};
    --rule: ${(p) => p.theme.rule};
    --rule-strong: ${(p) => p.theme.ruleStrong};
    --seal: ${(p) => p.theme.seal};

    --dg-stroke: ${(p) => p.theme.diagram.stroke};
    --dg-dim: ${(p) => p.theme.diagram.dim};
    --dg-fill: ${(p) => p.theme.diagram.fill};
    --dg-node: ${(p) => p.theme.diagram.node};
    --dg-live: ${(p) => p.theme.diagram.live};
  }

  *, *::before, *::after { box-sizing: border-box; }

  * { margin: 0; padding: 0; }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    /* Clears the floating nav when a hash anchor lands. */
    scroll-padding-top: 6.5rem;
    background: ${(p) => p.theme.paper};
  }

  body {
    position: relative;
    min-height: 100dvh;
    background: ${(p) => p.theme.paper};
    color: ${(p) => p.theme.ink};
    font-family: ${(p) => p.theme.font.body};
    font-size: ${(p) => p.theme.type.body};
    font-weight: 400;
    line-height: 1.65;
    font-synthesis-weight: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: ${(p) => p.theme.z.sticky};
    pointer-events: none;
    background-color: ${(p) => p.theme.grain};
    mask-image: ${GRAIN};
    -webkit-mask-image: ${GRAIN};
    mask-size: 180px 180px;
    -webkit-mask-size: 180px 180px;
  }

  h1, h2, h3, h4 {
    font-family: ${(p) => p.theme.font.display};
    font-weight: ${(p) => p.theme.displayWeight};
    line-height: 1.04;
    letter-spacing: -0.018em;
    text-wrap: balance;
  }

  h1 { font-size: ${(p) => p.theme.type.d1}; }
  h2 { font-size: ${(p) => p.theme.type.d2}; }
  h3 { font-size: ${(p) => p.theme.type.d3}; }
  h4 { font-size: ${(p) => p.theme.type.d4}; letter-spacing: -0.01em; }

  p { text-wrap: pretty; }

  a {
    color: inherit;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
  }

  button, input, textarea, select {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    letter-spacing: inherit;
  }

  button { cursor: pointer; }

  ul, ol { list-style: none; }

  img, svg, video { display: block; max-width: 100%; }

  img { height: auto; }

  /* Real measurements line up in columns; prose numerals do not. */
  time, code, kbd, samp, .tabular {
    font-family: ${(p) => p.theme.font.mono};
    font-variant-numeric: tabular-nums;
  }

  :focus-visible {
    outline: 2px solid ${(p) => p.theme.seal};
    outline-offset: 3px;
    border-radius: ${(p) => p.theme.radius.sm};
  }

  /* Only for pointer users who have not asked for a keyboard ring. */
  :focus:not(:focus-visible) { outline: none; }

  ::selection {
    background: ${(p) => p.theme.seal};
    color: ${(p) => p.theme.sealInk};
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: ${(p) => p.theme.ruleStrong} ${(p) => p.theme.paper};
  }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-track { background: ${(p) => p.theme.paper}; }
  ::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.ruleStrong};
    border: 3px solid ${(p) => p.theme.paper};
    border-radius: ${(p) => p.theme.radius.pill};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /*
   * Scoped cross-dissolve for the PAPER/TRACE flip only. The attribute is set
   * for one beat by the theme provider, so nothing else on the page pays for it.
   */
  [data-flip] * {
    transition:
      background-color ${(p) => p.theme.dur.theme} linear,
      border-color ${(p) => p.theme.dur.theme} linear,
      color ${(p) => p.theme.dur.theme} linear,
      fill ${(p) => p.theme.dur.theme} linear,
      stroke ${(p) => p.theme.dur.theme} linear !important;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }

    /* Gentler, not absent: colour and opacity still resolve, just quickly. */
    *, *::before, *::after {
      transition-duration: 120ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

export default GlobalStyles;
