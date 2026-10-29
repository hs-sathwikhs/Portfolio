import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'framer-motion';
import PropTypes from 'prop-types';

// Only the artwork follows the pointer. Reading and navigation stay in place.
export default function Depth({ children, className, strength = 5 }) {
  const reduce = useReducedMotion();
  const allowed = useRef(false);
  const pitch = useSpring(0, { mass: 1, stiffness: 100, damping: 20 });
  const yaw = useSpring(0, { mass: 1, stiffness: 100, damping: 20 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${pitch}deg) rotateY(${yaw}deg)`;
  const reset = () => { pitch.set(0); yaw.set(0); };
  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => { allowed.current = query.matches && !reduce; if (!allowed.current) { pitch.jump(0); yaw.jump(0); } };
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [reduce, pitch, yaw]);
  return <motion.div className={className} style={{ transform: reduce ? 'none' : transform }} onPointerLeave={reset}
    onPointerMove={(e) => {
      if (!allowed.current || e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      pitch.set(-((e.clientY - r.top) / r.height - 0.5) * strength);
      yaw.set(((e.clientX - r.left) / r.width - 0.5) * strength);
    }}>{children}</motion.div>;
}
Depth.propTypes = { children: PropTypes.node, className: PropTypes.string, strength: PropTypes.number };
