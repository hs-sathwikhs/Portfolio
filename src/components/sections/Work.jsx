import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shell, Band, Meta, Opener, SectionRule, TagRow, Tag, Action } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
import Diagram from '../Diagram';
import { projects, featured } from '../../data/projects';

/**
 * A ledger, not a card grid.
 *
 * One row per project, in one column - so they can be compared line by line the
 * way entries in a record are. Each row carries its own hand-drawn diagram,
 * which is the actual explanation of what the project does; the prose beside it
 * is the caption, not the other way round.
 *
 * The home page shows the head of the ranking rather than the whole list, and
 * the tail below prints both numbers so the reader can see that it did.
 */

const Rows = styled.ol`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
`;

const Row = styled.li`
  border-bottom: 1px solid ${(p) => p.theme.rule};

  &:last-child {
    border-bottom: 1px solid ${(p) => p.theme.ruleStrong};
  }
`;

/**
 * The entire row is the link. A row that contains a "View project →" affordance
 * has two targets for one destination, and the smaller one is always the one
 * people aim at.
 */
const Entry = styled(Link)`
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) minmax(0, 0.85fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: start;
  padding-block: clamp(1.75rem, 4vh, 2.5rem);
  text-decoration: none;
  transition:
    background-color var(--dur-hover) var(--ease-out),
    padding-inline var(--dur-hover) var(--ease-out);

  @media (max-width: 860px) {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    row-gap: 1.5rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${(p) => p.theme.paperInk};
      padding-inline: 1rem;
    }

    &:hover h3 {
      color: ${(p) => p.theme.seal};
    }
  }
`;

const Index = styled(Meta)`
  padding-top: 0.55rem;
  color: ${(p) => p.theme.graphite};
`;

const Text = styled.div`
  display: grid;
  gap: 0.85rem;
  align-content: start;

  h3 {
    max-width: 20ch;
    transition: color var(--dur-hover) var(--ease-out);
  }

  p {
    max-width: 52ch;
    color: ${(p) => p.theme.graphite};
    font-size: ${(p) => p.theme.type.small};
  }
`;

const Fields = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  align-items: baseline;
`;

const Plate = styled.div`
  border: 1px solid ${(p) => p.theme.rule};
  background: ${(p) => p.theme.paper};
  padding: 0.75rem;

  @media (max-width: 860px) {
    grid-column: 2;
  }
`;

const Tail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: ${(p) => p.theme.space.block};
`;

export default function Work() {
  return (
    <Band id="work">
      <Shell>
        <Reveal>
          <Opener>
            <h2>Things built, and what each one had to solve.</h2>
            <SectionRule index="01" name={`Work - ${projects.length} entries`} />
            <p>
              Every entry below is something that exists. Where a repository is private or a demo
              was never hosted, the row says so rather than linking nowhere.
            </p>
          </Opener>
        </Reveal>

        <Rows>
          {featured.map((project, i) => (
            <Row key={project.id}>
              <Reveal delay={Math.min(i, 3) * 0.05}>
                <Entry to={`/project/${project.slug}`}>
                  <Index as="span">{String(i + 1).padStart(2, '0')}</Index>

                  <Text>
                    <h3>{project.title}</h3>
                    <Fields>
                      <Meta $seal>{project.domain}</Meta>
                      {project.context ? <Meta>Institutional</Meta> : null}
                    </Fields>
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

        <Tail>
          <Meta>
            {featured.length} of {projects.length} shown — ranked by what holds up to reading the
            source
          </Meta>
          <Action as={Link} to="/projects">
            Open the full index
          </Action>
        </Tail>
      </Shell>
    </Band>
  );
}
