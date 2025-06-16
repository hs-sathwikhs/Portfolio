import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendarAlt, FaCode, FaLightbulb } from 'react-icons/fa';
import ScrollReveal from '../components/common/ScrollReveal';

const ProjectDetailSection = styled.section`
  background: ${props => props.theme.surface};
  min-height: 100vh;
  overflow: hidden;
`;

const ProjectHeader = styled.div`
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;
  }
`;

const ParallaxImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 0 2rem;
  max-width: 1000px;
`;

const ProjectTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const ProjectTagline = styled.p`
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ProjectContent = styled.div`
  max-width: 1000px;
  margin: -80px auto 0;
  width: 100%;
  padding: 0 1rem 5rem;
  position: relative;
  z-index: 3;
  
  @media (min-width: 768px) {
    padding: 0 2rem 5rem;
  }
`;

const ContentCard = styled.div`
  background: ${props => props.theme.background};
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ProjectDescription = styled.div`
  padding: 2rem;
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: ${props => props.theme.textSecondary};
    font-size: 1.1rem;
  }
`;

const ProjectMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 2rem 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MetaSection = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.border};
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${props => props.theme.primary};
    }
  }
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
`;

const TechItem = styled.li`
  background: ${props => props.theme.primary}33;
  color: ${props => props.theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.primary}66;
    transform: translateY(-2px);
  }
`;

const FeatureList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 1rem;
    color: ${props => props.theme.textSecondary};
    position: relative;
    padding-left: 0.5rem;
    
    &::before {
      content: '';
      position: absolute;
      left: -1rem;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${props => props.theme.primary};
    }
  }
`;

const ChallengesSection = styled.div`
  padding: 2rem;
  background: ${props => props.theme.background};
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.border};
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${props => props.theme.primary};
    }
  }
  
  p {
    line-height: 1.8;
    color: ${props => props.theme.textSecondary};
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.5rem;
    background: ${props => props.theme.primary};
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(157, 78, 221, 0.3);
    
    &:hover {
      background: ${props => props.theme.secondary};
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(157, 78, 221, 0.4);
    }
    
    &.outline {
      background: transparent;
      color: ${props => props.theme.primary};
      border: 2px solid ${props => props.theme.primary};
      
      &:hover {
        background: ${props => props.theme.primary};
        color: white;
      }
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  
  useEffect(() => {
    // In a real app, you would fetch the project data from an API
    // For this demo, we'll use mock data
    const fetchProject = () => {
      setLoading(true);
      
      // Mock projects data - in a real app, this would come from an API or database
      const projects = [
        {
          id: '1',
          title: 'E-Commerce Platform',
          description: 'A full-featured e-commerce platform with product listings, cart functionality, and secure checkout.',
          longDescription: 'This comprehensive e-commerce solution provides businesses with everything they need to sell products online. Built with React on the frontend and Node.js on the backend, it offers a seamless shopping experience for customers and powerful management tools for store owners.',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe API'],
          features: [
            'User authentication and profile management',
            'Product catalog with categories and search functionality',
            'Shopping cart and wishlist',
            'Secure payment processing with Stripe',
            'Order tracking and history',
            'Admin dashboard for inventory management'
          ],
          challenges: "One of the main challenges was implementing a secure payment system that complied with international regulations while maintaining a smooth user experience. We solved this by integrating Stripe's API and creating a custom checkout flow.",
          github: 'https://github.com/sathwikhs17/ecommerce',
          live: 'https://ecommerce-demo.com'
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'A productivity app for managing tasks, projects, and deadlines with team collaboration features.',
          longDescription: 'This task management application helps teams stay organized and productive. It allows users to create projects, assign tasks, set deadlines, and track progress. The app includes real-time updates and notifications to keep everyone in sync.',
          image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032&auto=format&fit=crop',
          technologies: ['React', 'Firebase', 'Material UI', 'Redux', 'Cloud Functions'],
          features: [
            'Project and task creation with custom categories',
            'Task assignment and deadline management',
            'Progress tracking with Kanban boards',
            'Team collaboration with comments and file sharing',
            'Real-time notifications',
            'Calendar integration and reminders'
          ],
          challenges: "Implementing real-time updates across multiple devices was challenging. We used Firebase's real-time database and carefully designed our data structure to ensure efficient updates without overwhelming the client devices.",
          github: 'https://github.com/sathwikhs17/taskmanager',
          live: 'https://taskmanager-demo.com'
        },
        {
          id: '3',
          title: 'Weather Dashboard',
          description: 'A weather application that provides real-time forecasts, historical data, and interactive maps.',
          longDescription: 'This weather dashboard gives users accurate weather information with a beautiful, intuitive interface. It pulls data from multiple weather APIs to provide current conditions, forecasts, and historical weather patterns. The interactive maps allow users to explore weather patterns visually.',
          image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop',
          technologies: ['JavaScript', 'Weather API', 'Chart.js', 'CSS', 'Leaflet Maps'],
          features: [
            'Current weather conditions for any location',
            'Five-day forecast with hourly breakdowns',
            'Historical weather data visualization',
            'Interactive weather maps',
            'Location-based automatic weather updates',
            'Weather alerts and notifications'
          ],
          challenges: "Combining data from multiple weather APIs with different formats and update frequencies was complex. We created a unified data model and implemented caching strategies to ensure consistent, up-to-date information while minimizing API calls.",
          github: 'https://github.com/sathwikhs17/weather',
          live: 'https://weather-demo.com'
        }
      ];
      
      const foundProject = projects.find(p => p.id === id);
      
      if (foundProject) {
        setProject(foundProject);
      }
      
      setLoading(false);
    };
    
    fetchProject();
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return (
      <ProjectDetailSection>
        <ProjectContent>
          <LoadingWrapper>Loading project details...</LoadingWrapper>
        </ProjectContent>
      </ProjectDetailSection>
    );
  }
  
  if (!project) {
    return (
      <ProjectDetailSection>
        <ProjectContent>
          <BackButton to="/projects">
            <FaArrowLeft /> Back to Projects
          </BackButton>
          <h1>Project not found</h1>
          <p>Sorry, the project you're looking for doesn't exist.</p>
        </ProjectContent>
      </ProjectDetailSection>
    );
  }
  
  return (
    <ProjectDetailSection>
      <ProjectHeader ref={headerRef}>
        <ParallaxImage 
          image={project.image}
          style={{ y, opacity }}
        />
        <HeaderContent>
          <BackButton to="/projects">
            <FaArrowLeft /> Back to Projects
          </BackButton>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectTagline>{project.description}</ProjectTagline>
        </HeaderContent>
      </ProjectHeader>
      
      <ProjectContent>
        <ScrollReveal>
          <ContentCard>
            <ProjectDescription>
              <p>{project.longDescription}</p>
            </ProjectDescription>
            
            <ProjectMeta>
              <MetaSection>
                <h3><FaCode /> Technologies Used</h3>
                <TechList>
                  {project.technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </MetaSection>
              
              <MetaSection>
                <h3><FaCalendarAlt /> Key Features</h3>
                <FeatureList>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </FeatureList>
              </MetaSection>
            </ProjectMeta>
          </ContentCard>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <ChallengesSection>
            <h3><FaLightbulb /> Challenges & Solutions</h3>
            <p>{project.challenges}</p>
          </ChallengesSection>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <ProjectLinks>
            <motion.a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              className="outline"
            >
              <FaGithub /> View Code
            </motion.a>
            <motion.a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
          </ProjectLinks>
        </ScrollReveal>
      </ProjectContent>
    </ProjectDetailSection>
  );
};

export default ProjectDetail; 