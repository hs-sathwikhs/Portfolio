import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  threshold = 0.1,
  className = '',
  style = {}
}) => {
  // Set initial animation values based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: 50, opacity: 0 };
      case 'right':
        return { x: -50, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ 
        y: 0, 
        x: 0, 
        opacity: 1 
      }}
      viewport={{ 
        once: true,
        threshold: threshold
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right', 'fade']),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

export default ScrollReveal; 