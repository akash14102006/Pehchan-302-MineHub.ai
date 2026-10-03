// Project Feature Assets
import studioLottie from '../assets/lottie/Minehub Studio.json';
import deepDigLottie from '../assets/lottie/Deep-Dig RAG.json';
import zeroGuessLottie from '../assets/lottie/Zero guess gate.json';
import magLottie from '../assets/lottie/MAG.json';
import geomapLottie from '../assets/lottie/GeoMap.json';
import agentBenchLottie from '../assets/lottie/Agent Bench.json';
import orchestrationLottie from '../assets/lottie/Workflow Orchestration.json';
import aiIcon from '../assets/AI.png';
import reportIcon from '../assets/report.png';
import othersIcon from '../assets/others.png';

export const FEATURES = [
  {
    id: 'studio',
    name: 'MineHub Report Studio',
    route: '/dashboard?tab=studio',
    path: 'studio',
    lottie: studioLottie,
    icon: null,
    segment: [0, 180],
    active: true,
  },
  {
    id: 'deep-dig',
    name: 'Deep-Dig RAG',
    route: '/deep-dig-rag',
    path: 'deep-dig-rag',
    lottie: deepDigLottie,
    icon: null,
    active: false,
  },
  {
    id: 'brain',
    name: 'Coal-Tuned Brain',
    route: '/coal-tuned-brain',
    path: 'coal-tuned-brain',
    lottie: null,
    icon: aiIcon,
    active: false,
  },
  {
    id: 'zero-guess',
    name: 'Zero Guess Gate',
    route: '/zero-guess-gate',
    path: 'zero-guess-gate',
    lottie: zeroGuessLottie,
    icon: null,
    active: false,
  },
  {
    id: 'mag',
    name: 'Transfer Superior Memory (MAG)',
    route: '/mag',
    path: 'mag',
    lottie: magLottie,
    icon: null,
    active: false,
  },
  {
    id: 'geomap',
    name: 'GeoMap',
    route: '/geomap',
    path: 'geomap',
    lottie: geomapLottie,
    icon: null,
    active: false,
  },
  {
    id: 'agent-bench',
    name: 'Agent Bench',
    route: '/agent-bench',
    path: 'agent-bench',
    lottie: agentBenchLottie,
    icon: null,
    active: false,
  },
  {
    id: 'orchestration',
    name: 'Workflow Orchestration',
    route: '/workflow-orchestration',
    path: 'workflow-orchestration',
    lottie: orchestrationLottie,
    icon: null,
    active: false,
  },
  {
    id: 'historical-reports',
    name: 'Historical Reports',
    route: '/historical-reports',
    path: 'historical-reports',
    lottie: null,
    icon: reportIcon,
    active: false,
  },
  {
    id: 'subsidiaries',
    name: 'Subsidiaries',
    route: '/dashboard?tab=subsidiaries',
    path: 'subsidiaries',
    lottie: null,
    icon: othersIcon,
    active: false,
  },
  {
    id: 'compliance',
    name: 'Compliance',
    route: '/dashboard?tab=compliance',
    path: 'compliance',
    lottie: null,
    icon: reportIcon,
    active: false,
  },
];

/**
 * Filtered list of exactly the 9 core feature boxes displayed on the Dashboard grid,
 * excluding sidebar-only navigation items like Subsidiaries and Compliance.
 */
export const DASHBOARD_FEATURES = FEATURES.filter(
  (f) => f.id !== 'subsidiaries' && f.id !== 'compliance'
);

/**
 * Lookup a feature by either route, path, id, or normalized string
 */
export function getFeature(identifier) {
  if (!identifier) return null;
  const clean = identifier.toString().toLowerCase().replace(/^\//, '').replace(/^dashboard\?tab=/, '');

  return (
    FEATURES.find(
      (f) =>
        f.id.toLowerCase() === clean ||
        f.path.toLowerCase() === clean ||
        f.route.toLowerCase() === '/' + clean ||
        f.route.toLowerCase() === clean
    ) ||
    FEATURES.find((f) => clean.includes(f.id) || f.path.includes(clean)) ||
    null
  );
}
