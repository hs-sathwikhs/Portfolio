import PropTypes from 'prop-types';
import { useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';
import RouteMeta from './components/RouteMeta';
import RouteTransitions from './components/RouteTransitions';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

const Main = styled.main`
  display: block;
  min-height: 60vh;
`;

function Page({ children }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (document.documentElement.dataset.transition || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = ref.current.animate(
      [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 480, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    );
    return () => animation.cancel();
  }, []);
  return <div ref={ref}>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

function Shell() {
  const location = useLocation();

  return (
    <>
      <RouteMeta />
      <RouteTransitions />
      <Nav />
      <ScrollManager />
      <Main id="main" tabIndex={-1}>

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
