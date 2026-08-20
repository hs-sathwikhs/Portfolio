import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * Shared primitives. Everything on this site is built from these, so the page
 * has one measure, one hairline weight, and one label style rather than a
 * dozen near-misses.
 */

export const Shell = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.maxw};
  margin: 0 auto;
  padding-inline: ${(p) => p.theme.space.gutter};
`;

export const Band = styled.section`
  position: relative;
  padding-block: ${(p) => p.theme.space.section};
  background: ${(p) => (p.$recessed ? p.theme.paper2 : p.theme.paper)};
  border-top: 1px solid ${(p) => p.theme.rule};
`;

/**
 * Mono, letterspaced, uppercase - used for real metadata only: field names,
 * counts, dates, coordinates, domains. Never as a decorative badge above a
 * heading.
 */
export const Meta = styled.span`
  display: inline-block;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.label};
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${(p) => (p.$seal ? p.theme.seal : p.theme.graphite)};
  font-variant-numeric: tabular-nums;
`;

/** Section opener: the mono field name sits beside the rule, under the title. */
export const Opener = styled.header`
  display: grid;
  gap: 1rem;
  margin-bottom: ${(p) => p.theme.space.block};

  h2 {
    max-width: 22ch;
  }

  p {
    max-width: 58ch;
    color: ${(p) => p.theme.graphite};
    font-size: ${(p) => p.theme.type.lead};
  }
`;

/** A numbered rule that carries the section's index and name. */
const RuleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${(p) => p.theme.rule};
    transform: translateY(-0.25em);
  }
`;

export function SectionRule({ index, name }) {
  return (
    <RuleRow>
      <Meta $seal>{index}</Meta>
      <Meta>{name}</Meta>
    </RuleRow>
  );
}

SectionRule.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const Prose = styled.div`
  max-width: 68ch;

  p + p {
    margin-top: 1.15em;
  }

  p {
    color: ${(p) => p.theme.graphite};
  }

  strong {
    color: ${(p) => p.theme.ink};
    font-weight: 600;
  }
`;

/* Actions ---------------------------------------------------------------- */

const actionBase = css`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.72rem 1.2rem;
  border-radius: ${(p) => p.theme.radius.sm};
  font-size: ${(p) => p.theme.type.small};
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--dur-hover) var(--ease-out),
    border-color var(--dur-hover) var(--ease-out),
    color var(--dur-hover) var(--ease-out),
    transform var(--dur-press) var(--ease-out);

  &:active {
    transform: translateY(1px);
  }

  svg {
    flex-shrink: 0;
  }
`;

/**
 * Two levels only. A filled seal for the one thing worth doing on a page, and
 * a ruled outline for everything else. There is no third variant, because a
 * third variant is how a page ends up with no primary action at all.
 */
export const Action = styled.a`
  ${actionBase};

  ${(p) =>
    p.$primary
      ? css`
          background: ${p.theme.seal};
          color: ${p.theme.sealInk};
          border: 1px solid ${p.theme.seal};

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: ${p.theme.ink};
              border-color: ${p.theme.ink};
              color: ${p.theme.paper};
            }
          }
        `
      : css`
          background: transparent;
          color: ${p.theme.ink};
          border: 1px solid ${p.theme.ruleStrong};

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: ${p.theme.paperInk};
              border-color: ${p.theme.ink};
            }
          }
        `};
`;

export const ActionButton = styled.button`
  ${actionBase};
  background: ${(p) => p.theme.seal};
  color: ${(p) => p.theme.sealInk};
  border: 1px solid ${(p) => p.theme.seal};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background: ${(p) => p.theme.ink};
      border-color: ${(p) => p.theme.ink};
      color: ${(p) => p.theme.paper};
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: transparent;
    color: ${(p) => p.theme.graphite};
    border-color: ${(p) => p.theme.rule};
  }
`;

/** A destination that does not exist yet, stated rather than faked. */
export const Absent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  color: ${(p) => p.theme.graphite};
  letter-spacing: 0.02em;

  &::before {
    content: '';
    width: 0.6rem;
    height: 1px;
    background: ${(p) => p.theme.ruleStrong};
  }
`;

/** Underline that grows from the leading edge - used on all inline links. */
export const Quiet = styled.a`
  position: relative;
  color: ${(p) => p.theme.ink};
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: ${(p) => p.theme.seal};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur-hover) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      transform: scaleX(1);
    }
  }

  @media (hover: none) {
    &::after {
      transform: scaleX(1);
      background: ${(p) => p.theme.rule};
    }
  }
`;

export const TagRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.15rem;
`;

export const Tag = styled.li`
  font-family: ${(p) => p.theme.font.mono};
  font-size: ${(p) => p.theme.type.micro};
  color: ${(p) => p.theme.graphite};
  letter-spacing: 0.02em;
`;
