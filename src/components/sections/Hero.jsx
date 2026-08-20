import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { Shell, Meta, Action } from '../ui/Primitives';
import { profile } from '../../data/profile';

/**
 * The head of a record, not a stage.
 *
 * Everything the old hero used to say with motion - a particle field, a
 * rotating gradient, three floating shapes, a typewriter cycling three job
 * titles - is said here by type size and one line of provenance instead. The
 * only movement is the entry, and it happens once.
 */

const Head = styled.section`
  position: relative;
  padding-block: clamp(7.5rem, 18vh, 11rem) clamp(3rem, 7vh, 4.5rem);
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: end;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: clamp(2.25rem, 6vh, 3rem);
  }
`;

/**
 * The Didone's own italic carries the discipline line, so the two halves of the
 * name read as one written gesture rather than two type choices.
 */
const Title = styled(motion.h1)`
  line-height: 0.94;
  max-width: 18ch;

  i {
    font-style: italic;
    font-weight: inherit;
  }
`;

const Lead = styled(motion.p)`
  margin-top: clamp(1.5rem, 3.5vh, 2.25rem);
  max-width: 34ch;
  font-family: ${(p) => p.theme.font.display};
  font-size: ${(p) => p.theme.type.d3};
  font-weight: ${(p) => p.theme.displayWeight};
  line-height: 1.28;
  letter-spacing: -0.01em;
  color: ${(p) => p.theme.ink};
  text-wrap: pretty;
`;

const Body = styled(motion.div)`
  margin-top: 1.35rem;
  max-width: 56ch;
  font-size: ${(p) => p.theme.type.body};
  color: ${(p) => p.theme.graphite};

  p + p {
    margin-top: 0.9em;
  }
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: clamp(1.75rem, 4vh, 2.5rem);
`;

const Plate = styled(motion.figure)`
  position: relative;
  width: 100%;
  max-width: 320px;
  justify-self: end;

  @media (max-width: 900px) {
    justify-self: start;
    max-width: 232px;
  }

  picture,
  img {
    display: block;
    width: 100%;
  }

  img {
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border: 1px solid ${(p) => p.theme.ruleStrong};
    /* Tone-matched to the paper rather than left as a raw camera JPEG sitting
       on top of it. No ring, no glow, no spin. */
    filter: saturate(0.88) contrast(1.03);
    background: ${(p) => p.theme.paper2};
  }

  figcaption {
    margin-top: 0.6rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const Strip = styled(motion.dl)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: clamp(3rem, 8vh, 4.5rem);
  padding-top: 1.1rem;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};

  @media (max-width: 620px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 1.35rem;
  }

  dd {
    margin-top: 0.4rem;
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.ink};
  }
`;

const Live = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  /* A filled square, not a pulsing dot. It states a fact; it is not a
     notification demanding to be dealt with. */
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: ${(p) => p.theme.seal};
  }
`;

export default function Hero() {
  const reduce = useReducedMotion();

  /** One entry, staggered by reading order. Nothing loops. */
  const rise = (delay) => ({
    initial: { opacity: 0, transform: `translateY(${reduce ? 0 : 20}px)` },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: {
      duration: reduce ? 0.2 : 0.8,
      delay: reduce ? 0 : delay,
      ease: [0.23, 1, 0.32, 1],
    },
  });

  return (
    <Head>
      <Shell>
        <Split>
          <div>
            <Title {...rise(0)}>
              {profile.name},
              <br />
              {/* The ampersand is bound to what follows it, so no line can end on
                  a conjunction left hanging in 84px Didone. */}
              <i>security</i> &amp;&nbsp;systems
            </Title>

            <Lead {...rise(0.08)}>{profile.standfirst[0]}</Lead>

            <Body {...rise(0.12)}>
              {profile.standfirst.slice(1).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </Body>

            <Actions {...rise(0.16)}>
              <Action href="#work" $primary>
                See the work
              </Action>
              <Action href={profile.resume} target="_blank" rel="noopener noreferrer">
                Résumé (PDF)
              </Action>
            </Actions>
          </div>

          <Plate {...rise(0.24)}>
            <picture>
              <source srcSet={profile.portrait.webp} type="image/webp" />
              <img
                src={profile.portrait.jpg}
                alt={profile.portrait.alt}
                width="640"
                height="800"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <figcaption>
              <Meta>{profile.mark}</Meta>
              <Meta>{profile.city}</Meta>
            </figcaption>
          </Plate>
        </Split>

        <Strip {...rise(0.32)}>
          <div>
            <Meta as="dt">Focus</Meta>
            <dd>{profile.disciplines.join(' · ')}</dd>
          </div>
          <div>
            <Meta as="dt">Based</Meta>
            <dd>{profile.city}</dd>
          </div>
          <div>
            <Meta as="dt">Status</Meta>
            <dd>
              <Live>Open to internships</Live>
            </dd>
          </div>
        </Strip>
      </Shell>
    </Head>
  );
}
