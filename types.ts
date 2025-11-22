export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  PRINCIPAL = 'Principal',
  HOD = 'HOD',
  TEACHER = 'Teacher',
  CLERK = 'Admin Staff (Clerk)',
  STUDENT = 'Student'
}

export enum OrganizationType {
  SCHOOL = 'School',
  JR_COLLEGE = 'Jr. College',
  DEGREE_COLLEGE = 'Degree College'
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  standard: string; // e.g., "10th", "FYJC", "SYBSc"
  division: string;
  rollNo: number;
  feeBalance: number;
  attendancePercentage: number;
  parentEmail: string;
  parentPhone: string;
  category: string; // e.g., "Open", "OBC", "SC/ST"
  admissionDate: string;
  dob: string;
  address: string;
}

export interface ReportColumn {
  key: keyof Student;
  label: string;
  visible: boolean;
}

// --- New Types for Advanced ERP Features ---

export interface FeatureFlag {
  id: string;
  key: string;
  label: string;
  description: string;
  isEnabled: boolean;
  scope: 'GLOBAL' | 'ROLE' | 'DEPT';
  affectedRoles?: UserRole[];
}

export interface FeeHead {
  id: string;
  name: string; // e.g., "Tuition Fee", "Lab Fee", "Library Deposit"
  amount: number;
  isRefundable: boolean;
  frequency: 'ONE_TIME' | 'ANNUAL' | 'SEMESTER';
  applicableCategories: string[]; // ["Open", "OBC"]
}

export interface LearningPlan {
  id: string;
  subject: string;
  teacherId: string;
  chapters: {
    title: string;
    plannedHours: number;
    actualHours: number;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'LAGGING';
  }[];
  approvalStatus: 'DRAFT' | 'PENDING_HOD' | 'APPROVED';
}

export interface LabBatch {
  id: string;
  name: string; // "Physics Batch A"
  subject: string;
  capacity: number;
  studentIds: string[];
  instructorId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    labRoom: string;
  }[];
}
