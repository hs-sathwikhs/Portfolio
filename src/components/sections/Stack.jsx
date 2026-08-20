import styled from 'styled-components';
import { Shell, Band, Meta, Opener, SectionRule } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
import { stack } from '../../data/stack';

/**
 * What has been used, and what it was used for.
 *
 * The old version of this section had animated percentage bars - Solidity at
 * 20% under a caption calling it expert-level. There is no honest number to put
 * there, so there is no number: each group states where the tools were actually
 * applied, which is a claim that can be checked against the work above.
 *
 * Set as a ledger rather than a card grid, for the same reason Record is. Five
 * groups into an auto-fit grid leaves a short last row, and every rule in it
 * then stops at a different height because the columns hold different amounts
 * of text. Full-width rows cannot go ragged.
 */

const Rows = styled.ol`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  padding-block: clamp(1.5rem, 3.5vh, 2.25rem);
  border-bottom: 1px solid ${(p) => p.theme.rule};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const Named = styled.div`
  display: grid;
  gap: 0.5rem;
  justify-items: start;
  align-content: start;

  h3 {
    font-size: ${(p) => p.theme.type.d4};
    line-height: 1.15;
  }
`;

const Applied = styled.div`
  /* The note is the claim being made; it earns a prose measure. */
  > p {
    max-width: 52ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }
`;

/** Items flow into even columns inside the row, the way a schedule sets them. */
const Items = styled.ul`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 0.5rem 1.5rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 1.35rem minmax(0, 1fr);
  align-items: baseline;
  font-size: ${(p) => p.theme.type.small};
  color: ${(p) => p.theme.ink};

  /* A ruled leader, the way a line item is set on a printed schedule. */
  &::before {
    content: '';
    width: 0.7rem;
    height: 1px;
    background: ${(p) => p.theme.ruleStrong};
    transform: translateY(-0.3em);
  }
`;

export default function Stack() {
  const total = stack.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Band id="stack">
      <Shell>
        <Reveal>
          <Opener>
            <h2>Tools, grouped by what they were used to build.</h2>
            <SectionRule index="04" name={`Stack - ${total} entries`} />
            <p>
              No proficiency percentages. Every group below points at work on this page, which is a
              claim you can check rather than one you have to take on trust.
            </p>
          </Opener>
        </Reveal>

        <Rows>
          {stack.map((group, i) => (
            <Row key={group.id}>
              <Reveal delay={Math.min(i, 3) * 0.04}>
                <Named>
                  <h3>{group.heading}</h3>
                  <Meta as="span">
                    {group.items.length} {group.items.length === 1 ? 'entry' : 'entries'}
                  </Meta>
                </Named>
              </Reveal>

              <Reveal delay={Math.min(i, 3) * 0.04 + 0.04}>
                <Applied>
                  <p>{group.note}</p>
                  <Items>
                    {group.items.map((item) => (
                      <Item key={item}>
                        <span>{item}</span>
                      </Item>
                    ))}
                  </Items>
                </Applied>
              </Reveal>
            </Row>
          ))}
        </Rows>
      </Shell>
    </Band>
  );
}
