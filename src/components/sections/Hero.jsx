import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMode } from '../../theme/ThemeContext';
import { profile, credentials } from '../../data/profile';
import { Shell, Action, Meta } from '../ui/Primitives';
import Availability from '../ui/Availability';
import Depth from '../art/Depth';
import PersonalHero from './PersonalHero';
import { motion, useReducedMotion } from 'framer-motion';

const Intro = styled.section`
  padding-top: 118px; padding-bottom: 0; overflow: clip;
  @media (max-width: 760px) { padding-top: 96px; }
`;
const Composition = styled.div`
  display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.9fr);
  gap: 3rem; align-items: center; padding-bottom: 2.25rem;
  min-height: 440px;
  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 1.75rem; min-height: auto; padding-bottom: 1.75rem; }
`;
const Copy = styled.div`
  position: relative; z-index: 1;
  h1 { font-size: clamp(4.4rem, 8.4vw, 7.3rem); letter-spacing: -0.065em; line-height: 1.03; margin: 1rem 0 1.35rem; }
  p { font-size: 1.08rem; line-height: 1.65; max-width: 44ch; color: ${(p) => p.theme.graphite}; }
  @media (max-width: 760px) {
    h1 { font-size: clamp(3.55rem, 12.7vw, 6rem); margin-block: 0.8rem 1rem; }
    p { font-size: 0.95rem; }
  }
`;
const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.65rem; margin-top: 1.5rem;
`;
const Portrait = styled(Depth)`
  position: relative; margin-left: auto; width: 100%; max-width: 355px; padding: 0 16px 16px 0;
  transform-style: preserve-3d;
  &::before { content: ''; position: absolute; inset: 22px 0 0 24px; border: 1px solid ${(p) => p.theme.ruleStrong}; transform: translateZ(-20px); }
  picture { display: block; overflow: hidden; position: relative; }
  img { width: 100%; aspect-ratio: 0.85; object-fit: cover; filter: none; }
  .orbit { position: absolute; width: 135%; max-width: none; height: 112%; top: -5%; left: -25%; z-index: -1; color: ${(p) => p.theme.ruleStrong}; }
  @media (max-width: 760px) {
    max-width: none; padding: 0 10px 10px 0;
    picture { height: 170px; }
    img { height: 100%; object-position: 50% 38%; aspect-ratio: auto; }
    .orbit { display: none; }
  }
`;
const Strip = styled.div`
  display: grid; grid-template-columns: 1.4fr 1fr 0.8fr;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  > a { padding: 1.25rem 1.5rem; text-decoration: none; border-left: 1px solid ${(p) => p.theme.rule}; }
  > a:first-child { padding-left: 0; border-left: 0; }
  b { display: block; font-size: 0.96rem; font-weight: 550; margin: 0.2rem 0; }
  small { display: block; color: ${(p) => p.theme.graphite}; font-size: 0.76rem; }
  a:hover b { color: ${(p) => p.theme.seal}; }
  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    > a { padding: 1rem 0; }
    > a:first-child { grid-column: 1/-1; border-bottom: 1px solid ${(p) => p.theme.rule}; }
    > a:nth-child(2) { border: 0; }
    > a:last-child { padding-left: 1.2rem; }
  }
`;
export default function Hero() {
  const { presentation } = useMode();
  const personal = presentation === 'personal';
  const reduce = useReducedMotion();
  if (personal) return <PersonalHero />;
  return <Intro id="hero" data-reading-section>
    <Shell>
      <Composition>
        <Copy>
          <Meta $seal>Cybersecurity · Network / Cloud / AppSec</Meta>
          <motion.h1 initial={{ opacity: 0, transform: reduce ? "none" : "translateY(26px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: .7, ease: [.23, 1, .32, 1] }}>Sathwik HS<span style={{ color: 'var(--seal)' }}>.</span></motion.h1>
          <p>{profile.standfirst}</p>
          <Actions>
            <Action as={Link} to="/#work" $primary>Explore my work <span aria-hidden="true">↗</span></Action>
            <Action href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></Action>
          </Actions>
          <Availability />
        </Copy>
        <Portrait>
          <svg className="orbit" viewBox="0 0 400 440" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.7">
            <ellipse cx="200" cy="220" rx="174" ry="203" transform="rotate(-26 200 220)" />
            <ellipse cx="200" cy="220" rx="150" ry="197" transform="rotate(-26 200 220)" />
            <path d="M43 230C100 80 322 67 353 251M61 305C128 153 247 140 355 290" />
          </svg>
          <picture><source srcSet={profile.portrait.webp} type="image/webp" /><img src={profile.portrait.jpg} alt={profile.portrait.alt} width="640" height="800" fetchPriority="high" /></picture>
        </Portrait>
      </Composition>
      <Strip>
        <Link to="/#record"><Meta>Currently · Oct 2026–present</Meta><b>Technical Intern, Noventiq India ↗</b><small>Enterprise network & cloud security training</small></Link>
        {credentials.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"><Meta>Certification</Meta><b>{item.name} ↗</b><small>{item.detail}</small></a>)}
      </Strip>
    </Shell>
  </Intro>;
}
