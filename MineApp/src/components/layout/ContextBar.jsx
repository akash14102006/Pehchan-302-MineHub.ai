import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { studioSessionService } from '../../services/studioSessionService';
import { getFeature } from '../../constants/features';

const NavContainer = styled.div`
  margin-top: 96px;
  height: 48px;
  background-color: #D0E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px;
  color: #808080;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    margin-top: 80px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding: 10px 15px;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #164863;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Breadcrumbs = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #607274;
  margin: 0;

  span {
    color: #164863;
    font-weight: 600;
  }

  .clickable-crumb {
    color: #164863;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      text-decoration: underline;
      opacity: 0.85;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const ContextBar = ({ activeSection = 'MineHub Intelligence Platform' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const sessionId = searchParams.get('session');

  const currentSession = sessionId ? studioSessionService.getSession(sessionId) : null;

  const activeFeature = getFeature(tab || location.pathname);

  const getSectionTitle = () => {
    if (tab === 'studio' || tab === 'report-studio') {
      if (sessionId) {
        return currentSession ? `MineHub Report Studio — ${currentSession.title}` : 'MineHub Report Studio — Evidence & Analytical Artifact Workspace';
      }
      return 'MineHub Report Studio — Studio Sessions & History';
    }
    if (tab === 'subsidiaries') return 'CIL Subsidiaries Production Analytics';
    if (tab === 'geology') return 'Geological & Statutory Report Repository';
    if (tab === 'compliance') return 'Statutory Clearances & Compliance Monitor';
    if (tab === 'inquiries') return 'Parliamentary Inquiries & Starred Question Tracker';
    if (activeFeature && !activeFeature.active) {
      return `MineHub Intelligence Platform — ${activeFeature.name} (Under Construction)`;
    }
    return activeSection;
  };

  const getBreadcrumb = () => {
    if (activeFeature && !activeFeature.active) {
      return (
        <>
          <span className="clickable-crumb" onClick={() => navigate('/dashboard')}>Dashboard</span> &gt;{' '}
          <span>{activeFeature.name}</span>
        </>
      );
    }

    if (tab && tab.toLowerCase() !== 'dashboard') {
      if (tab.toLowerCase() === 'studio' || tab.toLowerCase() === 'report-studio') {
        if (sessionId) {
          const sessionName = currentSession ? currentSession.title : 'Session';
          const truncatedName = sessionName.length > 32 ? sessionName.substring(0, 32) + '…' : sessionName;
          return (
            <>
              <span className="clickable-crumb" onClick={() => navigate('/dashboard')}>Dashboard</span> &gt;{' '}
              <span className="clickable-crumb" onClick={() => navigate('/dashboard?tab=studio')}>Report Studio</span> &gt;{' '}
              <span>{truncatedName}</span>
            </>
          );
        }
        return (
          <>
            <span className="clickable-crumb" onClick={() => navigate('/dashboard')}>Dashboard</span> &gt;{' '}
            <span>Report Studio</span>
          </>
        );
      }

      const tabName = tab.charAt(0).toUpperCase() + tab.slice(1);
      return (
        <>
          <span className="clickable-crumb" onClick={() => navigate('/dashboard')}>Dashboard</span> &gt;{' '}
          <span>{tabName}</span>
        </>
      );
    }
    return (
      <>
        Dashboard &gt; <span>Feature Navigation</span>
      </>
    );
  };

  return (
    <NavContainer>
      <Title>{getSectionTitle()}</Title>
      <Breadcrumbs>{getBreadcrumb()}</Breadcrumbs>
    </NavContainer>
  );
};

export default ContextBar;
