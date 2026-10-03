import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HoverRevealCard from '../common/HoverRevealCard';

const SectionWrapper = styled.section`
  padding: 70px 6%;
  background-color: #ffffff;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 820px;
  margin: 0 auto 36px auto;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #164863;
    margin: 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CapabilitiesSection = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      eyebrow: 'Exploration Engine',
      icon: '⛏',
      title: 'Deep-Dig RAG',
      href: '/dashboard',
    },
    {
      eyebrow: 'Truth Protocol',
      icon: '🛡',
      title: 'Zero Guess',
      href: '/dashboard',
    },
    {
      eyebrow: 'Traceability Passport',
      icon: '📑',
      title: 'Evidence Passport',
      href: '/dashboard',
    },
    {
      eyebrow: 'Reconciliation Court',
      icon: '⚖',
      title: 'Conflict Court',
      href: '/dashboard',
    },
    {
      eyebrow: 'Reporting Suite',
      icon: '📊',
      title: 'MineHub Report Studio',
      href: '/dashboard',
    },
    {
      eyebrow: 'Geospatial Intelligence',
      icon: '🗺',
      title: 'GeoMap',
      href: '/dashboard',
    },
    {
      eyebrow: 'Multi-Agent Bench',
      icon: '🤖',
      title: 'Agent Bench',
      href: '/dashboard',
    },
    {
      eyebrow: 'Compliance Pipeline',
      icon: '⚡',
      title: 'Workflow Orchestration',
      href: '/dashboard',
    },
  ];

  return (
    <SectionWrapper id="capabilities">
      <SectionHeader>
        <h2>MineHub Intelligence Capabilities</h2>
      </SectionHeader>

      <CardsGrid>
        {capabilities.map((cap, idx) => (
          <HoverRevealCard
            key={idx}
            eyebrow={cap.eyebrow}
            icon={cap.icon}
            title={cap.title}
            onClick={() => navigate(cap.href)}
          />
        ))}
      </CardsGrid>
    </SectionWrapper>
  );
};

export default CapabilitiesSection;
