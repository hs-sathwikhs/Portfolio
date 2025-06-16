import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
    --font-accent: 'Raleway', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.primary} ${props => props.theme.background};
  }

  body {
    font-family: var(--font-primary);
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    line-height: 1.7;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  p {
    margin-bottom: 1.5rem;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
  }

  ul, ol {
    list-style-position: inside;
    margin-bottom: 1.5rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.secondary};
    }
  }

  /* Selection styling */
  ::selection {
    background: ${props => props.theme.primary}66;
    color: ${props => props.theme.text};
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section-padding {
    padding: 5rem 0;
  }

  /* Responsive typography */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;