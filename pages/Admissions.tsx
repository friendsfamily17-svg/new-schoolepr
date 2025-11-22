import React, { useState } from 'react';
import { UserRole } from '../types';

export const Admissions: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Student Admission Form</h1>
        <p className="text-slate-500">Academic Year 2024-2025</p>
      </header>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
             <span className="text-sm font-medium hidden sm:block">Personal Details</span>
          </div>
          <div className="h-1 w-12 bg-slate-200"></div>
          <div className="flex items-center gap-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
             <span className="text-sm font-medium hidden sm:block">Academic Info</span>
          </div>
          <div className="h-1 w-12 bg-slate-200"></div>
          <div className="flex items-center gap-2">
             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
             <span className="text-sm font-medium hidden sm:block">Documents</span>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Student Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Select...</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Residential Address</label>
                  <textarea className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3}></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Admission Seeking For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Primary School</option>
                    <option>Secondary School</option>
                    <option>Junior College (11th/12th)</option>
                    <option>Degree College</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Standard/Course</label>
                  <input type="text" placeholder="e.g. 10th or FYBCom" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Previous School/College</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Previous Percentage (%)</label>
                  <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
             <div className="space-y-6 text-center py-10">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                </div>
                <h3 className="text-lg font-medium text-slate-800">Upload Documents</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">Please upload scanned copies of previous marksheets, Leaving Certificate, and Aadhar Card.</p>
                
                <button className="border-2 border-dashed border-slate-300 rounded-xl p-8 w-full hover:bg-slate-50 transition-colors cursor-pointer">
                   <span className="text-blue-600 font-medium">Click to browse files</span>
                </button>
             </div>
          )}
        </div>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between">
          <button 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg disabled:opacity-50"
          >
            Back
          </button>
          <button 
            onClick={() => setStep(s => Math.min(3, s + 1))}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
          >
            {step === 3 ? 'Submit Application' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
};