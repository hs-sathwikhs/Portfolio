import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { profile } from '../../data/profile';
import { Shell, Action, Quiet } from '../ui/Primitives';
import Availability from '../ui/Availability';
import ResonanceField from '../art/ResonanceField';
import Signature from '../art/Signature';

const play = keyframes`0%,100% { transform: scaleY(.4); } 40% { transform: scaleY(1); } 70% { transform: scaleY(.65); }`;
const Scene = styled.section`
  position: relative; isolation: isolate; overflow: clip; padding-top: 156px;
  min-height: 780px; border-bottom: 1px solid ${(p) => p.theme.rule};
  @media (max-width: 760px) { padding-top: 116px; min-height: 0; }
`;
const Content = styled.div`
  position: relative; z-index: 2; width: 68%; padding-bottom: 75px;
  h1 { font-size: clamp(5.5rem, 11.8vw, 10.6rem); font-weight: 500; line-height: .87; letter-spacing: -.075em; margin: 1.5rem 0 1.8rem; }
  .line { display: block; overflow: hidden; padding-bottom: .08em; }
  .word { display: block; }
  p { max-width: 36ch; font-size: 1rem; color: ${(p) => p.theme.graphite}; }
  @media (max-width: 760px) {
    width: 100%; padding-bottom: 1.75rem;
    h1 { font-size: clamp(4.9rem, 18vw, 8rem); margin: 1.5rem 0 1rem; }
    p { max-width: 35ch; font-size: .92rem; }
  }
`;
const Eyebrow = styled.div`
  display: flex; align-items: center; gap: .8rem; font-size: .78rem; letter-spacing: .01em;
  color: ${(p) => p.theme.graphite};
  &::before { content: ''; height: 1px; width: 28px; background: ${(p) => p.theme.seal}; }
`;
const Photograph = styled(motion.figure)`
  position: absolute; z-index: -1; right: 3%; top: 115px; width: 46%; height: 550px;
  img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 38%; }
  mask-image: linear-gradient(90deg, transparent, #000 29%, #000 80%, transparent), linear-gradient(0deg, transparent, #000 30%, #000 95%, transparent);
  mask-composite: intersect;
  opacity: .9;
  @media (max-width: 760px) {
    position: relative; z-index: 1; top: auto; right: auto;
    width: 100%; height: 215px; opacity: 1; mask-image: none;
    border-radius: 12px; overflow: hidden;
    transform: none !important;
    img { object-position: 50% 39%; }
  }
`;
const Actions = styled.div`
  display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem;
  @media (max-width: 380px) { gap: .5rem; a { padding-inline: .85rem; font-size: .82rem; } }
`;
const Foot = styled.div`
  position: relative; z-index: 2; display: flex; align-items: center; flex-wrap: wrap;
  justify-content: space-between; gap: 1.25rem; padding: 1.5rem 0 2rem;
  font-size: .77rem; color: ${(p) => p.theme.graphite};
  .current { display: grid; gap: .35rem; }
  .current b { color: ${(p) => p.theme.ink}; font-weight: 450; font-size: .88rem; }
  .marks { display: flex; align-items: center; gap: 1.5rem; }
  .wave { display: flex; align-items: center; gap: 3px; height: 25px; }
  .wave i { width: 2px; height: 20px; background: ${(p) => p.theme.seal}; transform-origin: center; animation: ${play} 1.2s ease-in-out 3; }
  .wave i:nth-child(2n) { height: 13px; animation-delay: -.3s; }
  .wave i:nth-child(3n) { height: 25px; animation-delay: -.8s; }
  .mark { width: 32px; height: 32px; color: ${(p) => p.theme.graphite}; }
  @media (max-width: 760px) { .mark { display: none; } }
`;
export default function PersonalHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const photoTransform = useMotionTemplate`translateY(${y}px)`;
  return <Scene ref={ref} id="hero" data-reading-section>
    <span id="personal" style={{ position: 'absolute', top: 0 }} />
    <ResonanceField />
    <Shell>
      <Content>
        <Eyebrow>Cybersecurity & systems · Bengaluru</Eyebrow>
        <h1 aria-label="Sathwik HS">
          <span className="line" aria-hidden="true"><motion.span className="word" initial={{ transform: reduce ? 'none' : 'translateY(110%)' }} animate={{ transform: 'translateY(0)' }} transition={{ duration: .85, ease: [.23, 1, .32, 1] }}>Sathwik</motion.span></span>
          <span className="line" aria-hidden="true"><motion.span className="word" initial={{ transform: reduce ? 'none' : 'translateY(110%)' }} animate={{ transform: 'translateY(0)' }} transition={{ duration: .85, delay: .07, ease: [.23, 1, .32, 1] }}>HS.</motion.span></span>
        </h1>
        <p>Focused on network and cloud security, AppSec, and pentesting.</p>
        <Actions><Action as={Link} to="/#work" $primary>Explore the work <span aria-hidden="true">↗</span></Action><Action href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></Action></Actions>
        <Availability />
      </Content>
      <Photograph style={{ transform: reduce ? 'none' : photoTransform }}>
        <img src={profile.portrait.webp} alt={profile.portrait.alt} width="640" height="800" fetchPriority="high" />
      </Photograph>
      <Foot>
        <div className="current"><span>Currently</span><b><Quiet as={Link} to="/#record">Technical Intern · Noventiq India ↗</Quiet></b></div>
        <div className="marks" aria-hidden="true"><span className="wave">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span><Signature kind="damaru" className="mark" /></div>
      </Foot>
    </Shell>
  </Scene>;
}
