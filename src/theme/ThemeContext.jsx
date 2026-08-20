import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, browserChrome } from './tokens';

export const STORAGE_KEY = 'sathwikhs.mode';
const MODES = ['paper', 'trace'];
const DARK_QUERY = '(prefers-color-scheme: dark)';

const ModeContext = createContext({
  mode: 'paper',
  setMode: () => {},
  toggle: () => {},
});

/**
 * Order of authority: whatever the pre-paint script in index.html already
 * painted, then a stored choice, then the OS. Reading the painted attribute
 * first is what keeps React from disagreeing with the first frame.
 */
function readInitialMode() {
  if (typeof document === 'undefined') return 'paper';

  const painted = document.documentElement.dataset.theme;
  if (MODES.includes(painted)) return painted;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (MODES.includes(stored)) return stored;
  } catch {
    // Storage can throw in private browsing. The OS preference is enough.
  }

  return window.matchMedia(DARK_QUERY).matches ? 'trace' : 'paper';
}

function hasStoredChoice() {
  try {
    return MODES.includes(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(readInitialMode);
  const explicit = useRef(hasStoredChoice());
  const flipTimer = useRef(null);

  // Paint the choice onto <html> so CSS-only surfaces (selection, scrollbar,
  // the pre-hydration background) and the mobile browser chrome all agree.
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode === 'trace' ? 'dark' : 'light';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', browserChrome[mode]);
  }, [mode]);

  // Follow the OS only while the visitor has not made a choice of their own.
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const follow = (event) => {
      if (explicit.current) return;
      setModeState(event.matches ? 'trace' : 'paper');
    };
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);

  useEffect(() => () => window.clearTimeout(flipTimer.current), []);

  const setMode = useCallback((next) => {
    if (!MODES.includes(next)) return;

    explicit.current = true;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice just will not survive a reload.
    }

    // A hard cut between two full palettes reads as a glitch, so cross-dissolve
    // the colour properties for one short beat. The attribute is what scopes
    // the transition - nothing on this page transitions colour otherwise.
    const gentle = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!gentle) {
      const root = document.documentElement;
      root.setAttribute('data-flip', '');
      window.clearTimeout(flipTimer.current);
      flipTimer.current = window.setTimeout(() => root.removeAttribute('data-flip'), 220);
    }

    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === 'paper' ? 'trace' : 'paper');
  }, [mode, setMode]);

  const value = useMemo(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return (
    <ModeContext.Provider value={value}>
      <StyledThemeProvider theme={themes[mode]}>{children}</StyledThemeProvider>
    </ModeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMode() {
  return useContext(ModeContext);
}
