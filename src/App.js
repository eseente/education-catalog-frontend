import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import Dashboard from './pages/Dashboard';
import DeveloperPage from './pages/developerPage/DeveloperPage';
import SeniorPage from './pages/seniorPage/SeniorPage';
import ManagerPage from './pages/managerPage/ManagerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/senior" element={<SeniorPage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
