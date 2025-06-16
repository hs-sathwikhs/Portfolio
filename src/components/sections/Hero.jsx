import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-top: 60px; // Adjust based on navbar height for mobile
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
    margin-top: 80px; // Adjust based on navbar height for desktop
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1607743386760-88f10eb85a79?q=80&w=2070&auto=format&fit=crop') no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.05;
    z-index: -1;
  }
`;

const GradientBackground = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(157, 78, 221, 0.05) 0%,
    rgba(157, 78, 221, 0.02) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: -1;
  pointer-events: none;
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  padding: 2rem 0;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
    padding: 3rem 0;
  }
`;

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const ProfileImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  perspective: 1000px;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  width: 250px;
  height: 250px;
  
  @media (min-width: 992px) {
    width: 300px;
    height: 300px;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url('/images/profile_pic.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  border: 4px solid ${props => props.theme.primary};
  box-shadow: 0 10px 30px rgba(157, 78, 221, 0.3);
  position: relative;
  transform-style: preserve-3d;
  
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: ${props => props.theme.primary};
    border-bottom-color: ${props => props.theme.primary};
    opacity: 0.7;
    animation: spin 8s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ProfileImageGlow = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    ${props => props.theme.primary}33 0%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: -1;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  background: ${props => props.theme.primary}22;
  border-radius: 50%;
  z-index: -1;
  
  &.shape1 {
    width: 80px;
    height: 80px;
    top: -20px;
    left: 10%;
  }
  
  &.shape2 {
    width: 60px;
    height: 60px;
    bottom: 10%;
    right: 5%;
  }
  
  &.shape3 {
    width: 40px;
    height: 40px;
    top: 30%;
    right: 15%;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 0.25rem;
  color: ${props => props.theme.textSecondary};
  position: relative;
  display: inline-block;
  font-weight: normal;
  font-family: var(--font-primary);
  
  @media (min-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const NameTitle = styled(motion.div)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
  position: relative;
  display: inline-block;
  font-weight: 800;
  font-family: var(--font-secondary);
  letter-spacing: -0.02em;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, 
      ${props => props.theme.primary}00, 
      ${props => props.theme.primary}, 
      ${props => props.theme.primary}00
    );
    border-radius: 2px;
    transform-origin: left;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 4vw, 2rem);
  margin-bottom: 1.5rem;
  color: ${props => props.theme.textSecondary};
  font-family: var(--font-accent);
  font-weight: 500;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const TypewriterContainer = styled.div`
  display: inline-block;
  min-width: 280px; // Adjust this value based on your longest text
  height: 1.2em; // Fixed height to prevent jumping
  position: relative;
  overflow: visible; // Allow cursor to be visible outside container
  
  @media (min-width: 768px) {
    min-width: 320px; // Larger min-width for desktop
    height: 1.2em;
  }
`;

const TypewriterText = styled(motion.span)`
  position: absolute;
  white-space: nowrap; // Prevent text from wrapping
  
  &::after {
    content: '|';
    position: absolute;
    right: -8px;
    top: 0;
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Location = styled(motion.p)`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: ${props => props.theme.accent};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  font-family: var(--font-primary);
  font-weight: 500;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
    justify-content: flex-start;
  }
  
  span {
    display: inline-block;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Description = styled(motion.p)`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  max-width: 600px;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: ${props => props.theme.textSecondary};
  position: relative;
  font-family: var(--font-primary);
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${props => props.theme.primary}66;
    border-radius: 3px;
    
    @media (max-width: 767px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: 480px) {
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
    justify-content: flex-start;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  font-size: 1.25rem;
  justify-content: center;

  a {
    color: ${props => props.theme.textSecondary};
    transition: color 0.3s ease;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: ${props => props.theme.primary};
      transition: width 0.3s ease;
    }

    &:hover {
      color: ${props => props.theme.primary};
      
      &::before {
        width: 100%;
      }
    }
  }
  
  @media (min-width: 768px) {
    gap: 1.5rem;
    font-size: 1.5rem;
    justify-content: flex-start;
  }
`;

const Hero = () => {
  const canvasRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 10); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: `rgba(157, 78, 221, ${Math.random() * 0.5 + 0.1})`, // Lavender with varying opacity
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(157, 78, 221, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
      initParticles();
    };
    
    // Initialize
    setCanvasDimensions();
    initParticles();
    drawParticles();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
        
        if (displayText.length === currentText.length) {
          setIsDeleting(true);
          setTypingSpeed(1000); // Pause at the end
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(50);
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
          setTypingSpeed(500); // Pause before next word
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / 5);
    y.set((e.clientY - centerY) / 5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <HeroSection id="home">
      <GradientBackground 
        animate={{ 
          rotate: [0, 360],
        }} 
        transition={{ 
          duration: 50, 
          repeat: Infinity, 
          ease: "linear" 
        }} 
      />
      <ParticleCanvas ref={canvasRef} />
      
      <FloatingShape 
        className="shape1"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <FloatingShape 
        className="shape2"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <FloatingShape 
        className="shape3"
        animate={{ 
          y: [0, 10, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <HeroContent>
        <HeroInfo>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm 
          </Title>
          <NameTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-gradient"
          >
            Sathwik HS
          </NameTitle>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TypewriterContainer>
              <TypewriterText>{displayText}</TypewriterText>
            </TypewriterContainer>
          </Subtitle>
          <Location
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span>📍</span> Koramangala, Bengaluru
          </Location>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I specialize in building exceptional digital experiences through clean, 
            efficient code and user-centered design. Based in India's Silicon Valley, 
            I combine innovative tech solutions with a deep understanding of both local 
            and global markets to create impactful web applications.
          </Description>
          <ButtonGroup>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button as="a" href="#contact">
                Contact Me
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button as="a" href="/resume.pdf" download variant="outline">
                Download CV
              </Button>
            </motion.div>
          </ButtonGroup>
          <SocialLinks>
            <motion.a
              href="https://github.com/sathwikhs17"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, color: '#9D4EDD' }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sathwikhs17"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, color: '#9D4EDD' }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://twitter.com/sathwikhs17"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ y: -5, color: '#9D4EDD' }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://instagram.com/sathwikhs17"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5, color: '#9D4EDD' }}
            >
              <FaInstagram />
            </motion.a>
          </SocialLinks>
        </HeroInfo>
        <ProfileImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ProfileImageWrapper
            style={{
              rotateX,
              rotateY,
              z: 100
            }}
          >
            <ProfileImage />
            <ProfileImageGlow 
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </ProfileImageWrapper>
        </ProfileImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;