import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${props => props.theme.surface};
  padding: 2rem;
  margin-top: auto;
  border-top: 1px solid rgba(157, 78, 221, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;

  a {
    color: ${props => props.theme.textSecondary};
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.textSecondary};
  text-align: center;
  font-size: 0.9rem;
`;

const MadeWith = styled.p`
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  svg {
    color: ${props => props.theme.primary};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <a href="https://github.com/sathwikhs17" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/sathwikhs17" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/sathwikhs17" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/sathwikhs17" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </SocialLinks>
        <Copyright>
          © {currentYear} Sathwik HS. All rights reserved.
        </Copyright>
        <MadeWith>
          Made with <FaHeart /> in Bengaluru, India
        </MadeWith>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;