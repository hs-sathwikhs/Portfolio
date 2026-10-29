import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The one scroll-entry treatment on this site. Blur is deliberately absent -
 * animating `filter` on text costs a paint per frame and reads as smeared on
 * mid-range phones. Distance and opacity say the same thing for free.
 */
export default function Reveal({ children, delay = 0, distance = 24, className, style }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, transform: `translateY(${reduce ? 0 : distance}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.15, margin: '0px' }}
      transition={{
        duration: reduce ? 0.12 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  distance: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
