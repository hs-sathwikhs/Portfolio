import styled from 'styled-components';
import { Shell, Band, Meta, Opener, SectionRule, TagRow, Tag, Quiet } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
import Diagram from '../Diagram';
import { practice, categories, tooling } from '../../data/practice';

/**
 * Practice, as distinct from Work.
 *
 * CTFs and lab machines are not projects and should not be filed as if they
 * were: nothing ships, there is no repository, and the artefact is a writeup.
 * But they are the largest part of how the security side of this record is
 * actually built, so leaving them out would misrepresent the last year more
 * than including them badly would.
 *
 * The honesty rule from the rest of the site applies with more force here,
 * because this is the section where a portfolio is most tempted to invent a
 * number. There are no solve counts, no ranks and no platform badges: those are
 * either verifiable from a profile link or they are decoration. What is stated
 * is which categories the work sits in and which tools it is done with - both
 * checkable against the writeups the moment those are published.
 */

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
  gap: clamp(1.75rem, 5vw, 4rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: clamp(2rem, 5vh, 2.5rem);
  }
`;

/** The drawing sits in the same plate the project rows use, for continuity. */
const Plate = styled.div`
  border: 1px solid ${(p) => p.theme.rule};
  background: ${(p) => p.theme.paper};
  padding: 0.9rem;

  @media (max-width: 900px) {
    order: -1;
  }
`;

const Rows = styled.ol`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 10.5rem minmax(0, 1fr);
  gap: clamp(1rem, 2.5vw, 2rem);
  padding-block: clamp(1.1rem, 2.6vh, 1.6rem);
  border-bottom: 1px solid ${(p) => p.theme.rule};

  &:last-child {
    border-bottom: 1px solid ${(p) => p.theme.ruleStrong};
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`;

const Named = styled.div`
  display: grid;
  gap: 0.4rem;
  justify-items: start;
  align-content: start;

  h3 {
    font-size: ${(p) => p.theme.type.d4};
    line-height: 1.15;
  }
`;

const Detail = styled.div`
  p {
    max-width: 54ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }

  ${TagRow} {
    margin-top: 0.7rem;
  }
`;

/**
 * The tooling list is set as a run of mono terms rather than a bulleted column.
 * These are command names; they read as a shell history, which is what they are.
 */
const Tools = styled.div`
  margin-top: ${(p) => p.theme.space.block};
  padding-top: 1.1rem;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
`;

const ToolRow = styled.ul`
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1.25rem;
`;

const Tool = styled.li`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  color: ${(p) => p.theme.ink};
  letter-spacing: 0.02em;

  &::before {
    content: '$';
    margin-right: 0.45rem;
    color: ${(p) => p.theme.graphite};
  }
`;

const Note = styled.p`
  margin-top: 1.5rem;
  max-width: 60ch;
  font-size: ${(p) => p.theme.type.small};
  color: ${(p) => p.theme.graphite};
`;

/**
 * The one place on this page a result is printed large. It is set as a
 * definition list rather than as three "stat cards", because these are two
 * facts with sources, not a dashboard - and because a card would put a box
 * around a number whose whole credibility comes from naming the event beside it.
 */
const Standing = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 1.5rem clamp(1.5rem, 4vw, 3rem);
  margin-bottom: ${(p) => p.theme.space.block};
  padding: 1.35rem 0;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  border-bottom: 1px solid ${(p) => p.theme.rule};

  div {
    display: grid;
    gap: 0.4rem;
    align-content: start;
  }

  dd {
    font-family: ${(p) => p.theme.font.display};
    font-size: ${(p) => p.theme.type.d4};
    font-weight: ${(p) => p.theme.displayWeight};
    line-height: 1.1;
    color: ${(p) => p.theme.ink};
  }
`;

/** The team is the subject of the section, so it carries the seal. */
const Team = styled.div`
  dd {
    color: ${(p) => p.theme.seal};
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.small};
    font-weight: 500;
    letter-spacing: 0.06em;
  }
`;

export default function Practice() {
  return (
    <Band id="practice">
      <Shell>
        <Reveal>
          <Opener>
            <h2>The security work that isn’t a repository.</h2>
            <SectionRule index="02" name={`Practice - ${categories.length} categories`} />
            <p>
              Capture-the-flag events and lab machines, which is where most of the offensive-security
              side of this record comes from. Two results below, each attached to the event that
              produced it — and no solve counts, because those prove nothing from outside.
            </p>
          </Opener>
        </Reveal>

        <Reveal>
          <Standing>
            <Team>
              <Meta as="dt">Team</Meta>
              <dd>{practice.team.name}</dd>
              <Meta as="span">
                {practice.team.role} · since {practice.team.from}
              </Meta>
            </Team>

            {practice.standing.map((item) => (
              <div key={item.label}>
                <Meta as="dt">{item.label}</Meta>
                <dd>{item.value}</dd>
                <Meta as="span">{item.when}</Meta>
              </div>
            ))}
          </Standing>
        </Reveal>

        <Split>
          <div>
            <Rows>
              {categories.map((entry, i) => (
                <Row key={entry.id}>
                  <Reveal delay={Math.min(i, 3) * 0.04}>
                    <Named>
                      <h3>{entry.heading}</h3>
                      <Meta as="span">{entry.kind}</Meta>
                    </Named>
                  </Reveal>

                  <Reveal delay={Math.min(i, 3) * 0.04 + 0.04}>
                    <Detail>
                      <p>{entry.note}</p>
                      <TagRow>
                        {entry.items.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </TagRow>
                    </Detail>
                  </Reveal>
                </Row>
              ))}
            </Rows>
          </div>

          <Reveal delay={0.06}>
            <Plate>
              <Diagram kind="chain" />
            </Plate>
          </Reveal>
        </Split>

        <Reveal>
          <Tools>
            <Meta $seal>Tooling</Meta>
            <ToolRow>
              {tooling.map((tool) => (
                <Tool key={tool}>{tool}</Tool>
              ))}
            </ToolRow>
            <Note>
              {practice.note}{' '}
              {practice.writeups ? (
                <Quiet href={practice.writeups} target="_blank" rel="noopener noreferrer">
                  Writeups
                </Quiet>
              ) : null}
            </Note>
          </Tools>
        </Reveal>
      </Shell>
    </Band>
  );
}
