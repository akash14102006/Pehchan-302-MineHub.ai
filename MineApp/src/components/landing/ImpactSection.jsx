import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 60px 6%;
  background-color: #f7f9fc;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 35px auto;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #164863;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.05rem;
    color: #555555;
  }
`;

const OutcomeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const OutcomeItem = styled.div`
  background-color: #ffffff;
  padding: 24px 20px;
  border-radius: 8px;
  width: 260px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  border-bottom: 4px solid #164863;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .metric-highlight {
    font-size: 2.2rem;
    font-weight: 800;
    color: #164863;
    margin-bottom: 8px;
    line-height: 1;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.88rem;
    color: #666666;
    line-height: 1.5;
  }
`;

const ImpactSection = () => {
  const outcomes = [
    {
      metric: '90%',
      title: 'Faster Inquiry Response',
      desc: 'Reduces statutory inquiry preparation from 48 hours to under 30 minutes with pre-validated data.',
    },
    {
      metric: '100%',
      title: 'Evidence Traceability',
      desc: 'Every extracted figure is bound to exact page and paragraph citations in original CIL files.',
    },
    {
      metric: '7 + CMPDI',
      title: 'Subsidiaries Synchronized',
      desc: 'Single unified source of truth across ECL, BCCL, CCL, WCL, SECL, MCL, NCL, and CMPDI.',
    },
    {
      metric: '768 MT',
      title: 'Mandate Tracking',
      desc: 'Continuous real-time tracking against national coal production targets with predictive shortfall alerts.',
    },
  ];

  return (
    <SectionWrapper id="outcomes">
      <SectionHeader>
        <h2>Measurable Outcomes &amp; Impact</h2>
        <p>Tangible performance benchmarks achieved across coal intelligence workflows.</p>
      </SectionHeader>

      <OutcomeList>
        {outcomes.map((item, idx) => (
          <OutcomeItem key={idx}>
            <div className="metric-highlight">{item.metric}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </OutcomeItem>
        ))}
      </OutcomeList>
    </SectionWrapper>
  );
};

export default ImpactSection;
