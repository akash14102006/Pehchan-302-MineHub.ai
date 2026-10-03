import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 60px 6%;
  background-color: #ffffff;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 850px;
  margin: 0 auto 35px auto;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #164863;
    margin-bottom: 12px;
  }

  p {
    font-size: 1.05rem;
    color: #555555;
    line-height: 1.6;
  }
`;

const SubsidiariesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1250px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SubCard = styled.div`
  background-color: #f7f9fc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${(props) => props.$color || '#164863'};

  .code {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${(props) => props.$color || '#164863'};
    margin-bottom: 4px;
  }

  .name {
    font-size: 0.92rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 6px;
  }

  .desc {
    font-size: 0.82rem;
    color: #718096;
    line-height: 1.4;
  }
`;

const MinistrySection = () => {
  const subs = [
    { code: 'MCL', name: 'Mahanadi Coalfields', color: '#FF6666', desc: 'Highest producing subsidiary; Talcher & Ib Valley coalfields.' },
    { code: 'SECL', name: 'South Eastern Coalfields', color: '#FFB366', desc: 'Major supplier; Gevra & Kusmunda mega opencast projects.' },
    { code: 'NCL', name: 'Northern Coalfields', color: '#FF9933', desc: 'Singrauli belt; 100% mechanized opencast operations.' },
    { code: 'BCCL', name: 'Bharat Coking Coal', color: '#48BB78', desc: 'Prime metallurgical coking coal; Jharia coalfield.' },
    { code: 'CCL', name: 'Central Coalfields', color: '#38B2AC', desc: 'Bokaro, Karanpura & Ramgarh thermal/coking coal.' },
    { code: 'WCL', name: 'Western Coalfields', color: '#805AD5', desc: 'Vital supplier to Western & Central India power plants.' },
    { code: 'ECL', name: 'Eastern Coalfields', color: '#D53F8C', desc: 'Raniganj coalfield; heritage high-grade coal seams.' },
    { code: 'CMPDI', name: 'Central Mine Planning', color: '#3182CE', desc: 'Nodal premier exploration, drilling & mine planning institute.' },
  ];

  return (
    <SectionWrapper id="mandate">
      <SectionHeader>
        <h2>Institutional Mandate &amp; Subsidiary Network</h2>
        <p>
          Coal India Limited (CIL) produces over 80% of India&apos;s primary energy coal. 
          MineHub.ai connects all 7 operating subsidiaries and CMPDI into a singular, synchronized data infrastructure.
        </p>
      </SectionHeader>

      <SubsidiariesGrid>
        {subs.map((s, idx) => (
          <SubCard key={idx} $color={s.color}>
            <div className="code">{s.code}</div>
            <div className="name">{s.name}</div>
            <div className="desc">{s.desc}</div>
          </SubCard>
        ))}
      </SubsidiariesGrid>
    </SectionWrapper>
  );
};

export default MinistrySection;
