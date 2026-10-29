import styled from 'styled-components';
import { profile } from '../../data/profile';

const Note = styled.aside`
  margin-top: 1.25rem; padding-left: .85rem;
  border-left: 2px solid ${(p) => p.theme.seal};
  font-size: .8rem; line-height: 1.6;
  strong { display: block; font-weight: 500; color: ${(p) => p.theme.seal}; }
  span { display: block; color: ${(p) => p.theme.graphite}; }
`;

export default function Availability() {
  return <Note aria-label="Career opportunities">
    <strong>{profile.availability}</strong>
    <span>{profile.opportunity}</span>
  </Note>;
}
