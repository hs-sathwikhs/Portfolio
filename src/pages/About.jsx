import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin: 0 auto;
`;

const AboutText = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.primary};
  }

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutImage
          src="/your-photo.jpg"
          alt="Your Name"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
        <AboutText
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>About Me</h2>
          <p>
            Hello! I'm [Your Name], a passionate Full Stack Developer with X years
            of experience in building web applications. I specialize in JavaScript,
            React, Node.js, and modern web technologies.
          </p>
          <p>
            My journey in software development began [your story here]. I'm
            constantly learning and exploring new technologies to create better
            user experiences and more efficient solutions.
          </p>
          <p>
            When I'm not coding, you can find me [your interests/hobbies].
            I believe in [your professional philosophy or values].
          </p>
        </AboutText>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;