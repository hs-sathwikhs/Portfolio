import styled from 'styled-components';
import { Band, Shell, Meta } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
const Grid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; margin-top: 2rem;
  > div { border-top: 1px solid ${(p) => p.theme.ruleStrong}; padding-top: 1rem; }
  p { font-size: 0.91rem; color: ${(p) => p.theme.graphite}; margin-top: 0.65rem; }
  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 1.25rem; }
`;
export default function Stack() {
  return <Band id="stack" data-reading-section><Shell>
    <Reveal><h2>Tools, in context.</h2></Reveal>
    <Grid>
      <Reveal><Meta>Network & cloud study</Meta><p>Azure security fundamentals, Palo Alto, Check Point, Fortinet, Cisco Packet Tracer.</p></Reveal>
      <Reveal delay={.06}><Meta>Security practice</Meta><p>Burp Suite, Nmap, Wireshark, Linux. Web exploitation, cryptography, forensics, and OSINT.</p></Reveal>
      <Reveal delay={.12}><Meta>Building systems</Meta><p>Python, Node.js, Java, C, Solidity. FastAPI, Docker, WebSockets, and React.</p></Reveal>
    </Grid>
  </Shell></Band>;
}
