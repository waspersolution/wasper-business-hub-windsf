
import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";

import { mockBankAccounts } from "@/data/mockBankAccounts";
import { BankAccount } from "@/types/bankAccounts";
import { BankAccountSummary } from "@/components/bank-accounts/BankAccountSummary";
import { AccountsFilter } from "@/components/bank-accounts/AccountsFilter";
import { AccountsList } from "@/components/bank-accounts/AccountsList";
import { BankAccountDetailsDialog } from "@/components/bank-accounts/BankAccountDetailsDialog";
import { NewAccountDialog } from "@/components/bank-accounts/NewAccountDialog";

const BANK_OPTIONS = [
  "First Bank", "Access Bank", "Zenith Bank", "GTBank"
];

export default function BankAccounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("");
  const [currency, setCurrency] = useState("");
  const [selectedBanks, setSelectedBanks] = useState(BANK_OPTIONS);
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [viewAccountDialog, setViewAccountDialog] = useState(false);

  const handleResetFilters = () => {
    setSearchTerm("");
    setAccountType("");
    setCurrency("");
    setSelectedBanks(BANK_OPTIONS);
  };

  const filteredAccounts = mockBankAccounts.filter(account => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.account_number.includes(searchTerm) ||
      account.bank_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      !accountType || account.account_type.toLowerCase() === accountType.toLowerCase();

    const matchesCurrency =
      !currency || account.currency.toUpperCase() === currency.toUpperCase();

    const matchesBank =
      selectedBanks.length === 0 ||
      selectedBanks.includes(account.bank_name);

    return matchesSearch && matchesType && matchesCurrency && matchesBank;
  });

  const handleViewAccount = (account: BankAccount) => {
    setSelectedAccount(account);
    setViewAccountDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Bank Accounts</h1>
            <p className="text-muted-foreground">Manage all your bank and cash accounts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setNewAccountDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Account
            </Button>
          </div>
        </div>
        <BankAccountSummary accounts={mockBankAccounts} />
        <AccountsFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          accountType={accountType}
          onAccountTypeChange={setAccountType}
          currency={currency}
          onCurrencyChange={setCurrency}
          selectedBanks={selectedBanks}
          onSelectedBanksChange={setSelectedBanks}
          onReset={handleResetFilters}
        />
        <AccountsList
          accounts={filteredAccounts}
          onViewAccount={handleViewAccount}
        />
      </div>
      <BankAccountDetailsDialog
        account={selectedAccount}
        open={viewAccountDialog}
        onOpenChange={setViewAccountDialog}
      />
      <NewAccountDialog
        open={newAccountDialog}
        onOpenChange={setNewAccountDialog}
      />
    </DashboardLayout>
  );
}
