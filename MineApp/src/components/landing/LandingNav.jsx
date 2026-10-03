import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import coalLogo from '../../assets/ministry-of-coal-cropped.png';

const Navbar = styled.nav`
  width: 100%;
  padding: 0.8rem 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #164863;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  /* Controlled Curved Lower Geometry */
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;

  /* Micro-Neumorphic Depth & Elevation */
  box-shadow: 0 6px 16px rgba(22, 72, 99, 0.22), 0 2px 5px rgba(0, 0, 0, 0.08);
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: white;
  cursor: pointer;

  .brand-title {
    font-size: 1.4em;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1.1;
  }

  .brand-sub {
    font-size: 0.72rem;
    font-weight: 400;
    color: #D0E8F0;
    letter-spacing: 0.3px;
    margin-top: 2px;
  }
`;

const MinistryBadge = styled.div`
  background-color: #ffffff;
  border-radius: 6px;
  padding: 4px 8px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  flex-shrink: 0;

  img {
    height: 100%;
    width: auto;
    max-width: 160px;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 768px) {
    height: 38px;
    padding: 3px 6px;
    img {
      max-width: 110px;
    }
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 1.5px;
  height: 36px;
  background-color: rgba(208, 232, 240, 0.35);

  @media (max-width: 540px) {
    display: none;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #ffda79;
    }
  }

  .dashboard-btn {
    background-color: #ffda79;
    color: #164863;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ffbd59;
      color: #0e3144;
      transform: scale(1.05);
    }
  }

  @media (max-width: 900px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(22, 72, 99, 0.98);
    padding: 1.5rem 0;
    gap: 1.5rem;
    animation: ${slideIn} 0.3s ease-out;

    a {
      font-size: 1.1em;
      color: #ffda79;
    }
  }
`;

const Overlay = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 15;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffda79;
  font-size: 1.6em;
  cursor: pointer;
  z-index: 20;

  @media (max-width: 900px) {
    display: block;
  }
`;

const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      <Navbar>
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>

        <NavLogo onClick={() => scrollToSection('home')}>
          <MinistryBadge title="Ministry of Coal &bull; Government of India">
            <img src={coalLogo} alt="Ministry of Coal &bull; Government of India" />
          </MinistryBadge>
          <Divider />
          <div>
            <div className="brand-title">MINEHUB.AI</div>
            <div className="brand-sub">Ministry of Coal &bull; CIL &amp; CMPDI</div>
          </div>
        </NavLogo>

        <NavLinks $isOpen={isMenuOpen}>
          <a href="#solution" onClick={(e) => { e.preventDefault(); scrollToSection('solution'); }}>Solution</a>
          <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }}>Capabilities</a>
          <a href="#outcomes" onClick={(e) => { e.preventDefault(); scrollToSection('outcomes'); }}>Outcomes</a>
          <a
            href="/dashboard"
            className="dashboard-btn"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
          >
            Dashboard &rarr;
          </a>
        </NavLinks>
      </Navbar>
    </>
  );
};

export default LandingNav;
