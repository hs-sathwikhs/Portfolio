import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Shell, Band, Meta, Opener, SectionRule, TagRow, Tag, Quiet } from '../ui/Primitives';
import Reveal from '../ui/Reveal';
import { record, activities, education, coursework } from '../../data/timeline';

/**
 * The record: what has actually happened, in the order it happened.
 *
 * Set as a ledger with the dates in mono down the left, because dates are
 * measurements and they need to line up. No connecting spine with animated
 * dots - the alignment does that work, and it survives a narrow screen.
 *
 * Three groups rather than two. The CTF team is neither an appointment nor a
 * degree, and filing it under either would misstate what it is - so it gets its
 * own group, placed first because it is the only entry still running.
 */

const Group = styled.div`
  & + & {
    margin-top: ${(p) => p.theme.space.block};
  }
`;

const GroupHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${(p) => p.theme.ruleStrong};

  &::after {
    content: '';
    flex: 1;
  }
`;

const Rows = styled.ol``;

const Row = styled.li`
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  padding-block: clamp(1.5rem, 3.5vh, 2.25rem);
  border-bottom: 1px solid ${(p) => p.theme.rule};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const When = styled.div`
  display: grid;
  gap: 0.4rem;
  justify-items: start;
  align-content: start;

  @media (max-width: 720px) {
    grid-auto-flow: column;
    justify-content: start;
    gap: 1rem;
  }
`;

const Span = styled.time`
  font-size: ${(p) => p.theme.type.small};
  font-weight: 500;
  color: ${(p) => p.theme.ink};
  letter-spacing: 0.01em;
`;

const Current = styled(Meta)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: ${(p) => p.theme.seal};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${(p) => p.theme.seal};
  }
`;

const What = styled.div`
  display: grid;
  gap: 0.6rem;

  h3 {
    font-size: ${(p) => p.theme.type.d4};
    max-width: 30ch;
  }

  p {
    max-width: 62ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }
`;

const Org = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.9rem;
  align-items: baseline;
  font-size: ${(p) => p.theme.type.small};
  color: ${(p) => p.theme.ink};
`;

/**
 * Named courses taken outside the degree. Set as a plain row rather than as a
 * fourth ledger group, because these have no dates to line up and no detail
 * worth a paragraph - a self-paced course is a fact about what was studied, not
 * an entry in a record of appointments. Listing them at the same visual weight
 * as the internship would overstate them.
 */
const Course = styled.div`
  margin-top: ${(p) => p.theme.space.block};
  padding-top: 1.1rem;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
`;

const CourseRow = styled.ul`
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;

  li {
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.ink};
  }

  /* A rule between terms rather than a bullet, matching the ledger's dividers. */
  li + li::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 0.75em;
    margin-right: 1.1rem;
    background: ${(p) => p.theme.rule};
    vertical-align: -0.05em;
  }
`;

function Entries({ items }) {
  return (
    <Rows>
      {items.map((item, i) => (
        <Row key={`${item.org}-${item.from}`}>
          <Reveal delay={Math.min(i, 3) * 0.04}>
            <When>
              <Span>
                {item.from} - {item.to}
              </Span>
              {item.current ? <Current as="span">Current</Current> : null}
            </When>
          </Reveal>

          <Reveal delay={Math.min(i, 3) * 0.04 + 0.04}>
            <What>
              <h3>{item.role}</h3>
              <Org>
                {item.href ? (
                  <Quiet href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.org}
                  </Quiet>
                ) : (
                  <span>{item.org}</span>
                )}
                <Meta>{item.place}</Meta>
              </Org>
              <p>{item.detail}</p>
              {item.tags.length > 0 ? (
                <TagRow>
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagRow>
              ) : null}
            </What>
          </Reveal>
        </Row>
      ))}
    </Rows>
  );
}

Entries.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      org: PropTypes.string.isRequired,
      href: PropTypes.string,
      place: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      current: PropTypes.bool,
      detail: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default function Record() {
  return (
    <Band id="record" $recessed>
      <Shell>
        <Reveal>
          <Opener>
            <h2>Where the work has been done.</h2>
            <SectionRule index="03" name="Record" />
            <p>
              Dates are written as they can be substantiated. Anything still running says
              “present” rather than guessing at an end — and anything that has finished says so,
              in the past tense, even where “present” would read better.
            </p>
          </Opener>
        </Reveal>

        <Group>
          <GroupHead>
            <Meta $seal>Ongoing</Meta>
            <Meta>{activities.length}</Meta>
          </GroupHead>
          <Entries items={activities} />
        </Group>

        <Group>
          <GroupHead>
            <Meta $seal>Appointments</Meta>
            <Meta>{record.length}</Meta>
          </GroupHead>
          <Entries items={record} />
        </Group>

        <Group>
          <GroupHead>
            <Meta $seal>Education</Meta>
            <Meta>{education.length}</Meta>
          </GroupHead>
          <Entries items={education} />
        </Group>

        <Reveal>
          <Course>
            <Meta $seal>Coursework, outside the degree</Meta>
            <CourseRow>
              {coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </CourseRow>
          </Course>
        </Reveal>
      </Shell>
    </Band>
  );
}
