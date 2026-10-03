import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus, MoreVertical, FolderOpen, Edit3, Copy, Trash2, Image, Check, ArrowRight, RotateCw, AlertCircle } from 'lucide-react';
import {
  studioSessionService,
  studioToolsMeta,
  COAL_BG_ASSETS,
  COAL_IMAGE_ASSETS
} from '../../services/studioSessionService';

const GatewayContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 24px 20px 48px 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 14px 36px 14px;
  }
`;

/* Clean minimal header: Heading + Action */
const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #164863;
  margin: 0;
  letter-spacing: -0.3px;

  @media (max-width: 600px) {
    font-size: 19px;
  }
`;

const SessionCountBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #607274;
  background-color: #e2e8f0;
  padding: 2px 9px;
  border-radius: 12px;
`;

const NewStudioButton = styled.button`
  background-color: #164863;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 13.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(22, 72, 99, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease;
  font-family: inherit;

  &:hover {
    background-color: #1f6f98;
    transform: translateY(-1px);
    box-shadow: 3px 4px 10px rgba(22, 72, 99, 0.28);
  }

  &:active {
    background-color: #0e3144;
    transform: translateY(1px);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

/* 3-column responsive grid matching FeatureBox layout */
const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

/* Soft Neumorphic Curved Enterprise Card */
const HistoryCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(22, 72, 99, 0.09);
  padding: 12px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
  position: relative;

  /* Subtle Neumorphic Depth */
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05), -2px -2px 10px rgba(255, 255, 255, 0.95);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(22, 72, 99, 0.24);
    box-shadow: 6px 8px 20px rgba(22, 72, 99, 0.09), -3px -3px 12px rgba(255, 255, 255, 1);

    .preview-image {
      transform: scale(1.025);
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 1px 1px 4px rgba(22, 72, 99, 0.12);
  }
`;

/* Requirement #10: "Half-Curved Box" Preview Area */
const HalfCurvedPreview = styled.div`
  width: 100%;
  height: 146px;
  border-radius: 16px 16px 10px 10px;
  position: relative;
  overflow: hidden;
  background-color: #f1f5f9;
  border: 1px solid rgba(22, 72, 99, 0.06);

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  /* Bottom subtle gradient for contrast */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const ModeBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(22, 72, 99, 0.12);
  border-radius: 14px;
  padding: 3px 9px 3px 7px;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  .mode-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.$color || '#164863'};
  }

  .mode-text {
    font-size: 11px;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: 0.2px;
  }
`;

const AssetSourceBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 2px 7px;
  font-size: 9.5px;
  font-weight: 600;
  color: #f8fafc;
  letter-spacing: 0.3px;
`;

/* Lower Information Region */
const CardBody = styled.div`
  padding: 12px 6px 4px 6px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SessionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #164863;
  margin: 0 0 8px 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 6px;
  border-top: 1px solid #f1f5f9;
`;

const MetaText = styled.div`
  font-size: 11.5px;
  font-weight: 500;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;

  .meta-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #94a3b8;
  }
`;

const OverflowButton = styled.button`
  background: transparent;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #164863;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 40px;
  right: 12px;
  width: 165px;
  background: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.12);
  border-radius: 10px;
  box-shadow: 0 10px 24px -4px rgba(22, 72, 99, 0.18), 0 0 0 1px rgba(22, 72, 99, 0.05);
  padding: 4px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  animation: dropIn 0.15s ease-out;

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background: transparent;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.$danger ? '#ef4444' : '#334155')};
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${(props) => (props.$danger ? '#fee2e2' : '#f1f5f9')};
    color: ${(props) => (props.$danger ? '#dc2626' : '#164863')};
  }
`;

/* Continuous "More" Session Affordance (Pragati-Mitra Style) */
const MoreCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1.5px dashed rgba(22, 72, 99, 0.25);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  min-height: 242px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05), -2px -2px 10px rgba(255, 255, 255, 0.95);

  &:hover {
    transform: translateY(-2px);
    border-color: #164863;
    border-style: solid;
    background: #f8fafc;
    box-shadow: 6px 8px 20px rgba(22, 72, 99, 0.09), -3px -3px 12px rgba(255, 255, 255, 1);

    .more-icon-circle {
      background-color: #164863;
      color: #ffffff;
      transform: translateX(4px);
    }

    .more-label {
      color: #0e3144;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 1px 1px 4px rgba(22, 72, 99, 0.12);
  }
`;

const MoreIconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #d0e8f0;
  color: #164863;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(22, 72, 99, 0.08);
`;

const MoreLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #164863;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 4px;
  transition: color 0.2s ease;
`;

const MoreSubtext = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  text-align: center;
`;

/* Skeleton Card Placeholders for Progressive Load */
const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const SkeletonCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(22, 72, 99, 0.09);
  padding: 12px;
  display: flex;
  flex-direction: column;
  min-height: 242px;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05);
  pointer-events: none;
`;

const SkeletonPreview = styled.div`
  width: 100%;
  height: 146px;
  border-radius: 16px 16px 10px 10px;
  background: linear-gradient(90deg, rgba(22, 72, 99, 0.06) 25%, rgba(22, 72, 99, 0.14) 50%, rgba(22, 72, 99, 0.06) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const SkeletonLine = styled.div`
  background: linear-gradient(90deg, rgba(22, 72, 99, 0.06) 25%, rgba(22, 72, 99, 0.14) 50%, rgba(22, 72, 99, 0.06) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  height: ${(props) => props.$height || '12px'};
  width: ${(props) => props.$width || '100%'};
  margin-top: ${(props) => props.$marginTop || '8px'};
`;

const ErrorCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1.5px solid #fecaca;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 242px;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(239, 68, 68, 0.08);

  .error-icon {
    color: #ef4444;
    margin-bottom: 10px;
  }

  .error-text {
    font-size: 13px;
    font-weight: 600;
    color: #991b1b;
    margin-bottom: 12px;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #164863;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;

    &:hover {
      background: #1f6f98;
    }
  }
`;

/* Clean Modal Dialogs */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 22px 24px;
  border: 1px solid rgba(22, 72, 99, 0.15);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  h4 {
    margin: 0 0 12px 0;
    font-size: 17px;
    font-weight: 700;
    color: #164863;
  }

  p {
    margin: 0 0 16px 0;
    font-size: 13px;
    color: #475569;
    line-height: 1.4;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 6px;
    display: block;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 8px;
    border: 1.5px solid #cbd5e1;
    margin-bottom: 16px;
    font-family: inherit;
    box-sizing: border-box;
    outline: none;

    &:focus {
      border-color: #164863;
      box-shadow: 0 0 0 2px rgba(22, 72, 99, 0.12);
    }
  }

  .picker-section-title {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 12px 0 6px 0;
  }

  .thumbnails-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }

  .thumb-option {
    position: relative;
    height: 54px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.selected {
      border-color: #164863;
      box-shadow: 0 0 0 2px rgba(22, 72, 99, 0.3);
    }

    .check-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background: #164863;
      color: white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;

    button {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.2s;
    }

    .btn-cancel {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #475569;

      &:hover {
        background: #e2e8f0;
      }
    }

    .btn-primary {
      background: #164863;
      border: none;
      color: #ffffff;

      &:hover {
        background: #1f6f98;
      }
    }

    .btn-danger {
      background: #ef4444;
      border: none;
      color: #ffffff;

      &:hover {
        background: #dc2626;
      }
    }
  }
`;

/* Clean Empty State */
const EmptyStateContainer = styled.div`
  grid-column: 1 / -1;
  background: #ffffff;
  border-radius: 20px;
  border: 1px dashed rgba(22, 72, 99, 0.2);
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    font-size: 15px;
    font-weight: 600;
    color: #475569;
    margin: 0 0 16px 0;
  }
`;

const PAGE_SIZE = 5;

const ReportStudioHistoryGateway = ({ onOpenSession, onNewSession }) => {
  const [allSessions, setAllSessions] = useState([]);
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editModalSession, setEditModalSession] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPreviewUrl, setEditPreviewUrl] = useState('');
  const [deleteModalSession, setDeleteModalSession] = useState(null);

  // Load real persisted sessions
  const loadSessions = () => {
    const list = studioSessionService.getSessions();
    setAllSessions(list);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = () => setActiveMenuId(null);
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, []);

  const totalSessions = allSessions.length;
  const visibleSessions = allSessions.slice(0, visibleLimit);
  const hasMore = visibleLimit < totalSessions;
  const remainingCount = Math.max(0, totalSessions - visibleLimit);

  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    setLoadError(false);
    setIsLoadingMore(true);

    // Progressive loading with incoming batch skeletons (Section 19)
    setTimeout(() => {
      try {
        setVisibleLimit((prev) => prev + PAGE_SIZE);
        setIsLoadingMore(false);
      } catch (err) {
        console.error('Error loading more studio sessions', err);
        setLoadError(true);
        setIsLoadingMore(false);
      }
    }, 280);
  };

  const handleCreate = () => {
    const newSession = studioSessionService.createSession({
      title: 'New Analytical Studio Session'
    });
    loadSessions();
    if (onNewSession) {
      onNewSession(newSession.id);
    }
  };

  const handleDuplicate = (e, session) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const duplicated = studioSessionService.duplicateSession(session.id);
    loadSessions();
    if (duplicated && onOpenSession) {
      onOpenSession(duplicated.id);
    }
  };

  const openEditModal = (e, session) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditModalSession(session);
    setEditTitle(session.title);
    setEditPreviewUrl(session.previewUrl);
  };

  const handleConfirmEdit = () => {
    if (editModalSession && editTitle.trim()) {
      const isBg = editPreviewUrl.includes('coal-bg');
      studioSessionService.updateSession(editModalSession.id, {
        title: editTitle.trim(),
        previewUrl: editPreviewUrl,
        assetSource: isBg ? 'Coal BG' : 'Coal Image'
      });
      loadSessions();
      setEditModalSession(null);
    }
  };

  const openDeleteModal = (e, session) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setDeleteModalSession(session);
  };

  const handleConfirmDelete = () => {
    if (deleteModalSession) {
      studioSessionService.deleteSession(deleteModalSession.id);
      loadSessions();
      setDeleteModalSession(null);
    }
  };

  return (
    <GatewayContainer>
      {/* Header */}
      <HeaderBar>
        <HeaderTitleGroup>
          <PageTitle>Recent Studio Sessions</PageTitle>
          <SessionCountBadge>{totalSessions}</SessionCountBadge>
        </HeaderTitleGroup>

        <NewStudioButton onClick={handleCreate} aria-label="Create New Studio Session">
          <Plus size={16} />
          <span>New Studio</span>
        </NewStudioButton>
      </HeaderBar>

      {/* Sessions Grid */}
      <SessionsGrid>
        {totalSessions === 0 ? (
          <EmptyStateContainer>
            <p>No Studio sessions yet</p>
            <NewStudioButton onClick={handleCreate}>
              <Plus size={16} />
              <span>New Studio</span>
            </NewStudioButton>
          </EmptyStateContainer>
        ) : (
          <>
            {visibleSessions.map((session) => {
              const toolMeta = studioToolsMeta[session.activeStudioMode] || studioToolsMeta.report;
              const formattedDate = studioSessionService.formatDate(session.updatedAt);
              const isMenuOpen = activeMenuId === session.id;
              const assetSource = session.assetSource || (session.previewUrl?.includes('coal-bg') ? 'Coal BG' : 'Coal Image');

              return (
                <HistoryCard
                  key={session.id}
                  onClick={() => onOpenSession(session.id)}
                  title={`Open "${session.title}"`}
                >
                  {/* Upper Half-Curved Box Preview Area */}
                  <HalfCurvedPreview>
                    <img
                      src={session.previewUrl}
                      alt={session.title}
                      className="preview-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/coal-image/heavy-dump-truck-transporting-coal-in-a-large-open-pit-mining-site-surrounded-by-rocky-terrain-and-dust-clouds-during-the-day-photo.jpg';
                      }}
                    />

                    {/* Mode Badge */}
                    <ModeBadge $color={toolMeta.color}>
                      <span className="mode-dot" />
                      <span className="mode-text">{toolMeta.label}</span>
                    </ModeBadge>

                    {/* Asset Collection Tag */}
                    <AssetSourceBadge>{assetSource}</AssetSourceBadge>
                  </HalfCurvedPreview>

                  {/* Card Body */}
                  <CardBody>
                    <SessionTitle>{session.title}</SessionTitle>

                    <CardFooter>
                      <MetaText>
                        <span>{formattedDate}</span>
                        <span className="meta-dot" />
                        <span>{session.sourceCount || 4} Sources</span>
                      </MetaText>

                      <div style={{ position: 'relative' }}>
                        <OverflowButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : session.id);
                          }}
                          title="Session Options"
                          aria-label="Session Options"
                        >
                          <MoreVertical size={16} />
                        </OverflowButton>

                        {isMenuOpen && (
                          <DropdownMenu onClick={(e) => e.stopPropagation()}>
                            <MenuItem onClick={() => onOpenSession(session.id)}>
                              <FolderOpen size={13} />
                              <span>Open</span>
                            </MenuItem>
                            <MenuItem onClick={(e) => openEditModal(e, session)}>
                              <Edit3 size={13} />
                              <span>Rename / Cover</span>
                            </MenuItem>
                            <MenuItem onClick={(e) => handleDuplicate(e, session)}>
                              <Copy size={13} />
                              <span>Duplicate</span>
                            </MenuItem>
                            <MenuItem
                              $danger={true}
                              onClick={(e) => openDeleteModal(e, session)}
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </MenuItem>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardFooter>
                  </CardBody>
                </HistoryCard>
              );
            })}

            {/* Skeleton Loaders during More progression */}
            {isLoadingMore &&
              Array.from({ length: Math.min(PAGE_SIZE, remainingCount) }).map((_, idx) => (
                <SkeletonCard key={`more-skeleton-${idx}`}>
                  <SkeletonPreview />
                  <div style={{ padding: '12px 6px 4px 6px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <SkeletonLine $height="18px" $width="85%" $marginTop="4px" />
                    <SkeletonLine $height="14px" $width="60%" $marginTop="8px" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px' }}>
                      <SkeletonLine $height="12px" $width="40%" $marginTop="0" />
                      <SkeletonLine $height="12px" $width="15%" $marginTop="0" />
                    </div>
                  </div>
                </SkeletonCard>
              ))}

            {/* Error Retry Card if pagination fails */}
            {loadError && (
              <ErrorCard>
                <AlertCircle size={28} className="error-icon" />
                <span className="error-text">Could not load more sessions</span>
                <button type="button" className="retry-btn" onClick={handleLoadMore}>
                  <RotateCw size={13} />
                  <span>Retry</span>
                </button>
              </ErrorCard>
            )}

            {/* 6th position / Progressive "More" Card */}
            {!isLoadingMore && !loadError && hasMore && (
              <MoreCard
                onClick={handleLoadMore}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLoadMore();
                  }
                }}
                aria-label="View more sessions"
                title="Load more studio sessions"
              >
                <MoreIconCircle className="more-icon-circle">
                  <ArrowRight size={22} strokeWidth={2.2} />
                </MoreIconCircle>
                <MoreLabel className="more-label">MORE</MoreLabel>
                <MoreSubtext>More Studio Sessions</MoreSubtext>
              </MoreCard>
            )}
          </>
        )}
      </SessionsGrid>

      {/* Edit Title & Cover Modal (Features Both Coal BG and Coal Image Collections) */}
      {editModalSession && (
        <ModalOverlay onClick={() => setEditModalSession(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h4>Edit Studio Session</h4>
            
            <label className="field-label">Session Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirmEdit();
                if (e.key === 'Escape') setEditModalSession(null);
              }}
              autoFocus
            />

            <label className="field-label">Select Cover Image (Coal BG &amp; Coal Image)</label>
            
            <div className="picker-section-title">Coal BG Collection</div>
            <div className="thumbnails-row">
              {COAL_BG_ASSETS.map((asset) => (
                <div
                  key={asset.url}
                  className={`thumb-option ${editPreviewUrl === asset.url ? 'selected' : ''}`}
                  onClick={() => setEditPreviewUrl(asset.url)}
                  title={asset.label}
                >
                  <img src={asset.url} alt={asset.label} />
                  {editPreviewUrl === asset.url && (
                    <div className="check-badge">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="picker-section-title">Coal Image Collection</div>
            <div className="thumbnails-row">
              {COAL_IMAGE_ASSETS.slice(0, 4).map((asset) => (
                <div
                  key={asset.url}
                  className={`thumb-option ${editPreviewUrl === asset.url ? 'selected' : ''}`}
                  onClick={() => setEditPreviewUrl(asset.url)}
                  title={asset.label}
                >
                  <img src={asset.url} alt={asset.label} />
                  {editPreviewUrl === asset.url && (
                    <div className="check-badge">
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setEditModalSession(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleConfirmEdit}
              >
                Save Changes
              </button>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalSession && (
        <ModalOverlay onClick={() => setDeleteModalSession(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h4>Delete Studio Session</h4>
            <p>
              Are you sure you want to delete <strong>"{deleteModalSession.title}"</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setDeleteModalSession(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </GatewayContainer>
  );
};

export default ReportStudioHistoryGateway;
