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
    const fetchProjects = () => {
      const projectsData = [
        {
          id: '1',
          title: 'Decentra Cert',
          description: 'Decentra Cert is a decentralized certification platform using soulbound NFTs, enabling secure, verifiable, and tamper-proof academic credentials with Merkle trees, QR-based validation, and issuer authentication.',
          image: 'https://images.unsplash.com/photo-1621439618661-bdfbdd14dca2?q=80&w=1470&auto=format&fit=crop',
          technologies: ['Solidity', 'Node.js', 'React', 'Ether.js', 'ZK Proofs'],
          category: 'blockchain',
          github: '#',
          live: '#'
        },
        {
          id: '2',
          title: 'Portfolio',
          description: 'A sleek and interactive personal portfolio built with React, showcasing projects, skills, and experience with smooth animations and responsive design',
          image: '/images/portfolio.png',
          technologies: ['React', 'JavaScript', 'Vite', 'Framer Motion'],
          category: 'web',
          github: 'https://github.com/hs-sathwikhs/Portfolio',
          live: 'https://sathwikhs.vercel.app'
        },
        {
          id: 3,
          title: 'Bank Networks',
          description: 'A secure bank network simulation built in Cisco Packet Tracer,featuring inter-branch communication via ASA firewall and authentication.',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1634&auto=format&fit=crop',
          technologies: ['Computer Networks', 'Cisco Packet Tracer'],
          category: 'networks',
          github: 'https://github.com/hs-sathwikhs/Bank_Network',
          live: 'https://github.com/hs-sathwikhs/Bank_Network'
        },
        {
          id: 4,
          title: 'Cross Protocol Bridging',
          description: 'A socket programming project in C that bridges CoAP and MQTT, enabling protocol interoperability between edge IoT devices and cloud systems.',
          image: 'https://images.unsplash.com/photo-1727646798983-9154aa42f6aa?q=80&w=880&auto=format&fit=crop',
          technologies: ['Socket Programming', 'C', 'TCP/UDP Networking', 'Protocol Translation'],
          category: 'networks',
          github: '#',
          live: '#'
        },
        {
          id: 5,
          title: 'Avora',
          description: 'A full-featured e-commerce platform for Art and art lovers with product listings, cart functionality, and secure checkout.',
          image: 'https://images.unsplash.com/photo-1530800089-e0f33f51d5ff?q=80&w=1470&auto=format&fit=crop',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          category: 'web',
          github: 'https://github.com/hs-sathwikhs/avora',
          live: 'https://github.com/hs-sathwikhs/avora'
        },
        {
          id: '6',
          title: 'Resonatia',
          description: 'Resonatia is a Python-Tkinter based music player that lets you browse and play your downloaded songs with a clean, minimal interface.',
          image: 'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=1470&auto=format&fit=crop',
          technologies: ['Python', 'File Handling', 'Pygame', 'Tkinter'],
          category: 'python',
          github: '#',
          live: '#'
        },
      ];
      
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    };
    
    fetchProjects();
    
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
              isActive={activeFilter === 'networks'} 
              onClick={() => handleFilterChange('networks')}
            >
              Networks
            </FilterButton>
            <FilterButton 
              isActive={activeFilter === 'blockchain'} 
              onClick={() => handleFilterChange('blockchain')}
            >
              Blockchain
            </FilterButton>
            <FilterButton 
              isActive={activeFilter === 'python'} 
              onClick={() => handleFilterChange('python')}
            >
              Python
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