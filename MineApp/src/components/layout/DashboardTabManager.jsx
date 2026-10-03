import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage';
import GeologyPage from '../../pages/GeologyPage';
import InquiriesPage from '../../pages/InquiriesPage';
import ReportStudioPage from '../../pages/ReportStudioPage';
import UnderConstructionPage from '../../pages/UnderConstructionPage';

const DashboardTabManager = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab')?.toLowerCase();

  switch (tab) {
    case 'studio':
    case 'report-studio':
      return <ReportStudioPage />;
    case 'subsidiaries':
      return <UnderConstructionPage featureId="subsidiaries" />;
    case 'geology':
      return <GeologyPage />;
    case 'compliance':
      return <UnderConstructionPage featureId="compliance" />;
    case 'inquiries':
      return <InquiriesPage />;
    case 'deep-dig':
    case 'deep-dig-rag':
    case 'brain':
    case 'coal-tuned-brain':
    case 'zero-guess':
    case 'zero-guess-gate':
    case 'mag':
    case 'geomap':
    case 'agent-bench':
    case 'orchestration':
    case 'workflow-orchestration':
    case 'historical-reports':
      return <UnderConstructionPage featureId={tab} />;
    case 'dashboard':
    default:
      return <DashboardPage />;
  }
};

export default DashboardTabManager;
