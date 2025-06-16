import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';

const AllProjectsSection = styled.section`
  padding: 8rem 1rem 5rem;
  background: ${props => props.theme.surface};
  min-height: 100vh;
  
  @media (min-width: 768px) {
    padding: 8rem 2rem 5rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const SectionTitle = styled.h1`
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  color: ${props => props.theme.textSecondary};
  font-size: clamp(1rem, 3vw, 1.1rem);
  line-height: 1.6;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion(Link))`
  background: ${props => props.theme.background};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    box-shadow: 0 10px 20px rgba(157, 78, 221, 0.2);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
`;

const ProjectDescription = styled.p`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textSecondary};
  flex-grow: 1;
`;

const ProjectTech = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const TechTag = styled.span`
  background: ${props => props.theme.primary}33;
  color: ${props => props.theme.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  z-index: 2;
  position: relative;
  
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

    &:hover {
      color: ${props => props.theme.primary};
      transform: translateY(-3px);
      background: ${props => props.theme.surface};
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${props => props.isActive ? props.theme.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.textSecondary};
  border: 1px solid ${props => props.isActive ? props.theme.primary : props.theme.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? props.theme.primary : props.theme.background};
    color: ${props => props.isActive ? 'white' : props.theme.primary};
    border-color: ${props => props.theme.primary};
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

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const fetchProjects = () => {
      // Mock projects data
      const projectsData = [
        {
          id: '1',
          title: 'E-Commerce Platform',
          description: 'A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          category: 'web',
          github: 'https://github.com/sathwikhs17/ecommerce',
          live: 'https://ecommerce-demo.com'
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'A productivity app for managing tasks, projects, and deadlines with team collaboration features.',
          image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032&auto=format&fit=crop',
          technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
          category: 'web',
          github: 'https://github.com/sathwikhs17/taskmanager',
          live: 'https://taskmanager-demo.com'
        },
        {
          id: '3',
          title: 'Weather Dashboard',
          description: 'A weather application that provides real-time forecasts, historical data, and interactive maps.',
          image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop',
          technologies: ['JavaScript', 'Weather API', 'Chart.js', 'CSS'],
          category: 'web',
          github: 'https://github.com/sathwikhs17/weather',
          live: 'https://weather-demo.com'
        },
        {
          id: '4',
          title: 'Mobile Fitness Tracker',
          description: 'A mobile app for tracking workouts, nutrition, and health metrics with personalized recommendations.',
          image: 'https://images.unsplash.com/photo-1461773518188-b3e86f98242f?q=80&w=2069&auto=format&fit=crop',
          technologies: ['React Native', 'Firebase', 'Redux', 'Health API'],
          category: 'mobile',
          github: 'https://github.com/sathwikhs17/fitness',
          live: 'https://fitness-demo.com'
        },
        {
          id: '5',
          title: 'AI Image Generator',
          description: 'A web application that uses machine learning to generate unique images based on text descriptions.',
          image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
          technologies: ['Python', 'TensorFlow', 'React', 'Flask'],
          category: 'ai',
          github: 'https://github.com/sathwikhs17/ai-image',
          live: 'https://ai-image-demo.com'
        },
        {
          id: '6',
          title: 'Cryptocurrency Dashboard',
          description: 'A real-time dashboard for tracking cryptocurrency prices, market trends, and portfolio performance.',
          image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop',
          technologies: ['React', 'Node.js', 'WebSockets', 'Chart.js'],
          category: 'web',
          github: 'https://github.com/sathwikhs17/crypto',
          live: 'https://crypto-demo.com'
        }
      ];
      
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    };
    
    fetchProjects();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };
  
  return (
    <AllProjectsSection>
      <SectionContent>
        <ScrollReveal>
          <BackButton to="/">
            <FaArrowLeft /> Back to Home
          </BackButton>
        </ScrollReveal>
        
        <ScrollReveal>
          <SectionTitle>All Projects</SectionTitle>
          <SectionDescription>
            Explore my complete portfolio of projects. Each project represents a unique challenge and showcases different skills and technologies.
          </SectionDescription>
        </ScrollReveal>
        
        <ScrollReveal>
          <FilterContainer>
            <FilterButton 
              isActive={activeFilter === 'all'} 
              onClick={() => handleFilterChange('all')}
            >
              All
            </FilterButton>
            <FilterButton 
              isActive={activeFilter === 'web'} 
              onClick={() => handleFilterChange('web')}
            >
              Web
            </FilterButton>
            <FilterButton 
              isActive={activeFilter === 'mobile'} 
              onClick={() => handleFilterChange('mobile')}
            >
              Mobile
            </FilterButton>
            <FilterButton 
              isActive={activeFilter === 'ai'} 
              onClick={() => handleFilterChange('ai')}
            >
              AI/ML
            </FilterButton>
          </FilterContainer>
        </ScrollReveal>
        
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
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
                <ProjectImage src={project.image} alt={project.title} />
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                    {project.technologies.length > 3 && (
                      <TechTag>+{project.technologies.length - 3}</TechTag>
                    )}
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
      </SectionContent>
    </AllProjectsSection>
  );
};

export default AllProjects; 