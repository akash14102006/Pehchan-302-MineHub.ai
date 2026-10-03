import React, { useState } from 'react';
import styled from 'styled-components';
import { Download, Search, Filter, ShieldCheck, ExternalLink } from 'lucide-react';
import excelIcon from '../../../assets/excel.png';
import databaseIcon from '../../../assets/database.png';

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
  flex-wrap: wrap;
  gap: 10px;
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

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 4px 10px;

  input {
    border: none;
    outline: none;
    font-size: 12px;
    color: #164863;
    width: 180px;
  }
`;

const CategorySelect = styled.select`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #164863;
  outline: none;
`;

const ExportBtn = styled.button`
  background-color: #164863;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0f3144;
  }
`;

const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
  padding: 16px 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
`;

const Th = styled.th`
  background-color: #f1f5f9;
  color: #164863;
  font-weight: 700;
  padding: 10px 12px;
  border-bottom: 2px solid #cbd5e1;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  white-space: nowrap;
`;

const CodeTag = styled.span`
  font-family: monospace;
  font-weight: 700;
  background-color: #ebf8fa;
  color: #164863;
  padding: 2px 6px;
  border-radius: 4px;
`;

const StatusPill = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 10.5px;
  font-weight: 600;
  background-color: ${(props) =>
    props.$status === 'Verified' || props.$status === 'Exceeding' || props.$status === 'Approved'
      ? '#e6f4ea'
      : props.$status === 'On Track' || props.$status === 'Complied'
      ? '#e8f0fe'
      : '#fef7e0'};
  color: ${(props) =>
    props.$status === 'Verified' || props.$status === 'Exceeding' || props.$status === 'Approved'
      ? '#137333'
      : props.$status === 'On Track' || props.$status === 'Complied'
      ? '#1a73e8'
      : '#b06000'};
`;

const EvidenceBtn = styled.button`
  background: transparent;
  border: 1px solid #90cdf4;
  color: #2b6cb0;
  border-radius: 4px;
  padding: 3px 7px;
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;

  &:hover {
    background-color: #ebf8fa;
  }
`;

const datasetRecords = [
  { id: 'CIL-MCL-01', category: 'Production', entity: 'MCL (Talcher & Ib)', metric: 'Annual Production Target', value: '204.0 MT', actual: '168.4 MT', pct: '82.5%', status: 'Exceeding', ref: 'CIL-PROD-2025-p.12' },
  { id: 'CIL-SECL-02', category: 'Production', entity: 'SECL (Gevra Mega-OCP)', metric: 'Annual Production Target', value: '182.0 MT', actual: '141.2 MT', pct: '77.6%', status: 'On Track', ref: 'CIL-PROD-2025-p.15' },
  { id: 'CIL-NCL-03', category: 'Production', entity: 'NCL (Singrauli Basin)', metric: 'Annual Production Target', value: '138.0 MT', actual: '108.6 MT', pct: '78.7%', status: 'On Track', ref: 'CIL-PROD-2025-p.19' },
  { id: 'CMPDI-BH-89', category: 'Geology', entity: 'Gopalprasad West Block', metric: 'Borehole Drilled Depth', value: '420.5 m', actual: '98.2% Core', pct: '94.2%', status: 'Verified', ref: 'CMPDI-LOG-RI-VII' },
  { id: 'CMPDI-BH-142', category: 'Geology', entity: 'Moonidih Deep CBM', metric: 'Coking Seam Exploration', value: '612.0 m', actual: '96.5% Core', pct: '96.5%', status: 'Verified', ref: 'CMPDI-LOG-RI-II' },
  { id: 'STAT-DGMS-01', category: 'Statutory', entity: 'DGMS Safety Certification', metric: 'Annual Mine Safety Audits', value: '58 Mines', actual: '58 Complied', pct: '100%', status: 'Approved', ref: 'DGMS-AUDIT-2025' },
  { id: 'STAT-MOEF-02', category: 'Statutory', entity: 'Gevra Expansion EC', metric: 'Environmental Clearance', value: '70 MTPA', actual: 'EC Granted', pct: '100%', status: 'Approved', ref: 'EC-MOEF-2024-08' },
  { id: 'PARL-LS-2401', category: 'Inquiries', entity: 'Lok Sabha Starred 2401', metric: 'CIL 768 MT Production Mandate', value: 'Question', actual: 'Dispatched', pct: '100%', status: 'Verified', ref: 'HANSARD-18LS-Q2401' },
];

const DataTableEngine = ({ onSelectEvidence }) => {
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');

  const filtered = datasetRecords.filter((r) => {
    const matchCat = category === 'ALL' || r.category === category;
    const matchQuery =
      query === '' ||
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.entity.toLowerCase().includes(query.toLowerCase()) ||
      r.metric.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const exportCSV = () => {
    const header = 'ID,Category,Entity,Metric,Target/Value,Actual,Achievement,Status,Ref\n';
    const rows = filtered
      .map((r) => `${r.id},${r.category},"${r.entity}","${r.metric}",${r.value},${r.actual},${r.pct},${r.status},${r.ref}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MineHub_Report_Studio_Data_Ledger.csv';
    a.click();
  };

  return (
    <Container>
      <Toolbar>
        <div className="left">
          <img src={excelIcon} alt="Data Table" />
          <span>Integrated Enterprise Data Table & Provenance Ledger</span>
        </div>
        <div className="controls">
          <CategorySelect value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="Production">CIL Production</option>
            <option value="Geology">CMPDI Geological</option>
            <option value="Statutory">Statutory Clearances</option>
            <option value="Inquiries">Parliamentary Inquiries</option>
          </CategorySelect>
          <SearchBox>
            <Search size={13} color="#64748b" />
            <input
              type="text"
              placeholder="Search Table..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchBox>
          <ExportBtn onClick={exportCSV}>
            <Download size={13} /> Export CSV
          </ExportBtn>
        </div>
      </Toolbar>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Record ID</Th>
              <Th>Category</Th>
              <Th>Entity / Coalfield</Th>
              <Th>Metric / Scope</Th>
              <Th>Target / Capacity</Th>
              <Th>Actual Measured</Th>
              <Th>Rate</Th>
              <Th>Status</Th>
              <Th>Evidence Link</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <Td>
                  <CodeTag>{row.id}</CodeTag>
                </Td>
                <Td style={{ fontWeight: 600, color: '#164863' }}>{row.category}</Td>
                <Td style={{ fontWeight: 600 }}>{row.entity}</Td>
                <Td style={{ color: '#4a5568' }}>{row.metric}</Td>
                <Td>{row.value}</Td>
                <Td style={{ fontWeight: 600, color: '#2e7d32' }}>{row.actual}</Td>
                <Td>{row.pct}</Td>
                <Td>
                  <StatusPill $status={row.status}>{row.status}</StatusPill>
                </Td>
                <Td>
                  <EvidenceBtn
                    onClick={() =>
                      onSelectEvidence &&
                      onSelectEvidence({
                        claim: `${row.entity}: ${row.metric} recorded at ${row.actual}`,
                        source: `${row.category}_Official_Ledger_2025.xlsx`,
                        refId: row.ref,
                        page: 'Official Data Table Verification',
                        coordinates: `Record ID: ${row.id}`,
                        timestamp: '2026-03-24 10:50 IST',
                        hash: 'SHA256: d8e8fca2405b1c9e88b2a3c4',
                        excerpt: `Official registry verification for ${row.entity} confirming ${row.metric} metric: Target ${row.value}, Actual achieved ${row.actual}.`,
                        authority: 'Coal India Limited & CMPDI Directorate',
                      })
                    }
                  >
                    <ExternalLink size={10} /> Inspect
                  </EvidenceBtn>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default DataTableEngine;
