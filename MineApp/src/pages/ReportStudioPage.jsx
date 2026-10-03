import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Maximize2, Minimize2, PanelLeftClose, PanelRightClose, ArrowLeft } from 'lucide-react';
import SourcePanel from '../components/studio/SourcePanel';
import ChatPanel from '../components/studio/ChatPanel';
import StudioOrchestrator from '../components/studio/StudioOrchestrator';
import EvidenceBindingDrawer from '../components/studio/EvidenceBindingDrawer';
import ReportStudioHistoryGateway from '../components/studio/ReportStudioHistoryGateway';
import { studioSessionService, studioToolsMeta, normalizeToolId } from '../services/studioSessionService';

// Assets
import reportIcon from '../assets/report.png';
import databaseIcon from '../assets/database.png';
import aiIcon from '../assets/AI.png';

const PageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 144px);
  min-height: 650px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 18px 18px 18px;
  background-color: #f4f4f4;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
    padding: 10px;
  }
`;

const SessionHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 12px;
  padding: 7px 14px;
  margin-bottom: 10px;
  border: 1px solid rgba(22, 72, 99, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;

  .left-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .back-to-history-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    color: #164863;
    padding: 4px 11px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: #D0E8F0;
      border-color: #164863;
    }
  }

  .v-divider {
    width: 1px;
    height: 18px;
    background: #cbd5e1;
  }

  .session-title {
    font-size: 13.5px;
    font-weight: 600;
    color: #164863;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .session-mode-pill {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    border: 1px solid;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }

  .right-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    color: #64748b;
    font-weight: 500;

    .live-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 4px rgba(34, 197, 94, 0.4);
    }
  }
`;

const MobileTabBar = styled.div`
  display: none;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 10px;
  border: 1px solid #cbd5e1;

  @media (max-width: 1080px) {
    display: flex;
    gap: 4px;
  }

  button {
    flex: 1;
    background: ${(props) => (props.$active ? '#164863' : 'transparent')};
    color: ${(props) => (props.$active ? '#ffffff' : '#164863')};
    border: none;
    padding: 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
`;

const WorkspaceFlex = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 8px;
  height: 100%;
  min-height: 0;
  position: relative;

  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    height: auto;

    & > div {
      display: none;
    }

    & > div.mobile-active {
      display: flex;
      min-height: 580px;
      height: 75vh;
      width: 100% !important;
    }
  }
`;

const SourceZone = styled.div`
  width: ${(props) => `${props.$width}px`};
  height: 100%;
  min-height: 0;
  flex-shrink: 0;
  transition: ${(props) => (props.$isResizing ? 'none' : 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)')};

  @media (max-width: 1080px) {
    width: 100% !important;
  }
`;

const ChatZone = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

const StudioZone = styled.div`
  width: ${(props) => `${props.$width}px`};
  height: 100%;
  min-height: 0;
  flex-shrink: 0;
  transition: ${(props) => (props.$isResizing ? 'none' : 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)')};

  @media (max-width: 1080px) {
    width: 100% !important;
  }
`;

/* ========================================================
   REQUIREMENT #1: INTERACTIVE DRAGGABLE RESIZER DIVIDER
   Clear affordance, hover highlighting, col-resize cursor,
   centered collapse/restore button.
   ======================================================== */
const ResizerDivider = styled.div`
  width: 10px;
  margin: 0 -2px;
  height: 100%;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 15;
  user-select: none;
  touch-action: none;
  flex-shrink: 0;

  &::before {
    content: '';
    width: 2px;
    height: 100%;
    background-color: ${(props) => (props.$isResizing ? '#164863' : 'transparent')};
    box-shadow: ${(props) => (props.$isResizing ? '0 0 6px rgba(22, 72, 99, 0.35)' : 'none')};
    transition: background-color 0.2s, box-shadow 0.2s;
    border-radius: 1px;
  }

  &:hover::before {
    background-color: #164863;
    box-shadow: 0 0 6px rgba(22, 72, 99, 0.35);
  }

  .resizer-pill {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #164863;
    box-shadow: 0 2px 5px rgba(22, 72, 99, 0.12);
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;

    &:hover {
      background: #164863;
      color: #ffffff;
      border-color: #164863;
      transform: translateY(-50%) scale(1.1);
    }
  }

  @media (max-width: 1080px) {
    display: none;
  }
`;

/* ========================================================
   REQUIREMENT #3: COMPACT MENU ICONS ONLY ON COLLAPSE
   When Source and/or Studio are closed, eliminate tall 40px rails.
   Show only sleek, compact floating/docked icons.
   Chat gains maximum screen workspace like NotebookLM!
   ======================================================== */
const DockedRestoreBtn = styled.button`
  width: 44px;
  height: 48px;
  background: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.14);
  border-radius: 12px;
  box-shadow: 3px 3px 10px rgba(22, 72, 99, 0.08), -2px -2px 6px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
  user-select: none;
  align-self: flex-start;
  margin-top: 10px;

  img.dock-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: transform 0.2s;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #164863;
    color: #ffffff;
    font-size: 9px;
    font-weight: 700;
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .arrow-indicator {
    color: #164863;
    opacity: 0.7;
    transition: all 0.2s;
  }

  &:hover {
    background: #f8fafc;
    border-color: #164863;
    transform: translateY(-2px);
    box-shadow: 4px 6px 14px rgba(22, 72, 99, 0.15);

    img.dock-icon {
      transform: scale(1.1);
    }

    .arrow-indicator {
      opacity: 1;
      transform: ${(props) => (props.$isLeft ? 'translateX(2px)' : 'translateX(-2px)')};
    }
  }
`;

/* ========================================================
   REQUIREMENT #4: STUDIO ELABORATE / EXPAND WORKSPACE
   Full panoramic high-productivity analysis view.
   ======================================================== */
const ExpandedStudioOverlay = styled.div`
  position: fixed;
  top: 70px;
  left: 18px;
  right: 18px;
  bottom: 18px;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.99); }
    to { opacity: 1; transform: scale(1); }
  }

  .expanded-inner {
    width: 100%;
    height: 100%;
    max-width: 1680px;
    background: #ffffff;
    border-radius: 20px;
    border: 1.5px solid rgba(22, 72, 99, 0.18);
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(22, 72, 99, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;

const StudioWorkspace = ({ sessionId, onBackToHistory }) => {
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(() => studioSessionService.getSession(sessionId));

  // Determine initial tool: only open a specific tool if explicitly provided in query params (?tool=... or ?mode=...)
  // HARD RULE: For a normal Studio session URL, default view MUST be the Studio Menu (activeStudioTool = null)
  const explicitToolParam = searchParams.get('tool') || searchParams.get('mode');
  const initialTool = explicitToolParam ? normalizeToolId(explicitToolParam) : null;

  const [mobileTab, setMobileTab] = useState('studio');
  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false);
  const [isStudioCollapsed, setIsStudioCollapsed] = useState(false);
  const [activeStudioTool, setActiveStudioTool] = useState(initialTool);

  useEffect(() => {
    const loaded = studioSessionService.getSession(sessionId);
    setSession(loaded);
    // When sessionId or searchParams change, honor explicit deep-link tool if present, otherwise Studio Menu (null)
    const currentToolParam = searchParams.get('tool') || searchParams.get('mode');
    setActiveStudioTool(currentToolParam ? normalizeToolId(currentToolParam) : null);
  }, [sessionId, searchParams]);

  const handleSelectStudioTool = (toolId) => {
    setActiveStudioTool(toolId);
    if (sessionId) {
      const updated = studioSessionService.updateSession(sessionId, {
        activeStudioMode: toolId,
      });
      if (updated) setSession(updated);
    }
  };

  const handleUpdateSession = (updated) => {
    setSession(updated);
  };

  // Requirement #1: Dynamic Adjustable Panel Widths (Source ↔ Chat ↔ Studio)
  const [sourceWidth, setSourceWidth] = useState(300);
  const [studioWidth, setStudioWidth] = useState(480);
  const [isResizingSource, setIsResizingSource] = useState(false);
  const [isResizingStudio, setIsResizingStudio] = useState(false);

  // Requirement #4: Elaborate / Expand Workspace state
  const [isStudioExpanded, setIsStudioExpanded] = useState(false);

  const [activeEvidence, setActiveEvidence] = useState(null);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [injectedQuestion, setInjectedQuestion] = useState('');

  const handleSelectEvidence = (evidenceData) => {
    setActiveEvidence(evidenceData);
    setIsEvidenceOpen(true);
  };

  const handleInjectQuestion = (q) => {
    setInjectedQuestion(q);
    setMobileTab('chat');
  };

  /* ========================================================
     MOUSE DRAG RESIZING HANDLERS
     Source ↔ Chat Divider (min 220px, max 480px)
     ======================================================== */
  const startResizingSource = useCallback((e) => {
    e.preventDefault();
    setIsResizingSource(true);
    const startX = e.clientX;
    const startW = sourceWidth;

    const onMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(220, Math.min(500, startW + delta));
      setSourceWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizingSource(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [sourceWidth]);

  /* ========================================================
     Chat ↔ Studio Divider (min 340px, max 740px)
     ======================================================== */
  const startResizingStudio = useCallback((e) => {
    e.preventDefault();
    setIsResizingStudio(true);
    const startX = e.clientX;
    const startW = studioWidth;

    const onMouseMove = (moveEvent) => {
      const delta = startX - moveEvent.clientX;
      const newWidth = Math.max(340, Math.min(760, startW + delta));
      setStudioWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsResizingStudio(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [studioWidth]);

  if (!session) {
    return (
      <PageContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            textAlign: 'center',
            background: '#ffffff',
            padding: '36px 32px',
            borderRadius: '16px',
            border: '1px solid rgba(22, 72, 99, 0.15)',
            maxWidth: '420px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#164863', fontSize: '18px', fontWeight: '700' }}>
            Studio Session Not Found
          </h3>
          <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '13px', lineHeight: '1.4' }}>
            The requested analytical studio session could not be located in real persisted storage.
          </p>
          <button
            type="button"
            onClick={onBackToHistory}
            style={{
              background: '#164863',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Return to Studio Sessions
          </button>
        </div>
      </PageContainer>
    );
  }

  const activeToolMeta = activeStudioTool ? studioToolsMeta[activeStudioTool] : null;

  return (
    <PageContainer>
      {/* Session Navigation Bar */}
      <SessionHeaderBar>
        <div className="left-meta">
          <button
            type="button"
            className="back-to-history-btn"
            onClick={onBackToHistory}
            title="Return to Studio History"
          >
            <ArrowLeft size={13} />
            <span>Studio Sessions</span>
          </button>
          <div className="v-divider" />
          <span className="session-title" title={session.title || 'Analytical Studio Session'}>
            {session.title || 'Analytical Studio Session'}
          </span>
          {activeToolMeta && (
            <span
              className="session-mode-pill"
              style={{
                backgroundColor: activeToolMeta.bg,
                color: activeToolMeta.color,
                borderColor: `${activeToolMeta.color}35`,
              }}
            >
              <span
                className="dot"
                style={{ backgroundColor: activeToolMeta.color }}
              />
              {activeToolMeta.name}
            </span>
          )}
        </div>

        <div className="right-status">
          <span className="live-dot" />
          <span>Auto-saved</span>
        </div>
      </SessionHeaderBar>

      {/* Mobile/Tablet Viewport Switcher */}
      <MobileTabBar>
        <button
          $active={mobileTab === 'sources'}
          onClick={() => setMobileTab('sources')}
        >
          Sources ({session.sources?.length || 0})
        </button>
        <button
          $active={mobileTab === 'chat'}
          onClick={() => setMobileTab('chat')}
        >
          Evidence Chat
        </button>
        <button
          $active={mobileTab === 'studio'}
          onClick={() => setMobileTab('studio')}
        >
          Studio ({activeStudioTool ? (studioToolsMeta[activeStudioTool]?.name || 'Active') : '8 Tools'})
        </button>
      </MobileTabBar>

      {/* 3-Zone Dynamic Collapsible & Resizable Workspace */}
      <WorkspaceFlex>
        {/* Left Zone: Sources Panel OR Compact Menu Icon Only (Req #3) */}
        {isSourcesCollapsed ? (
          <DockedRestoreBtn
            $isLeft={true}
            onClick={() => setIsSourcesCollapsed(false)}
            title="Restore Sources Panel"
          >
            <img src={databaseIcon} alt="Sources" className="dock-icon" />
            <div className="badge">{session.sources?.length || 0}</div>
            <ChevronRight size={13} className="arrow-indicator" />
          </DockedRestoreBtn>
        ) : (
          <>
            <SourceZone
              $width={sourceWidth}
              $isResizing={isResizingSource}
              className={mobileTab === 'sources' ? 'mobile-active' : ''}
            >
              <SourcePanel
                session={session}
                onSelectEvidence={handleSelectEvidence}
                onToggleCollapse={() => setIsSourcesCollapsed(true)}
                onUpdateSession={handleUpdateSession}
              />
            </SourceZone>

            {/* Requirement #1: Resizable Divider between Source ↔ Chat */}
            <ResizerDivider
              $isResizing={isResizingSource}
              onMouseDown={startResizingSource}
              title="Drag to resize Sources | Click arrow to collapse"
            >
              <div
                className="resizer-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSourcesCollapsed(true);
                }}
                title="Collapse Sources"
              >
                <ChevronLeft size={13} />
              </div>
            </ResizerDivider>
          </>
        )}

        {/* Center Zone: Evidence Chat (Expands to 100% full width like NotebookLM) */}
        <ChatZone
          className={mobileTab === 'chat' ? 'mobile-active' : ''}
          $isFullWidth={isSourcesCollapsed && isStudioCollapsed}
        >
          <ChatPanel
            session={session}
            onSelectEvidence={handleSelectEvidence}
            injectedQuestion={injectedQuestion}
            isSourcesCollapsed={isSourcesCollapsed}
            isStudioCollapsed={isStudioCollapsed}
            onExpandSources={() => setIsSourcesCollapsed(false)}
            onExpandStudio={() => setIsStudioCollapsed(false)}
            onUpdateSession={handleUpdateSession}
          />
        </ChatZone>

        {/* Right Zone: Studio Panel OR Compact Menu Icon Only (Req #3) */}
        {isStudioCollapsed ? (
          <DockedRestoreBtn
            $isLeft={false}
            onClick={() => setIsStudioCollapsed(false)}
            title="Restore Studio Tools"
          >
            <ChevronLeft size={13} className="arrow-indicator" />
            <img src={reportIcon} alt="Studio" className="dock-icon" />
            <div className="badge">8</div>
          </DockedRestoreBtn>
        ) : (
          <>
            {/* Requirement #1: Resizable Divider between Chat ↔ Studio */}
            <ResizerDivider
              $isResizing={isResizingStudio}
              onMouseDown={startResizingStudio}
              title="Drag to resize Studio | Click arrow to collapse"
            >
              <div
                className="resizer-pill"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsStudioCollapsed(true);
                }}
                title="Collapse Studio"
              >
                <ChevronRight size={13} />
              </div>
            </ResizerDivider>

            <StudioZone
              $width={studioWidth}
              $isResizing={isResizingStudio}
              className={mobileTab === 'studio' ? 'mobile-active' : ''}
            >
              <StudioOrchestrator
                session={session}
                onSelectEvidence={handleSelectEvidence}
                onInjectQuestion={handleInjectQuestion}
                onToggleCollapse={() => setIsStudioCollapsed(true)}
                activeTool={activeStudioTool}
                onSelectTool={handleSelectStudioTool}
                onToggleExpand={() => setIsStudioExpanded(true)}
                isExpanded={false}
                onUpdateSession={handleUpdateSession}
              />
            </StudioZone>
          </>
        )}
      </WorkspaceFlex>

      {/* Requirement #4: Studio Elaborate / Expand Panoramic Workspace */}
      {isStudioExpanded && (
        <ExpandedStudioOverlay onClick={() => setIsStudioExpanded(false)}>
          <div className="expanded-inner" onClick={(e) => e.stopPropagation()}>
            <StudioOrchestrator
              session={session}
              onSelectEvidence={handleSelectEvidence}
              onInjectQuestion={handleInjectQuestion}
              onToggleCollapse={() => setIsStudioExpanded(false)}
              activeTool={activeStudioTool}
              onSelectTool={handleSelectStudioTool}
              onToggleExpand={() => setIsStudioExpanded(false)}
              isExpanded={true}
              onUpdateSession={handleUpdateSession}
            />
          </div>
        </ExpandedStudioOverlay>
      )}

      {/* Evidence Binding Provenance Drawer */}
      <EvidenceBindingDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        evidenceData={activeEvidence}
      />
    </PageContainer>
  );
};

const ReportStudioPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get('session');

  const handleOpenSession = (id) => {
    setSearchParams({ tab: 'studio', session: id });
  };

  const handleBackToHistory = () => {
    setSearchParams({ tab: 'studio' });
  };

  // If no session query param is present, render the dedicated History Gateway
  if (!sessionId) {
    return (
      <ReportStudioHistoryGateway
        onOpenSession={handleOpenSession}
        onNewSession={handleOpenSession}
      />
    );
  }

  return (
    <StudioWorkspace
      sessionId={sessionId}
      onBackToHistory={handleBackToHistory}
    />
  );
};

export default ReportStudioPage;
