import React from 'react';
import styled from 'styled-components';

const KpiContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 25px 0 25px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 15px 15px 0 15px;
  }
`;

const KpiCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 4px solid ${(props) => props.$accent || '#164863'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  }
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #707070;
  margin-bottom: 6px;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
`;

const MetricValue = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #164863;
  line-height: 1.1;
`;

const Unit = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #555555;
`;

const ProgressInfo = styled.div`
  font-size: 12px;
  color: ${(props) => props.$color || '#4CAF50'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SubText = styled.div`
  font-size: 11px;
  color: #888888;
  margin-top: 2px;
`;

const KpiMetricsRow = () => {
  const kpis = [
    {
      label: 'CIL Mandate Target (FY 25–26)',
      value: '768.0',
      unit: 'MT',
      progress: '100% Production Mandate',
      color: '#164863',
      sub: 'Annual Target for 7 Subsidiaries',
      accent: '#164863',
    },
    {
      label: 'Actual YTD Output',
      value: '584.2',
      unit: 'MT',
      progress: '▲ 76.1% Achieved',
      color: '#4CAF50',
      sub: '183.8 MT remaining in Q4',
      accent: '#4CAF50',
    },
    {
      label: 'CMPDI Geological Drilling',
      value: '1,240,000',
      unit: 'Meters',
      progress: '94.2% Block Exploration',
      color: '#164863',
      sub: 'Core extraction & geophysical logs',
      accent: '#3182CE',
    },
    {
      label: 'Parliament Inquiries Resolved',
      value: '142 / 144',
      unit: 'Replies',
      progress: '98.6% Citation Backed',
      color: '#4CAF50',
      sub: 'Lok Sabha & Rajya Sabha Starred',
      accent: '#E5A620',
    },
  ];

  return (
    <KpiContainer>
      {kpis.map((kpi, idx) => (
        <KpiCard key={idx} $accent={kpi.accent}>
          <Label>{kpi.label}</Label>
          <ValueRow>
            <MetricValue>{kpi.value}</MetricValue>
            <Unit>{kpi.unit}</Unit>
          </ValueRow>
          <ProgressInfo $color={kpi.color}>{kpi.progress}</ProgressInfo>
          <SubText>{kpi.sub}</SubText>
        </KpiCard>
      ))}
    </KpiContainer>
  );
};

export default KpiMetricsRow;
