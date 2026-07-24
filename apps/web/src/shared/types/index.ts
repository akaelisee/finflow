export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT';
export type ImportSource = 'MANUAL' | 'CSV_IMPORT';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  bank: string;
  type: AccountType;
  initialBalance: number;
  currency: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string | null;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number;
  label: string;
  transactionDate: string;
  importedFrom: ImportSource;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId: string;
  month: string;
  amount: number;
  createdAt: string;
}
