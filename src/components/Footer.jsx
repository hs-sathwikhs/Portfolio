import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shell, Meta, Quiet } from './ui/Primitives';
import { profile } from '../data/profile';

/**
 * A colophon, not a link farm. Three columns of real information - where the
 * work is made, what it contains, where else it lives - and a closing line of
 * the kind a printed record carries and a website usually forgets.
 */

const Foot = styled.footer`
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  background: ${(p) => p.theme.paper2};
  padding-block: clamp(3rem, 7vh, 4.5rem) 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1.4fr 1fr 1fr;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Signature = styled.div`
  @media (max-width: 760px) {
    grid-column: 1 / -1;
  }

  b {
    display: block;
    font-family: ${(p) => p.theme.font.display};
    font-weight: ${(p) => p.theme.displayWeightBold};
    font-size: ${(p) => p.theme.type.d4};
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: ${(p) => p.theme.ink};
  }

  address {
    margin-top: 0.75rem;
    font-style: normal;
    display: grid;
    gap: 0.35rem;
    justify-items: start;
  }
`;

const Column = styled.nav`
  display: grid;
  gap: 0.85rem;
  align-content: start;

  ul {
    display: grid;
    gap: 0.55rem;
  }

  li {
    font-size: ${(p) => p.theme.type.small};
    color: ${(p) => p.theme.graphite};
  }

  a {
    color: ${(p) => p.theme.graphite};
    text-decoration: none;
    transition: color var(--dur-hover) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: ${(p) => p.theme.ink};
      }
    }
  }
`;

const Handle = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  color: ${(p) => p.theme.graphite};
  margin-left: 0.4rem;
`;

const Rule = styled.div`
  height: 1px;
  background: ${(p) => p.theme.rule};
  margin-block: clamp(2.5rem, 6vh, 3.5rem) 1.25rem;
`;

const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.75rem;
  align-items: baseline;
`;

const Colophon = styled.p`
  margin-left: auto;
  max-width: 44ch;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  line-height: 1.65;
  color: ${(p) => p.theme.graphite};

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const SECTIONS = [
  { label: 'Work', to: '/#work' },
  { label: 'Record', to: '/#record' },
  { label: 'Stack', to: '/#stack' },
  { label: 'Contact', to: '/#contact' },
  { label: 'All projects', to: '/projects' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Foot>
      <Shell>
        <Grid>
          <Signature>
            <b>{profile.name}</b>
            <address>
              <Meta>{profile.city}</Meta>
              <Meta>{profile.coordinates}</Meta>
            </address>
          </Signature>

          <Column aria-label="Sections">
            <Meta>Index</Meta>
            <ul>
              {SECTIONS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column aria-label="Elsewhere">
            <Meta>Elsewhere</Meta>
            <ul>
              {profile.social.map(({ label, handle, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                    <Handle>{handle}</Handle>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            </ul>
          </Column>
        </Grid>

        <Rule />

        <Base>
          <Meta>
            © {year} {profile.name}
          </Meta>
          <Meta>
            Source on{' '}
            <Quiet
              href="https://github.com/hs-sathwikhs/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Quiet>
          </Meta>
        </Base>
      </Shell>
    </Foot>
  );
}
