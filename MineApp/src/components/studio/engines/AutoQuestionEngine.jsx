import React from 'react';
import styled from 'styled-components';
import { Send, FileText, CheckCircle2, HelpCircle } from 'lucide-react';
import analysisIcon from '../../../assets/analysis.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  border-bottom: 1px solid #edf2f7;
  background-color: #f8fafc;

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #164863;

    img {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
  }

  .meta {
    font-size: 11.5px;
    color: #64748b;
    font-weight: 600;
  }
`;

const QuestionsScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  padding: 16px 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    .house {
      font-size: 11px;
      font-weight: 700;
      color: #ffffff;
      padding: 2px 8px;
      border-radius: 4px;
      background-color: ${(props) => (props.$house === 'Lok Sabha' ? '#2e7d32' : '#c62828')};
    }

    .qnum {
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      color: #164863;
    }
  }

  .question-text {
    font-size: 13px;
    font-weight: 700;
    color: #164863;
    line-height: 1.4;
  }

  .answer-snippet {
    font-size: 12px;
    line-height: 1.5;
    color: #475569;
    background-color: #f8fafc;
    padding: 8px 12px;
    border-left: 3px solid #3182ce;
    border-radius: 4px;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 6px;

    .ref {
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
    }

    button {
      background-color: #164863;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 5px 12px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;

      &:hover {
        background-color: #0f3144;
      }
    }
  }
`;

const questionsList = [
  {
    num: 'LS-SQ-2401',
    house: 'Lok Sabha',
    question: 'Whether Coal India Limited is on schedule to achieve the 768 MT production mandate for FY 2025–26?',
    answer: 'As of Q4, cumulative actual coal production stands at 584.2 MT (76.1% achieved), with MCL and SECL contributing 309.6 MT combined.',
    ref: 'Ref: CIL-PROD-MANDATE-FY26',
  },
  {
    num: 'LS-USQ-1892',
    house: 'Lok Sabha',
    question: 'Details of exploratory core drilling completed by CMPDI across Talcher and Singrauli coalfields?',
    answer: 'CMPDI has drilled 1,240,000 meters aggregate, with 793,600 meters certified complete and verified by Regional Institute VII.',
    ref: 'Ref: CMPDI-RI-VII-DRILL-089',
  },
  {
    num: 'RS-SQ-0942',
    house: 'Rajya Sabha',
    question: 'Implementation status of DGMS slope stability radar and dust suppression audits across opencast mines?',
    answer: 'All 58 DGMS safety inspections verified 100% compliant, including Gevra and Kusmunda highwall radar monitoring.',
    ref: 'Ref: DGMS-SAFETY-ANNUAL-58',
  },
  {
    num: 'RS-USQ-1205',
    house: 'Rajya Sabha',
    question: 'Current status of Stage-II Forest Clearances for coal blocks in the Mand-Raigarh and Talcher basins?',
    answer: '22 of 24 forest clearance blocks have secured Stage-II final diversion with all compensatory afforestation funds deposited.',
    ref: 'Ref: FC-STAGE2-OD-341',
  },
];

const AutoQuestionEngine = ({ onInjectQuestion }) => {
  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={analysisIcon} alt="Auto Questions" />
          <span>Automated Parliamentary Question & Inquiry Generator</span>
        </div>
        <div className="meta">Hansard-Backed Starred Inquiries</div>
      </Toolbar>

      <QuestionsScroll>
        {questionsList.map((item, idx) => (
          <QuestionCard key={idx} $house={item.house}>
            <div className="top-row">
              <span className="house">{item.house}</span>
              <span className="qnum">{item.num}</span>
            </div>
            <div className="question-text">{item.question}</div>
            <div className="answer-snippet">{item.answer}</div>
            <div className="bottom-row">
              <span className="ref">{item.ref}</span>
              <button onClick={() => onInjectQuestion && onInjectQuestion(item.question)}>
                <Send size={11} /> Query in Chat
              </button>
            </div>
          </QuestionCard>
        ))}
      </QuestionsScroll>
    </Container>
  );
};

export default AutoQuestionEngine;
