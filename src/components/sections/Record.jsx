import styled from 'styled-components';
import { Band, Shell, Meta, Quiet } from '../ui/Primitives';
import { record, education } from '../../data/timeline';
import { useMode } from '../../theme/ThemeContext';
import Reveal from '../ui/Reveal';
import Signature from '../art/Signature';
const Groups = styled.div`
  display: grid; gap: clamp(3.5rem, 7vw, 6rem);
`;
const Layout = styled.section`
  display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.6fr); gap: 3rem;
  h2 { font-size: clamp(2.6rem, 5vw, 4rem); }
  .story { position: relative; }
  .story svg { margin-top: 2rem; width: 40px; height: 40px; color: ${(p) => p.theme.seal}; }

  @media (max-width: 760px) { grid-template-columns: 1fr; gap: 2rem; }
`;
const Ledger = styled.div`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  article { position: relative; padding: 1.5rem 0; border-bottom: 1px solid ${(p) => p.theme.rule}; }
  [data-presentation='personal'] & { border-top: 0; padding-left: 1.75rem; border-left: 1px solid ${(p) => p.theme.ruleStrong}; }
  [data-presentation='personal'] & article::before { content: ''; position: absolute; left: calc(-1.75rem - 5px); top: 2rem; width: 9px; height: 9px; border: 1px solid ${(p) => p.theme.seal}; background: ${(p) => p.theme.paper}; transform: rotate(45deg); }

  h3 { font-family: ${(p) => p.theme.font.body}; font-size: 1.15rem; font-weight: 550; margin: 0.6rem 0; letter-spacing: -0.02em; }
  p { color: ${(p) => p.theme.graphite}; font-size: 0.9rem; max-width: 65ch; }
  small { display: block; font-size: 0.8rem; margin-bottom: 0.75rem; }
`;
export default function Record() {
  const { presentation } = useMode();
  const personal = presentation === 'personal';
  return <Band id="record" data-reading-section><Shell><Groups>
    {[
      { id: 'experience', title: 'Experience.', items: record },
      { id: 'education', title: 'Education.', items: education },
    ].map((group) => <Layout key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
      <Reveal><div className="story"><h2 id={`${group.id}-heading`}>{group.title}</h2>
        {personal && group.id === 'experience' && <Signature kind="branch" />}
      </div></Reveal>
      <Ledger>{group.items.map((item) => <Reveal key={item.org} distance={22}><article>
        <Meta $seal={item.current}>{item.from} - {item.to}</Meta>
        <h3><Quiet href={item.href} target="_blank" rel="noopener noreferrer">{item.org} ↗</Quiet></h3>
        <small>{item.role}</small><p>{item.detail}</p>
      </article></Reveal>)}</Ledger>
    </Layout>)}
  </Groups></Shell></Band>;
}
