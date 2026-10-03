import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 10 Coal & Mining Images from the uploaded Coal Image set
const COAL_IMAGES = [
  '/coal-images/heavy-dump-truck-transporting-coal-in-a-large-open-pit-mining-site-surrounded-by-rocky-terrain-and-dust-clouds-during-the-day-photo.jpg',
  '/coal-images/open-pit-mine-coal-loading-trucks-transportation-logistics.jpg',
  '/coal-images/Indian_coal-1024x682.jpg',
  '/coal-images/2BB4AE3B-C1E1-4595-B8E5-75F586DA7895_cx0_cy1_cw0_w1200_r1.jpg',
  '/coal-images/46375-JCBNXT-225LC-M-Excavator.png',
  '/coal-images/underground-miner-operating-heavy-machinery-extracting-coal-dark-mine-daylight-hours-miner-orange-safety-344958155.png',
  '/coal-images/HXydXzc472Vvy9VTJ2fJMP.jpg',
  '/coal-images/istockphoto-681713636-1024x1024.jpg',
  '/coal-images/istockphoto-138018865-612x612.jpg',
  '/coal-images/close-up-pile-rough-black-coal-rocks-textured-surface-mineral-fuel-geological-formation-industrial-significance-as-power-398688029.png',
];

const HeroContainer = styled.section`
  min-height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 90px 6% 60px 6%;
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color: #0c1c27;

  @media (max-width: 900px) {
    padding: 100px 20px 50px 20px;
    min-height: auto;
  }
`;

/* Auto-Rotating Background Image Slider with Smooth Crossfade */
const BackgroundSlider = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`;

const BackgroundSlide = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${props => (props.$isActive ? 1 : 0)};
  transform: ${props => (props.$isActive ? 'scale(1.03)' : 'scale(1)')};
  transition: opacity 0.8s ease-in-out, transform 4s ease-out;
  will-change: opacity, transform;
`;

/* Lighter, Subtle Dark Navy Transparent Overlay so Mining & Coal Images are Clearly Visible */
const DarkNavyOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    rgba(10, 26, 38, 0.38) 0%, 
    rgba(14, 36, 52, 0.46) 50%, 
    rgba(8, 20, 30, 0.60) 100%
  );
  z-index: 1;
  pointer-events: none;
`;

const HeroContent = styled.div`
  max-width: 880px;
  width: 100%;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-in-out forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;


const HeroHeading = styled.h1`
  font-size: 2.85rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 32px;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.9);

  @media (max-width: 900px) {
    font-size: 2rem;
    margin-bottom: 24px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 38px;
`;

const PrimaryCTA = styled.button`
  padding: 13px 32px;
  font-size: 1.05rem;
  font-weight: 700;
  background-color: #ffda79;
  color: #164863;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #ffbd59;
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SecondaryCTA = styled.button`
  padding: 13px 32px;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const StatPills = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Pill = styled.div`
  background-color: rgba(14, 30, 42, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 11px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 218, 121, 0.4);
  }

  .val {
    font-size: 18px;
    font-weight: 800;
    color: #ffda79;
    letter-spacing: -0.2px;
  }

  .lbl {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    color: #d0e8f0;
    margin-top: 2px;
    letter-spacing: 0.5px;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Preload all 10 coal/mining images on mount to eliminate flashing/loading gaps
  useEffect(() => {
    COAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Automatic rotation every 2.5 seconds with continuous loop & next-image preloading
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => {
        const nextIdx = (prevIdx + 1) % COAL_IMAGES.length;
        // Preload upcoming image ahead of time
        const preloadUpcoming = new Image();
        preloadUpcoming.src = COAL_IMAGES[(nextIdx + 1) % COAL_IMAGES.length];
        return nextIdx;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const scrollToProblem = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeroContainer id="home">
      {/* 1. All 10 Coal/Mining Background Slides with Crossfade */}
      <BackgroundSlider aria-hidden="true">
        {COAL_IMAGES.map((imgSrc, idx) => (
          <BackgroundSlide
            key={idx}
            $image={imgSrc}
            $isActive={idx === currentIdx}
          />
        ))}
      </BackgroundSlider>

      {/* 2. Soft Dark Navy Transparent Overlay for Maximum Readability */}
      <DarkNavyOverlay aria-hidden="true" />

      {/* 3. Existing MineHub Top-Home Content (Untouched & Grounded) */}
      <HeroContent>
        <HeroHeading>
          AI-Powered Geological, Mining &amp; Statutory Reporting Solution
        </HeroHeading>

        <ButtonRow>
          <PrimaryCTA onClick={scrollToProblem}>Learn More</PrimaryCTA>
          <SecondaryCTA onClick={() => navigate('/dashboard')}>
            Open Dashboard &rarr;
          </SecondaryCTA>
        </ButtonRow>

        <StatPills>
          <Pill>
            <span className="val">768.0 MT</span>
            <span className="lbl">FY 25–26 Target</span>
          </Pill>
          <Pill>
            <span className="val">50+ Years</span>
            <span className="lbl">Geological Records</span>
          </Pill>
          <Pill>
            <span className="val">7 + CMPDI</span>
            <span className="lbl">Operating Entities</span>
          </Pill>
          <Pill>
            <span className="val">Zero Guess</span>
            <span className="lbl">Citation Passport</span>
          </Pill>
        </StatPills>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
