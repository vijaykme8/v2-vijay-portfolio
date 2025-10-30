// Home.jsx
import React, { useRef } from 'react';
import IntroSection from '../components/IntroSection';
import HomeHeroAnimation from '../components/HomeHeroAnimation';
import GlobalSelection from '../components/GlobalSelection';

function Home() {
  const projectRef = useRef(null);

  const handleProjectClick = () => {
    projectRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* <Navbar onProjectClick={handleProjectClick} /> */}
      <IntroSection />
      <HomeHeroAnimation />
      <div ref={projectRef}>
        <GlobalSelection />
      </div>
    </>
  );
}

export default Home;
