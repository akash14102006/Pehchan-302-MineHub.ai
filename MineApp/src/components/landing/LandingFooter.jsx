import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #164863;
  color: white;
  padding: 50px 6% 30px 6%;
  font-family: 'Poppins', sans-serif;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex: 2;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 240px;
  max-width: 480px;
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffda79;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  color: #D0E8F0;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #D0E8F0;

  li {
    font-size: 0.9rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: "✓";
      color: #ffda79;
      font-weight: bold;
    }
  }
`;

const FooterRight = styled.div`
  flex: 1;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  p {
    font-size: 1rem;
    color: #D0E8F0;
    margin-bottom: 4px;
  }

  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #ffda79;
    margin: 5px 0 16px 0;
    line-height: 1.1;
  }

  @media (max-width: 900px) {
    text-align: left;
    align-items: flex-start;
    margin-top: 24px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 45px;
  padding-top: 25px;
  border-top: 1px solid rgba(208, 232, 240, 0.2);

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: #D0E8F0;
    font-size: 0.85rem;
    transition: color 0.3s ease;

    &:hover {
      color: #ffda79;
    }
  }
`;

const CopyrightText = styled.div`
  font-size: 0.82rem;
  color: #a0aec0;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

/* Exact MineHub Institutional Animation Box Implementation */
const MineHubFooterBoxWrapper = styled.div`
  .minehub-footer-card {
    width: 250px;
    height: 145px;
    background: #142028;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid rgba(189, 159, 103, 0.35);
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 6px 6px 18px rgba(8, 14, 18, 0.6), 
                -4px -4px 14px rgba(32, 46, 56, 0.35), 
                inset 1px 1px 2px rgba(255, 255, 255, 0.05);
    cursor: pointer;
    box-sizing: border-box;
    padding: 16px;
  }

  .inner-border {
    position: absolute;
    inset: 0px;
    border: 1.5px solid #bd9f67;
    opacity: 0;
    transform: rotate(8deg);
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    pointer-events: none;
    border-radius: 8px;
  }

  .shimmer-trail {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 218, 121, 0.15), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
    opacity: 0;
  }

  .brand-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    z-index: 1;
    text-align: center;
    transition: transform 0.4s ease;
  }

  .brand-header {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .brand-emblem {
    width: 14px;
    height: 14px;
    transition: transform 0.3s ease;

    path {
      fill: #bd9f67;
      transition: fill 0.3s ease;
    }
  }

  .brand-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #bd9f67;
    transition: all 0.4s ease;
    font-family: 'Poppins', -apple-system, sans-serif;
  }

  .brand-main {
    font-size: 23px;
    font-weight: 800;
    color: #ffda79;
    letter-spacing: -0.2px;
    line-height: 1.15;
    transition: all 0.4s ease;
    font-family: 'Poppins', -apple-system, sans-serif;
  }

  .brand-sub {
    font-size: 11px;
    font-weight: 600;
    font-style: italic;
    color: #d8be85;
    letter-spacing: 1.2px;
    transition: all 0.4s ease;
    font-family: 'Poppins', -apple-system, sans-serif;
  }

  /* Hover Expansion & Reveal Animation */
  .minehub-footer-card:hover {
    transform: scale(1.04);
    border-color: rgba(229, 193, 88, 0.65);
    box-shadow: 8px 8px 24px rgba(8, 14, 18, 0.75), 
                -5px -5px 16px rgba(32, 46, 56, 0.45), 
                inset 1px 1px 2px rgba(255, 255, 255, 0.08);
  }

  .minehub-footer-card:hover .inner-border {
    inset: 8px;
    opacity: 1;
    transform: rotate(0deg);
    border-color: #d4af37;
  }

  .minehub-footer-card:hover .shimmer-trail {
    opacity: 1;
    animation: goldSweep 1s ease-in-out forwards;
  }

  .minehub-footer-card:hover .brand-emblem {
    transform: scale(1.1);
  }

  .minehub-footer-card:hover .brand-emblem path {
    fill: #ffe699;
  }

  .minehub-footer-card:hover .brand-title {
    letter-spacing: 3.5px;
    color: #ffe699;
  }

  .minehub-footer-card:hover .brand-main {
    color: #ffffff;
    text-shadow: 0 0 14px rgba(255, 218, 121, 0.45);
    transform: scale(1.03);
  }

  .minehub-footer-card:hover .brand-sub {
    color: #ffe699;
    letter-spacing: 2px;
  }

  @keyframes goldSweep {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  @media (max-width: 480px) {
    .minehub-footer-card {
      width: 220px;
      height: 135px;
    }
    .brand-main {
      font-size: 20px;
    }
  }
`;

const LandingFooter = () => {
  return (
    <FooterWrapper id="contact">
      <FooterContent>
        <FooterLeft>
          <FooterColumn>
            <FooterTitle>MineHub.ai Platform</FooterTitle>
            <Description>
              Smart automated reporting and evidence-backed geological intelligence solution 
              developed for CMPDI and Coal India subsidiaries under Ministry of Coal guidelines. 
              Enabling zero-guesswork parliamentary replies, verified 768 MT target tracking, and 
              safe multi-subsidiary governance.
            </Description>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Core Systems</FooterTitle>
            <FeaturesList>
              <li>CMPDI 50-Year Geological Archive Ingestion</li>
              <li>CIL 768 MT Production Tracking &amp; Reconciliation</li>
              <li>Parliamentary &amp; DGMS Inquiry Generator</li>
              <li>Zero-Guess Page &amp; Line Evidence Passports</li>
              <li>Multi-Subsidiary Clearance Monitoring</li>
            </FeaturesList>
          </FooterColumn>
        </FooterLeft>

        <FooterRight>
          <p>Need Geological or Mining Intelligence?</p>
          <h2>MINEHUB IS HERE!</h2>

          {/* Exact MineHub Institutional Animation Card directly below MINEHUB IS HERE! */}
          <MineHubFooterBoxWrapper>
            <div className="minehub-footer-card" role="img" aria-label="MineHub.ai — Ministry of Coal">
              <div className="inner-border" />
              <div className="shimmer-trail" />
              <div className="brand-content">
                <div className="brand-header">
                  <svg className="brand-emblem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 16V4L10 10.5L17 4V16H14V8.5L10 12.2L6 8.5V16H3Z" fill="#bd9f67" />
                  </svg>
                  <span className="brand-title">MINEHUB</span>
                </div>
                <div className="brand-main">MineHub.ai</div>
                <div className="brand-sub">Ministry of Coal</div>
              </div>
            </div>
          </MineHubFooterBoxWrapper>
        </FooterRight>
      </FooterContent>

      <FooterBottom>
        <LegalLinks>
          <a href="#home">Platform Overview</a>
          <a href="#mandate">Subsidiary Directory</a>
          <a href="#solution">Architecture</a>
          <a href="#problem">The Core Challenge</a>
        </LegalLinks>

        <CopyrightText>
          &copy; 2026 MineHub.ai &bull; Ministry of Coal, Government of India
        </CopyrightText>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default LandingFooter;
