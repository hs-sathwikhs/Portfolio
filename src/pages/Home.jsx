import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import Practice from '../components/sections/Practice';
import Record from '../components/sections/Record';
import Stack from '../components/sections/Stack';
import Contact from '../components/sections/Contact';

/**
 * One page, five sections, in the order a record is read: who, what was built,
 * what is practised outside of what shipped, where it was done, what it was
 * built with, and how to reach the person who did it.
 *
 * Practice sits directly under Work because the two answer the same question -
 * what does this person do - and separating them by the CV would imply the CTF
 * and lab work is a footnote to the projects rather than beside them.
 *
 * The sentinel is what the nav watches to know it has left the head of the
 * document - an IntersectionObserver on an empty div costs nothing, where a
 * scroll listener costs something on every frame.
 */
export default function Home() {
  return (
    <>
      <div id="nav-sentinel" aria-hidden="true" />
      <Hero />
      <Work />
      <Practice />
      <Record />
      <Stack />
      <Contact />
    </>
  );
}
