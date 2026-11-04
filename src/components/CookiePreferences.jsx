import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ActionButton } from './ui/Primitives';
import { CONSENT_KEY, readConsent, saveConsent, setAnalyticsConsent, trackLink, trackPageView } from '../lib/analytics';

const PreferencesContext = createContext(null);
const Banner = styled.section`
  position: fixed;
  inset: auto 1rem 1rem;
  margin-inline: auto;
  z-index: 200;
  max-width: 48rem;
  max-height: calc(100dvh - 2rem);
  overflow-y: auto;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: ${(p) => p.theme.paper};
  border: 1px solid ${(p) => p.theme.ruleStrong};
  border-radius: ${(p) => p.theme.radius.sm};
  h2 { font-size: 1.4rem; line-height: 1.2; }
  p { margin-block: .7rem 1rem; max-width: 64ch; font-size: ${(p) => p.theme.type.small}; color: ${(p) => p.theme.graphite}; }
`;
const Buttons = styled.div`
  display: flex;
  gap: .65rem;
  flex-wrap: wrap;
  button { min-height: 44px; }
`;
const Settings = styled.button`
  font: inherit;
  text-decoration: underline;
  text-underline-offset: .2em;
  min-height: 44px;
`;
const Panel = styled.dialog`
  margin: auto;
  width: min(38rem, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  padding: clamp(1.25rem, 4vw, 2rem);
  background: ${(p) => p.theme.paper};
  color: ${(p) => p.theme.ink};
  border: 1px solid ${(p) => p.theme.ruleStrong};
  border-radius: ${(p) => p.theme.radius.sm};
  &::backdrop { background: ${(p) => p.theme.shadowDeep}; }
  h2 { font-size: 1.8rem; line-height: 1.2; }
  h3 { font-family: inherit; font-size: 1rem; }
  p { color: ${(p) => p.theme.graphite}; font-size: ${(p) => p.theme.type.small}; margin-block: .75rem; }
  section { padding-block: 1rem; border-top: 1px solid ${(p) => p.theme.rule}; }
  label { display: flex; align-items: center; gap: .75rem; min-height: 44px; }
  input { width: 20px; height: 20px; accent-color: ${(p) => p.theme.seal}; }
  > button { display: block; margin-left: auto; min-height: 44px; text-decoration: underline; }
`;

export function CookiePreferencesProvider({ children }) {
  const [consent, setConsent] = useState(readConsent);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef(null);
  const opener = useRef(null);
  const accepted = useRef(consent?.analytics === true);
  const { pathname } = useLocation();

  useEffect(() => { setAnalyticsConsent(consent?.analytics === true); }, [consent]);
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  useEffect(() => {
    const sync = (event) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const next = readConsent();
      const revoke = accepted.current && !next?.analytics;
      accepted.current = next?.analytics === true;
      setAnalyticsConsent(accepted.current);
      setConsent(next);
      // A fresh document also removes the loaded SDK's timers/listeners.
      if (revoke) window.location.reload();
    };
    window.addEventListener('storage', sync);
    document.addEventListener('click', trackLink, true);
    document.addEventListener('auxclick', trackLink, true);
    return () => {
      window.removeEventListener('storage', sync);
      document.removeEventListener('click', trackLink, true);
      document.removeEventListener('auxclick', trackLink, true);
    };
  }, []);

  const choose = (allowAnalytics) => {
    const revoke = accepted.current && !allowAnalytics;
    const next = saveConsent(allowAnalytics);
    accepted.current = next.analytics;
    setAnalyticsConsent(next.analytics);
    setConsent(next);
    dialog.current.close();
    if (revoke) window.location.reload();
  };
  const open = () => {
    opener.current = document.activeElement;
    setAnalytics(consent?.analytics === true);
    dialog.current.showModal();
  };

  return (
    <PreferencesContext.Provider value={open}>
      {children}
      {!consent && (
        <Banner aria-labelledby="cookie-banner-title">
          <h2 id="cookie-banner-title">Your privacy choices</h2>
          <p>With your permission, Google Analytics measures page visits, résumé clicks and contact actions. Optional analytics cookies stay off until you accept. Your form details are not sent to analytics.</p>
          <Buttons>
            <ActionButton type="button" onClick={() => choose(false)}>Reject analytics</ActionButton>
            <ActionButton type="button" onClick={() => choose(true)}>Accept analytics</ActionButton>
            <Settings type="button" onClick={open} aria-haspopup="dialog">Preferences</Settings>
          </Buttons>
        </Banner>
      )}
      <Panel ref={dialog} aria-labelledby="cookie-panel-title" onClose={() => opener.current?.isConnected && opener.current.focus({ preventScroll: true })}>
        <button type="button" onClick={() => dialog.current.close()} autoFocus>Close</button>
        <h2 id="cookie-panel-title">Cookie preferences</h2>
        <p>You can change these choices anytime using Cookie preferences in the footer. Your choice is remembered for 180 days.</p>
        <section>
          <h3>Site preferences · always available</h3>
          <p>This site stores your chosen appearance and privacy settings in your browser so they are remembered between visits.</p>
        </section>
        <section>
          <label><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /><strong>Optional analytics</strong></label>
          <p>Google Analytics uses _ga cookies to understand visits and contact actions. Cookies expire after 180 days of inactivity. Analytics does not receive names, email addresses, message text or URL query strings. Advertising features are disabled.</p>
          <p>Google processes usage information when analytics is enabled. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a>. Turning analytics off removes its cookies and refreshes this page.</p>
        </section>
        <Buttons>
          <ActionButton type="button" onClick={() => choose(analytics)}>Save preferences</ActionButton>
          <ActionButton type="button" onClick={() => choose(false)}>Reject analytics</ActionButton>
        </Buttons>
      </Panel>
    </PreferencesContext.Provider>
  );
}

CookiePreferencesProvider.propTypes = { children: PropTypes.node.isRequired };
export function CookieSettingsButton() {
  const open = useContext(PreferencesContext);
  return <Settings type="button" onClick={open} aria-haspopup="dialog">Cookie preferences</Settings>;
}
