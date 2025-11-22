import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  GraduationCap, 
  Settings, 
  LogOut,
  Building2,
  UserCircle,
  Sliders
} from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, setUserRole }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(path)
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">EduSphere</h1>
            <p className="text-xs text-slate-500">ERP & CRM Suite</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem path="/" icon={LayoutDashboard} label="Dashboard" />
          
          {(userRole !== UserRole.STUDENT) && (
            <>
              <NavItem path="/admissions" icon={UserCircle} label="Admissions" />
              <NavItem path="/academics" icon={Building2} label="Academics" />
              <NavItem path="/reports" icon={FileText} label="Smart Reports" />
              <NavItem path="/users" icon={Users} label="User Mgmt" />
              <NavItem path="/admin-config" icon={Sliders} label="Admin Config" />
            </>
          )}
          
          {userRole === UserRole.STUDENT && (
             <NavItem path="/student-portal" icon={UserCircle} label="My Portal" />
          )}

          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase mb-2">Developer</p>
            <NavItem path="/architecture" icon={Settings} label="System Blueprint" />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-100 rounded-lg p-4 mb-3">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Current Role</p>
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="w-full text-sm p-2 rounded border border-slate-300 bg-white"
            >
              {Object.values(UserRole).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors w-full px-2">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};