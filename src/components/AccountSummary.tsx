
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Wallet, CreditCard } from 'lucide-react';

interface AccountSummaryProps {
  basicInfo: {
    name: string;
    accountNumber: string;
    dateRange: string;
    openingBalance: string;
    closingBalance: string;
  };
  overallFlow: {
    moneyIn: string;
    moneyOut: string;
  };
}

const AccountSummary = ({ basicInfo, overallFlow }: AccountSummaryProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Account Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-xs opacity-80">Name</p>
              <p className="font-medium">{basicInfo.name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Account Number</p>
              <p className="font-medium">{basicInfo.accountNumber}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Statement Period</p>
              <p className="font-medium">{basicInfo.dateRange}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/80 to-accent/80 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-xs opacity-80">Opening Balance</p>
              <p className="font-medium">{basicInfo.openingBalance}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Closing Balance</p>
              <p className="text-xl font-bold">{basicInfo.closingBalance}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Change</p>
              <p className="font-medium">
                {parseFloat(basicInfo.closingBalance.replace('₦', '')) > 
                 parseFloat(basicInfo.openingBalance.replace('₦', '')) ? '↑' : '↓'} 
                 ₦{Math.abs(
                   parseFloat(basicInfo.closingBalance.replace('₦', '')) - 
                   parseFloat(basicInfo.openingBalance.replace('₦', ''))
                 ).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center text-green-600">
            <ArrowUp className="mr-2 h-5 w-5" />
            Money In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-3xl font-bold">{overallFlow.moneyIn}</p>
            <p className="text-xs text-muted-foreground mt-1">Total deposits & credits during this period</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center text-red-600">
            <ArrowDown className="mr-2 h-5 w-5" />
            Money Out
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-3xl font-bold">{overallFlow.moneyOut}</p>
            <p className="text-xs text-muted-foreground mt-1">Total withdrawals & debits during this period</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSummary;
