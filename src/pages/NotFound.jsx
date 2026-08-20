import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Shell, Meta, Action, Quiet } from '../components/ui/Primitives';

/**
 * A 404 that tells you where you are and where the four real destinations are,
 * rather than a large sad number and a button labelled "Go Home".
 */

const Block = styled.section`
  padding-block: clamp(7rem, 18vh, 11rem) ${(p) => p.theme.space.section};
  display: grid;
  gap: 1.35rem;
  justify-items: start;

  h1 {
    max-width: 20ch;
  }

  p {
    max-width: 50ch;
    color: ${(p) => p.theme.graphite};
  }
`;

const Where = styled.dl`
  margin-top: 0.75rem;
  border-top: 1px solid ${(p) => p.theme.ruleStrong};
  width: 100%;
  max-width: 30rem;

  div {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.5rem;
    padding-block: 0.8rem;
    border-bottom: 1px solid ${(p) => p.theme.rule};
  }

  dd {
    font-size: ${(p) => p.theme.type.small};
  }
`;

const PLACES = [
  { name: 'Work', to: '/#work' },
  { name: 'Record', to: '/#record' },
  { name: 'Stack', to: '/#stack' },
  { name: 'Contact', to: '/#contact' },
  { name: 'All projects', to: '/projects' },
];

export default function NotFound() {
  return (
    <Shell>
      <Block>
        <Meta $seal>404 - no record at this address</Meta>
        <h1>There is nothing filed here.</h1>
        <p>
          The address you followed does not correspond to anything on this site. It may have been a
          route on the previous version - the sections it used to hold are listed below.
        </p>

        <Where>
          {PLACES.map(({ name, to }) => (
            <div key={to}>
              <Meta as="dt">{name}</Meta>
              <dd>
                <Quiet as={Link} to={to}>
                  {to}
                </Quiet>
              </dd>
            </div>
          ))}
        </Where>

        <Action as={Link} to="/" $primary>
          Back to the top of the record
        </Action>
      </Block>
    </Shell>
  );
}
