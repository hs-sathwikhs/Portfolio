import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import { 
  FaReact, FaNodeJs, FaHtml5, FaJs,
  FaGitAlt, FaNetworkWired, 
  FaRobot , FaHardHat  
} from 'react-icons/fa';
import { SiExpress, SiSolidity, SiMongodb } from 'react-icons/si';

const SkillsSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.background};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2070&auto=format&fit=crop') no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.02;
    z-index: 0;
  }
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    ${props => props.theme.primary}22 0%,
    ${props => props.theme.primary}11 40%,
    transparent 70%
  );
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
  
  &.orb1 {
    top: 10%;
    left: 5%;
  }
  
  &.orb2 {
    bottom: 10%;
    right: 5%;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, rgba(157, 78, 221, 0.2), rgba(157, 78, 221, 1), rgba(157, 78, 221, 0.2));
    border-radius: 3px;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 2rem auto 3rem auto;
  color: ${props => props.theme.textSecondary};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SkillCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled(motion.button)`
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.textSecondary};
  border: 2px solid ${props => props.active ? props.theme.primary : props.theme.border};
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.primary};
    opacity: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.active ? 'white' : props.theme.primary};
    border-color: ${props => props.theme.primary};
    
    &::before {
      opacity: ${props => props.active ? 0 : 0.1};
      transform: translateX(0);
    }
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.primary}33, ${props => props.theme.primary});
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    &::before {
      transform: scaleX(1);
    }
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.theme.primary}22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: ${props => props.theme.primary};
  margin-right: 1rem;
  transition: all 0.3s ease;
  
  ${SkillCard}:hover & {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px ${props => props.theme.primary}66;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  color: ${props => props.theme.text};
`;

const SkillLevel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
  display: flex;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: ${props => props.theme.border};
  border-radius: 3px;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.primary}88, ${props => props.theme.primary});
  border-radius: 3px;
  width: ${props => props.progress}%;
`;

const SkillDescription = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme.textSecondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ExperienceBadge = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const SkillCardGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(157, 78, 221, 0.1) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
  
  ${SkillCard}:hover & {
    opacity: 1;
  }
`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e, cardElement) => {
    if (!cardElement) return;
    
    const rect = cardElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardElement.style.setProperty('--mouse-x', `${x}%`);
    cardElement.style.setProperty('--mouse-y', `${y}%`);
  };
  
  const categories = [
    { id: 'languages', name: 'Programming Languages' },
    { id: 'development', name: 'Frameworks & Platforms' },
    { id: 'blockchain', name: 'Blockchain & Web3' },
    { id: 'tools', name: 'Tools & Workflows' }
  ];  
  
  const skills = [
    {
      name: 'Solidity',
      icon: <SiSolidity />,
      level: 20,
      experience: '1 years',
      description: 'Expert in writing secure and efficient smart contracts on Ethereum-compatible blockchains using Solidity.',
      categories: ['blockchain', 'languages']
    },
    {
      name: 'React',
      icon: <FaReact />,
      level: 60,
      experience: '2+ years',
      description: 'Building complex user interfaces and single-page applications with React and its ecosystem.',
      categories: ['development']
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs />,
      level: 60,
      experience: '1+ years',
      description: 'Creating scalable backend services and RESTful APIs with Node.js.',
      categories: ['development']
    },
    {
      name: 'JavaScript',
      icon: <FaJs />,
      level: 60,
      experience: '1+ years',
      description: 'Proficient in modern JavaScript (ES6+) for both frontend and backend development.',
      categories: ['languages', 'blockchain']
    },
    {
      name: 'HTML5 & CSS3',
      icon: <FaHtml5 />,
      level: 90,
      experience: '6+ years',
      description: 'Creating responsive and accessible web layouts with modern HTML5 and CSS3 features.',
      categories: ['languages']
    },
    /*{
      name: 'MongoDB',
      icon: <SiMongodb />,
      level: 75,
      experience: '1+ years',
      description: 'Designing and optimizing NoSQL database schemas and queries with MongoDB.',
      categories: ['development']
    },*/
    {
      name: 'Express.js',
      icon: <SiExpress />,
      level: 65,
      experience: '2+ years',
      description: 'Building robust server-side applications and APIs with Express.js framework.',
      categories: ['development']
    },
    {
      name: 'Git & GitHub',
      icon: <FaGitAlt />,
      level: 80,
      description: 'Version control, collaboration, and CI/CD workflows using Git and GitHub.',
      categories: ['tools']
    },
    /*
    {
      name: 'Computer Networks',
      icon: <FaNetworkWired />,
      level: 80,
      description: 'Understanding of OSI model, IP addressing, routing, and networking protocols essential for backend and system design.',
      categories: ['tools']
    },*/
    {
      name: 'AI on Azure',
      icon: <FaRobot />,
      level: 35,
      description: 'Building, deploying, and managing AI models using Azure Machine Learning and Cognitive Services.',
      categories: ['tools']
    },
    {
      name: 'Hardhat',
      icon: <FaHardHat />,
      level: 30,
      description: 'Smart contract development framework for testing and deployment on Ethereum networks.',
      categories: ['blockchain']
    }    
  ];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.categories.includes(activeCategory));
  
  return (
    <SkillsSection id="skills">
      <GlowingOrb 
        className="orb1" 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <GlowingOrb 
        className="orb2" 
        animate={{ 
          x: [0, -50, 0],
          y: [0, -30, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <SectionContent>
        <ScrollReveal>
          <SectionTitle>My Skills</SectionTitle>
          <SectionDescription>
            I focus on building robust web applications and exploring emerging technologies in the blockchain space. With a foundation in both frontend and backend development, I aim to create scalable, secure, and user-friendly digital solutions.
          </SectionDescription>
        </ScrollReveal>
        
        <ScrollReveal>
          <SkillCategories>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </CategoryButton>
            ))}
          </SkillCategories>
        </ScrollReveal>
        
        <AnimatePresence mode="wait">
          <SkillsGrid
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredSkills.map((skill, index) => (
              <ScrollReveal key={skill.name} delay={index * 0.1} threshold={0.2}>
                <SkillCard
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 10px 30px rgba(157, 78, 221, 0.2)'
                  }}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                >
                  <SkillCardGlow />
                  <SkillHeader>
                    {skill.icon && <SkillIcon>{skill.icon}</SkillIcon>}
                    <SkillInfo>
                      <SkillName>{skill.name}</SkillName>
                      
                      {(skill.level || skill.experience) && (
                        <SkillLevel>
                          {typeof skill.level === 'number' && (
                            <>
                              {skill.level >= 90
                                ? 'Expert'
                                : skill.level >= 75
                                ? 'Advanced'
                                : skill.level >= 60
                                ? 'Intermediate'
                                : 'Beginner'}
                            </>
                          )}
                          {skill.experience && (
                            <ExperienceBadge>{skill.experience}</ExperienceBadge>
                          )}
                        </SkillLevel>
                      )}
                    </SkillInfo>
                  </SkillHeader>

                  {typeof skill.level === 'number' && (
                    <ProgressBarContainer>
                      <ProgressBarFill
                        progress={skill.level}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </ProgressBarContainer>
                  )}

                  {skill.description && (
                    <SkillDescription>{skill.description}</SkillDescription>
                  )}
                </SkillCard>

              </ScrollReveal>
            ))}
          </SkillsGrid>
        </AnimatePresence>
      </SectionContent>
    </SkillsSection>
  );
};

export default Skills;