import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, Check, Building2, Filter, X } from 'lucide-react';
import { AUTHORITY_REGISTRY, AUTHORITY_CATEGORIES } from '../../services/geologyReportRepositoryService';

const SelectorWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 580px;
`;

const TriggerButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.18);
  border-radius: 10px;
  color: #164863;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(22, 72, 99, 0.04), -2px -2px 6px rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;

  &:hover {
    border-color: #164863;
    box-shadow: 0 3px 8px rgba(22, 72, 99, 0.08);
  }

  &:focus {
    outline: none;
    border-color: #164863;
    box-shadow: 0 0 0 2px rgba(22, 72, 99, 0.15);
  }
`;

const SelectedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .authority-badge {
    padding: 3px 7px;
    background-color: ${(props) => props.$color || '#164863'};
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.3px;
    flex-shrink: 0;
  }

  .authority-name {
    font-size: 13.5px;
    font-weight: 600;
    color: #164863;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const DropdownPopover = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  min-width: 320px;
  max-width: 580px;
  background-color: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.15);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(22, 72, 99, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04);
  z-index: 100;
  overflow: hidden;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid #eef2f6;
  background-color: #f8fafc;
  gap: 8px;

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 13px;
    color: #164863;
    outline: none;

    &::placeholder {
      color: #94a3b8;
    }
  }

  .clear-btn {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;

    &:hover {
      color: #475569;
    }
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 6px 10px;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  gap: 6px;

  &::-webkit-scrollbar {
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const CategoryPill = styled.button`
  background: ${(props) => (props.$active ? '#164863' : '#ffffff')};
  color: ${(props) => (props.$active ? '#ffffff' : '#475569')};
  border: 1px solid ${(props) => (props.$active ? '#164863' : '#cbd5e1')};
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.$active ? '#164863' : '#e2e8f0')};
  }
`;

const ItemsList = styled.div`
  max-height: 280px;
  overflow-y: auto;
  padding: 6px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 3px;
  }
`;

const AuthorityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? '#edf7fa' : 'transparent')};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f1f5f9;
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
  }

  .item-code {
    padding: 2px 6px;
    background-color: ${(props) => props.$color || '#164863'};
    color: #ffffff;
    font-size: 10.5px;
    font-weight: 700;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .name {
      font-size: 12.5px;
      font-weight: 600;
      color: #1e293b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      font-size: 11px;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const EmptyNotice = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 12.5px;
  color: #64748b;
`;

const GeologyAuthoritySelector = ({ selectedAuthorityId, onSelectAuthority }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const wrapperRef = useRef(null);

  const selectedAuth =
    selectedAuthorityId === 'all'
      ? { code: 'ALL', name: 'All Indian Authorities & Subsidiaries', color: '#164863' }
      : AUTHORITY_REGISTRY.find((a) => a.id === selectedAuthorityId) || {
          code: 'ALL',
          name: 'All Indian Authorities & Subsidiaries',
          color: '#164863',
        };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredList = AUTHORITY_REGISTRY.filter((auth) => {
    const matchesCategory =
      activeCategory === 'all' || auth.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      auth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auth.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SelectorWrapper ref={wrapperRef}>
      <TriggerButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        title="Filter reports by Indian authority or CIL subsidiary"
      >
        <SelectedInfo $color={selectedAuth.color}>
          <span className="authority-badge">{selectedAuth.code}</span>
          <span className="authority-name">{selectedAuth.name}</span>
        </SelectedInfo>
        <ChevronDown size={16} color="#164863" />
      </TriggerButton>

      {isOpen && (
        <DropdownPopover>
          <SearchBox>
            <Search size={15} color="#64748b" />
            <input
              type="text"
              placeholder="Search authority, subsidiary, code, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button className="clear-btn" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
          </SearchBox>

          <CategoryTabs>
            {AUTHORITY_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                $active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </CategoryPill>
            ))}
          </CategoryTabs>

          <ItemsList>
            {/* All Option */}
            <AuthorityItem
              $isSelected={selectedAuthorityId === 'all'}
              $color="#164863"
              onClick={() => {
                onSelectAuthority('all');
                setIsOpen(false);
              }}
            >
              <div className="item-left">
                <span className="item-code">ALL</span>
                <div className="item-details">
                  <span className="name">All Authorities &amp; Subsidiaries</span>
                  <span className="meta">View consolidated repository reports</span>
                </div>
              </div>
              {selectedAuthorityId === 'all' && <Check size={16} color="#164863" />}
            </AuthorityItem>

            {filteredList.length === 0 ? (
              <EmptyNotice>No matching authorities found for "{searchTerm}"</EmptyNotice>
            ) : (
              filteredList.map((auth) => (
                <AuthorityItem
                  key={auth.id}
                  $isSelected={selectedAuthorityId === auth.id}
                  $color={auth.color}
                  onClick={() => {
                    onSelectAuthority(auth.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="item-left">
                    <span className="item-code">{auth.code}</span>
                    <div className="item-details">
                      <span className="name">{auth.name}</span>
                      <span className="meta">
                        {auth.categoryName} • {auth.state}
                      </span>
                    </div>
                  </div>
                  {selectedAuthorityId === auth.id && <Check size={16} color="#164863" />}
                </AuthorityItem>
              ))
            )}
          </ItemsList>
        </DropdownPopover>
      )}
    </SelectorWrapper>
  );
};

export default GeologyAuthoritySelector;
