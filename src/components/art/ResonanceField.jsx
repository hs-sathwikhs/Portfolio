import { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';

// A perspective ribbon: sound-like spacing, with the long curves of a road.
export default function ResonanceField() {
  const canvas = useRef(null);
  const wake = useRef(() => {});
  const theme = useTheme();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', () => wake.current());

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return undefined;
    const host = element.parentElement;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    let width = 0, height = 0, frame = 0, lastFrame = 0, until = 0, visible = false;
    let pointer = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
    const start = performance.now();
    const draw = (now) => {
      eased.x += (pointer.x - eased.x) * 0.08;
      eased.y += (pointer.y - eased.y) * 0.08;
      context.clearRect(0, 0, width, height);
      const phase = reduce ? 0 : Math.min((now - start) / 1000, 4) * 0.12 + scrollY.get() * 0.0003;
      for (let strand = 0; strand < 29; strand++) {
        context.beginPath();
        for (let step = 0; step <= 90; step++) {
          const u = step / 90;
          const depth = strand / 28;
          const x = u * width * 1.32 - width * 0.1 + eased.x * (depth - 0.5) * 22;
          const curve = Math.sin(u * 6.2 + phase) * height * 0.115;
          const fold = Math.sin(u * 9 + depth * 2.8 + phase) * height * 0.05;
          const y = height * 0.72 + curve + fold + (depth - 0.5) * height * (0.13 + Math.sin(u * Math.PI) * 0.14) + eased.y * depth * 18;
          if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = strand === 16 ? theme.seal : theme.ink;
        context.globalAlpha = strand === 16 ? 0.66 : theme.mode === 'trace' ? 0.08 + strand % 4 * 0.025 : 0.07 + strand % 4 * 0.02;
        context.lineWidth = strand === 16 ? 1.15 : 0.6;
        context.stroke();
      }
      context.globalAlpha = 1;
    };
    const loop = (now) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (reduce || now - lastFrame > 32) { draw(now); lastFrame = now; }
      if (!reduce && now < until) frame = requestAnimationFrame(loop);
    };
    const activate = (duration = 850) => {
      if (!visible || document.hidden) return;
      until = performance.now() + duration;
      if (!frame) frame = requestAnimationFrame(loop);
    };
    wake.current = activate;
    const size = () => {
      const rect = element.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };
    const resize = new ResizeObserver(size); resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) activate(4000); else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(element);
    const move = (event) => {
      if (reduce || !finePointer.matches || event.pointerType !== 'mouse') return;
      const rect = element.getBoundingClientRect();
      pointer = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
      activate();
    };
    const leave = () => { pointer = { x: 0, y: 0 }; activate(); };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else activate(); };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      wake.current = () => {};
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [reduce, theme, scrollY]);
  return <canvas ref={canvas} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
