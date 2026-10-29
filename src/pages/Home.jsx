import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import Work from '../components/sections/Work';
import Practice from '../components/sections/Practice';
import Record from '../components/sections/Record';
import Stack from '../components/sections/Stack';
import Contact from '../components/sections/Contact';
import { useMode } from '../theme/ThemeContext';

export default function Home() {
  const { setPresentation } = useMode();
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#personal") setPresentation("personal");
  }, [hash, setPresentation]);
  return <>
    <Hero />
    <Work />
    <Practice />
    <Record />
    <Stack />
    <Contact />
  </>;
}
