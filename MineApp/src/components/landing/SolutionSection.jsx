import React, { useState } from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 70px 6%;
  background-color: #f7f9fc;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 48px auto;

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

const SolutionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1240px;
  margin: 0 auto;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    max-width: 640px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 290px;
  }
`;

const BookCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  perspective: 2000px;
  position: relative;
  z-index: 1;

  &:hover,
  &:focus-within {
    z-index: 10;
  }

  .book {
    position: relative;
    border-radius: 10px;
    width: 100%;
    max-width: 260px;
    height: 310px;
    background-color: #ffffff;
    box-shadow: 0 4px 14px rgba(22, 72, 99, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03);
    border: 1px solid #e2e8f0;
    border-left: 3px solid rgba(22, 72, 99, 0.14);
    transform-style: preserve-3d;
    perspective: 2000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 20px 24px 44px;
    box-sizing: border-box;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
    outline: none;
  }

  .book:focus-visible {
    outline: 2px solid #164863;
    outline-offset: 3px;
  }

  .book:hover,
  .book.is-open {
    box-shadow: 0 10px 26px rgba(22, 72, 99, 0.12), 0 3px 8px rgba(0, 0, 0, 0.05);
  }

  /* Base / Revealed Content behind cover */
  .book-revealed {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .inner-stage-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--stage-accent, #164863);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 12px;
  }

  .stage-desc {
    font-size: 0.92rem;
    color: #334155;
    line-height: 1.62;
    margin: 0;
    font-weight: 450;
  }

  /* 3D Book Cover */
  .cover {
    top: 0;
    left: 0;
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    transform-origin: 0;
    box-shadow: 0 4px 14px rgba(22, 72, 99, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
    border: 1px solid #e2e8f0;
    border-top: 4px solid var(--stage-accent, #4caf50);
    border-left: 3px solid rgba(22, 72, 99, 0.14);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 18px;
    box-sizing: border-box;
    text-align: center;
    user-select: none;
  }

  .cover .stage-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--stage-accent, #4caf50);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 14px;
  }

  .cover .stage-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #164863;
    line-height: 1.35;
    margin: 0;
    padding: 0 8px;
  }

  /* Cover Opening Interaction */
  .book:hover .cover,
  .book:focus-visible .cover,
  .book.is-open .cover {
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    transform: rotateY(-80deg);
    box-shadow: -4px 6px 18px rgba(22, 72, 99, 0.12);
  }

  /* Accessibility: Prefers Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    .cover {
      transform: none !important;
      transition: opacity 0.25s ease !important;
    }

    .book:hover .cover,
    .book:focus-visible .cover,
    .book.is-open .cover {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

const StageBookCard = ({ stage, title, description, accent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <BookCardWrapper style={{ '--stage-accent': accent }}>
      <div
        className={`book ${isOpen ? 'is-open' : ''}`}
        tabIndex={0}
        role="button"
        aria-label={`${stage}: ${title}`}
        aria-expanded={isOpen}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        <div className="book-revealed">
          <div className="inner-stage-label">{stage}</div>
          <p className="stage-desc">{description}</p>
        </div>

        <div className="cover" aria-hidden="true">
          <div className="stage-label">{stage}</div>
          <h3 className="stage-title">{title}</h3>
        </div>
      </div>
    </BookCardWrapper>
  );
};

const SolutionSection = () => {
  const steps = [
    {
      step: 'STAGE 01',
      title: 'Multimodal Archive Digitize',
      desc: 'Ingests scanned historical Geological Reports (GR), borehole lithologs, raster maps, and spreadsheets into structured geological entities.',
      accent: '#4CAF50',
    },
    {
      step: 'STAGE 02',
      title: 'Zero-Guess Citation Passport',
      desc: 'Attaches cryptographic page-and-line evidence to every coal reserve metric, seam depth, and production figure.',
      accent: '#1976D2',
    },
    {
      step: 'STAGE 03',
      title: 'Cross-Subsidiary Reconciliation',
      desc: 'Synchronizes dispatch and production data across all 7 CIL operating subsidiaries against the 768 MT national mandate.',
      accent: '#FF9800',
    },
    {
      step: 'STAGE 04',
      title: 'Automated Inquiry Dossiers',
      desc: 'Generates ready-to-table parliamentary answers, Ministry briefing packs, and DGMS audit reports within minutes.',
      accent: '#9C27B0',
    },
  ];

  return (
    <SectionWrapper id="solution">
      <SectionHeader>
        <h2>The MineHub Intelligence Solution</h2>
        <p>A 4-stage pipeline purpose-built for institutional geological and mining compliance.</p>
      </SectionHeader>

      <SolutionGrid>
        {steps.map((st, i) => (
          <StageBookCard
            key={i}
            stage={st.step}
            title={st.title}
            description={st.desc}
            accent={st.accent}
          />
        ))}
      </SolutionGrid>
    </SectionWrapper>
  );
};

export default SolutionSection;
