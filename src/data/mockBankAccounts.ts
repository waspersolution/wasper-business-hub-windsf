
import { BankAccount, Transaction } from "@/types/bankAccounts";

export const mockBankAccounts: BankAccount[] = [
  {
    id: "BA001",
    name: "Main Operating Account",
    account_number: "0123456789",
    bank_name: "First Bank",
    account_type: "Current",
    currency: "NGN",
    balance: 2450000,
    last_reconciled: "2025-04-15",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-21"
  },
  {
    id: "BA002",
    name: "Payroll Account",
    account_number: "9876543210",
    bank_name: "Access Bank",
    account_type: "Current",
    currency: "NGN",
    balance: 875000,
    last_reconciled: "2025-04-10",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-18"
  },
  {
    id: "BA003",
    name: "Savings Account",
    account_number: "5432109876",
    bank_name: "Zenith Bank",
    account_type: "Savings",
    currency: "NGN",
    balance: 1500000,
    last_reconciled: "2025-03-31",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-01"
  },
  {
    id: "BA004",
    name: "USD Account",
    account_number: "0987654321",
    bank_name: "GTBank",
    account_type: "Domiciliary",
    currency: "USD",
    balance: 10000,
    is_active: true,
    created_at: "2025-02-15",
    updated_at: "2025-04-20"
  },
  {
    id: "BA005",
    name: "Tax Reserve Account",
    account_number: "1357924680",
    bank_name: "UBA",
    account_type: "Current",
    currency: "NGN",
    balance: 350000,
    last_reconciled: "2025-03-15",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-03-15"
  }
];

export const mockTransactions: Record<string, Transaction[]> = {
  "BA001": [
    {
      id: "T001",
      account_id: "BA001",
      date: "2025-04-21",
      description: "Sales deposit",
      reference: "DEP-001",
      amount: 250000,
      type: "deposit",
      category: "Sales",
      reconciled: true,
      created_at: "2025-04-21"
    },
    {
      id: "T002",
      account_id: "BA001",
      date: "2025-04-20",
      description: "Rent payment",
      reference: "CHQ-123",
      amount: -150000,
      type: "withdrawal",
      category: "Rent",
      reconciled: true,
      created_at: "2025-04-20"
    },
    {
      id: "T003",
      account_id: "BA001",
      date: "2025-04-18",
      description: "Supplier payment - ABC Suppliers",
      reference: "TRF-456",
      amount: -75000,
      type: "withdrawal",
      category: "Supplier Payment",
      reconciled: true,
      created_at: "2025-04-18"
    },
    {
      id: "T004",
      account_id: "BA001",
      date: "2025-04-15",
      description: "Customer payment - Acme Corp",
      reference: "DEP-002",
      amount: 125000,
      type: "deposit",
      category: "Customer Payment",
      reconciled: true,
      created_at: "2025-04-15"
    },
    {
      id: "T005",
      account_id: "BA001",
      date: "2025-04-12",
      description: "Utility bills",
      reference: "AUTO-789",
      amount: -45000,
      type: "withdrawal",
      category: "Utilities",
      reconciled: false,
      created_at: "2025-04-12"
    }
  ],
  "BA002": [
    {
      id: "T006",
      account_id: "BA002",
      date: "2025-04-21",
      description: "Transfer from main account",
      reference: "TRF-789",
      amount: 350000,
      type: "deposit",
      category: "Transfer",
      reconciled: true,
      created_at: "2025-04-21"
    },
    {
      id: "T007",
      account_id: "BA002",
      date: "2025-04-20",
      description: "Payroll - April 2025",
      reference: "PAY-APR25",
      amount: -325000,
      type: "withdrawal",
      category: "Payroll",
      reconciled: true,
      created_at: "2025-04-20"
    }
  ]
};

export const chartData = [
  { name: 'Jan', balance: 1500000 },
  { name: 'Feb', balance: 1750000 },
  { name: 'Mar', balance: 2200000 },
  { name: 'Apr', balance: 2450000 },
];
