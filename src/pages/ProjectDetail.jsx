import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Shell,
  Meta,
  SectionRule,
  TagRow,
  Tag,
  Action,
  Absent,
  Prose,
  Quiet,
} from '../components/ui/Primitives';
import Reveal from '../components/ui/Reveal';
import Diagram from '../components/Diagram';
import { projects, findProject } from '../data/projects';

/**
 * One record per project.
 *
 * The old version of this page held its own hard-coded array of three projects
 * that existed nowhere else on the site, so /project/4 served something that
 * was never real. This page reads the same list as everything else, and a key
 * that does not resolve says so.
 */

const Head = styled.header`
  padding-block: clamp(6.5rem, 15vh, 9rem) 0;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => p.theme.graphite};
  text-decoration: none;
  transition: color var(--dur-hover) var(--ease-out);

  &::before {
    content: '';
    width: 1.1rem;
    height: 1px;
    background: currentColor;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${(p) => p.theme.seal};
    }
  }
`;

const Title = styled.h1`
  margin-top: 1.5rem;
  font-size: ${(p) => p.theme.type.d2};
  max-width: 24ch;
`;

const Summary = styled.p`
  margin-top: 1.25rem;
  max-width: 54ch;
  font-family: ${(p) => p.theme.font.display};
  font-size: ${(p) => p.theme.type.d4};
  font-weight: ${(p) => p.theme.displayWeight};
  line-height: 1.35;
  color: ${(p) => p.theme.ink};
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  margin-top: clamp(1.5rem, 3.5vh, 2rem);
`;

/** The diagram is the largest thing on the page, because it explains the most. */
const Figure = styled.figure`
  margin-top: clamp(2.5rem, 6vh, 3.5rem);
  border: 1px solid ${(p) => p.theme.ruleStrong};
  background: ${(p) => p.theme.paper2};
  padding: clamp(1rem, 3vw, 2.25rem);

  figcaption {
    margin-top: 1rem;
    padding-top: 0.85rem;
    border-top: 1px solid ${(p) => p.theme.rule};
    max-width: 62ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
  margin-top: clamp(3rem, 7vh, 4.5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * Each block is wrapped in its own Reveal, so the blocks are never siblings and
 * an `& + &` rule on Block would never match. The spacing lives on the column
 * that holds the wrappers instead.
 */
const Blocks = styled.div`
  > * + * {
    margin-top: clamp(2.5rem, 6vh, 3.5rem);
  }
`;

const Block = styled.section`
  h2 {
    font-size: ${(p) => p.theme.type.d3};
    margin-bottom: 1.1rem;
  }
`;

/**
 * Where a repository's README claims more than its code delivers, this is where
 * the difference is stated - in the main column, at the same weight as the rest
 * of the record, not as a footnote in the sidebar.
 *
 * It carries the seal on a left rule rather than a tinted "warning" panel. A
 * warning panel would read as an apology, and this is not one: it is the same
 * kind of statement as every other block on the page, which is the point. A
 * reader who opens the source and finds the gap themselves has learned
 * something worse than the gap.
 */
const Stated = styled.section`
  border-left: 2px solid ${(p) => p.theme.seal};
  padding-left: clamp(1rem, 2.5vw, 1.5rem);

  h2 {
    font-size: ${(p) => p.theme.type.d4};
    margin-bottom: 0.85rem;
  }

  p {
    max-width: 62ch;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }
`;

const Side = styled.aside`
  display: grid;
  gap: 1.5rem;
  align-content: start;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  padding-top: 1.25rem;

  section {
    display: grid;
    gap: 0.6rem;
  }
`;

/** Line items on a specification, not bullet points. */
const List = styled.ul`
  display: grid;
  gap: 0.7rem;
  border-top: 1px solid ${(p) => p.theme.rule};

  li {
    display: grid;
    grid-template-columns: 2.25rem minmax(0, 1fr);
    gap: 0.5rem;
    padding-top: 0.7rem;
    border-bottom: 1px solid ${(p) => p.theme.rule};
    padding-bottom: 0.7rem;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.ink};
  }
`;

const Ends = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-block: clamp(3.5rem, 8vh, 5rem) ${(p) => p.theme.space.section};
  border-block: 1px solid ${(p) => p.theme.ruleStrong};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    row-gap: 0;
  }
`;

const End = styled(Link)`
  display: grid;
  gap: 0.5rem;
  padding: clamp(1.25rem, 3vh, 1.75rem) 0;
  text-decoration: none;
  transition: background-color var(--dur-hover) var(--ease-out);

  &:last-child {
    text-align: right;
    justify-items: end;

    @media (max-width: 560px) {
      text-align: left;
      justify-items: start;
      border-top: 1px solid ${(p) => p.theme.rule};
    }
  }

  b {
    font-family: ${(p) => p.theme.font.display};
    font-weight: ${(p) => p.theme.displayWeight};
    font-size: ${(p) => p.theme.type.d4};
    transition: color var(--dur-hover) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${(p) => p.theme.paperInk};
    }

    &:hover b {
      color: ${(p) => p.theme.seal};
    }
  }
`;

const Missing = styled.section`
  padding-block: clamp(7rem, 18vh, 11rem) ${(p) => p.theme.space.section};
  display: grid;
  gap: 1.25rem;
  justify-items: start;

  p {
    max-width: 48ch;
    color: ${(p) => p.theme.graphite};
  }
`;

const LABELS = { source: 'Source', live: 'Live site' };

export default function ProjectDetail() {
  const { id } = useParams();
  const project = findProject(id);

  if (!project) {
    return (
      <Shell>
        <Missing>
          <Meta $seal>No such record</Meta>
          <h1>That project is not in the index.</h1>
          <p>
            {projects.length} projects are on file, and <code>{id}</code> is not one of them. The
            index lists all of them.
          </p>
          <Action as={Link} to="/projects" $primary>
            Open the index
          </Action>
        </Missing>
      </Shell>
    );
  }

  const at = projects.findIndex((p) => p.id === project.id);
  const prev = at > 0 ? projects[at - 1] : null;
  const next = at < projects.length - 1 ? projects[at + 1] : null;

  return (
    <Shell>
      <Head>
        <Back to="/projects">All projects</Back>
        <Title>{project.title}</Title>
        <Summary>{project.summary}</Summary>

        <Links>
          {project.links.map((link) =>
            link.href ? (
              <Action
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                $primary={link.kind === 'live'}
              >
                {LABELS[link.kind]}
              </Action>
            ) : (
              <Absent key={link.kind}>{link.unavailable}</Absent>
            ),
          )}
        </Links>
      </Head>

      <Reveal>
        <Figure>
          <Diagram kind={project.diagram} />
          <figcaption>How it is put together, drawn rather than described.</figcaption>
        </Figure>
      </Reveal>

      <Body>
        <Blocks>
          <Reveal>
            <Block>
              <h2>What it is</h2>
              <Prose>
                {project.brief.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </Prose>
            </Block>
          </Reveal>

          <Reveal>
            <Block>
              <h2>What it does</h2>
              <List>
                {project.work.map((line, i) => (
                  <li key={line}>
                    <Meta as="span">{String(i + 1).padStart(2, '0')}</Meta>
                    <span>{line}</span>
                  </li>
                ))}
              </List>
            </Block>
          </Reveal>

          {project.caveat ? (
            <Reveal>
              <Stated>
                <h2>What it doesn’t do yet</h2>
                <p>{project.caveat}</p>
              </Stated>
            </Reveal>
          ) : null}

          <Reveal>
            <Block>
              <h2>The problem, and what it cost</h2>
              <Prose>
                <p>{project.problem}</p>
              </Prose>
            </Block>
          </Reveal>
        </Blocks>

        <Side>
          <section>
            <Meta $seal>Domain</Meta>
            <SectionRule index={String(at + 1).padStart(2, '0')} name={project.domain} />
          </section>

          <section>
            <Meta>Built with</Meta>
            <TagRow>
              {project.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </TagRow>
          </section>

          {project.context ? (
            <section>
              <Meta>Context</Meta>
              <p style={{ fontSize: '0.875rem' }}>{project.context}</p>
            </section>
          ) : null}

          <section>
            <Meta>Availability</Meta>
            {project.links.map((link) => (
              <p key={link.kind} style={{ fontSize: '0.875rem' }}>
                {link.href ? (
                  <Quiet href={link.href} target="_blank" rel="noopener noreferrer">
                    {LABELS[link.kind]}
                  </Quiet>
                ) : (
                  <Absent>{link.unavailable}</Absent>
                )}
              </p>
            ))}
          </section>
        </Side>
      </Body>

      <Ends aria-label="Adjacent projects">
        {prev ? (
          <End to={`/project/${prev.slug}`}>
            <Meta>Previous</Meta>
            <b>{prev.title}</b>
          </End>
        ) : (
          <span />
        )}
        {next ? (
          <End to={`/project/${next.slug}`}>
            <Meta>Next</Meta>
            <b>{next.title}</b>
          </End>
        ) : (
          <span />
        )}
      </Ends>
    </Shell>
  );
}
