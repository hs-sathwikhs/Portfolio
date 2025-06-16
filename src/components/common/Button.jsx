import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8rem 2rem;
  background: ${props => props.variant === 'outline' 
    ? 'transparent' 
    : props.theme.primary};
  color: ${props => props.variant === 'outline' 
    ? props.theme.primary 
    : props.theme.text};
  border: 2px solid ${props => props.theme.primary};
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'outline' 
      ? props.theme.primary 
      : props.theme.secondary};
    color: ${props => props.variant === 'outline' 
      ? 'white' 
      : props.theme.text};
    transform: translateY(-2px);
  }
`;

export default Button;