import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Lottie } from 'lottie-react';
import { DASHBOARD_FEATURES } from '../constants/features';

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 12px 20px 16px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 144px);
  max-height: calc(100vh - 144px);
  overflow: hidden;

  @media (max-width: 900px) {
    height: auto;
    max-height: none;
    overflow: visible;
    padding: 16px 14px 36px 14px;
  }
`;

/* FEATURE NAVIGATION BOXES */

/* EXACTLY 9 FEATURE NAVIGATION BOXES IN A 3x3 GRID */
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    gap: 14px;
    height: auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

/* 3. SOFT NEUMORPHIC NAVIGATION BOX */
const FeatureBox = styled.button`
  background-color: ${({ $isActive }) => ($isActive ? '#EBF5F8' : '#ffffff')};
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(22, 72, 99, 0.3)' : 'rgba(22, 72, 99, 0.08)')};
  border-radius: 16px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: all 0.22s ease;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  /* Subtle Neumorphic Depth */
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? 'inset 2px 2px 5px rgba(22, 72, 99, 0.12), inset -2px -2px 5px rgba(255, 255, 255, 0.9)'
      : '3px 3px 10px rgba(22, 72, 99, 0.05), -2px -2px 8px rgba(255, 255, 255, 0.95)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $isActive }) =>
    $isActive
      ? 'inset 2px 2px 5px rgba(22, 72, 99, 0.14), inset -2px -2px 5px rgba(255, 255, 255, 0.95)'
      : '5px 5px 14px rgba(22, 72, 99, 0.08), -3px -3px 10px rgba(255, 255, 255, 1)'};
    border-color: rgba(22, 72, 99, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 2px 2px 5px rgba(22, 72, 99, 0.14), inset -2px -2px 5px rgba(255, 255, 255, 0.9);
  }
`;

const FeatureMediaWrapper = styled.div`
  width: 82px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  pointer-events: none;
  flex-shrink: 0;

  @media (max-height: 720px) {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
`;

const FeatureIconImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;

  @media (max-height: 720px) {
    width: 62px;
    height: 62px;
  }
`;

const FeatureName = styled.span`
  font-size: 14.5px;
  font-weight: 600;
  color: #164863;
  text-align: center;
  line-height: 1.25;

  @media (max-height: 720px) {
    font-size: 13px;
  }
`;

const DashboardPage = () => {
  const [activeFeature, setActiveFeature] = useState(DASHBOARD_FEATURES[0]);
  const navigate = useNavigate();

  const handleFeatureClick = (feat) => {
    setActiveFeature(feat);
    navigate(feat.route);
  };

  return (
    <DashboardContainer>
      {/* 9 FEATURE NAVIGATION BOXES */}
      <FeaturesGrid>
        {DASHBOARD_FEATURES.map((feat) => {
          const isActive = activeFeature.id === feat.id;

          return (
            <FeatureBox
              key={feat.id}
              $isActive={isActive}
              onClick={() => handleFeatureClick(feat)}
              onMouseEnter={() => setActiveFeature(feat)}
              aria-label={feat.name}
            >
              <FeatureMediaWrapper>
                {feat.lottie ? (
                  <Lottie
                    src={feat.lottie}
                    segment={feat.segment || undefined}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <FeatureIconImage src={feat.icon} alt={feat.name} />
                )}
              </FeatureMediaWrapper>
              <FeatureName>{feat.name}</FeatureName>
            </FeatureBox>
          );
        })}
      </FeaturesGrid>
    </DashboardContainer>
  );
};

export default DashboardPage;
