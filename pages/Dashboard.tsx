import React from 'react';
import { UserRole } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, AlertCircle, Wallet } from 'lucide-react';

const data = [
  { name: 'Jan', fees: 40000 },
  { name: 'Feb', fees: 30000 },
  { name: 'Mar', fees: 55000 },
  { name: 'Apr', fees: 25000 },
  { name: 'May', fees: 10000 },
  { name: 'Jun', fees: 65000 },
];

const attendanceData = [
  { name: 'Present', value: 850 },
  { name: 'Absent', value: 120 },
  { name: 'Leave', value: 30 },
];

const COLORS = ['#2563eb', '#94a3b8', '#fbbf24'];

export const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  
  const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
          <p className={`text-xs mt-2 font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {trend} from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, {role}</p>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="2,450" 
          trend="+5.2%" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Fee Collection" 
          value="₹ 12.5L" 
          trend="+12%" 
          icon={Wallet} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Avg Attendance" 
          value="88%" 
          trend="-2.1%" 
          icon={TrendingUp} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Pending Issues" 
          value="14" 
          trend="+2" 
          icon={AlertCircle} 
          color="bg-orange-500" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Fee Collection Trends (Yearly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="fees" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Attendance</h3>
          <div className="h-80 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {attendanceData.map((item, idx) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};