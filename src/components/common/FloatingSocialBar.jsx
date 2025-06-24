import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #1c1c28ee;
  backdrop-filter: blur(10px);
  border: 1px solid #9d4edd44;
  border-radius: 28px;
  display: flex;
  gap: 1.2rem;
  padding: 0.6rem 1.2rem;
  z-index: 9999;
  box-shadow: 0 6px 24px #9d4edd22;
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;

  ${({ isHidden }) =>
    isHidden &&
    `
    transform: translate(-50%, 100px);
    opacity: 0;
  `}

  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const IconLink = styled.a`
  color: #aaa;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #9d4edd;
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FloatingSocialBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FloatingContainer isHidden={isHidden}>
      <IconLink href="https://github.com/hs-sathwikhs" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub />
      </IconLink>
      <IconLink href="https://linkedin.com/in/hs-sathwikhs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedin />
      </IconLink>
      <IconLink href="https://twitter.com/sathwikhss" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FaTwitter />
      </IconLink>
      <IconLink href="https://instagram.com/sathwikhs17" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram />
      </IconLink>
    </FloatingContainer>
  );
};

export default FloatingSocialBar;
