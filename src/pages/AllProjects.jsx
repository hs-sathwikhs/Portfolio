import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shell, Meta, SectionRule, TagRow, Tag } from '../components/ui/Primitives';
import Reveal from '../components/ui/Reveal';
import Diagram from '../components/Diagram';
import { projects, domains, featured } from '../data/projects';

/**
 * The index. Same ledger as the home page, but complete - the home page shows
 * only the head of the ranking, and this is where the rest of it lives. A
 * filter across the top rather than pagination, because eleven entries in five
 * domains is exactly the size where filtering helps and pagination would be
 * theatre.
 */

const Head = styled.header`
  padding-block: clamp(7rem, 16vh, 9.5rem) clamp(1.75rem, 4vh, 2.5rem);

  h1 {
    max-width: 26ch;
  }

  p {
    margin-top: 1.15rem;
    max-width: 58ch;
    color: ${(p) => p.theme.graphite};
    font-size: ${(p) => p.theme.type.lead};
  }
`;

const Rule = styled.div`
  margin-top: ${(p) => p.theme.space.block};
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

/**
 * A filter is a state, not a button - so the selected one is filled and the
 * rest are ruled, and there is no third appearance for "hovered but not on".
 */
const Filter = styled.button`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.5rem 0.85rem;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => (p.$on ? p.theme.seal : p.theme.ruleStrong)};
  background: ${(p) => (p.$on ? p.theme.seal : 'transparent')};
  color: ${(p) => (p.$on ? p.theme.sealInk : p.theme.graphite)};
  transition:
    background-color var(--dur-hover) var(--ease-out),
    border-color var(--dur-hover) var(--ease-out),
    color var(--dur-hover) var(--ease-out);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(p) => (p.$on ? p.theme.sealInk : p.theme.ink)};
      border-color: ${(p) => (p.$on ? p.theme.seal : p.theme.ink)};
    }
  }
`;

const Count = styled(Meta)`
  margin-top: 1.25rem;
  display: block;
  color: ${(p) => p.theme.graphite};
`;

const Rows = styled.ol`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  margin-bottom: ${(p) => p.theme.space.section};
`;

const Row = styled.li`
  border-bottom: 1px solid ${(p) => p.theme.rule};

  &:last-child {
    border-bottom: 1px solid ${(p) => p.theme.ruleStrong};
  }
`;

const Entry = styled(Link)`
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) minmax(0, 0.7fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: start;
  padding-block: clamp(1.5rem, 3.5vh, 2.25rem);
  text-decoration: none;
  transition:
    background-color var(--dur-hover) var(--ease-out),
    padding-inline var(--dur-hover) var(--ease-out);

  @media (max-width: 860px) {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    row-gap: 1.25rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${(p) => p.theme.paperInk};
      padding-inline: 1rem;
    }

    &:hover h2 {
      color: ${(p) => p.theme.seal};
    }
  }
`;

const Index = styled(Meta)`
  padding-top: 0.5rem;
  color: ${(p) => p.theme.graphite};
`;

const Text = styled.div`
  display: grid;
  gap: 0.75rem;

  h2 {
    font-size: ${(p) => p.theme.type.d3};
    max-width: 22ch;
    transition: color var(--dur-hover) var(--ease-out);
  }

  p {
    max-width: 56ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }
`;

const Plate = styled.div`
  border: 1px solid ${(p) => p.theme.rule};
  padding: 0.6rem;

  @media (max-width: 860px) {
    grid-column: 2;
  }
`;

export default function AllProjects() {
  const [domain, setDomain] = useState('All');

  const shown = useMemo(
    () => (domain === 'All' ? projects : projects.filter((p) => p.domain === domain)),
    [domain],
  );

  return (
    <Shell>
      <Head>
        <h1>Everything built so far, with the reasoning attached.</h1>
        <p>
          {projects.length} projects across security, systems, applied ML, web and on-chain work.
          The home page shows the first {featured.length}; the rest are here. Each one has a record
          of its own explaining the problem it had to solve and what that cost.
        </p>
        <Rule>
          <SectionRule index="IDX" name="Project index" />
        </Rule>

        <Filters role="group" aria-label="Filter by domain">
          {domains.map((name) => (
            <Filter
              key={name}
              type="button"
              $on={domain === name}
              aria-pressed={domain === name}
              onClick={() => setDomain(name)}
            >
              {name}
            </Filter>
          ))}
        </Filters>

        <Count as="span" role="status" aria-live="polite">
          {shown.length} of {projects.length} shown
        </Count>
      </Head>

      <Rows>
        {shown.map((project, i) => (
          <Row key={project.id}>
            <Reveal delay={Math.min(i, 3) * 0.05}>
              <Entry to={`/project/${project.slug}`}>
                <Index as="span">{String(i + 1).padStart(2, '0')}</Index>
                <Text>
                  <h2>{project.title}</h2>
                  <Meta $seal>{project.domain}</Meta>
                  <p>{project.summary}</p>
                  <TagRow>
                    {project.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </TagRow>
                </Text>
                <Plate>
                  <Diagram kind={project.diagram} />
                </Plate>
              </Entry>
            </Reveal>
          </Row>
        ))}
      </Rows>
    </Shell>
  );
}
