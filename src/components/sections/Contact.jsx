import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaCopy } from 'react-icons/fa';
import ScrollReveal from '../common/ScrollReveal';

const ContactSection = styled.section`
  padding: 5rem 1rem;
  background: ${props => props.theme.surface};
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
  padding: 5rem 2rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop') no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.02;
    z-index: 0;
  }
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    ${props => props.theme.primary}11 0%,
    ${props => props.theme.primary}08 40%,
    transparent 70%
  );
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
  
  &.orb1 {
    top: -100px;
    right: -100px;
  }
  
  &.orb2 {
    bottom: -100px;
    left: -100px;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2rem, 5vw, 2.5rem);
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
  font-size: clamp(0.9rem, 3vw, 1rem);
  line-height: 1.6;
  
  @media (min-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
  }
`;

const ContactFormCard = styled(motion.div)`
  background: ${props => props.theme.background};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.theme.primary}33, ${props => props.theme.primary});
    border-radius: 15px 15px 0 0;
  }
`;

const FormGlow = styled(motion.div)`
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
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    color: ${props => props.theme.primary};
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled(motion.label)`
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textSecondary};
  font-size: clamp(0.9rem, 3vw, 1rem);
  font-weight: 500;
  transform-origin: left;
`;

const Input = styled(motion.input)`
  padding: 0.8rem;
  background: ${props => props.theme.background};
  border: 2px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Prevents zoom on mobile */
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 0.8rem;
  background: ${props => props.theme.background};
  border: 2px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  width: 100%;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}33;
  }
  
  @media (min-width: 768px) {
  min-height: 150px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Prevents zoom on mobile */
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(157, 78, 221, 0.3);
  
  &:hover {
    background: ${props => props.theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(157, 78, 221, 0.4);
  }
  
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const ContactInfoCard = styled(motion.div)`
  background: ${props => props.theme.background};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.theme.primary}33, ${props => props.theme.primary});
    border-radius: 15px 15px 0 0;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.text};
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.25rem;
  color: ${props => props.theme.primary};
  margin-top: 0.25rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactText = styled.div`
  h4 {
    margin-bottom: 0.25rem;
    color: ${props => props.theme.text};
    font-size: clamp(1rem, 3vw, 1.1rem);
    
    @media (min-width: 768px) {
      margin-bottom: 0.5rem;
    }
  }
  
  p {
    color: ${props => props.theme.textSecondary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: clamp(0.9rem, 3vw, 1rem);
    flex-wrap: wrap;
    
    span {
      cursor: pointer;
      word-break: break-all;
      transition: color 0.2s ease;
      
      &:hover {
        color: ${props => props.theme.primary};
        text-decoration: none;
      }
    }
    
    svg {
      cursor: pointer;
      flex-shrink: 0;
      transition: color 0.2s ease;
      
      &:hover {
        color: ${props => props.theme.primary};
      }
    }
  }
`;

const ActionMenu = styled.div`
  position: absolute;
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.background};
    color: ${props => props.theme.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.textSecondary};
  font-size: 1.25rem;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.border};
  
  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    border-color: ${props => props.theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 5px 15px ${props => props.theme.primary}66;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.isVisible ? 0 : '-20px'});
  background: ${props => props.theme.primary};
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-size: 0.85rem;
  max-width: 90%;
  width: auto;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    max-width: 300px;
  }
`;

const Contact = () => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const formRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);
  
  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    
    const rect = formRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / 10);
    y.set((e.clientY - centerY) / 10);
    
    // Update glow position
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    
    formRef.current.style.setProperty('--mouse-x', `${mouseX}%`);
    formRef.current.style.setProperty('--mouse-y', `${mouseY}%`);
  };
  
  const handleMouseEnter = () => {
    if (!formRef.current) return;
    formRef.current.querySelector('.form-glow').style.opacity = 1;
  };
  
  const handleMouseLeave = () => {
    if (!formRef.current) return;
    x.set(0);
    y.set(0);
    formRef.current.querySelector('.form-glow').style.opacity = 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const handleTextClick = (text, e) => {
    setSelectedText(text);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsMenuVisible(true);
  };
  
  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedText);
    setIsMenuVisible(false);
  };
  
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuVisible) {
        setIsMenuVisible(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuVisible]);

  return (
    <ContactSection id="contact">
      <GlowingOrb 
        className="orb1" 
        animate={{ 
          x: [0, -30, 0],
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
          x: [0, 30, 0],
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
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionDescription>
            Have a question or want to work together? Feel free to reach out to me using the form below or through my contact information.
          </SectionDescription>
        </ScrollReveal>
        
        <ContactGrid>
          <ScrollReveal>
            <ContactFormCard
              ref={formRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, z: 100 }}
            >
              <FormGlow className="form-glow" />
              <FormTitle><FaEnvelope /> Send Me a Message</FormTitle>
              <ContactForm onSubmit={handleSubmit}>
                <ScrollReveal delay={0.1}>
        <FormGroup>
                    <Label
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Your Name
                    </Label>
          <Input
            type="text"
            name="name"
                      value={formData.name}
            onChange={handleChange}
                      placeholder="John Doe"
            required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileFocus={{ scale: 1.01 }}
          />
        </FormGroup>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2}>
        <FormGroup>
                    <Label
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Your Email
                    </Label>
          <Input
            type="email"
            name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </FormGroup>
                </ScrollReveal>
                
                <ScrollReveal delay={0.3}>
                  <FormGroup>
                    <Label
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Subject
                    </Label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
            onChange={handleChange}
                      placeholder="Project Inquiry"
            required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      whileFocus={{ scale: 1.01 }}
          />
        </FormGroup>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4}>
        <FormGroup>
                    <Label
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Message
                    </Label>
          <TextArea
            name="message"
                      value={formData.message}
            onChange={handleChange}
                      placeholder="Your message here..."
            required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      whileFocus={{ scale: 1.01 }}
          />
        </FormGroup>
                </ScrollReveal>
                
                <ScrollReveal delay={0.5}>
        <SubmitButton
          type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </SubmitButton>
                </ScrollReveal>
              </ContactForm>
            </ContactFormCard>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <ContactInfoCard
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InfoTitle>Contact Information</InfoTitle>
              
              <ContactInfo>
                <ScrollReveal delay={0.3}>
                  <ContactItem
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconWrapper>
                      <FaEnvelope />
                    </IconWrapper>
                    <ContactText>
                      <h4>Email</h4>
                      <p>
                        <span onClick={(e) => handleTextClick('hs.sathwikhs@gmail.com', e)}>
                          hs.sathwikhs@gmail.com
                        </span>
                        <FaCopy onClick={(e) => {
                          e.stopPropagation();
                          handleTextClick('hs.sathwikhs@gmail.com', e);
                        }} />
                      </p>
                    </ContactText>
                  </ContactItem>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4}>
                  <ContactItem
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <IconWrapper>
                      <FaPhone />
                    </IconWrapper>
                    <ContactText>
                      <h4>Phone</h4>
                      <p>
                        <span onClick={(e) => handleTextClick('+91 9964466062', e)}>
                          +91 9964466062
                        </span>
                        <FaCopy onClick={(e) => {
                          e.stopPropagation();
                          handleTextClick('+91 9964466062', e);
                        }} />
                      </p>
                    </ContactText>
                  </ContactItem>
                </ScrollReveal>
                
                <ScrollReveal delay={0.5}>
                  <ContactItem
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <IconWrapper>
                      <FaMapMarkerAlt />
                    </IconWrapper>
                    <ContactText>
                      <h4>Location</h4>
                      <p>Koramangala, Bengaluru, India</p>
                    </ContactText>
                  </ContactItem>
                </ScrollReveal>
                
                <ScrollReveal delay={0.6}>
                  <SocialLinks>
                    <SocialLink 
                      href="https://github.com/sathwikhs17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <FaGithub />
                    </SocialLink>
                    <SocialLink 
                      href="https://linkedin.com/in/sathwikhs17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <FaLinkedin />
                    </SocialLink>
                    <SocialLink 
                      href="https://twitter.com/sathwikhs17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <FaTwitter />
                    </SocialLink>
                    <SocialLink 
                      href="https://instagram.com/sathwikhs17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <FaInstagram />
                    </SocialLink>
                  </SocialLinks>
                </ScrollReveal>
              </ContactInfo>
            </ContactInfoCard>
          </ScrollReveal>
        </ContactGrid>
        
        <ActionMenu 
          isVisible={isMenuVisible} 
          style={{ 
            top: `${menuPosition.y}px`, 
            left: `${menuPosition.x}px` 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ActionButton onClick={handleCopyText}>
            <FaCopy /> Copy
          </ActionButton>
        </ActionMenu>
      </SectionContent>
      
      <Notification isVisible={isMenuVisible}>
        {selectedText} copied to clipboard!
      </Notification>
    </ContactSection>
  );
};

export default Contact;