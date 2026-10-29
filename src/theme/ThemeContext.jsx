import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, personalThemes } from './tokens';
import { transitionTo } from '../motion/transitions';

export const STORAGE_KEY = 'sathwikhs.mode';
const PERSONAL_MODE_KEY = 'sathwikhs.personal.mode';
const PRESENTATION_KEY = 'sathwikhs.presentation';
const PRESENTATIONS = ['professional', 'personal'];
const MODES = ['paper', 'trace'];
const DARK_QUERY = '(prefers-color-scheme: dark)';

const ModeContext = createContext({
  mode: 'paper',
  setMode: () => {},
  toggle: () => {},
});

function hasStoredChoice() {
  try {
    return MODES.includes(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

function readPresentation() {
  if (location.hash === '#personal') return 'personal';
  try {
    const saved = localStorage.getItem(PRESENTATION_KEY);
    if (PRESENTATIONS.includes(saved)) return saved;
  } catch { /* The default also works without storage. */ }
  return 'professional';
}

export function ThemeProvider({ children }) {
  const [presentation, updatePresentation] = useState(readPresentation);
  const currentPresentation = useRef(presentation);
  currentPresentation.current = presentation;
  const [appearance, setAppearance] = useState(() => {
    let personal = 'trace';
    let professional = 'paper';
    try {
      const savedPersonal = localStorage.getItem(PERSONAL_MODE_KEY);
      if (MODES.includes(savedPersonal)) personal = savedPersonal;
      const savedProfessional = localStorage.getItem(STORAGE_KEY);
      professional = MODES.includes(savedProfessional) ? savedProfessional : matchMedia(DARK_QUERY).matches ? 'trace' : 'paper';
    } catch { professional = matchMedia(DARK_QUERY).matches ? 'trace' : 'paper'; }
    return { personal, professional };
  });
  const mode = appearance[presentation];
  const theme = presentation === 'personal' ? personalThemes[mode] : themes[mode];
  const readingPosition = useRef(null);
  const setPresentation = useCallback((next) => {
    if (!PRESENTATIONS.includes(next) || next === currentPresentation.current) return;
    const sections = [...document.querySelectorAll('main [data-reading-section]')];
    const section = sections.find((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top <= 130 && rect.bottom > 130;
    });
    readingPosition.current = section
      ? { id: section.id, offset: section.getBoundingClientRect().top }
      : null;
    try { localStorage.setItem(PRESENTATION_KEY, next); } catch { /* Session choice remains usable. */ }
    transitionTo(() => updatePresentation(next), 'presentation');
  }, []);
  useLayoutEffect(() => {
    document.documentElement.dataset.presentation = presentation;
    const saved = readingPosition.current;
    if (saved) {
      const target = document.getElementById(saved.id) || document.getElementById('hero');
      if (target) {
        const offset = target.id === saved.id ? Math.max(saved.offset, -target.offsetHeight + 180) : 80;
        window.scrollBy({ top: target.getBoundingClientRect().top - offset, behavior: 'instant' });
      }
      readingPosition.current = null;
    }
  }, [presentation]);

  const explicit = useRef(hasStoredChoice());

  // Paint the choice onto <html> so CSS-only surfaces (selection, scrollbar,
  // the pre-hydration background) and the mobile browser chrome all agree.
  useLayoutEffect(() => {
    document.documentElement.style.background = theme.paper;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode === 'trace' ? 'dark' : 'light';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.paper);
  }, [mode, theme]);

  // Follow the OS only while the visitor has not made a choice of their own.
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const follow = (event) => {
      if (explicit.current) return;
      setAppearance((prev) => ({ ...prev, professional: event.matches ? 'trace' : 'paper' }));
    };
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);


  const setMode = useCallback((next) => {
    if (!MODES.includes(next)) return;
    if (presentation === 'professional') explicit.current = true;
    try { localStorage.setItem(presentation === 'personal' ? PERSONAL_MODE_KEY : STORAGE_KEY, next); } catch { /* Session choice remains available. */ }
    transitionTo(() => setAppearance((prev) => ({ ...prev, [presentation]: next })), 'theme');
  }, [presentation]);

  const toggle = useCallback(() => {
    setMode(mode === 'paper' ? 'trace' : 'paper');
  }, [mode, setMode]);

  const value = useMemo(() => ({ mode, setMode, toggle, presentation, setPresentation }), [mode, setMode, toggle, presentation, setPresentation]);

  return (
    <ModeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ModeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useMode() {
  return useContext(ModeContext);
}
