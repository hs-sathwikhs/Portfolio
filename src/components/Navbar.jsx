import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  background: ${props => props.theme.surface};
  padding: 0.75rem 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(157, 78, 221, 0.1); /* Subtle lavender shadow */
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(motion(Link))`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  
  &::before {
    content: '< ';
    opacity: 0.7;
  }
  
  &::after {
    content: ' />';
    opacity: 0.7;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.surface};
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    gap: 1rem;
    z-index: 1000;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.text};
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  cursor: pointer;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const MenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  margin: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Scroll to section function
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    handleLinkClick();
    
    // If we're not on the home page, navigate to home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    
    // If we're already on the home page, just scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add shadow on scroll and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow when scrolled
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Track active section
      if (location.pathname === '/') {
        const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
        
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            // If the section is in view (with some buffer for better UX)
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Animation variants
  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <Nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{ 
        boxShadow: scrolled ? '0 4px 20px rgba(157, 78, 221, 0.15)' : '0 2px 10px rgba(157, 78, 221, 0.1)',
        transition: 'box-shadow 0.3s ease'
      }}
    >
      <NavContainer>
        <Logo 
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sathwik HS
        </Logo>
        <MenuButton 
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ☰
        </MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink 
            as="a"
            href="#home"
            onClick={(e) => scrollToSection('home', e)}
            isActive={activeSection === 'home'}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Home
          </NavLink>
          <NavLink 
            as="a"
            href="#skills"
            onClick={(e) => scrollToSection('skills', e)}
            isActive={activeSection === 'skills'}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Skills
          </NavLink>
          <NavLink 
            as="a"
            href="#projects"
            onClick={(e) => scrollToSection('projects', e)}
            isActive={activeSection === 'projects' || location.pathname === '/projects'}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Projects
          </NavLink>
          <NavLink 
            as="a"
            href="#experience"
            onClick={(e) => scrollToSection('experience', e)}
            isActive={activeSection === 'experience' || location.pathname === '/experience'}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Experience
          </NavLink>
          <NavLink 
            as="a"
            href="#contact"
            onClick={(e) => scrollToSection('contact', e)}
            isActive={activeSection === 'contact' || location.pathname === '/contact'}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;