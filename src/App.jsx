import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styled from 'styled-components';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

const Main = styled.main`
  display: block;
  min-height: 60vh;
`;

/**
 * Route change is a cut, not a scene change: opacity only, fast enough that it
 * reads as the page arriving rather than as an animation you have to sit
 * through.
 */
function Page({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.12 : 0.22, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

function Shell() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <ScrollManager />
      <Main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <Home />
                </Page>
              }
            />
            <Route
              path="/projects"
              element={
                <Page>
                  <AllProjects />
                </Page>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Page>
                  <ProjectDetail />
                </Page>
              }
            />

            {/* The old site had these as standalone routes. Anything already
                linking to them lands on the section instead of a 404. */}
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/experience" element={<Navigate to="/#record" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />

            <Route
              path="*"
              element={
                <Page>
                  <NotFound />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </Main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
