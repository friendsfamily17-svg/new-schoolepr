import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DynamicReports } from './pages/DynamicReports';
import { Admissions } from './pages/Admissions';
import { SystemArchitecture } from './pages/SystemArchitecture';
import { AdminConfig } from './pages/AdminConfig';
import { UserRole } from './types';

// Placeholder for Student Portal
const StudentPortalPlaceholder = () => (
  <div className="text-center py-20">
    <h2 className="text-2xl font-bold text-slate-700">Student Portal</h2>
    <p className="text-slate-500 mt-2">View your grades, attendance, and fees here.</p>
  </div>
);

const App: React.FC = () => {
  // Global State for Role Simulation
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PRINCIPAL);

  return (
    <Router>
      <Layout userRole={userRole} setUserRole={setUserRole}>
        <Routes>
          <Route path="/" element={<Dashboard role={userRole} />} />
          
          {/* Role Based Access Control Simulation */}
          <Route 
            path="/admissions" 
            element={
              userRole !== UserRole.STUDENT 
              ? <Admissions /> 
              : <div className="p-10 text-center bg-red-50 text-red-600 rounded-lg border border-red-200">Access Denied: Students cannot manage admissions.</div>
            } 
          />
          
          <Route 
            path="/reports" 
            element={
               userRole !== UserRole.STUDENT
               ? <DynamicReports />
               : <Navigate to="/student-portal" replace />
            } 
          />

          <Route 
             path="/admin-config" 
             element={
               (userRole === UserRole.SUPER_ADMIN || userRole === UserRole.PRINCIPAL)
               ? <AdminConfig />
               : <div className="p-10 text-center bg-red-50 text-red-600 rounded-lg border border-red-200">Access Denied: Requires Principal or Super Admin privileges.</div>
             }
          />

          <Route path="/student-portal" element={<StudentPortalPlaceholder />} />
          <Route path="/architecture" element={<SystemArchitecture />} />
          
          {/* Fallback for undefined routes */}
          <Route path="*" element={<Dashboard role={userRole} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;