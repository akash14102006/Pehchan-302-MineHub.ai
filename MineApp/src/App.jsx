import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GeologyPage from './pages/GeologyPage';
import InquiriesPage from './pages/InquiriesPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import ShellLayout from './components/layout/ShellLayout';
import DashboardTabManager from './components/layout/DashboardTabManager';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Landing / Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Authenticated Application Shell */}
        <Route path="/dashboard" element={<ShellLayout />}>
          <Route index element={<DashboardTabManager />} />
          <Route path="subsidiaries" element={<UnderConstructionPage featureId="subsidiaries" />} />
          <Route path="geology" element={<GeologyPage />} />
          <Route path="compliance" element={<UnderConstructionPage featureId="compliance" />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="deep-dig-rag" element={<UnderConstructionPage featureId="deep-dig-rag" />} />
          <Route path="coal-tuned-brain" element={<UnderConstructionPage featureId="coal-tuned-brain" />} />
          <Route path="zero-guess-gate" element={<UnderConstructionPage featureId="zero-guess-gate" />} />
          <Route path="mag" element={<UnderConstructionPage featureId="mag" />} />
          <Route path="geomap" element={<UnderConstructionPage featureId="geomap" />} />
          <Route path="agent-bench" element={<UnderConstructionPage featureId="agent-bench" />} />
          <Route path="workflow-orchestration" element={<UnderConstructionPage featureId="workflow-orchestration" />} />
          <Route path="historical-reports" element={<UnderConstructionPage featureId="historical-reports" />} />
          <Route path="*" element={<DashboardTabManager />} />
        </Route>

        {/* Top-level feature routes wrapped in ShellLayout */}
        <Route element={<ShellLayout />}>
          <Route path="/subsidiaries" element={<UnderConstructionPage featureId="subsidiaries" />} />
          <Route path="/compliance" element={<UnderConstructionPage featureId="compliance" />} />
          <Route path="/deep-dig-rag" element={<UnderConstructionPage featureId="deep-dig-rag" />} />
          <Route path="/coal-tuned-brain" element={<UnderConstructionPage featureId="coal-tuned-brain" />} />
          <Route path="/zero-guess-gate" element={<UnderConstructionPage featureId="zero-guess-gate" />} />
          <Route path="/mag" element={<UnderConstructionPage featureId="mag" />} />
          <Route path="/geomap" element={<UnderConstructionPage featureId="geomap" />} />
          <Route path="/agent-bench" element={<UnderConstructionPage featureId="agent-bench" />} />
          <Route path="/workflow-orchestration" element={<UnderConstructionPage featureId="workflow-orchestration" />} />
          <Route path="/historical-reports" element={<UnderConstructionPage featureId="historical-reports" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
