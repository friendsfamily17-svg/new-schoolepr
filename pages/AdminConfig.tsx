import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Settings, ShieldAlert, Save } from 'lucide-react';
import { FeatureFlag, UserRole } from '../types';

export const AdminConfig: React.FC = () => {
  const [features, setFeatures] = useState<FeatureFlag[]>([
    {
      id: '1',
      key: 'learning_plan_approval',
      label: 'Learning Plan HOD Approval',
      description: 'If enabled, learning plans created by teachers require HOD approval before becoming active.',
      isEnabled: true,
      scope: 'GLOBAL'
    },
    {
      id: '2',
      key: 'strict_attendance_exams',
      label: 'Strict Attendance for Exam Hall Ticket',
      description: 'Automatically block Hall Ticket generation if attendance < 75%.',
      isEnabled: false,
      scope: 'GLOBAL'
    },
    {
      id: '3',
      key: 'online_admission',
      label: 'Online Admission Portal',
      description: 'Open the admission portal for public access.',
      isEnabled: true,
      scope: 'GLOBAL'
    },
    {
      id: '4',
      key: 'sms_notifications',
      label: 'SMS Gateways (Cost Warning)',
      description: 'Send SMS for absence. Disabling this will fallback to App Notifications/Email only.',
      isEnabled: true,
      scope: 'GLOBAL'
    }
  ]);

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === id ? { ...f, isEnabled: !f.isEnabled } : f
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="text-slate-600" />
          System Configuration & Feature Toggles
        </h1>
        <p className="text-slate-500 mt-1">
          Manage global policies and feature availability without deploying code.
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-800">Global Feature Switches</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors">
              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-800">{feature.label}</h3>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">{feature.key}</span>
                </div>
                <p className="text-sm text-slate-500">{feature.description}</p>
              </div>
              
              <button 
                onClick={() => toggleFeature(feature.id)}
                className={`flex items-center gap-2 transition-colors ${
                  feature.isEnabled ? 'text-green-600' : 'text-slate-400'
                }`}
              >
                {feature.isEnabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="text-orange-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-orange-800 mb-1">Critical Zone: Academic Year Reset</h3>
            <p className="text-sm text-orange-700 mb-4">
              Promoting students to the next academic year requires a system freeze. Ensure all "Result Processing" queues are empty before initiating.
            </p>
            <button className="bg-white border border-orange-300 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-100">
              Initiate Year-End Process
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-sm">
          <Save size={18} />
          Save Configuration
        </button>
      </div>
    </div>
  );
};