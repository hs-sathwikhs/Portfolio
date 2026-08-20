import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMode } from '../theme/ThemeContext';
import { profile } from '../data/profile';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'practice', label: 'Practice' },
  { id: 'record', label: 'Record' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/* ----------------------------------------------------------------------- */

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${(p) => p.theme.z.nav};
  display: flex;
  justify-content: center;
  padding: 1.15rem ${(p) => p.theme.space.gutter};
  pointer-events: none;
`;

const Pill = styled.nav`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: ${(p) => p.theme.maxw};
  padding: 0.45rem 0.5rem 0.45rem 0.9rem;
  border: 1px solid ${(p) => (p.$condensed ? p.theme.rule : 'transparent')};
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => (p.$condensed ? p.theme.overlay : 'transparent')};
  backdrop-filter: ${(p) => (p.$condensed ? 'blur(14px) saturate(1.4)' : 'none')};
  box-shadow: ${(p) => (p.$condensed ? `0 1px 18px -8px ${p.theme.shadow}` : 'none')};
  transition:
    background-color var(--dur-menu) var(--ease-out),
    border-color var(--dur-menu) var(--ease-out),
    box-shadow var(--dur-menu) var(--ease-out);
`;

const Mark = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-right: auto;
  text-decoration: none;
  color: ${(p) => p.theme.ink};

  b {
    font-family: ${(p) => p.theme.font.display};
    font-weight: ${(p) => p.theme.displayWeightBold};
    font-size: 1.0625rem;
    letter-spacing: -0.01em;
  }

  span {
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.label};
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${(p) => p.theme.graphite};

    @media (max-width: 560px) {
      display: none;
    }
  }
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.15rem;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: block;
  padding: 0.45rem 0.72rem;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(p) => (p.$active ? p.theme.ink : p.theme.graphite)};
  transition: color var(--dur-hover) var(--ease-out);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(p) => p.theme.ink};
    }
  }

  /* The marker is a filled square, not a growing underline - it reads as a
     checked field on a form rather than a hover leftover. */
  &::before {
    content: '';
    position: absolute;
    left: 0.28rem;
    top: 50%;
    width: 4px;
    height: 4px;
    margin-top: -2px;
    background: ${(p) => p.theme.seal};
    opacity: ${(p) => (p.$active ? 1 : 0)};
    transform: scale(${(p) => (p.$active ? 1 : 0.4)});
    transition:
      opacity var(--dur-hover) var(--ease-out),
      transform var(--dur-hover) var(--ease-out);
  }

  padding-left: 1.1rem;
`;

/* Mode control ---------------------------------------------------------- */

const Modes = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${(p) => p.theme.rule};
  border-radius: ${(p) => p.theme.radius.pill};
  overflow: hidden;
`;

const ModeButton = styled.button`
  padding: 0.4rem 0.72rem;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  letter-spacing: 0.14em;
  color: ${(p) => (p.$on ? p.theme.sealInk : p.theme.graphite)};
  background: ${(p) => (p.$on ? p.theme.seal : 'transparent')};
  transition:
    background-color var(--dur-hover) var(--ease-out),
    color var(--dur-hover) var(--ease-out);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(p) => (p.$on ? p.theme.sealInk : p.theme.ink)};
    }
  }

  /* Inset, because the pair sits inside a pill that clips its overflow. The ring
     also has to change colour on the selected half: that half is filled with the
     seal, and the global seal ring on a seal fill is an invisible focus state. */
  &:focus-visible {
    outline-offset: -3px;
    outline-color: ${(p) => (p.$on ? p.theme.sealInk : p.theme.seal)};
  }
`;

/* Hamburger ------------------------------------------------------------- */

const Burger = styled.button`
  position: relative;
  display: none;
  width: 38px;
  height: 38px;
  border: 1px solid ${(p) => p.theme.rule};
  border-radius: ${(p) => p.theme.radius.pill};

  @media (max-width: 820px) {
    display: block;
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 15px;
    height: 1.5px;
    margin-left: -7.5px;
    background: ${(p) => p.theme.ink};
    transition: transform var(--dur-menu) var(--ease-out);
  }

  ${(p) =>
    p.$open
      ? css`
          span:first-child {
            transform: translateY(-0.75px) rotate(45deg);
          }
          span:last-child {
            transform: translateY(-0.75px) rotate(-45deg);
          }
        `
      : css`
          span:first-child {
            transform: translateY(-4.75px);
          }
          span:last-child {
            transform: translateY(3.25px);
          }
        `};
`;

/* Overlay --------------------------------------------------------------- */

const Sheet = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: ${(p) => p.theme.z.overlay};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem ${(p) => p.theme.space.gutter} 3rem;
  background: ${(p) => p.theme.overlay};
  backdrop-filter: blur(22px) saturate(1.3);
`;

const SheetLinks = styled.ul`
  display: grid;
  gap: 0.25rem;
`;

const SheetItem = styled(motion.li)`
  border-top: 1px solid ${(p) => p.theme.rule};

  &:last-child {
    border-bottom: 1px solid ${(p) => p.theme.rule};
  }

  a {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.15rem 0.25rem;
    font-family: ${(p) => p.theme.font.display};
    font-weight: ${(p) => p.theme.displayWeight};
    font-size: clamp(2rem, 11vw, 3rem);
    line-height: 1;
    letter-spacing: -0.02em;
    text-decoration: none;
    color: ${(p) => p.theme.ink};
  }

  em {
    font-family: ${(p) => p.theme.font.mono};
    font-style: normal;
    font-size: ${(p) => p.theme.type.label};
    letter-spacing: 0.16em;
    color: ${(p) => p.theme.graphite};
  }
`;

const SheetFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 2.5rem;

  a {
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.micro};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${(p) => p.theme.graphite};
    text-decoration: none;
  }
`;

export const SkipLink = styled.a`
  position: fixed;
  top: 0.75rem;
  left: 50%;
  z-index: ${(p) => p.theme.z.skip};
  padding: 0.6rem 1rem;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(p) => p.theme.sealInk};
  background: ${(p) => p.theme.seal};
  border-radius: ${(p) => p.theme.radius.sm};
  transform: translate(-50%, -160%);
  transition: transform var(--dur-menu) var(--ease-out);

  &:focus-visible {
    transform: translate(-50%, 0);
  }
`;

/* ----------------------------------------------------------------------- */

export default function Nav() {
  const { pathname, hash } = useLocation();
  const { mode, setMode } = useMode();
  const reduce = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState('');

  const burgerRef = useRef(null);
  const closeRef = useRef(null);
  const onHome = pathname === '/';

  // Condense on a sentinel leaving the viewport rather than a scroll listener,
  // so no work happens on the scroll thread.
  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) {
      setCondensed(!onHome);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setCondensed(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [onHome, pathname]);

  // Track which section owns the upper third of the viewport.
  //
  // The observer hands back only the entries that *changed*, so deciding from
  // the batch alone leaves the marker stuck on a section you have already left
  // whenever the leaving is the only thing reported. Visibility is kept in a
  // map instead, and the topmost visible section wins.
  useEffect(() => {
    if (!onHome) {
      setActive('');
      return undefined;
    }
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return undefined;

    const visible = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        setActive(top ? top[0] : '');
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [onHome, pathname]);

  // Close on route or hash change.
  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  const target = (id) => (onHome ? `#${id}` : `/#${id}`);

  const sheet = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } },
    out: { opacity: 0, transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } },
  };

  const item = {
    hidden: { opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(18px)' },
    show: (i) => ({
      opacity: 1,
      transform: 'translateY(0px)',
      transition: { duration: 0.34, delay: 0.05 + i * 0.045, ease: [0.23, 1, 0.32, 1] },
    }),
  };

  return (
    <>
      <SkipLink href="#main">Skip to content</SkipLink>

      <Bar>
        <Pill $condensed={condensed || open} aria-label="Primary">
          <Mark to="/" aria-label={`${profile.name} - home`}>
            <b>{profile.name}</b>
            <span>{profile.disciplines.join(' · ')}</span>
          </Mark>

          <Links>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <NavLink
                  to={target(id)}
                  $active={active === id}
                  aria-current={active === id ? 'true' : undefined}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </Links>

          <Modes role="group" aria-label="Colour mode">
            <ModeButton
              type="button"
              $on={mode === 'paper'}
              aria-pressed={mode === 'paper'}
              onClick={() => setMode('paper')}
            >
              Paper
            </ModeButton>
            <ModeButton
              type="button"
              $on={mode === 'trace'}
              aria-pressed={mode === 'trace'}
              onClick={() => setMode('trace')}
            >
              Trace
            </ModeButton>
          </Modes>

          <Burger
            ref={burgerRef}
            type="button"
            $open={open}
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </Burger>
        </Pill>
      </Bar>

      <AnimatePresence>
        {open && (
          <Sheet
            id="nav-sheet"
            variants={sheet}
            initial="hidden"
            animate="show"
            exit="out"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <SheetLinks>
              {SECTIONS.map(({ id, label }, n) => (
                <SheetItem key={id} custom={n} variants={item} initial="hidden" animate="show">
                  <Link
                    to={target(id)}
                    ref={n === 0 ? closeRef : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                    <em>{String(n + 1).padStart(2, '0')}</em>
                  </Link>
                </SheetItem>
              ))}
              <SheetItem custom={SECTIONS.length} variants={item} initial="hidden" animate="show">
                <Link to="/projects" onClick={() => setOpen(false)}>
                  All projects
                  <em>{String(SECTIONS.length + 1).padStart(2, '0')}</em>
                </Link>
              </SheetItem>
            </SheetLinks>

            <SheetFoot>
              {profile.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
              <button
                type="button"
                onClick={close}
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Close
              </button>
            </SheetFoot>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
}
