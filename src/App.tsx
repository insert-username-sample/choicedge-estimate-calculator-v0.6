import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ResidentialLayoutPage from './pages/ResidentialLayoutPage';
import EstimateSummaryPage from './pages/EstimateSummaryPage';
import ComingSoonPage from './pages/ComingSoonPage';
import HistoryPage from './pages/HistoryPage';
import VersionInfoPage from './pages/VersionInfoPage';
import AboutDevPage from './pages/AboutDevPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category-selection" element={<CategorySelectionPage />} />
        <Route path="/project-details" element={<ProjectDetailsPage />} />
        <Route path="/residential-layout" element={<ResidentialLayoutPage />} />
        <Route path="/estimate-summary" element={<EstimateSummaryPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/version-info" element={<VersionInfoPage />} />
        <Route path="/about-dev" element={<AboutDevPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
