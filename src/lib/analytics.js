import { getPageMeta, SITE_URL } from '../data/seo';

export const MEASUREMENT_ID = 'G-TS7KP2LQML';
export const CONSENT_KEY = 'sathwikhs.cookie-consent.v1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const EVENTS = new Set(['generate_lead', 'resume_click', 'email_click', 'phone_click', 'email_copy', 'email_draft_open']);
let enabled = false;
let initialized = false;
let lastPage = null;
let pageReferrer = '';

function externalReferrerOrigin() {
  try {
    const referrer = new URL(document.referrer);
    return ['http:', 'https:'].includes(referrer.protocol) && referrer.origin !== location.origin ? referrer.origin : '';
  } catch { return ''; }
}

export function readConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (value?.version === 1 && typeof value.analytics === 'boolean'
      && Number.isFinite(value.savedAt) && value.savedAt <= Date.now() && Date.now() - value.savedAt < MAX_AGE) return value;
  } catch { /* No storage or invalid data means no permission to track. */ }
  return null;
}

export function saveConsent(analytics) {
  const value = { version: 1, analytics: analytics === true, savedAt: Date.now() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(value)); } catch { /* Session-only consent remains usable. */ }
  return value;
}

// Only known routes and fixed titles reach GA. Query strings, fragments,
// arbitrary URLs and form contents are deliberately excluded.
function pageData(pathname) {
  const meta = getPageMeta(pathname);
  return {
    page_location: meta.canonical || `${SITE_URL}/404`,
    page_title: meta.title,
    page_referrer: pageReferrer,
  };
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = new Set(['', host, `.${host}`]);
  // Remove any cookies from an earlier GA configuration using parent domains.
  const parts = host.split('.');
  for (let i = 1; i < parts.length - 1; i += 1) domains.add(`.${parts.slice(i).join('.')}`);
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function setAnalyticsConsent(allowed) {
  enabled = allowed === true;
  window[`ga-disable-${MEASUREMENT_ID}`] = !enabled;
  if (!enabled) {
    lastPage = null;
    clearAnalyticsCookies();
    return;
  }
  if (!initialized) {
    initialized = true;
    pageReferrer = externalReferrerOrigin();
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('set', pageData(location.pathname));
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: location.hostname,
      cookie_expires: MAX_AGE / 1000,
      cookie_flags: 'SameSite=Lax;Secure',
    });
    const script = document.createElement('script');
    script.id = 'portfolio-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.append(script);
  }
  trackPageView(location.pathname);
}

export function trackPageView(pathname) {
  if (!enabled) return;
  const data = pageData(pathname);
  if (data.page_location === lastPage) return;
  if (lastPage) pageReferrer = lastPage;
  data.page_referrer = pageReferrer;
  lastPage = data.page_location;
  window.gtag('set', data);
  window.gtag('event', 'page_view', data);
}

export function trackConversion(name) {
  if (!enabled || !EVENTS.has(name)) return;
  window.gtag('event', name, { ...pageData(location.pathname), transport_type: 'beacon' });
}

export function trackLink(event) {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const anchor = event.target.closest?.('a[href]');
  if (!anchor) return;
  const url = new URL(anchor.href, location.href);
  if (url.protocol === 'mailto:') trackConversion('email_click');
  else if (url.protocol === 'tel:') trackConversion('phone_click');
  else if (url.origin === location.origin && url.pathname === '/resume.pdf') trackConversion('resume_click');
}
