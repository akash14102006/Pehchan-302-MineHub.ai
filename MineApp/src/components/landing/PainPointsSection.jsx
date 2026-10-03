import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 60px 6%;
  background-color: #ffffff;
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

const PainPointsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PainPointItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 18px 22px;
  background-color: #fff8f8;
  border: 1px solid #ffd4d4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(255, 75, 92, 0.05);
  font-size: 1.05rem;
  color: #333333;
  line-height: 1.6;

  &::before {
    content: "•";
    font-size: 2rem;
    color: #ff4b5c;
    margin-right: 14px;
    line-height: 1;
  }

  strong {
    color: #164863;
    margin-right: 6px;
  }
`;

const PainPointsSection = () => {
  return (
    <SectionWrapper id="painpoints">
      <SectionHeader>
        <h2>Operational Pain Points &amp; Risks</h2>
        <p>Specific operational bottlenecks identified across CIL operating mines and planning divisions.</p>
      </SectionHeader>

      <PainPointsList>
        <PainPointItem>
          <div>
            <strong>Manual Cross-Subsidiary Collation:</strong> Compiling monthly production figures across ECL, BCCL, CCL, WCL, SECL, MCL, and NCL takes up to 10 days of repetitive manual spreadsheet reconciliation.
          </div>
        </PainPointItem>

        <PainPointItem>
          <div>
            <strong>Lithology Transcription Errors:</strong> Core drilling data from historical CMPDI Geological Reports is often manually retyped, risking inaccurate seam depth, GCV, and ash content values.
          </div>
        </PainPointItem>

        <PainPointItem>
          <div>
            <strong>Absence of Citation Passports:</strong> Executive memos often quote figures without immediate page-level links to the underlying Geological Report or DGMS clearance document.
          </div>
        </PainPointItem>

        <PainPointItem>
          <div>
            <strong>Statutory Compliance Silos:</strong> Forest clearances (FC Stage I/II), Environmental Clearances (EC), and mine lease expiries are tracked in disconnected folders, risking compliance lapses.
          </div>
        </PainPointItem>
      </PainPointsList>
    </SectionWrapper>
  );
};

export default PainPointsSection;
