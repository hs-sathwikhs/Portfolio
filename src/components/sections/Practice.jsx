import styled from 'styled-components';
import { Band, Shell, Meta, Quiet } from '../ui/Primitives';
import { practice } from '../../data/practice';
import Reveal from '../ui/Reveal';
import Signature from '../art/Signature';
import { useMode } from '../../theme/ThemeContext';
const Grid = styled.div`
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 3rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 2rem; }
`;
const Intro = styled.div`
  h2 { font-size: clamp(2.6rem, 5vw, 4rem); margin-bottom: 1.25rem; }
  p { color: ${(p) => p.theme.graphite}; max-width: 43ch; font-size: 0.95rem; }
  nav { margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.83rem; }
`;
const Results = styled.div`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  > div { padding-block: 1rem; border-bottom: 1px solid ${(p) => p.theme.rule}; }
  b { display: block; font-family: ${(p) => p.theme.font.display}; font-size: 2.5rem; line-height: 1.2; font-weight: 500; }
  small { font-size: 0.76rem; color: ${(p) => p.theme.graphite}; }
`;
export default function Practice() {
  const { presentation } = useMode();
  return <Band id="practice" data-reading-section $recessed><Shell><Grid>
    <Reveal><Intro><Meta $seal>Security practice</Meta><h2>F_S0CI3TY.</h2>{presentation === "personal" && <Signature kind="echo" style={{width: 34}} />}<p>I co-founded a CTF team. We compete across web exploitation, cryptography, forensics, OSINT, and blockchain.</p>
      <p style={{ marginTop: '1rem' }}>The team platform also brings security into the build: authenticated admin writes, server-side flag checks, and rate limits.</p>
      <nav aria-label="Security practice links"><Quiet href="https://fs0ci3ty.vercel.app/" target="_blank" rel="noopener noreferrer">Team site ↗</Quiet><Quiet href="https://tryhackme.com/p/KXSYRR" target="_blank" rel="noopener noreferrer">TryHackMe ↗</Quiet><Quiet href="https://github.com/hs-sathwikhs/WRITEUP" target="_blank" rel="noopener noreferrer">Solve scripts ↗</Quiet></nav>
    </Intro></Reveal>
    <Reveal delay={.09}><Results>{practice.standing.map((item) => <div key={item.label}><Meta>{item.label}</Meta><b>{item.value}</b><small>{item.when}</small></div>)}</Results></Reveal>
  </Grid></Shell></Band>;
}
