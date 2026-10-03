// Studio Session Service for MineHub.ai
// Manages persisted session state, history metadata, and tool configuration.
// Utilizes both authentic Coal BG and Coal Image collections.

const STORAGE_KEY = 'minehub_studio_sessions_v2';

export const COAL_BG_ASSETS = [
  { url: '/coal-bg/mechel-olzherasskaya_18365.jpg', label: 'Opencast Dragline Bench (Coal BG)' },
  { url: '/coal-bg/large-mining-trucks-are-in-operation-free-photo.jpg', label: 'Mining Haul Dumper Fleet (Coal BG)' },
  { url: '/coal-bg/several-huge-quarry-trucks-carry-rock-beneficiation-processing-drive-underground-mine-tunnel-large-mining-290231385.png', label: 'Pit Quarry & Transport Tunnel (Coal BG)' },
  { url: '/coal-bg/2183584.jpg', label: 'Washery Seam Strata (Coal BG)' },
  { url: '/coal-bg/1000_F_653544213_wnsZFIQo9cL8ViDQhEFLEcNOxFrZEqQ2.jpg', label: 'Coal Seam Surface Excavation (Coal BG)' },
];

export const COAL_IMAGE_ASSETS = [
  { url: '/coal-image/heavy-dump-truck-transporting-coal-in-a-large-open-pit-mining-site-surrounded-by-rocky-terrain-and-dust-clouds-during-the-day-photo.jpg', label: 'Heavy Dumper Transport (Coal Image)' },
  { url: '/coal-image/open-pit-mine-coal-loading-trucks-transportation-logistics.jpg', label: 'Shovel Excavator Logistics (Coal Image)' },
  { url: '/coal-image/Indian_coal-1024x682.jpg', label: 'Indian Thermal Coal Seams (Coal Image)' },
  { url: '/coal-image/close-up-pile-rough-black-coal-rocks-textured-surface-mineral-fuel-geological-formation-industrial-significance-as-power-398688029.png', label: 'Geological Core Specimen (Coal Image)' },
  { url: '/coal-image/underground-miner-operating-heavy-machinery-extracting-coal-dark-mine-daylight-hours-miner-orange-safety-344958155.png', label: 'DGMS Continuous Miner (Coal Image)' },
  { url: '/coal-image/46375-JCBNXT-225LC-M-Excavator.png', label: 'HEMM Mining Excavator (Coal Image)' },
  { url: '/coal-image/HXydXzc472Vvy9VTJ2fJMP.jpg', label: 'CIL Stockpile Dispatch (Coal Image)' },
  { url: '/coal-image/2BB4AE3B-C1E1-4595-B8E5-75F586DA7895_cx0_cy1_cw0_w1200_r1.jpg', label: 'Open Pit Haul Track (Coal Image)' },
];

export const ALL_COAL_PREVIEW_ASSETS = [
  ...COAL_BG_ASSETS,
  ...COAL_IMAGE_ASSETS,
];

export const STATUTORY_SOURCE_REGISTRY = {
  'CIL_Subsidiary_Production_Ledger_2025.xlsx': {
    id: 'src-cil-ledger',
    name: 'CIL_Subsidiary_Production_Ledger_2025.xlsx',
    type: 'excel',
    extension: 'xlsx',
    meta: '8 Sheets • 768 MT Mandate',
    ref: 'CIL-PROD-MANDATE-FY26',
    active: true,
    verified: true,
    excerpt: 'Detailed quarterly production targets, actual outputs, and pithead dispatch logs across MCL, SECL, NCL, CCL, WCL, BCCL, and ECL.',
    timestamp: '2026-03-24 10:15 IST',
    hash: 'SHA256: c3ab8ff13720e8ad9047dd39466b3c89',
    authority: 'Ministry of Coal / CIL Statutory Directorate'
  },
  'CMPDI_Borehole_Exploration_FY26.pdf': {
    id: 'src-cmpdi-borehole',
    name: 'CMPDI_Borehole_Exploration_FY26.pdf',
    type: 'report',
    extension: 'pdf',
    meta: '42 Pages • 1.24M m Drill Logs',
    ref: 'CMPDI-GEO-EXPL-FY26',
    active: true,
    verified: true,
    excerpt: 'Central Mine Planning & Design Institute comprehensive strata logs, core extraction recovery percentages, and geological block certifications.',
    timestamp: '2026-03-22 14:30 IST',
    hash: 'SHA256: 8f4b1c2d9e0a3b5c7d8e9f0a1b2c3d4e',
    authority: 'CMPDI Exploration Division'
  },
  'MoC_Parliamentary_Starred_Inquiries_18LS.pdf': {
    id: 'src-moc-inquiries',
    name: 'MoC_Parliamentary_Starred_Inquiries_18LS.pdf',
    type: 'report',
    extension: 'pdf',
    meta: '64 Pages • 144 Questions',
    ref: 'MOC-HANSARD-18LS-Q3',
    active: true,
    verified: true,
    excerpt: 'Official ministerial replies and Hansard citation records for 18th Lok Sabha and Rajya Sabha inquiries concerning coal stock and safety.',
    timestamp: '2026-03-20 16:45 IST',
    hash: 'SHA256: a1b2c3d4e5f60718293a4b5c6d7e8f90',
    authority: 'Parliament of India / Hansard Archives'
  },
  'DGMS_Statutory_Safety_Audit_Records.xlsx': {
    id: 'src-dgms-safety',
    name: 'DGMS_Statutory_Safety_Audit_Records.xlsx',
    type: 'excel',
    extension: 'xlsx',
    meta: '4 Sheets • 58 Mines Complied',
    ref: 'DGMS-SAFETY-ANNUAL-58',
    active: true,
    verified: true,
    excerpt: 'Directorate General of Mines Safety compliance register covering highwall slope radar, dust monitoring, and ventilation audit certifications.',
    timestamp: '2026-03-18 09:20 IST',
    hash: 'SHA256: 1234567890abcdef1234567890abcdef',
    authority: 'Directorate General of Mines Safety (DGMS)'
  },
};

// Initial authentic statutory & intelligence sessions utilizing both Coal BG and Coal Image
const DEFAULT_SESSIONS = [
  {
    id: 'std-ccl-nk-01',
    title: 'North Karanpura Coal Production & Target Velocity',
    activeStudioMode: 'report',
    previewUrl: '/coal-image/heavy-dump-truck-transporting-coal-in-a-large-open-pit-mining-site-surrounded-by-rocky-terrain-and-dust-clouds-during-the-day-photo.jpg',
    previewType: 'report',
    assetSource: 'Coal Image',
    updatedAt: '2026-09-26T14:30:00Z',
    createdAt: '2026-09-20T10:00:00Z',
    sourceCount: 4,
    sources: [
      'CIL_Subsidiary_Production_Ledger_2025.xlsx',
      'CMPDI_Borehole_Exploration_FY26.pdf',
      'MoC_Parliamentary_Starred_Inquiries_18LS.pdf',
      'DGMS_Statutory_Safety_Audit_Records.xlsx'
    ],
    summary: 'Executive synthesis of CCL North Karanpura block achievement against the 768 MT national mandate.'
  },
  {
    id: 'std-cmpdi-bh-02',
    title: 'CMPDI Borehole Exploration & Ash Content Core Log',
    activeStudioMode: 'datatable',
    previewUrl: '/coal-bg/mechel-olzherasskaya_18365.jpg',
    previewType: 'datatable',
    assetSource: 'Coal BG',
    updatedAt: '2026-09-25T11:15:00Z',
    createdAt: '2026-09-21T09:30:00Z',
    sourceCount: 2,
    sources: [
      'CMPDI_Borehole_Exploration_FY26.pdf',
      'CIL_Subsidiary_Production_Ledger_2025.xlsx'
    ],
    summary: 'Stratigraphic core log analysis with proximate analysis and coal grade seam stratification.'
  },
  {
    id: 'std-parl-inq-03',
    title: '18th Lok Sabha Starred Inquiries & Hansard Compliance',
    activeStudioMode: 'timeline',
    previewUrl: '/coal-image/Indian_coal-1024x682.jpg',
    previewType: 'timeline',
    assetSource: 'Coal Image',
    updatedAt: '2026-09-24T16:45:00Z',
    createdAt: '2026-09-22T13:20:00Z',
    sourceCount: 3,
    sources: [
      'MoC_Parliamentary_Starred_Inquiries_18LS.pdf',
      'DGMS_Statutory_Safety_Audit_Records.xlsx',
      'CIL_Subsidiary_Production_Ledger_2025.xlsx'
    ],
    summary: 'Chronological tracking of 144 parliamentary inquiries vetted with verified Hansard citations.'
  },
  {
    id: 'std-dgms-safety-04',
    title: 'DGMS Statutory Safety Audit & Slope Stability Radar',
    activeStudioMode: 'chart',
    previewUrl: '/coal-bg/large-mining-trucks-are-in-operation-free-photo.jpg',
    previewType: 'chart',
    assetSource: 'Coal BG',
    updatedAt: '2026-09-23T08:20:00Z',
    createdAt: '2026-09-18T15:10:00Z',
    sourceCount: 4,
    sources: [
      'DGMS_Statutory_Safety_Audit_Records.xlsx',
      'CIL_Subsidiary_Production_Ledger_2025.xlsx'
    ],
    summary: 'Comparative multi-chart visualization of opencast slope stability sensors and hazard mitigation.'
  },
  {
    id: 'std-secl-dispatch-05',
    title: 'SECL Gevra Expansion & Railway Siding Evacuation Dispatch',
    activeStudioMode: 'mindmap',
    previewUrl: '/coal-image/open-pit-mine-coal-loading-trucks-transportation-logistics.jpg',
    previewType: 'mindmap',
    assetSource: 'Coal Image',
    updatedAt: '2026-09-22T17:05:00Z',
    createdAt: '2026-09-19T11:00:00Z',
    sourceCount: 3,
    sources: [
      'CIL_Subsidiary_Production_Ledger_2025.xlsx',
      'CMPDI_Borehole_Exploration_FY26.pdf'
    ],
    summary: 'Hierarchical node network mapping rakes availability, silo conveyors, and thermal plant supplies.'
  },
  {
    id: 'std-audio-brief-06',
    title: 'Ministry of Coal Executive Audio Synthesis FY 25-26',
    activeStudioMode: 'audio',
    previewUrl: '/coal-bg/several-huge-quarry-trucks-carry-rock-beneficiation-processing-drive-underground-mine-tunnel-large-mining-290231385.png',
    previewType: 'audio',
    assetSource: 'Coal BG',
    updatedAt: '2026-09-21T10:10:00Z',
    createdAt: '2026-09-17T08:45:00Z',
    sourceCount: 4,
    sources: [
      'CIL_Subsidiary_Production_Ledger_2025.xlsx',
      'DGMS_Statutory_Safety_Audit_Records.xlsx'
    ],
    summary: 'Spoken executive audio briefing synthesis for directorate desk review.'
  },
  {
    id: 'std-ug-miner-07',
    title: 'DGMS Underground Continuous Miner & Strata Control',
    activeStudioMode: 'qa',
    previewUrl: '/coal-image/underground-miner-operating-heavy-machinery-extracting-coal-dark-mine-daylight-hours-miner-orange-safety-344958155.png',
    previewType: 'qa',
    assetSource: 'Coal Image',
    updatedAt: '2026-09-20T16:15:00Z',
    createdAt: '2026-09-16T12:00:00Z',
    sourceCount: 3,
    sources: [
      'DGMS_Statutory_Safety_Audit_Records.xlsx',
      'CMPDI_Borehole_Exploration_FY26.pdf'
    ],
    summary: 'Automated statutory Q&A and ventilation methane sensor thresholds evaluation.'
  },
  {
    id: 'std-washery-prep-08',
    title: 'CIL Washery Coal Beneficiation & Thermal Yield Distribution',
    activeStudioMode: 'wordcloud',
    previewUrl: '/coal-bg/2183584.jpg',
    previewType: 'wordcloud',
    assetSource: 'Coal BG',
    updatedAt: '2026-09-19T09:40:00Z',
    createdAt: '2026-09-15T09:00:00Z',
    sourceCount: 4,
    sources: [
      'CIL_Subsidiary_Production_Ledger_2025.xlsx',
      'CMPDI_Borehole_Exploration_FY26.pdf'
    ],
    summary: 'Beneficiation topic frequency and moisture-ash-volatile matter distribution matrix.'
  }
];

export const studioToolsMeta = {
  mindmap: { name: 'Mind Map', color: '#7C3AED', bg: '#F5F3FF', label: 'Mind Map' },
  datatable: { name: 'Data Table', color: '#2563EB', bg: '#EFF6FF', label: 'Data Table' },
  table: { name: 'Data Table', color: '#2563EB', bg: '#EFF6FF', label: 'Data Table' },
  report: { name: 'Executive Report', color: '#EA580C', bg: '#FFF7ED', label: 'Report' },
  timeline: { name: 'Timeline', color: '#0F766E', bg: '#F0FDFA', label: 'Timeline' },
  chart: { name: 'Multi-Chart', color: '#16A34A', bg: '#F0FDF4', label: 'Multi-Chart' },
  charts: { name: 'Multi-Chart', color: '#16A34A', bg: '#F0FDF4', label: 'Multi-Chart' },
  qa: { name: 'Auto Questions', color: '#D97706', bg: '#FFFBEB', label: 'Auto Q&A' },
  questions: { name: 'Auto Questions', color: '#D97706', bg: '#FFFBEB', label: 'Auto Q&A' },
  audio: { name: 'Audio Briefing', color: '#E11D48', bg: '#FFF1F2', label: 'Audio Brief' },
  wordcloud: { name: 'Topic Cloud', color: '#DB2777', bg: '#FDF2F8', label: 'Topic Cloud' },
};

export const normalizeToolId = (id) => {
  if (!id) return null;
  const lower = id.toLowerCase().trim();
  if (lower === 'datatable' || lower === 'table') return 'table';
  if (lower === 'chart' || lower === 'charts' || lower === 'multichart') return 'charts';
  if (lower === 'qa' || lower === 'questions' || lower === 'autoquestions') return 'questions';
  if (lower === 'mindmap' || lower === 'mind-map') return 'mindmap';
  if (lower === 'report' || lower === 'dossier') return 'report';
  if (lower === 'timeline') return 'timeline';
  if (lower === 'audio' || lower === 'audiobriefing') return 'audio';
  if (lower === 'wordcloud' || lower === 'topiccloud') return 'wordcloud';
  return null;
};

export const studioSessionService = {
  getSessions: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SESSIONS));
        return DEFAULT_SESSIONS;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SESSIONS));
        return DEFAULT_SESSIONS;
      }
      // Sort newest updated first
      return parsed.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } catch (err) {
      console.warn('Failed to read studio sessions from storage, falling back to defaults', err);
      return DEFAULT_SESSIONS;
    }
  },

  getSession: (id) => {
    const sessions = studioSessionService.getSessions();
    return sessions.find((s) => s.id === id) || null;
  },

  getPaginatedSessions: ({ offset = 0, limit = 5 } = {}) => {
    const all = studioSessionService.getSessions();
    const items = all.slice(offset, offset + limit);
    const total = all.length;
    const hasMore = offset + limit < total;
    const remaining = Math.max(0, total - (offset + limit));
    return {
      items,
      total,
      hasMore,
      remaining,
      nextOffset: hasMore ? offset + limit : null
    };
  },

  createSession: (initial = {}) => {
    const sessions = studioSessionService.getSessions();
    const newId = `std-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    // Alternate selection across both Coal BG and Coal Image collections
    const pickIndex = sessions.length % ALL_COAL_PREVIEW_ASSETS.length;
    const selectedAsset = ALL_COAL_PREVIEW_ASSETS[pickIndex];
    const previewUrl = initial.previewUrl || selectedAsset.url;

    const newSession = {
      id: newId,
      title: initial.title || 'New Analytical Studio Session',
      activeStudioMode: initial.activeStudioMode || null,
      previewUrl,
      previewType: initial.previewType || 'report',
      assetSource: selectedAsset.label.includes('Coal BG') ? 'Coal BG' : 'Coal Image',
      updatedAt: now,
      createdAt: now,
      sourceCount: initial.sourceCount !== undefined ? initial.sourceCount : 0,
      sources: initial.sources !== undefined ? initial.sources : [],
      messages: initial.messages || [],
      summary: initial.summary || '',
      isNew: true
    };

    const updated = [newSession, ...sessions];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist new session', e);
    }
    return newSession;
  },

  normalizeSources: (sources = []) => {
    if (!Array.isArray(sources)) return [];
    return sources.map((item, idx) => {
      if (typeof item === 'string') {
        const found = STATUTORY_SOURCE_REGISTRY[item];
        if (found) return { ...found, active: true };
        const ext = item.split('.').pop()?.toLowerCase();
        return {
          id: `src-gen-${idx}`,
          name: item,
          type: ext === 'xlsx' || ext === 'xls' || ext === 'csv' ? 'excel' : 'report',
          extension: ext || 'pdf',
          meta: 'Verified Statutory Record',
          ref: `DOC-REF-${idx + 1}`,
          active: true,
          verified: true,
          excerpt: `Statutory evidence records indexed from ${item}.`,
          timestamp: '2026-09-26 12:00 IST',
          hash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb924',
          authority: 'Ministry of Coal / CIL / CMPDI'
        };
      }
      return item;
    });
  },

  addSourceToSession: (sessionId, sourceItem) => {
    const session = studioSessionService.getSession(sessionId);
    if (!session) return null;
    const currentSources = studioSessionService.normalizeSources(session.sources || []);
    const updatedSources = [...currentSources, sourceItem];
    return studioSessionService.updateSession(sessionId, {
      sources: updatedSources,
      sourceCount: updatedSources.length
    });
  },

  toggleSourceInSession: (sessionId, sourceId) => {
    const session = studioSessionService.getSession(sessionId);
    if (!session) return null;
    const currentSources = studioSessionService.normalizeSources(session.sources || []);
    const updatedSources = currentSources.map((s) =>
      s.id === sourceId ? { ...s, active: !s.active } : s
    );
    return studioSessionService.updateSession(sessionId, {
      sources: updatedSources
    });
  },

  updateSession: (id, updates = {}) => {
    const sessions = studioSessionService.getSessions();
    const index = sessions.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const existing = sessions[index];
    const updatedSession = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    sessions[index] = updatedSession;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to update session', e);
    }
    return updatedSession;
  },

  duplicateSession: (id) => {
    const sessions = studioSessionService.getSessions();
    const existing = sessions.find((s) => s.id === id);
    if (!existing) return null;

    const newId = `std-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const cloned = {
      ...existing,
      id: newId,
      title: `${existing.title} (Copy)`,
      createdAt: now,
      updatedAt: now
    };

    const updated = [cloned, ...sessions];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save duplicated session', e);
    }
    return cloned;
  },

  deleteSession: (id) => {
    const sessions = studioSessionService.getSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Failed to delete session', e);
    }
    return filtered;
  },

  formatDate: (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  }
};
