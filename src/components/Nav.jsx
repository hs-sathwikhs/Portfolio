import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMode } from '../theme/ThemeContext';

const Header = styled.header`
  view-transition-name: site-header;
  position: fixed; inset: ${(p) => p.theme.personal ? '16px 0 auto' : '0 0 auto'}; z-index: 100;
  background: ${(p) => p.theme.personal ? 'transparent' : p.theme.paper}; border-bottom: ${(p) => p.theme.personal ? '0' : `1px solid ${p.theme.rule}`};
`;
const Bar = styled.div`
  max-width: 1400px; margin: auto; padding: ${(p) => p.theme.personal ? '0 1.35rem' : '0 clamp(1rem, 4vw, 3.5rem)'};
  width: ${(p) => p.theme.personal ? 'calc(100% - 3rem)' : '100%'};
  border: ${(p) => p.theme.personal ? `1px solid ${p.theme.rule}` : '0'};
  border-radius: ${(p) => p.theme.personal ? '14px' : '0'};
  background: ${(p) => p.theme.personal ? p.theme.paper2 : 'transparent'};
  height: ${(p) => p.theme.personal ? '68px' : '76px'}; display: flex; gap: 2rem; align-items: center;
  @media (max-width: 760px) { height: 64px; gap: .3rem; padding-inline: 12px; width: ${(p) => p.theme.personal ? 'calc(100% - 1.5rem)' : '100%'}; }
`;
const Brand = styled(Link)`
  text-decoration: none; font-weight: 650; letter-spacing: -0.04em; font-size: 1.2rem;
  white-space: nowrap; margin-right: auto;
  span { color: ${(p) => p.theme.seal}; }
  @media (max-width: 360px) { font-size: 0; &::before { content: "s."; font-size: 1.2rem; } }
`;
const Links = styled.nav`
  display: flex; gap: 1.5rem; align-items: center; font-size: 0.83rem;
  a { position: relative; text-decoration: none; padding-block: 0.7rem; }
  a::after { content: ''; position: absolute; left: 0; right: 0; bottom: 5px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 280ms var(--ease-out); }
  a:hover::after, a:focus-visible::after { transform: scaleX(1); }
  a:hover, a[aria-current] { color: ${(p) => p.theme.seal}; }
  @media (max-width: 960px) { display: none; }
`;
const Switch = styled.div`
  position: relative; display: flex; padding: 3px; border: 1px solid ${(p) => p.theme.ruleStrong}; border-radius: ${(p) => p.theme.personal ? '8px' : '3px'};
  &::before { content: ''; position: absolute; inset: 3px auto 3px 3px; width: calc(50% - 3px); border-radius: inherit; background: ${(p) => p.theme.ink}; transform: translateX(${(p) => p.$personal ? '100%' : '0'}); transition: transform 280ms var(--ease-out); }
  button { position: relative; z-index: 1; width: 96px; font-size: .75rem; padding: .48rem .5rem; min-height: 36px; transition: color 220ms ease; }
  button[aria-pressed='true'] { color: ${(p) => p.theme.paper}; }
  @media (max-width: 760px) { button { width: 74px; padding-inline: .25rem; font-size: .68rem; } }
`;
const Appearance = styled.button`
  display: flex; align-items: center; gap: 0.5rem; min-width: 44px; min-height: 44px;
  font: 0.65rem ${(p) => p.theme.font.mono}; letter-spacing: 0.06em;
  i { display: block; width: 16px; height: 16px; border: 1px solid currentColor; border-radius: 50%;
    background: linear-gradient(90deg, currentColor 50%, transparent 50%); transform: rotate(${(p) => p.$dark ? '180deg' : '0deg'}); transition: transform 450ms var(--ease-out); }
  @media (max-width: 760px) { justify-content: center; min-width: 36px; span { display: none; } }
`;
const MenuButton = styled.button`
  min-height: 44px; min-width: 40px; font-size: 0.75rem;
  @media (min-width: 961px) { display: none; }
`;
const Menu = styled.dialog`
  inset: 0 0 0 auto; margin: 0; width: min(360px, 100%); max-width: 100%; max-height: 100%; height: 100dvh;
  padding: 1.5rem; border: 0; border-left: 1px solid ${(p) => p.theme.ruleStrong};
  background: ${(p) => p.theme.paper}; color: ${(p) => p.theme.ink};
  &::backdrop { background: ${(p) => p.theme.shadowDeep}; }
  > button { display: block; margin-left: auto; min-height: 44px; padding-inline: 1rem; }
  h2 { margin-block: 2rem; font-size: 2.5rem; }
  nav { display: grid; }
  a { padding: 1rem 0; border-bottom: 1px solid ${(p) => p.theme.rule}; text-decoration: none; font-size: 1.2rem; }
`;
const Skip = styled.a`
  position: fixed; top: -100px; left: 1rem; z-index: 400; padding: 0.8rem;
  background: ${(p) => p.theme.ink}; color: ${(p) => p.theme.paper};
  &:focus { top: 0.5rem; }
`;

export default function Nav() {
  const { mode, toggle, presentation, setPresentation } = useMode();
  const location = useLocation();
  const navigate = useNavigate();
  const choosePresentation = (next) => {
    setPresentation(next);
    if (next === "professional" && location.hash === "#personal") navigate({ pathname: location.pathname, search: location.search, hash: "" }, { replace: true });
  };
  const dialog = useRef(null);
  const opener = useRef(null);
  const restoreOverflow = useRef('');
  const personal = presentation === 'personal';
  const links = [

    { label: personal ? 'Selected work' : 'Work', to: '/#work' }, { label: personal ? 'My story' : 'Experience', to: '/#record' }, { label: 'Contact', to: '/#contact' },
  ];
  const menuAnimation = useRef(null);
  const close = () => {
    const node = dialog.current;
    if (!node?.open) return;
    const from = getComputedStyle(node).transform;
    menuAnimation.current?.cancel();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { node.close(); return; }
    menuAnimation.current = node.animate([{ transform: from, opacity: 1 }, { transform: 'translateX(100%)', opacity: .5 }], { duration: 220, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' });
    menuAnimation.current.finished.then(() => node.close()).catch(() => {});
  };
  useEffect(() => { close(); }, [location.key]);
  useEffect(() => {
    const query = matchMedia('(min-width: 961px)');
    const resized = (event) => { if (event.matches) close(); };
    query.addEventListener('change', resized);
    return () => { query.removeEventListener('change', resized); document.body.style.overflow = restoreOverflow.current; };
  }, []);
  const open = () => {
    restoreOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = 'hidden';
    menuAnimation.current?.cancel();
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) menuAnimation.current = dialog.current.animate([{ transform: 'translateX(100%)', opacity: .5 }, { transform: 'translateX(0)', opacity: 1 }], { duration: 300, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' });
  };
  return <>
    <Skip href="#main">Skip to content</Skip>
    <Header><Bar>
      <Brand to="/" aria-label="Sathwik HS, home">sathwik<span>.</span></Brand>
      <Links aria-label="Main navigation">{links.map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}</Links>
      <Switch $personal={personal} role="group" aria-label="Site presentation">
        <button type="button" aria-pressed={!personal} onClick={() => choosePresentation('professional')}>Professional</button>
        <button type="button" aria-pressed={personal} onClick={() => choosePresentation('personal')}>Personal</button>
      </Switch>
      <Appearance $dark={mode === "trace"} type="button" onClick={toggle} aria-label={`Switch to ${mode === 'paper' ? 'TRACE dark' : 'PAPER light'} theme`}>
        <i aria-hidden="true" /><span>{mode.toUpperCase()}</span>
      </Appearance>
      <MenuButton type="button" ref={opener} onClick={open} aria-haspopup="dialog" aria-controls="navigation-menu">Menu</MenuButton>
    </Bar></Header>
    <Menu onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...event.currentTarget.querySelectorAll('button, a[href]')];
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} ref={dialog} id="navigation-menu" aria-labelledby="navigation-title" onClick={(e) => { if (e.target === e.currentTarget && e.clientX < e.currentTarget.getBoundingClientRect().left) close(); }}
      onClose={() => { document.body.style.overflow = restoreOverflow.current; opener.current?.focus({ preventScroll: true }); }}>
      <button type="button" onClick={close} autoFocus>Close</button>
      <h2 id="navigation-title">Find your way.</h2>
      <nav aria-label="Mobile navigation">{links.map(({ label, to }) => <Link key={to} to={to} onClick={close}>{label}</Link>)}
        <Link to="/#practice" onClick={close}>Security practice</Link>
        <Link to="/projects" onClick={close}>All projects</Link>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={close}>Résumé ↗</a>
      </nav>
    </Menu>
  </>;
}
