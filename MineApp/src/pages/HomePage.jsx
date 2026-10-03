import React from 'react';
import styled from 'styled-components';
import LandingNav from '../components/landing/LandingNav';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import SolutionSection from '../components/landing/SolutionSection';
import CapabilitiesSection from '../components/landing/CapabilitiesSection';
import ImpactSection from '../components/landing/ImpactSection';
import LandingFooter from '../components/landing/LandingFooter';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;

const HomePage = () => {
  return (
    <Container>
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CapabilitiesSection />
      <ImpactSection />
      <LandingFooter />
    </Container>
  );
};

export default HomePage;
