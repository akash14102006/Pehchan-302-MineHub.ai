import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Lottie } from 'lottie-react';
import underConstructionLottie from '../assets/lottie/Under Construction NoText.json';
import { getFeature } from '../constants/features';

const PageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px 48px 20px;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 120px);
    padding: 16px 14px 32px 14px;
  }
`;

const ConstructionCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.14);
  border-radius: 20px;
  padding: 32px 36px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 1px rgba(0, 0, 0, 0.1);
  max-width: 460px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease;

  @media (max-width: 600px) {
    padding: 24px 20px 28px 20px;
  }
`;

const FeatureIconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background-color: #f1f8fa;
  border: 1px solid rgba(22, 72, 99, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  box-shadow: inset 0 2px 4px rgba(22, 72, 99, 0.04);
  flex-shrink: 0;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

/* ============================================================
   LOTTIE ILLUSTRATION + HTML TEXT OVERLAY
   The Lottie renders the animated construction scene only
   (text layers hidden). The three text lines are rendered
   below as stable, accessible HTML/CSS — no font dependency.
   ============================================================ */

const LottieBox = styled.div`
  width: 260px;
  height: 260px;
  max-width: 80vw;
  max-height: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 4px 0;
  pointer-events: none;

  @media (max-width: 600px) {
    width: 210px;
    height: 210px;
  }

  @media (prefers-reduced-motion: reduce) {
    /* Lottie will still show first frame as a static illustration */
  }
`;

/* ============================================================
   HTML TEXT REPLACEMENTS FOR LOTTIE TEXT LAYERS
   These replace the garbled Gotham-Ultra / Gotham-Thin text.
   Positioned to visually match the original Lottie layout:
     - "NEW WEBSITE"        → Gotham-Ultra 36.5px → bold 24px
     - "UNDER CONSTRUCTION!" → Gotham-Ultra 22px  → bold 16px
     - "WE'LL BE BACK SOON!" → Gotham-Thin 22px   → light 13px
   Color: rgb(64, 91, 145) = #405B91 (original Lottie fc)
   ============================================================ */

const LottieTextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 16px;
  user-select: none;
`;

const LottieTextLine1 = styled.span`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #405B91;
  line-height: 1.2;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;

  @media (max-width: 600px) {
    font-size: 18px;
    letter-spacing: 0.8px;
  }
`;

const LottieTextLine2 = styled.span`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #405B91;
  line-height: 1.3;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;

  @media (max-width: 600px) {
    font-size: 13px;
    letter-spacing: 0.5px;
  }
`;

const LottieTextLine3 = styled.span`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #405B91;
  line-height: 1.4;
  margin-top: 2px;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;

  @media (max-width: 600px) {
    font-size: 11.5px;
    letter-spacing: 0.4px;
  }
`;

const ConstructionEyebrow = styled.div`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 4px;
`;

const FeatureHeading = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #164863;
  margin: 0 0 24px 0;
  line-height: 1.25;
  letter-spacing: 0.2px;

  @media (max-width: 600px) {
    font-size: 19px;
    margin-bottom: 20px;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #164863;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 13.5px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(22, 72, 99, 0.2);

  &:hover {
    background-color: #0f3144;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(22, 72, 99, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #0284c7;
    outline-offset: 2px;
  }
`;

const UnderConstructionPage = ({ featureId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Determine feature by prop, route param, or pathname
  const rawIdentifier =
    featureId ||
    params.featureId ||
    new URLSearchParams(location.search).get('tab') ||
    location.pathname.replace(/^\//, '');

  const feature = getFeature(rawIdentifier) || {
    name: 'Under Development',
    icon: null,
    lottie: null,
  };

  useEffect(() => {
    // Respect title for document
    document.title = `${feature.name} • Under Construction — MineHub.ai`;
  }, [feature.name]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  // Check prefers-reduced-motion for Lottie autoplay
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <PageContainer>
      <ConstructionCard>
        {/* 1. Feature-specific Icon */}
        <FeatureIconWrapper>
          {feature.lottie ? (
            <Lottie
              src={feature.lottie}
              segment={feature.segment || undefined}
              loop={true}
              autoplay={true}
              style={{ width: '56px', height: '56px' }}
            />
          ) : feature.icon ? (
            <img src={feature.icon} alt={feature.name} />
          ) : (
            <span style={{ fontSize: '24px', fontWeight: 800, color: '#164863' }}>◇</span>
          )}
        </FeatureIconWrapper>

        {/* 2. Lottie Illustration (text layers hidden — no Gotham dependency) */}
        <LottieBox>
          <Lottie
            src={underConstructionLottie}
            loop={!prefersReducedMotion}
            autoplay={!prefersReducedMotion}
            style={{ width: '100%', height: '100%' }}
          />
        </LottieBox>

        {/* 3. HTML/CSS Text Replacement for Lottie Text Layers
             Replaces garbled Gotham-Ultra / Gotham-Thin renders.
             Crisp on every browser, viewport and DPI. */}
        <LottieTextOverlay
          role="presentation"
          aria-hidden="true"
        >
          <LottieTextLine1>New Website</LottieTextLine1>
          <LottieTextLine2>Under Construction!</LottieTextLine2>
          <LottieTextLine3>We'll Be Back Soon!</LottieTextLine3>
        </LottieTextOverlay>

        {/* 4. Minimal Construction Eyebrow & Feature Name */}
        <ConstructionEyebrow>UNDER CONSTRUCTION</ConstructionEyebrow>
        <FeatureHeading>{feature.name}</FeatureHeading>

        {/* 5. Single Clean Back Action */}
        <BackButton onClick={handleBack} aria-label="Back to Features Navigation">
          <ArrowLeft size={16} />
          <span>Back to Features</span>
        </BackButton>
      </ConstructionCard>
    </PageContainer>
  );
};

export default UnderConstructionPage;
