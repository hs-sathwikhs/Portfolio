import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaLink } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';

const ExperienceSection = styled.section`
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 400px;
    height: 1px;
    background: ${props => props.theme.border};
  }
`;

const Tab = styled(motion.button)`
  background: transparent;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.active ? props.theme.primary : props.theme.textSecondary};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.active ? props.theme.primary : 'transparent'};
    z-index: 1;
    transform: ${props => props.active ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.primary};
    
    &::after {
      transform: scaleX(1);
      background: ${props => props.theme.primary}66;
    }
  }
  
  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 3px;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.primary}00,
      ${props => props.theme.primary}33,
      ${props => props.theme.primary}66,
      ${props => props.theme.primary}33,
      ${props => props.theme.primary}00
    );
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${({ side }) => side === 'left' ? 'flex-end' : 'flex-start'};
  padding-right: ${({ side }) => side === 'left' ? '30px' : '0'};
  padding-left: ${({ side }) => side === 'right' ? '30px' : '0'};
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  align-self: ${({ side }) => side === 'left' ? 'flex-start' : 'flex-end'};
  margin-left: ${({ side }) => side === 'right' ? 'auto' : '0'};

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
    margin-left: 0;
  }
`;


const TimelineDot = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: ${({ side }) => side === 'left' ? 'calc(100% + 1.5px)' : '-21.5px'};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  box-shadow: 0 0 0 4px ${props => props.theme.background}, 0 0 0 6px ${props => props.theme.primary}33;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${({ side }) => side === 'left' ? 'right' : 'left'}: calc(100% + 5px);
    width: 20px;
    height: 2px;
    background: ${props => props.theme.primary}66;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    left: 20px;

    &::before {
      left: calc(100% + 5px);
      right: auto;
    }
  }
`;


const TimelineContent = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  max-width: 350px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(157, 78, 221, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.primary}33, ${props => props.theme.primary});
    border-radius: 12px 12px 0 0;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TimelineDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const TimelineSubtitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.primary};
  }
`;

const TimelineDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TimelineTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TimelineTag = styled.span`
  background: ${props => props.theme.primary}22;
  color: ${props => props.theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary}44;
    transform: translateY(-2px);
  }
`;

const TimelineLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  
  svg {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  
  &:hover {
    transform: translateX(5px);
  }
`;

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  
  const workExperience = [
    {
      title: 'Blockchain Research Intern',
      company: 'PESU C-ISFCR',
      location: 'Bengaluru, India',
      date: 'Jun2025 - Present',
      description: 'Working as a Research Intern working in the domain of Blockchain. Developing a web applications for creating and claiming certificates for courses and programs as NFTs to protect the authenticity of the certificates.',
      skills: ['Solidity', 'Blockchain', 'React', 'JavaScript'],
      link: 'https://www.isfcr.pes.edu/'
    }
  ];
  
  const education = [
    {
      title: 'Bachelor of Technology in Computer Science and Engineering',
      company: 'PES University',
      location: 'Bengaluru, India',
      date: '2023 - Present',
      description: 'Pursuing a comprehensive program covering programming fundamentals, data structures, algorithms, and software engineering principles. Working on multiple projects in various domains.',
      skills: ['Data Structures', 'Algorithms', 'Full-Stack Development', 'Python', 'Blockchain'],
      link: 'https://pes.edu/'
    },
    {
      title: 'Pre-University Course (PUC)',
      company: 'TLC PU College (A unit of CFAL)',
      location: 'Mangaluru, India',
      date: '2021 - 2023',
      description: 'Completed higher secondary education with a focus on Physics, Chemistry, Mathematics, and Statistics.',
      skills: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],
      link: 'https://tlc.edu.in/pu-college/'
    },
    {
      title: 'School',
      company: 'Mother Teresa Memorial School',
      location: 'Shankaranarayana, India',
      date: '2009 - 2021',
      description: 'Completed primary and secondary education with a focus on basic subjects.',
      /*skills: ['Physics', 'Chemistry', 'Mathematics', 'Statistics'],*/
      link: 'https://motherteresatrust.com/'
    }
  ];
  
  const displayData = activeTab === 'work' ? workExperience : education;
  const icon = activeTab === 'work' ? FaBriefcase : FaGraduationCap;
  
  return (
    <ExperienceSection id="experience">
      <SectionContent>
        <ScrollReveal>
          <SectionTitle>Experience</SectionTitle>
          <SectionDescription>
            My professional journey and educational background that have shaped my skills and expertise.
          </SectionDescription>
        </ScrollReveal>
        
        <ScrollReveal>
          <TabsContainer>
            <Tab 
              active={activeTab === 'work'} 
              onClick={() => setActiveTab('work')}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaBriefcase /> Work Experience
            </Tab>
            <Tab 
              active={activeTab === 'education'} 
              onClick={() => setActiveTab('education')}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaGraduationCap /> Education
            </Tab>
          </TabsContainer>
        </ScrollReveal>
        
        <AnimatePresence mode="wait">
          <TimelineContainer
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayData.map((item, index) => {
              const side = activeTab === 'work' ? 'left' : 'right';

              return (
                <ScrollReveal key={index} delay={index * 0.2} threshold={0.1}>
                  <TimelineItem side={side}>
                    <TimelineDot
                      side={side}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        delay: 0.2 + index * 0.1,
                      }}
                    />
                    <TimelineContent
                      initial={{ opacity: 0, x: side === 'left' ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <TimelineDate>
                        <FaCalendarAlt /> {item.date}
                      </TimelineDate>
                      <TimelineTitle>{item.title}</TimelineTitle>
                      <TimelineSubtitle>
                        <FaBuilding /> {item.company}
                      </TimelineSubtitle>
                      <TimelineSubtitle>
                        <FaMapMarkerAlt /> {item.location}
                      </TimelineSubtitle>
                      <TimelineDescription>{item.description}</TimelineDescription>

                      {item.skills?.length > 0 && (
                        <TimelineTags>
                          {item.skills.map((skill, i) => (
                            <TimelineTag key={i}>{skill}</TimelineTag>
                          ))}
                        </TimelineTags>
                      )}

                      {item.link && (
                        <TimelineLink href={item.link} target="_blank" rel="noopener noreferrer">
                          Visit Website <FaLink />
                        </TimelineLink>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                </ScrollReveal>
              );
            })}
          </TimelineContainer>
        </AnimatePresence>

      </SectionContent>
    </ExperienceSection>
  );
};

export default Experience;