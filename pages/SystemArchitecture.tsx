import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  Shield, 
  Cpu, 
  Workflow, 
  Layers, 
  Lock, 
  Code2, 
  CheckCircle2, 
  ListTodo, 
  Key,
  FileJson
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'executive' | 'erd' | 'roles' | 'stack' | 'modules' | 'roadmap' | 'challenges'>('executive');

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all border-b-2 whitespace-nowrap ${
        activeTab === id
          ? 'border-blue-600 text-blue-600 bg-blue-50'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="space-y-6 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">EduSphere ERP Architecture</h1>
        <p className="text-slate-500 mt-2">Technical Specification for Multi-Tenant Indian Educational System</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-200px)]">
        <div className="flex overflow-x-auto border-b border-slate-200 shrink-0">
          <TabButton id="executive" label="Executive Summary" icon={Layers} />
          <TabButton id="erd" label="Database Schema (ERD)" icon={Database} />
          <TabButton id="roles" label="Permissions Matrix" icon={Key} />
          <TabButton id="stack" label="Tech Stack" icon={Server} />
          <TabButton id="modules" label="Module Workflows" icon={Workflow} />
          <TabButton id="roadmap" label="Roadmap" icon={ListTodo} />
          <TabButton id="challenges" label="Tech Challenges" icon={Cpu} />
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          {activeTab === 'executive' && (
            <div className="max-w-4xl space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">1. Executive Summary</h2>
                <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
                  <p>
                    EduSphere ERP is architected as a <strong>single-tenant initially, multi-tenant ready</strong> SaaS platform tailored for Indian Junior and Degree Colleges.
                    The core philosophy is <strong>"Configuration over Customization"</strong>, enabling institutions to toggle features (e.g., Learning Plans, Lab Batching) via a Policy Engine without code changes.
                  </p>
                  <p>
                    It solves critical scalability challenges (5,000+ students) using a <strong>Hybrid SQL + NoSQL</strong> approach (PostgreSQL with JSONB) to handle dynamic academic structures and report cards while maintaining strict ACID compliance for fee transactions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-3 text-indigo-700 font-bold">
                      <Shield size={20} />
                      <span>RBAC + PBAC Security</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Access isn't just about Roles (Teacher). It's about Policies: 
                      "Teacher can edit attendance ONLY within 24 hours of the lecture."
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold">
                      <Database size={20} />
                      <span>Dynamic Data Schema</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Uses PostgreSQL `JSONB` columns for "Custom Fields" in Admissions and "Result Data", allowing instant schema changes without migration downtime.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-3 text-amber-700 font-bold">
                      <Workflow size={20} />
                      <span>Indian Context Native</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Built-in logic for Category Reservations (SC/ST/OBC), State Govt Scholarship tracking, and Hybrid Grading (Marks vs CGPA).
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'erd' && (
            <div className="max-w-5xl space-y-10">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-slate-800">2. Database Schema (PostgreSQL)</h2>
                 <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-mono font-bold">Normalized + JSONB Hybrid</span>
              </div>
              
              <div className="grid gap-8">
                {/* Users & Auth */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                    <Lock size={18} className="text-blue-600" /> 
                    User Management & Auth
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TableCard name="users" columns={[
                      "id: uuid (PK)",
                      "email: varchar (Unique, Index)",
                      "password_hash: varchar",
                      "role_id: fk_roles",
                      "is_active: boolean",
                      "mfa_secret: varchar",
                      "last_login: timestamp"
                    ]} />
                    <TableCard name="profiles" columns={[
                      "id: uuid (PK)",
                      "user_id: fk_users (Unique)",
                      "first_name: varchar",
                      "last_name: varchar",
                      "phone: varchar",
                      "avatar_url: varchar",
                      "meta_data: jsonb (Address, Bio)"
                    ]} />
                  </div>
                </div>

                {/* Academics */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                    <CheckCircle2 size={18} className="text-emerald-600" /> 
                    Academics & Students
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <TableCard name="programs" columns={[
                      "id: uuid (PK)",
                      "name: varchar (e.g., B.Sc Comp Sci)",
                      "type: enum (UG, PG, Diploma)",
                      "dept_id: fk_departments"
                    ]} />
                    <TableCard name="classes" columns={[
                      "id: uuid (PK)",
                      "program_id: fk_programs",
                      "name: varchar (e.g., FY-A)",
                      "academic_year: varchar (2024-25)",
                      "class_teacher_id: fk_users"
                    ]} />
                     <TableCard name="students" columns={[
                      "id: uuid (PK)",
                      "user_id: fk_users",
                      "current_class_id: fk_classes",
                      "roll_no: int",
                      "admission_no: varchar (Unique)",
                      "category: enum (Open, OBC, SC)",
                      "scholarship_id: fk_scholarships (Nullable)"
                    ]} />
                  </div>
                </div>

                {/* Advanced ERP Modules */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                    <Cpu size={18} className="text-purple-600" /> 
                    Advanced Modules (Labs, Plans, Fees)
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <TableCard name="learning_plans" columns={[
                      "id: uuid (PK)",
                      "subject_id: fk_subjects",
                      "teacher_id: fk_users",
                      "syllabus_tree: jsonb (Chapters/Topics)",
                      "status: enum (DRAFT, APPROVED)",
                      "approved_by: fk_users"
                    ]} />
                    <TableCard name="lab_batches" columns={[
                      "id: uuid (PK)",
                      "subject_id: fk_subjects",
                      "name: varchar",
                      "student_ids: jsonb (Array of UUIDs)",
                      "schedule_config: jsonb (Day/Time/Room)"
                    ]} />
                    <TableCard name="fee_ledger" columns={[
                      "id: uuid (PK)",
                      "student_id: fk_students",
                      "type: enum (DEMAND, PAYMENT, WAIVER)",
                      "amount: decimal(10,2)",
                      "head_id: fk_fee_heads",
                      "transaction_ref: varchar",
                      "created_at: timestamp"
                    ]} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="max-w-4xl space-y-8">
              <h2 className="text-xl font-bold text-slate-800">3. Role-Permission Matrix & Policy Engine</h2>
              
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                <h3 className="font-bold text-slate-800 mb-2">Policy-Based Access Control (PBAC)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Beyond simple "Read/Write", the system uses a Policy Engine.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase">Time-Based Policy</div>
                    <p className="text-sm font-medium mt-1">"Teachers can only edit attendance within 24 hours of the lecture slot."</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <div className="text-xs font-bold text-slate-400 uppercase">Data-Ownership Policy</div>
                    <p className="text-sm font-medium mt-1">"HOD can approve Learning Plans only for subjects within their Department."</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="px-4 py-3 border-b">Permission / Module</th>
                      <th className="px-4 py-3 border-b text-center">Super Admin</th>
                      <th className="px-4 py-3 border-b text-center">Principal</th>
                      <th className="px-4 py-3 border-b text-center">HOD</th>
                      <th className="px-4 py-3 border-b text-center">Teacher</th>
                      <th className="px-4 py-3 border-b text-center">Student</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Config Management', sa: '✅', p: '✅', h: '❌', t: '❌', s: '❌' },
                      { name: 'Approve Learning Plans', sa: '✅', p: '✅', h: '✅', t: '❌', s: '❌' },
                      { name: 'Modify Fee Structure', sa: '✅', p: '❌', h: '❌', t: '❌', s: '❌' },
                      { name: 'Create Lab Batches', sa: '✅', p: '✅', h: '✅', t: '✅', s: '❌' },
                      { name: 'Edit Attendance (Policy)', sa: '✅', p: '✅', h: '✅', t: 'Condition', s: '❌' },
                      { name: 'View Reports', sa: 'All', p: 'All', h: 'Dept', t: 'Class', s: 'Self' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">{row.name}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{row.sa}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{row.p}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{row.h}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{row.t}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{row.s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
             <div className="max-w-4xl space-y-6">
              <h2 className="text-xl font-bold text-slate-800">4. Tech Stack Recommendation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StackCard 
                  icon={Code2} color="text-blue-600"
                  title="Backend: NestJS (Node.js)"
                  reasons={[
                    "Strict TypeScript support mirrors complex ERP logic.",
                    "Modular architecture fits Module-based ERP perfectly.",
                    "Excellent support for Microservices migration later."
                  ]}
                />
                <StackCard 
                  icon={Database} color="text-emerald-600"
                  title="Database: PostgreSQL"
                  reasons={[
                    "Best-in-class JSONB support for dynamic fields.",
                    "Reliable ACID compliance for Fee/Finance transactions.",
                    "Row Level Security (RLS) for multi-tenant data isolation."
                  ]}
                />
                <StackCard 
                  icon={Layers} color="text-purple-600"
                  title="Frontend: React + Vite"
                  reasons={[
                    "Massive ecosystem for Data Grids (TanStack Table).",
                    "Complex form handling (React Hook Form).",
                    "Client-side PDF generation for reports."
                  ]}
                />
                <StackCard 
                  icon={Server} color="text-orange-600"
                  title="Infrastructure: AWS / Docker"
                  reasons={[
                    "S3 for document storage (Aadhar/Marksheets).",
                    "Redis for caching Timetables & Session storage.",
                    "BullMQ for async jobs (Result processing, SMS sending)."
                  ]}
                />
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="max-w-4xl space-y-8">
               <h2 className="text-xl font-bold text-slate-800">5. Detailed Module Workflows</h2>
               
               <WorkflowCard 
                 title="Module 2: Student Admission (Online)"
                 steps={[
                   "Public Portal: Student fills form (Personal, Academic, Uploads)",
                   "System: Validates docs & generates Temp ID",
                   "Admin: Verifies documents (Status: PENDING → VERIFIED)",
                   "System: Triggers Fee Payment Link (Email/SMS)",
                   "Payment Gateway: Webhook confirms success",
                   "System: Generates PRN (Permanent Reg No) & Allocates Division"
                 ]}
               />

               <WorkflowCard 
                 title="Module 5: Dynamic Lab Batching"
                 steps={[
                   "Input: Total Students (120) in Class SY-A",
                   "Config: Lab Capacity (25), Subject (Physics)",
                   "Algorithm: Splits into 5 Batches (A1-A5)",
                   "Constraint Check: Checks for Lecture conflicts",
                   "Manual Override: Teacher swaps Student X from A1 to A2",
                   "Publish: Batches visible in Student Portal"
                 ]}
               />

               <WorkflowCard 
                 title="Module 8: Examination & Results"
                 steps={[
                   "Setup: Admin defines Grading Logic (CGPA vs %)",
                   "Entry: Teachers enter marks (Masked Roll Nos for privacy)",
                   "Lock: Principal locks mark entry",
                   "Processing (Job Queue): Calculate Totals, GPA, Rank",
                   "Publish: Release to Student Portal on toggle",
                   "Print: Generate PDF Report Cards in bulk"
                 ]}
               />
            </div>
          )}

          {activeTab === 'roadmap' && (
             <div className="max-w-3xl space-y-8">
               <h2 className="text-xl font-bold text-slate-800">7. Implementation Roadmap</h2>
               
               <div className="border-l-2 border-blue-200 pl-8 space-y-8 relative">
                 <RoadmapItem 
                   phase="Phase 1: MVP (Months 1-3)"
                   features={[
                     "User Auth & Role Management",
                     "Student Information System (Admission)",
                     "Fee Management (Structure + Collection)",
                     "Basic Attendance (Lecture)",
                     "Reports (Static)"
                   ]}
                 />
                 <RoadmapItem 
                   phase="Phase 2: Academic Core (Months 4-6)"
                   features={[
                     "Timetable & Dynamic Lab Batches",
                     "Examination & Result Processing",
                     "Student Portal Launch",
                     "Learning Plan Basics"
                   ]}
                 />
                 <RoadmapItem 
                   phase="Phase 3: Advanced & AI (Months 7-9)"
                   features={[
                     "Dynamic Report Builder (AI Powered)",
                     "Learning Plan Approval Workflows",
                     "Biometric Attendance Integration",
                     "Mobile App for Parents"
                   ]}
                 />
               </div>
             </div>
          )}

          {activeTab === 'challenges' && (
            <div className="max-w-4xl space-y-6">
              <h2 className="text-xl font-bold text-slate-800">10. Solutions to Technical Challenges</h2>
              <ul className="space-y-4">
                <SolutionCard 
                  title="1. Dynamic Report Builder Security"
                  problem="Allowing users to build queries creates SQL Injection risk."
                  solution="Use a 'Column Allowlist' in backend. UI sends JSON { columns: ['name', 'fee'], filter: { fee_gt: 1000 } }. Backend maps this to safe Query Builder calls (Knex/TypeORM). Apply Row Level Security (RLS) so teachers only fetch their students."
                />
                 <SolutionCard 
                  title="2. Lab Batch Scheduling Conflicts"
                  problem="100 students, 20 capacity, limited rooms, time conflicts."
                  solution="Use a Constraint Solver (like OptaPlanner concepts) or Graph Coloring Algorithm for initial schedule. Store 'Busy Slots' in Redis Bitfield for instant O(1) collision detection during manual drag-and-drop adjustments."
                />
                <SolutionCard 
                  title="3. Multi-Year Fee Tracking"
                  problem="Student in TY has pending fees from FY."
                  solution="Ledger Architecture. Don't store a simple 'Balance' column. Store every Fee Demand (Debit) and Payment (Credit) as immutable rows in a `ledger` table. Summing them gives the balance. Tag each row with `academic_year_id`."
                />
                 <SolutionCard 
                  title="4. Feature Toggles Implementation"
                  problem="Need to enable/disable features per Role/Class."
                  solution="Store config in Redis/Database: `feature_flags: { 'learning_plan': { scope: 'dept', allowed: ['CS', 'IT'] } }`. Create a `@FeatureGuard('learning_plan')` decorator in NestJS to block API access automatically."
                />
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Helper Components for clean code
const TableCard = ({ name, columns }: { name: string, columns: string[] }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
    <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
      <FileJson size={16} className="text-slate-400" />
      <span className="font-bold text-slate-700 font-mono">{name}</span>
    </div>
    <ul className="space-y-1">
      {columns.map((col, idx) => (
        <li key={idx} className="text-xs font-mono text-slate-600 truncate hover:text-clip" title={col}>
          {col}
        </li>
      ))}
    </ul>
  </div>
);

const StackCard = ({ icon: Icon, color, title, reasons }: any) => (
  <div className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <Icon className={color} size={24} />
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
    </div>
    <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
      {reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}
    </ul>
  </div>
);

const WorkflowCard = ({ title, steps }: { title: string, steps: string[] }) => (
  <div className="border border-slate-200 rounded-lg p-6 bg-white">
    <h3 className="font-bold text-slate-800 mb-4">{title}</h3>
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="bg-slate-50 p-3 rounded border border-slate-200 shrink-0 text-slate-700 font-medium w-full md:w-auto">
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="hidden md:block text-slate-400">→</div>
          )}
          {i < steps.length - 1 && (
            <div className="md:hidden text-slate-400 py-1">↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const RoadmapItem = ({ phase, features }: { phase: string, features: string[] }) => (
  <div className="relative">
    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow-sm"></div>
    <h3 className="font-bold text-slate-800 text-lg mb-3">{phase}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((f, i) => (
        <div key={i} className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-600 shadow-sm flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          {f}
        </div>
      ))}
    </div>
  </div>
);

const SolutionCard = ({ title, problem, solution }: any) => (
  <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <div className="space-y-2 text-sm">
      <p className="text-red-600 bg-red-50 p-2 rounded inline-block w-full">
        <span className="font-bold">Challenge:</span> {problem}
      </p>
      <p className="text-emerald-700 bg-emerald-50 p-2 rounded inline-block w-full">
        <span className="font-bold">Solution:</span> {solution}
      </p>
    </div>
  </div>
);
