import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BrandGenerator from './pages/BrandGenerator';
import EditBranding from './pages/EditBranding';
import Login from './pages/Login';
import PlanSelection from './pages/PlanSelection';
import CategorySelection from './pages/CategorySelection';
import AssetLibrary from './pages/AssetLibrary';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<PlanSelection />} />
        <Route path="/category" element={<CategorySelection />} />
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/generator" element={<BrandGenerator />} />
        <Route path="/editor" element={<EditBranding />} />
        <Route path="/assets" element={<AssetLibrary />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;