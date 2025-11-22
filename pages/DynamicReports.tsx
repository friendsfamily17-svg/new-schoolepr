import React, { useState } from 'react';
import { Student } from '../types';
import { generateReportSchema } from '../services/geminiService';
import { Sparkles, Download, Filter, Plus, Search } from 'lucide-react';

// Mock Data Generator
const MOCK_STUDENTS: Student[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `STU-${1000 + i}`,
  firstName: ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh'][i % 7],
  lastName: ['Sharma', 'Patel', 'Reddy', 'Nair', 'Singh', 'Verma', 'Gupta'][i % 7],
  standard: i < 5 ? '10th' : i < 10 ? 'FYJC (11th)' : 'SYBSc',
  division: ['A', 'B', 'A', 'C', 'B'][i % 5],
  rollNo: 101 + i,
  feeBalance: i % 3 === 0 ? 5000 : 0,
  attendancePercentage: 75 + (i % 20),
  parentEmail: `parent.${i}@example.com`,
  parentPhone: `98765432${i < 10 ? '0' + i : i}`,
  category: i % 4 === 0 ? 'OBC' : 'Open',
  admissionDate: '2023-06-15',
  dob: '2008-05-20',
  address: 'Mumbai, Maharashtra'
}));

// Full list of available fields in our "Database"
const ALL_FIELDS: (keyof Student)[] = [
  'id', 'firstName', 'lastName', 'standard', 'division', 'rollNo', 
  'feeBalance', 'attendancePercentage', 'parentEmail', 'parentPhone', 
  'category', 'admissionDate', 'dob', 'address'
];

export const DynamicReports: React.FC = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['firstName', 'lastName', 'standard', 'feeBalance']);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleAIPrompt = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setIsThinking(true);

    // Call Gemini to decide which columns to show
    const newColumns = await generateReportSchema(visibleColumns, prompt, ALL_FIELDS);
    
    setVisibleColumns(newColumns);
    setIsThinking(false);
    setIsLoading(false);
    setPrompt('');
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-purple-600" />
            Dynamic Reporting Engine
          </h1>
          <p className="text-slate-500 mt-1">
            Use natural language to customize your report view.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 font-medium text-sm">
          <Download size={16} />
          Export CSV
        </button>
      </header>

      {/* AI Interaction Area */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <label className="block text-sm font-medium mb-2 opacity-90">
          Ask AI to modify this report (e.g., "Add parent contact info" or "Show me attendance and category")
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the columns you want..."
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:ring-2 focus:ring-white/50 border-none outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleAIPrompt()}
          />
          <button 
            onClick={handleAIPrompt}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Update Report'}
          </button>
        </div>
        {isThinking && (
          <div className="mt-3 text-xs font-mono flex items-center gap-2 opacity-80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            AI is analyzing database schema to find relevant fields...
          </div>
        )}
      </div>

      {/* The Dynamic Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-700">Student Data Report</h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Filter size={16} />
            <span>{visibleColumns.length} columns visible</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-xs">
              <tr>
                {visibleColumns.map((col) => (
                  <th key={col} className="px-6 py-4 border-b border-slate-200 whitespace-nowrap">
                    {col.replace(/([A-Z])/g, ' $1').trim()} {/* CamelCase to Title Case */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  {visibleColumns.map((col) => (
                    <td key={`${student.id}-${col}`} className="px-6 py-4 text-slate-700 whitespace-nowrap">
                      {/* Special formatting for some fields */}
                      {col === 'feeBalance' ? (
                        <span className={`font-medium ${student.feeBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                           ₹{student[col as keyof Student]}
                        </span>
                      ) : col === 'attendancePercentage' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${Number(student[col as keyof Student]) < 75 ? 'bg-red-500' : 'bg-green-500'}`} 
                              style={{ width: `${student[col as keyof Student]}%` }}
                            ></div>
                          </div>
                          <span>{student[col as keyof Student]}%</span>
                        </div>
                      ) : (
                        student[col as keyof Student]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};