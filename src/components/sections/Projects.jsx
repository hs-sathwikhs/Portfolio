import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';
import Button from '../common/Button';

const ProjectsSection = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.theme.surface};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop') no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.02;
    z-index: -1;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion(Link))`
  background: ${props => props.theme.background};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    box-shadow: 0 15px 30px rgba(157, 78, 221, 0.3);
  }
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  ${ProjectCard}:hover &::after {
    opacity: 0.7;
    background: linear-gradient(to bottom, rgba(157, 78, 221, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  background: ${props => props.theme.background};
  position: relative;
  z-index: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.primary}, transparent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  ${ProjectCard}:hover &::before {
    transform: scaleX(1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  ${ProjectCard}:hover &::after {
    width: 100%;
  }
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  background: ${props => props.theme.primary}33;
  color: ${props => props.theme.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  ${ProjectCard}:hover & {
    background: ${props => props.theme.primary}66;
    transform: translateY(-2px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 2;
  position: relative;
  margin-top: auto;
  padding-top: 1rem;
  
  a {
    color: ${props => props.theme.textSecondary};
    font-size: 1.2rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.border};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      color: ${props => props.theme.primary};
      transform: translateY(-3px);
      background: ${props => props.theme.surface};
      box-shadow: 0 5px 15px rgba(157, 78, 221, 0.3);
    }
  }
`;

const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const ViewDetailsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

// Component to stop event propagation for links inside the card
const StopPropagation = ({ children, ...props }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/sathwikhs17/ecommerce',
      live: 'https://ecommerce-demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A productivity app for managing tasks, projects, and deadlines with team collaboration features.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032&auto=format&fit=crop',
      technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
      github: 'https://github.com/sathwikhs17/taskmanager',
      live: 'https://taskmanager-demo.com'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A weather application that provides real-time forecasts, historical data, and interactive maps.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop',
      technologies: ['JavaScript', 'Weather API', 'Chart.js', 'CSS'],
      github: 'https://github.com/sathwikhs17/weather',
      live: 'https://weather-demo.com'
    }
  ];

  return (
    <ProjectsSection id="projects">
      <SectionContent>
        <ScrollReveal>
          <SectionTitle>Featured Projects</SectionTitle>
          <SectionDescription>
            Here are some of my recent projects. Each one represents a unique challenge and learning experience.
          </SectionDescription>
        </ScrollReveal>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ScrollReveal 
              key={project.id} 
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <ProjectCard
                to={`/project/${project.id}`}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProjectImageWrapper>
                  <ProjectImage src={project.image} alt={project.title} />
                </ProjectImageWrapper>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                  <StopPropagation>
                    <ProjectLinks>
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub />
                      </motion.a>
                      <motion.a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    </ProjectLinks>
                  </StopPropagation>
                </ProjectContent>
              </ProjectCard>
            </ScrollReveal>
          ))}
        </ProjectsGrid>
        
        <ViewAllContainer>
          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button as={Link} to="/projects" variant="outline">
                View All Projects
              </Button>
            </motion.div>
          </ScrollReveal>
        </ViewAllContainer>
      </SectionContent>
    </ProjectsSection>
  );
};

export default Projects;