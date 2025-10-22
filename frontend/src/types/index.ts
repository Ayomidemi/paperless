// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterFormData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Receipt and Invoice Types
export interface Receipt {
  id: string;
  title?: string;
  vendor?: string;
  amount: number;
  currency: string;
  date: string;
  status: 'PENDING' | 'VERIFIED' | 'DISPUTED';
  category?: Category;
  tags?: Tag[];
  fileUrl?: string;
  extractedData?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  title?: string;
  vendor?: string;
  amount: number;
  currency: string;
  date: string;
  dueDate?: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  category?: Category;
  tags?: Tag[];
  fileUrl?: string;
  extractedData?: any;
  createdAt: string;
  updatedAt: string;
}

// Category and Tag Types
export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface DashboardSummary {
  receiptCount: number;
  invoiceCount: number;
  totalReceiptAmount: number;
  totalInvoiceAmount: number;
}

export interface SpendingByCategory {
  categoryId: string;
  category: Category;
  amount: number;
  count: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface TopVendor {
  vendor: string;
  amount: number;
  count: number;
}

export interface InvoiceStatusSummary {
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  count: number;
  amount: number;
}

export interface DashboardAnalytics {
  summary: DashboardSummary;
  spendingByCategory: SpendingByCategory[];
  monthlySpending: MonthlySpending[];
  topVendors: TopVendor[];
  invoiceStatusSummary: InvoiceStatusSummary[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Component Props Types
export interface DashboardProps {
  onUploadReceipt: () => void;
  onUploadInvoice: () => void;
  onViewReceipt: (id: string) => void;
  onEditReceipt: (id: string) => void;
}

export interface ReceiptCardProps {
  receipt: Receipt;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  acceptedTypes?: string[];
  maxSize?: number;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Upload Types
export interface UploadedFile {
  file: File;
  preview?: string;
  extractedData?: any;
}

export interface ExtractedData {
  vendor?: string;
  amount?: number;
  date?: string;
  items?: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  confidence?: number;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Utility Types
export type Status = 'PENDING' | 'VERIFIED' | 'DISPUTED' | 'PAID' | 'OVERDUE' | 'CANCELLED';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
