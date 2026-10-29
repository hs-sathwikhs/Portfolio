import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shell, Quiet, Meta } from '../ui/Primitives';
import { featured, projects } from '../../data/projects';
import Reveal from '../ui/Reveal';
import Depth from '../art/Depth';
import Diagram from '../Diagram';
import Signature from '../art/Signature';

const Section = styled.section`
  padding-block: clamp(4rem, 9vw, 7.5rem); position: relative;
`;
const Heading = styled.header`
  display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 3rem;
  h2 { font-size: clamp(2.7rem, 5vw, 4.5rem); font-weight: 450; line-height: 1.03; max-width: 15ch; }
  a { font-size: .85rem; }
  .cut { display: flex; align-items: center; gap: 1rem; }
  .cut svg { width: 33px; height: 33px; color: ${(p) => p.theme.seal}; }
`;
const Preview = styled(Depth)`
  position: relative; isolation: isolate; padding: 1.25rem; border: 1px solid ${(p) => p.theme.rule}; border-radius: 18px;
  aspect-ratio: 1.6; display: grid; place-items: center;
  background: ${(p) => p.theme.paper2};
  &::before { content: ''; position: absolute; z-index: -1; inset: 14px -5px -8px 12px; border: 1px solid ${(p) => p.theme.rule}; border-radius: 18px; transform: rotate(1deg); }
  .screen, > svg { position: absolute; inset: 1.25rem; width: calc(100% - 2.5rem); height: calc(100% - 2.5rem); }
  .screen { object-fit: contain; border-radius: 7px; }
  @media (max-width: 700px) { padding: .8rem; .screen, > svg { inset: .8rem; width: calc(100% - 1.6rem); height: calc(100% - 1.6rem); } }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 3.5rem 2.5rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
const Case = styled.article`
  min-width: 0; display: flex; flex-direction: column; height: 100%;
  .kind { display: flex; align-items: center; justify-content: space-between; min-height: 24px; margin-top: 1.6rem; }
  .kind svg { width: 24px; height: 24px; color: ${(p) => p.theme.seal}; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: .4rem; }
  h3 { font-size: clamp(2rem, 3vw, 2.75rem); font-weight: 450; }
  h3 a { text-decoration: none; }
  p { color: ${(p) => p.theme.graphite}; font-size: .9rem; max-width: 50ch; margin-top: .8rem; }
  small { color: ${(p) => p.theme.graphite}; font-size: .78rem; margin-top: 1rem; }
  nav { display: flex; flex-wrap: wrap; gap: 1.5rem; padding-top: 1.25rem; margin-top: auto; font-size: .85rem; }
  .arrow { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid ${(p) => p.theme.ruleStrong}; border-radius: 50%; text-decoration: none; transition: transform 260ms var(--ease-out), background 180ms ease; }
  @media (hover: hover) and (pointer: fine) { .arrow:hover { transform: rotate(45deg); background: ${(p) => p.theme.paperInk}; } }
  @media (prefers-reduced-motion: reduce) { .arrow:hover { transform: none; } }
`;
export default function PersonalWork() {
  return <Section id="work" data-reading-section><Shell>
    <Reveal><Heading><h2>Curiosity,<br />put to work.</h2><div className="cut"><Signature kind="claws" /><Quiet as={Link} to="/projects">All {projects.length} projects ↗</Quiet></div></Heading></Reveal>
    <Grid>{featured.map((project, i) => <Reveal key={project.id} delay={i % 2 * .06} distance={28}>
      <Case>
        <Preview strength={7}>
          {project.slug === 'aethel'
            ? <img className="screen" src="/images/work/aethel.webp" alt="Aethel Hub displaying a demo repository, version branches and evaluation history" width="1100" height="765" loading="lazy" />
            : <Diagram kind={project.diagram} />}
        </Preview>
        <div className="kind"><Meta $seal>{project.domain}</Meta>{project.slug === 'aethel' && <Signature kind="web" />}</div>
        <div className="top"><h3><Link to={`/project/${project.slug}`}>{project.title}</Link></h3><Link className="arrow" to={`/project/${project.slug}`} aria-label={`Read the ${project.title} case study`}>↗</Link></div>
        <p>{project.summary}</p><small>{project.shortContext}</small>
        <nav aria-label={`${project.title} links`}><Quiet as={Link} to={`/project/${project.slug}`}>Read case study ↗</Quiet><Quiet href={project.links[0].href} target="_blank" rel="noopener noreferrer">Source ↗</Quiet></nav>
      </Case>
    </Reveal>)}</Grid>
  </Shell></Section>;
}
