import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 25px 48px 25px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px 14px 36px 14px;
  }
`;

/* TOP CONTROLS */
const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
`;

const PillsGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const DarkPill = styled.div`
  background-color: #3d3d3d;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SelectPill = styled.select`
  background-color: #3d3d3d;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  option {
    background-color: #ffffff;
    color: #164863;
  }
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  border: 1px solid rgba(22, 72, 99, 0.18);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  color: #164863;
  outline: none;
  width: 260px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3182ce;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.$primary ? '#4CAF50' : '#164863')};
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
  }
`;

/* KPI CARDS */
const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const KpiCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 18px 20px;
  border-top: 4px solid ${(props) => props.$accent || '#164863'};
  border: 1px solid rgba(22, 72, 99, 0.08);
  border-top-width: 4px;
  box-shadow: 4px 4px 12px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const KpiLabel = styled.div`
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #707070;
  margin-bottom: 6px;
`;

const KpiValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
`;

const KpiValue = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #164863;
  line-height: 1.1;
`;

const KpiUnit = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #555555;
`;

const KpiProgress = styled.div`
  font-size: 12px;
  color: ${(props) => props.$color || '#4CAF50'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const KpiSub = styled.div`
  font-size: 11px;
  color: #888888;
  margin-top: 2px;
`;

/* TABLE SECTION */
const TableCard = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 22px 24px;
  border: 1px solid rgba(22, 72, 99, 0.08);
  box-shadow: 4px 4px 14px rgba(22, 72, 99, 0.05), -3px -3px 8px rgba(255, 255, 255, 0.95);
  overflow-x: auto;
`;

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #164863;
  margin: 0 0 16px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
`;

const Th = styled.th`
  background-color: #f7fafc;
  color: #164863;
  font-weight: 700;
  padding: 12px 14px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px 14px;
  border-bottom: 1px solid #edf2f7;
  color: #2d3748;
  vertical-align: middle;
`;

const QuestionBadge = styled.span`
  display: inline-block;
  font-family: monospace;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: #f0f4f8;
  color: #164863;
  border: 1px solid rgba(22, 72, 99, 0.15);
  white-space: nowrap;
`;

const HouseBadge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  background-color: ${(props) => (props.$house === 'Lok Sabha' ? '#2e7d32' : '#c62828')};
  white-space: nowrap;
`;

const CategoryPill = styled.span`
  display: inline-block;
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 10.5px;
  font-weight: 600;
  background-color: ${(props) => (props.$starred ? '#fff8e1' : '#f5f5f5')};
  color: ${(props) => (props.$starred ? '#b78103' : '#616161')};
  border: 1px solid ${(props) => (props.$starred ? '#ffe082' : '#e0e0e0')};
  white-space: nowrap;
`;

const StatusPill = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${(props) =>
    props.$status === 'Reply Dispatched' ? '#e6f4ea' : props.$status === 'Gazette Vetted' ? '#e8f0fe' : '#fef7e0'};
  color: ${(props) =>
    props.$status === 'Reply Dispatched' ? '#137333' : props.$status === 'Gazette Vetted' ? '#1a73e8' : '#b06000'};
  white-space: nowrap;
`;

const CitationBadge = styled.span`
  display: inline-block;
  font-family: monospace;
  font-size: 11px;
  color: #3182ce;
  background-color: #ebf8fa;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
`;

const inquiriesData = [
  { id: 'LS-SQ-2401', house: 'Lok Sabha', category: 'Starred', subject: 'CIL Annual Coal Production Mandate & 768 MT Targets for FY 2025-26', wing: 'Production Wing / CIL', status: 'Reply Dispatched', citation: 'CIL-PROD-2025-MANDATE' },
  { id: 'LS-USQ-1892', house: 'Lok Sabha', category: 'Unstarred', subject: 'CMPDI Geological Drilling and Core Recovery Status in Talcher Basin', wing: 'Exploration Cell / CMPDI', status: 'Reply Dispatched', citation: 'CMPDI-RI-VII-DRILL-089' },
  { id: 'RS-SQ-0942', house: 'Rajya Sabha', category: 'Starred', subject: 'Implementation of DGMS Slope Radar and Mine Safety Audits in Underground Mines', wing: 'Safety Wing / DGMS', status: 'Reply Dispatched', citation: 'DGMS-ANNUAL-AUDIT-58' },
  { id: 'RS-USQ-1205', house: 'Rajya Sabha', category: 'Unstarred', subject: 'Stage-II Forest Clearances Diversion Progress in Mand-Raigarh Coalfields', wing: 'Environment Cell / MoC', status: 'Gazette Vetted', citation: 'FC-STAGE2-OD-341' },
  { id: 'LS-SQ-3108', house: 'Lok Sabha', category: 'Starred', subject: 'Adequacy of Critical Coal Stocks at Thermal Power Plants During Peak Summer', wing: 'Power & Fuel Supply / CIL', status: 'Reply Dispatched', citation: 'CEA-CIL-STOCK-DAILY' },
  { id: 'RS-USQ-4412', house: 'Rajya Sabha', category: 'Unstarred', subject: 'Rehabilitation and Resettlement (R&R) Status for Amrapali & Bhubaneswari Projects', wing: 'Social & R&R Cell / MoC', status: 'Reply Dispatched', citation: 'R-R-EXP-CIL-2024' },
  { id: 'LS-USQ-5021', house: 'Lok Sabha', category: 'Unstarred', subject: 'Commercial Coal Block Auction Rounds and Revenue Sharing with States', wing: 'Nominated Authority / MoC', status: 'Gazette Vetted', citation: 'NA-AUCTION-RD-10' },
];

const InquiriesPage = () => {
  const [filterHouse, setFilterHouse] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = inquiriesData.filter((item) => {
    const matchesHouse = filterHouse === 'ALL' || item.house === filterHouse;
    const matchesSearch =
      searchTerm === '' ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.wing.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHouse && matchesSearch;
  });

  return (
    <PageContainer>
      {/* 1. TOP CONTROLS BAR */}
      <ControlsBar>
        <PillsGroup>
          <DarkPill>18th Lok Sabha & Rajya Sabha (Parliamentary Tracker)</DarkPill>
          <SelectPill
            value={filterHouse}
            onChange={(e) => setFilterHouse(e.target.value)}
          >
            <option value="ALL">All Houses (Lok Sabha & Rajya Sabha)</option>
            <option value="Lok Sabha">Lok Sabha</option>
            <option value="Rajya Sabha">Rajya Sabha</option>
          </SelectPill>
          <SearchInput
            type="text"
            placeholder="Search Question No, Topic, Wing..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </PillsGroup>

        <ActionsGroup>
          <ActionButton onClick={() => window.location.reload()}>
            <span>🔄</span> Fetch Hansard Index
          </ActionButton>
          <ActionButton $primary onClick={() => window.print()}>
            <span>⬇</span> Export Dossier
          </ActionButton>
        </ActionsGroup>
      </ControlsBar>

      {/* 2. KPI METRICS CARDS */}
      <KpiGrid>
        <KpiCard $accent="#164863">
          <KpiLabel>Parliament Inquiries Resolved</KpiLabel>
          <KpiValueRow>
            <KpiValue>142 / 144</KpiValue>
            <KpiUnit>Replies</KpiUnit>
          </KpiValueRow>
          <KpiProgress $color="#4CAF50">▲ 98.6% Citation Backed</KpiProgress>
          <KpiSub>Lok Sabha & Rajya Sabha Starred</KpiSub>
        </KpiCard>

        <KpiCard $accent="#2e7d32">
          <KpiLabel>Lok Sabha Questions</KpiLabel>
          <KpiValueRow>
            <KpiValue>48 / 48</KpiValue>
            <KpiUnit>100%</KpiUnit>
          </KpiValueRow>
          <KpiProgress $color="#4CAF50">Zero Overdue Questions</KpiProgress>
          <KpiSub>Vetted with CIL Subsidiary Records</KpiSub>
        </KpiCard>

        <KpiCard $accent="#c62828">
          <KpiLabel>Rajya Sabha Questions</KpiLabel>
          <KpiValueRow>
            <KpiValue>94 / 96</KpiValue>
            <KpiUnit>97.9%</KpiUnit>
          </KpiValueRow>
          <KpiProgress $color="#164863">2 in Final Starred Notice</KpiProgress>
          <KpiSub>Ministry of Coal Secretariat Review</KpiSub>
        </KpiCard>

        <KpiCard $accent="#FFA000">
          <KpiLabel>Hansard Citation Accuracy</KpiLabel>
          <KpiValueRow>
            <KpiValue>100%</KpiValue>
            <KpiUnit>Verified</KpiUnit>
          </KpiValueRow>
          <KpiProgress $color="#4CAF50">Full Evidence Traceability</KpiProgress>
          <KpiSub>CMPDI Borehole & CIL Production Logs</KpiSub>
        </KpiCard>
      </KpiGrid>

      {/* 3. PARLIAMENTARY INQUIRIES & STARRED QUESTION TRACKER TABLE */}
      <TableCard>
        <CardTitle>Parliamentary Questions & Hansard Citation Record</CardTitle>
        <Table>
          <thead>
            <tr>
              <Th>Diary / Question No</Th>
              <Th>House</Th>
              <Th>Category</Th>
              <Th style={{ minWidth: 260 }}>Subject / Starred Inquiry Topic</Th>
              <Th>Ministry Division</Th>
              <Th>Status</Th>
              <Th>Verified Citation Link</Th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <Td>
                  <QuestionBadge>{item.id}</QuestionBadge>
                </Td>
                <Td>
                  <HouseBadge $house={item.house}>{item.house}</HouseBadge>
                </Td>
                <Td>
                  <CategoryPill $starred={item.category === 'Starred'}>
                    {item.category === 'Starred' ? '★ Starred' : 'Unstarred'}
                  </CategoryPill>
                </Td>
                <Td style={{ fontWeight: 600, color: '#164863' }}>{item.subject}</Td>
                <Td style={{ color: '#4a5568' }}>{item.wing}</Td>
                <Td>
                  <StatusPill $status={item.status}>{item.status}</StatusPill>
                </Td>
                <Td>
                  <CitationBadge>{item.citation}</CitationBadge>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableCard>
    </PageContainer>
  );
};

export default InquiriesPage;
