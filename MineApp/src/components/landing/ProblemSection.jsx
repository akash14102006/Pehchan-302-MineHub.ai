import React, { useState } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 65px 6%;
  background-color: #ffffff;
  border-top: 1px solid #eef2f6;
  border-bottom: 1px solid #eef2f6;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 42px auto;

  h2 {
    font-size: 2.3rem;
    font-weight: 700;
    color: #111111;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  p {
    font-size: 1.05rem;
    color: #444444;
    line-height: 1.5;
    margin: 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

/* Soft Neumorphic Pale-Yellow Card with Subtle Inner Depth & Hover Press */
const PaleYellowCard = styled.div`
  background-color: #FFF8DE;
  border-radius: 32px;
  padding: 30px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.04);

  /* Soft, Subtle Neumorphism: light outer shadow + subtle inner depth */
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.05), 
              -4px -4px 14px rgba(255, 255, 255, 0.9), 
              inset 1px 1px 2px rgba(255, 255, 255, 0.7);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
  min-height: 380px;

  /* Gentle hover/press depth */
  &:hover {
    transform: scale(0.97);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.06), 
                -2px -2px 8px rgba(255, 255, 255, 0.9), 
                inset 1px 1px 2px rgba(0, 0, 0, 0.03);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.08), 
                inset -2px -2px 6px rgba(255, 255, 255, 0.7);
  }

  /* Card Top Row: 01. + CATEGORY */
  .card-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .number-label {
    font-size: 13.5px;
    font-weight: 800;
    color: #111111;
    letter-spacing: 0.5px;
    font-family: monospace, -apple-system, sans-serif;
  }

  .category-label {
    font-size: 11px;
    font-weight: 800;
    color: #111111;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Large Centered MineHub-relevant Icon Area */
  .icon-center-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0 16px 0;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76px;
    height: 76px;
    margin-bottom: 6px;
    transition: transform 0.3s ease;
  }

  &:hover .icon-wrapper {
    transform: scale(1.05);
  }

  /* "Hover Me?" Interaction Treatment */
  .hover-me-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: #111111;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 5px 13px;
    border-radius: 20px;
    margin-top: 4px;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  &:hover .hover-me-pill {
    background-color: #ffffff;
    color: #111111;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Content Area */
  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-top: 8px;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111111;
    margin: 0 0 12px 0;
    line-height: 1.3;
    letter-spacing: -0.2px;
  }

  /* Reduced statement: bold problem keywords + italic impact */
  .card-statement {
    font-size: 0.98rem;
    color: #1a1a1a;
    line-height: 1.55;
    margin: 0;

    strong {
      font-weight: 700;
      color: #000000;
    }

    em {
      font-style: italic;
      color: #333333;
    }
  }

  /* Bottom Row with Dotted Grid Icon */
  .card-bottom-row {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: auto;
    padding-top: 14px;
  }

  .dotted-grid-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover .dotted-grid-icon {
    opacity: 1;
    transform: rotate(90deg);
  }
`;

const ProblemSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const challenges = [
    {
      num: '01.',
      category: 'ARCHIVES',
      title: '50 Years of Scanned Geological Reports',
      statement: (
        <>
          <strong>Historical archives</strong> remain <em>difficult to search and use.</em>
        </>
      ),
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 68 68"
          fill="none"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Dossier Document Archive */}
          <path
            d="M14 18V50C14 53.3 16.7 56 20 56H48C51.3 56 54 53.3 54 50V24L42 12H20C16.7 12 14 14.7 14 18Z"
            fill="#FFF5D6"
          />
          <polyline points="42 12 42 24 54 24" />
          <line x1="22" y1="32" x2="38" y2="32" />
          <line x1="22" y1="40" x2="46" y2="40" />
          <line x1="22" y1="48" x2="34" y2="48" />
          <circle cx="44" cy="46" r="6" stroke="#111111" strokeWidth="2.2" fill="#FFF8DE" />
          <line x1="48.5" y1="50.5" x2="53" y2="55" stroke="#111111" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      num: '02.',
      category: 'LEGISLATION',
      title: 'Parliamentary Inquiry Pressure',
      statement: (
        <>
          <strong>Strict statutory deadlines</strong> require <em>fast cross-subsidiary verification.</em>
        </>
      ),
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 68 68"
          fill="none"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Parliament / Statutory Dome & Clock */}
          <path d="M34 10L14 20V24H54V20L34 10Z" fill="#FFF5D6" />
          <line x1="20" y1="24" x2="20" y2="44" />
          <line x1="29" y1="24" x2="29" y2="44" />
          <line x1="39" y1="24" x2="39" y2="44" />
          <line x1="48" y1="24" x2="48" y2="44" />
          <rect x="12" y="44" width="44" height="6" rx="2" fill="#111111" />
          <circle cx="48" cy="42" r="9" fill="#FFF5D6" stroke="#111111" strokeWidth="2" />
          <polyline points="48 37 48 42 51 44" />
        </svg>
      ),
    },
    {
      num: '03.',
      category: 'GOVERNANCE',
      title: 'Subsidiary Discrepancies',
      statement: (
        <>
          <strong>Conflicting operating figures</strong> create <em>decision and reporting risk.</em>
        </>
      ),
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 68 68"
          fill="none"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Multi-Subsidiary Network Nodes & Reconciliation */}
          <circle cx="34" cy="20" r="7" fill="#111111" />
          <circle cx="17" cy="48" r="6" fill="#FFF5D6" stroke="#111111" strokeWidth="2.2" />
          <circle cx="51" cy="48" r="6" fill="#FFF5D6" stroke="#111111" strokeWidth="2.2" />
          <circle cx="34" cy="52" r="5.5" fill="#FFF5D6" stroke="#111111" strokeWidth="2.2" />
          <line x1="29" y1="25" x2="19" y2="43" />
          <line x1="39" y1="25" x2="49" y2="43" />
          <line x1="34" y1="27" x2="34" y2="46" />
        </svg>
      ),
    },
  ];

  return (
    <SectionWrapper id="problem">
      <SectionHeader>
        <h2>The Core Challenge</h2>
        <p>
          Critical mining facts exist across CMPDI and 7 subsidiaries, 
          but remain fragmented in physical registers, scanned PDFs, and legacy spreadsheets.
        </p>
      </SectionHeader>

      <CardsGrid>
        {challenges.map((c, idx) => (
          <PaleYellowCard
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Top Row: 01. + CATEGORY */}
            <div className="card-top-row">
              <span className="number-label">{c.num}</span>
              <span className="category-label">{c.category}</span>
            </div>

            {/* Center Area: Large MineHub Icon + "Hover Me?" Treatment */}
            <div className="icon-center-area">
              <div className="icon-wrapper">{c.icon}</div>
              <div className="hover-me-pill">
                <span>{hoveredIdx === idx ? 'Challenge Active' : 'Hover Me?'}</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Content: Title + Reduced Statement (Bold Keywords + Italic Consequence) */}
            <div className="card-content">
              <h3 className="card-title">{c.title}</h3>
              <p className="card-statement">{c.statement}</p>
            </div>

            {/* Bottom Row: Dotted Grid Icon */}
            <div className="card-bottom-row">
              <div className="dotted-grid-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#111111">
                  <circle cx="3" cy="3" r="1.5" />
                  <circle cx="9" cy="3" r="1.5" />
                  <circle cx="15" cy="3" r="1.5" />
                  <circle cx="3" cy="9" r="1.5" />
                  <circle cx="9" cy="9" r="1.5" />
                  <circle cx="15" cy="9" r="1.5" />
                  <circle cx="3" cy="15" r="1.5" />
                  <circle cx="9" cy="15" r="1.5" />
                  <circle cx="15" cy="15" r="1.5" />
                </svg>
              </div>
            </div>
          </PaleYellowCard>
        ))}
      </CardsGrid>
    </SectionWrapper>
  );
};

export default ProblemSection;
