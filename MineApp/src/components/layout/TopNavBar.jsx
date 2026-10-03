import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import coalLogo from '../../assets/ministry-of-coal-cropped.png';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  padding: 10px 2.2% 12px 1.8%;
  background-color: #164863;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: aliceblue;
  z-index: 100;
  box-sizing: border-box;

  /* Controlled Curved Lower Geometry (Sections 3.1 & 21) */
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;

  /* Micro-Neumorphic Depth & Elevation */
  box-shadow: 0 8px 20px rgba(22, 72, 99, 0.24), 0 3px 6px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 80px;
    padding: 8px 15px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 480px) {
    margin-left: 36px;
    gap: 10px;
  }
`;

/* Official Ministry of Coal Emblem Badge */
const MinistryLogoBadge = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 5px 12px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18), inset 0 0 0 1px rgba(22, 72, 99, 0.08);
  flex-shrink: 0;

  img {
    height: 100%;
    width: auto;
    max-width: 210px;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 768px) {
    height: 48px;
    padding: 4px 8px;
    img {
      max-width: 140px;
    }
  }

  @media (max-width: 580px) {
    display: none;
  }
`;

const BrandDivider = styled.div`
  width: 1.5px;
  height: 44px;
  background-color: rgba(208, 232, 240, 0.35);

  @media (max-width: 580px) {
    display: none;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogoText = styled(Link)`
  color: aliceblue;
  font-weight: 800;
  font-size: 29px;
  letter-spacing: -0.5px;
  line-height: 1.1;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const SubText = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  color: #D0E8F0;
  margin-top: 3px;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const TargetBadge = styled.div`
  background-color: rgba(208, 232, 240, 0.12);
  border: 1px solid rgba(208, 232, 240, 0.28);
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #ffda79;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(255, 255, 255, 0.1);

  span {
    color: #ffffff;
    font-weight: 400;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const HomeButton = styled.button`
  background-color: #2b6cb0;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;

  &:hover {
    background-color: #23588f;
    transform: translateY(-1px);
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #1a436e;
    transform: translateY(1px);
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 14px;
  }
`;

const TopNavBar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <Header>
      <LeftNav>
        <MinistryLogoBadge title="Ministry of Coal &bull; Government of India">
          <img src={coalLogo} alt="Ministry of Coal &bull; Government of India" />
        </MinistryLogoBadge>
        <BrandDivider />
        <BrandBlock>
          <LogoText to="/dashboard">MINEHUB.AI</LogoText>
          <SubText>Ministry of Coal &bull; CIL &amp; CMPDI Intelligence</SubText>
        </BrandBlock>
      </LeftNav>

      <RightControls>
        <TargetBadge>
          <span>FY 2025-26 Mandate:</span> 768.0 MT
        </TargetBadge>
        <HomeButton onClick={() => navigate('/')}>Home</HomeButton>
      </RightControls>
    </Header>
  );
};

export default TopNavBar;
