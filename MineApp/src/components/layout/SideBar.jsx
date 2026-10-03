import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import dashboardIcon from '../../assets/dashboard.png';
import othersIcon from '../../assets/others.png';
import databaseIcon from '../../assets/database.png';
import reportIcon from '../../assets/report.png';
import mailIcon from '../../assets/mail.png';

const Container = styled.div`
  position: relative;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 22px;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 14px;
    left: 8px;
  }
`;

const SidebarContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  width: 85px;
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  left: 0;
  z-index: 10;
  transition: transform 0.3s ease-in-out;
  padding-top: 20px;
  overflow-y: auto;
  position: fixed;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    top: 0;
    left: 0;
    height: 100vh;
    width: 70px;
    z-index: 15;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 8px;
  padding: 0 5px;
`;

const SidebarLink = styled(Link)`
  font-size: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 4px;
  border-radius: 6px;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.25s ease;

  &:hover {
    text-decoration: none;
    background-color: #e6f2f7;
    color: #164863;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: #D0E8F0;
    font-weight: 700;
    color: #164863;
    /* Soft Neumorphic Inset/Elevation */
    box-shadow: inset 1px 1px 3px rgba(22, 72, 99, 0.16), 1px 1px 3px rgba(255, 255, 255, 0.9);
  }
`;

const SidebarImage = styled.img`
  width: 38px;
  height: 38px;
  margin-bottom: 5px;
  object-fit: contain;
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 12;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }
`;

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeSidebar);
    } else {
      document.removeEventListener('mousedown', closeSidebar);
    }
    return () => {
      document.removeEventListener('mousedown', closeSidebar);
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: dashboardIcon },
    { name: 'Subsidiaries', path: '/dashboard?tab=subsidiaries', icon: othersIcon },
    { name: 'Geology', path: '/dashboard?tab=geology', icon: databaseIcon },
    { name: 'Compliance', path: '/dashboard?tab=compliance', icon: reportIcon },
    { name: 'Inquiries', path: '/dashboard?tab=inquiries', icon: mailIcon },
  ];

  return (
    <Container>
      <MenuIcon onClick={toggleSidebar} title="Toggle Navigation">
        ☰
      </MenuIcon>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
        <SidebarList>
          {navItems.map((item) => {
            const searchParams = new URLSearchParams(location.search);
            const currentTab = searchParams.get('tab') || 'dashboard';
            const isDashboard = item.name.toLowerCase() === 'dashboard';
            const isCurrent =
              item.name.toLowerCase() === currentTab.toLowerCase() ||
              (isDashboard && (!searchParams.get('tab') || searchParams.get('tab') === 'dashboard'));

            return (
              <SidebarItem key={item.name}>
                <SidebarLink
                  to={item.path}
                  className={isCurrent ? 'active' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  <SidebarImage src={item.icon} alt={item.name} />
                  {item.name}
                </SidebarLink>
              </SidebarItem>
            );
          })}
        </SidebarList>
      </SidebarContainer>
    </Container>
  );
};

export default SideBar;
