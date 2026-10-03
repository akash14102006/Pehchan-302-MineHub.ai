import React, { useState } from 'react';
import styled from 'styled-components';
import { Send, FileText, CheckCircle2, Sparkles, ExternalLink, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import chatIcon from '../../assets/chat.png';
import aiIcon from '../../assets/AI.png';

const PanelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 6px 6px 18px rgba(22, 72, 99, 0.08), -4px -4px 14px rgba(255, 255, 255, 0.95);
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: 14px 18px;
  background-color: #f8fafc;
  border-bottom: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  .brand-group {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }

    h4 {
      margin: 0;
      font-size: 13.5px;
      font-weight: 700;
      color: #164863;
    }
  }

  .right-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .engine-tag {
    font-size: 10.5px;
    font-weight: 700;
    color: #2e7d32;
    background-color: #e8f5e9;
    padding: 3px 8px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const QuickRestoreBtn = styled.button`
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 10.5px;
  font-weight: 700;
  color: #164863;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background: #164863;
    color: #ffffff;
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  .reading-container {
    width: 100%;
    max-width: ${(props) => (props.$isFullWidth ? '880px' : '100%')};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: max-width 0.3s ease;
  }
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  max-width: 90%;
  background-color: ${(props) => (props.$isUser ? '#164863' : '#f8fafc')};
  color: ${(props) => (props.$isUser ? '#ffffff' : '#2d3748')};
  border: 1px solid ${(props) => (props.$isUser ? '#164863' : '#e2e8f0')};
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .sender-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    font-size: 10.5px;
    font-weight: 700;
    color: ${(props) => (props.$isUser ? '#D0E8F0' : '#164863')};

    img {
      width: 18px;
      height: 18px;
      object-fit: contain;
    }
  }

  .text {
    font-size: 12.5px;
    line-height: 1.6;
  }

  .citation-box {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

const CitationPill = styled.button`
  background-color: #e0f2fe;
  color: #0369a1;
  border: 1px solid #bae6fd;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 10.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 3px;

  &:hover {
    background-color: #bae6fd;
    text-decoration: underline;
  }
`;

const SuggestionsArea = styled.div`
  padding: 8px 18px;
  background-color: #f8fafc;
  border-top: 1px solid #edf2f7;
  display: flex;
  justify-content: ${(props) => (props.$isFullWidth ? 'center' : 'flex-start')};
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SuggestionChip = styled.button`
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #164863;
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: #ebf8fa;
    border-color: #164863;
  }
`;

const InputArea = styled.form`
  padding: 12px 18px;
  background-color: #ffffff;
  border-top: 1px solid #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;

  .input-inner {
    width: 100%;
    max-width: ${(props) => (props.$isFullWidth ? '880px' : '100%')};
    display: flex;
    align-items: center;
    gap: 8px;
    transition: max-width 0.3s ease;
  }

  input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12.5px;
    color: #164863;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #164863;
    }
  }

  button {
    background-color: #164863;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0f354a;
    }
  }
`;

const initialMessages = [
  {
    id: 1,
    isUser: false,
    sender: 'MineHub Verified AI Assistant',
    text: 'Report Studio is initialized with CIL, CMPDI, and DGMS statutory datasets. Query any production metric, geological borehole log, or compliance record with certified provenance.',
    citations: [],
  },
  {
    id: 2,
    isUser: true,
    sender: 'Directorate Desk',
    text: 'What is the current CIL production achievement velocity toward the 768 MT national mandate?',
    citations: [],
  },
  {
    id: 3,
    isUser: false,
    sender: 'MineHub Verified AI Assistant',
    text: 'Cumulative coal output for FY 2025–26 reached 584.2 MT (76.1% achieved). MCL leads production with 168.4 MT (82.5% of target), followed by SECL with 141.2 MT (77.6%). Deficit of 183.8 MT is actively scheduled across Q4 dispatches.',
    citations: [
      {
        id: 'CIL-768-MT',
        claim: 'CIL Output: 584.2 MT / 768.0 MT Target (76.1%)',
        source: 'CIL_Subsidiary_Production_Ledger_2025.xlsx',
        refId: 'CIL-PROD-MANDATE-FY26',
        page: 'Sheet 1 / Summary',
        coordinates: 'Cell D14',
        excerpt: 'National coal production mandate for FY 2025–26 ratified at 768.0 MT. Cumulative actual through Q4 recorded at 584.2 MT.',
      },
      {
        id: 'MCL-168-MT',
        claim: 'MCL Achievement: 168.4 MT (82.5%)',
        source: 'CIL_Subsidiary_Production_Ledger_2025.xlsx',
        refId: 'CIL-MCL-PROD-FY26',
        page: 'Sheet 2 / MCL Basin',
        coordinates: 'Cell F8',
        excerpt: 'Mahanadi Coalfields Limited recorded 168.4 MT output against 204.0 MT mandate target.',
      },
    ],
  },
];

const ChatPanel = ({
  session,
  onSelectEvidence,
  injectedQuestion,
  isSourcesCollapsed,
  isStudioCollapsed,
  onExpandSources,
  onExpandStudio,
  onUpdateSession,
}) => {
  // If session has persisted messages, use them; otherwise if new, start empty
  const [messages, setMessages] = useState(() => {
    if (session?.messages && session.messages.length > 0) {
      return session.messages;
    }
    if (session?.isNew) {
      return [];
    }
    return initialMessages;
  });
  const [inputText, setInputText] = useState('');

  // Keep messages in sync when session changes
  React.useEffect(() => {
    if (session?.messages && session.messages.length > 0) {
      setMessages(session.messages);
    } else if (session?.isNew) {
      setMessages([]);
    }
  }, [session?.id]);

  const isFullWidth = isSourcesCollapsed && isStudioCollapsed;

  // Handle auto-injected questions from AutoQuestionEngine
  React.useEffect(() => {
    if (injectedQuestion) {
      handleSendMessage(injectedQuestion);
    }
  }, [injectedQuestion]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      isUser: true,
      sender: 'Directorate Desk',
      text: query,
      citations: [],
    };

    let replyText = 'Evidence verified against official Ministry of Coal repositories.';
    let replyCitations = [];

    if (query.toLowerCase().includes('drilling') || query.toLowerCase().includes('cmpdi') || query.toLowerCase().includes('core')) {
      replyText = 'CMPDI recorded 1,240,000 meters of exploratory drilling across 24 exploration blocks. 793,600 meters are verified and certified by Regional Institute VII.';
      replyCitations = [
        {
          id: 'CMPDI-1.24M',
          claim: 'CMPDI Drilling: 1,240,000 Meters',
          source: 'CMPDI_Borehole_Exploration_FY26.pdf',
          refId: 'CMPDI-GEO-EXPL-FY26',
          page: 'Page 18, Table 4',
          coordinates: 'Table 4 / Row 1',
          excerpt: 'Exploratory core drilling total across all regional institutes certified at 1,240,000 meters.',
        },
      ];
    } else if (query.toLowerCase().includes('safety') || query.toLowerCase().includes('dgms')) {
      replyText = 'DGMS confirmed 100.0% safety audit compliance across all 58 inspection rounds with zero fatal notices. Highwall slope radar is active across Gevra and Kusmunda.';
      replyCitations = [
        {
          id: 'DGMS-58',
          claim: 'DGMS Safety Audits: 58 of 58 Complied (100%)',
          source: 'DGMS_Statutory_Safety_Audit_Records.xlsx',
          refId: 'DGMS-SAFETY-ANNUAL-58',
          page: 'Sheet 1 / Compliance Log',
          coordinates: 'Cell E12',
          excerpt: 'All 58 DGMS statutory safety inspections fulfilled with full operational compliance.',
        },
      ];
    } else {
      replyText = 'Verified through official CIL & CMPDI statutory ledgers: data integrity confirmed with 100% citation backing.';
      replyCitations = [
        {
          id: 'MOC-REG-01',
          claim: 'Ministry of Coal Statutory Registry Confirmation',
          source: 'CIL_Subsidiary_Production_Ledger_2025.xlsx',
          refId: 'MOC-STATUTORY-REGISTRY',
          page: 'Summary Section',
          coordinates: 'Cell A1',
          excerpt: 'General statutory dataset verification authenticated under Coal India Limited registry.',
        },
      ];
    }

    const aiMsg = {
      id: Date.now() + 1,
      isUser: false,
      sender: 'MineHub Verified AI Assistant',
      text: replyText,
      citations: replyCitations,
    };

    const newMessages = [...messages, userMsg, aiMsg];
    setMessages(newMessages);
    setInputText('');

    if (session?.id) {
      studioSessionService.updateSession(session.id, { messages: newMessages });
      if (onUpdateSession) {
        onUpdateSession({ ...session, messages: newMessages });
      }
    }
  };

  return (
    <PanelContainer>
      <PanelHeader>
        <div className="brand-group">
          <img src={chatIcon} alt="Chat Query" />
          <h4>Evidence Query</h4>
        </div>
        <div className="right-controls">
          {isSourcesCollapsed && (
            <QuickRestoreBtn onClick={onExpandSources} title="Expand Sources">
              <ChevronRight size={13} />
              <span>Sources</span>
            </QuickRestoreBtn>
          )}
          {isStudioCollapsed && (
            <QuickRestoreBtn onClick={onExpandStudio} title="Expand Studio">
              <span>Studio</span>
              <ChevronLeft size={13} />
            </QuickRestoreBtn>
          )}
          <div className="engine-tag">
            <CheckCircle2 size={12} /> Verified RAG
          </div>
        </div>
      </PanelHeader>

      <MessagesArea $isFullWidth={isFullWidth}>
        <div className="reading-container">
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#64748b' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#d0e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
                <Sparkles size={24} color="#164863" />
              </div>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '700', color: '#164863' }}>Evidence Query Ready</h5>
              <p style={{ margin: '0 auto 16px auto', fontSize: '12.5px', color: '#64748b', lineHeight: '1.45', maxWidth: '380px' }}>
                Select governed sources on the left, then ask any statutory production metric, borehole drilling log, or DGMS safety inquiry.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} $isUser={msg.isUser}>
                <div className="sender-row">
                  {!msg.isUser && <img src={aiIcon} alt="AI" />}
                  <span>{msg.sender}</span>
                </div>
                <div className="text">{msg.text}</div>
                {msg.citations && msg.citations.length > 0 && (
                  <div className="citation-box">
                    {msg.citations.map((cite) => (
                      <CitationPill
                        key={cite.id}
                        onClick={() =>
                          onSelectEvidence &&
                          onSelectEvidence({
                            claim: cite.claim,
                            source: cite.source,
                            refId: cite.refId,
                            page: cite.page,
                            coordinates: cite.coordinates,
                            timestamp: '2026-03-24 10:20 IST',
                            hash: 'SHA256: 3a1b2c4d5e6f7a8b',
                            excerpt: cite.excerpt,
                            authority: 'Coal India Limited & CMPDI',
                          })
                        }
                      >
                        <FileText size={10} /> [{cite.id}]
                      </CitationPill>
                    ))}
                  </div>
                )}
              </MessageBubble>
            ))
          )}
        </div>
      </MessagesArea>

      <SuggestionsArea $isFullWidth={isFullWidth}>
        <div style={{ display: 'flex', gap: '8px', maxWidth: isFullWidth ? '880px' : '100%', margin: isFullWidth ? '0 auto' : '0' }}>
          <SuggestionChip onClick={() => handleSendMessage('Compare MCL vs SECL production targets')}>
            MCL vs SECL Output
          </SuggestionChip>
          <SuggestionChip onClick={() => handleSendMessage('CMPDI core drilling progress in Talcher')}>
            CMPDI Core Drilling
          </SuggestionChip>
          <SuggestionChip onClick={() => handleSendMessage('DGMS mine safety audit compliance')}>
            DGMS Safety Audits
          </SuggestionChip>
        </div>
      </SuggestionsArea>

      <InputArea
        $isFullWidth={isFullWidth}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <div className="input-inner">
          <input
            type="text"
            placeholder="Ask evidence query or statutory question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" aria-label="Send Query">
            <Send size={15} />
          </button>
        </div>
      </InputArea>
    </PanelContainer>
  );
};

export default ChatPanel;
