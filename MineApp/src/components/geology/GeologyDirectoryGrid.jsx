import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, MapPin, Building, Compass, ArrowUpRight, Filter } from 'lucide-react';
import { geologyReportRepositoryService } from '../../services/geologyReportRepositoryService';

const DirectoryContainer = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 24px 28px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95);
  margin-top: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eef2f6;
  padding-bottom: 16px;
`;

const TitleBlock = styled.div`
  h3 {
    margin: 0;
    font-size: 17.5px;
    font-weight: 700;
    color: #164863;
    letter-spacing: -0.2px;
  }

  p {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #64748b;
  }
`;

const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 6px 12px;
  width: 280px;

  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 12.5px;
    color: #1e293b;
    width: 100%;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const DirectoryCard = styled.div`
  background-color: #f8fafc;
  border-radius: 10px;
  padding: 16px 18px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${(props) => props.$color || '#164863'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(22, 72, 99, 0.06);
    border-color: #cbd5e1;
  }
`;

const CardTop = styled.div`
  margin-bottom: 12px;
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  .code-badge {
    padding: 3px 8px;
    background-color: ${(props) => props.$color || '#164863'};
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }

  .category-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
  }
`;

const CardName = styled.h4`
  margin: 0 0 6px 0;
  font-size: 13.5px;
  font-weight: 700;
  color: #164863;
  line-height: 1.35;
`;

const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: #475569;
  margin-bottom: 8px;
`;

const CardRole = styled.div`
  font-size: 11.5px;
  color: #64748b;
  line-height: 1.45;
  margin-bottom: 8px;
`;

const CardCoalfield = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #0369a1;
  background-color: #e0f2fe;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const CardActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #164863;
  border: 1px solid rgba(22, 72, 99, 0.2);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #164863;
    color: #ffffff;
    border-color: #164863;
  }
`;

const GeologyDirectoryGrid = ({ onSelectAuthority }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const directoryEntries = geologyReportRepositoryService.getDirectory();

  const filteredEntries = directoryEntries.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.state.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      (item.coalfield && item.coalfield.toLowerCase().includes(term))
    );
  });

  return (
    <DirectoryContainer>
      <HeaderRow>
        <TitleBlock>
          <h3>CIL Subsidiaries &amp; Planning Institute Directory</h3>
          <p>
            Authoritative registry of Coal India Limited operating subsidiaries, CMPDI regional
            institutes, and exploration bodies.
          </p>
        </TitleBlock>

        <SearchInputWrap>
          <Search size={14} color="#64748b" />
          <input
            type="text"
            placeholder="Search subsidiary, institute, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputWrap>
      </HeaderRow>

      <Grid>
        {filteredEntries.map((item) => (
          <DirectoryCard key={item.id} $color={item.color}>
            <CardTop>
              <BadgeRow $color={item.color}>
                <span className="code-badge">{item.code}</span>
                <span className="category-label">{item.categoryName}</span>
              </BadgeRow>

              <CardName>{item.fullName}</CardName>

              <CardLocation>
                <MapPin size={12} color="#64748b" />
                <span>
                  {item.location} ({item.state})
                </span>
              </CardLocation>

              {item.coalfield && (
                <CardCoalfield>
                  <Compass size={11} />
                  <span>Basin: {item.coalfield}</span>
                </CardCoalfield>
              )}

              <CardRole>{item.role}</CardRole>
            </CardTop>

            <CardActionBtn
              onClick={() => {
                onSelectAuthority(item.id);
                // Smooth scroll up to Year-wise report repository
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={`View ${item.code} year-wise reports`}
            >
              <span>View Year-wise Reports</span>
              <ArrowUpRight size={13} />
            </CardActionBtn>
          </DirectoryCard>
        ))}
      </Grid>
    </DirectoryContainer>
  );
};

export default GeologyDirectoryGrid;
