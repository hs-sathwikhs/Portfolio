import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Band, Shell, Meta, Quiet } from '../ui/Primitives';
import Diagram from '../Diagram';
import Reveal from '../ui/Reveal';
import { featured, projects } from '../../data/projects';
import { useMode } from '../../theme/ThemeContext';
import PersonalWork from './PersonalWork';

const Heading = styled.header`
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 1rem; justify-content: space-between; margin-bottom: 2.5rem;
  h2 { font-size: clamp(2.6rem, 5vw, 4rem); }
  a { font-size: 0.85rem; }
`;
const Grid = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 2.5rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
const Entry = styled.article`
  border-top: 1px solid ${(p) => p.theme.ruleStrong}; padding: 1.75rem 0 2.5rem;
  display: flex; flex-direction: column; gap: 1.5rem; height: 100%;
  h3 { font-size: clamp(2.25rem, 4vw, 3.5rem); margin: 0.6rem 0 1rem; }
  h3 a { text-decoration: none; }
  h3 a:hover { color: ${(p) => p.theme.seal}; }
  p { color: ${(p) => p.theme.graphite}; max-width: 49ch; font-size: 0.94rem; }
  small { display: block; font-size: 0.76rem; color: ${(p) => p.theme.graphite}; margin-top: 1rem; }
`;
const Plate = styled.div`
  background: ${(p) => p.theme.paper2}; border: 1px solid ${(p) => p.theme.rule};
  padding: 1rem; aspect-ratio: 1.7; display: grid; align-items: center;
  width: 100%; margin-top: auto;
  svg { max-height: 265px; }
`;
const Links = styled.div`
  display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 1.4rem; font-size: 0.85rem;
`;
const Tail = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.65rem 1.5rem; align-items: baseline;
  border-top: 1px solid ${(p) => p.theme.rule}; padding-top: 1.25rem; font-size: 0.85rem;
`;
export default function Work() {
  const { presentation } = useMode();
  if (presentation === 'personal') return <PersonalWork />;
  return <Band id="work" data-reading-section><Shell>
    <Heading><h2>Selected work.</h2><Quiet as={Link} to="/projects">All {projects.length} projects ↗</Quiet></Heading>
    <Grid>{featured.map((project) => <Reveal key={project.id} distance={12}><Entry>
      <div><Meta $seal>{project.domain}</Meta><h3><Link to={`/project/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p>
        <small>{project.shortContext}</small>
        <Links><Quiet as={Link} to={`/project/${project.slug}`}>Read case study ↗</Quiet><Quiet href={project.links[0].href} target="_blank" rel="noopener noreferrer">Source ↗</Quiet></Links>
      </div>
      <Plate><Diagram kind={project.diagram} /></Plate>
    </Entry></Reveal>)}</Grid>
    <Tail><Meta>Also explore</Meta><Quiet as={Link} to="/project/bank-networks">Bank Networks · VLANs, routing & ASA firewalls ↗</Quiet></Tail>
  </Shell></Band>;
}
