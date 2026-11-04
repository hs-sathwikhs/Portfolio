import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getBreadcrumbs } from '../data/seo';

const Trail = styled.nav`
  margin-bottom: 1.5rem;
  color: ${(p) => p.theme.graphite};
  font-size: ${(p) => p.theme.type.small};
  ol { display: flex; flex-wrap: wrap; gap: .4rem .7rem; align-items: baseline; }
  li { display: flex; align-items: baseline; gap: .7rem; }
  li + li::before { content: '/'; opacity: .6; }
  a { text-decoration: none; padding-block: .5rem; }
  a:hover { text-decoration: underline; }
  [aria-current] { color: ${(p) => p.theme.ink}; }
`;

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const items = getBreadcrumbs(pathname);
  if (!items.length) return null;
  return <Trail aria-label="Breadcrumb"><ol>{items.map((item, index) => (
    <li key={item.path}>{index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}</li>
  ))}</ol></Trail>;
}
