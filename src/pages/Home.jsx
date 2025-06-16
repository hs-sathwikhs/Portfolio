import { motion } from 'framer-motion';
import styled from 'styled-components';
import Hero from '../components/sections/Hero';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';

const HomeContainer = styled.main`
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </HomeContainer>
  );
};

export default Home; 