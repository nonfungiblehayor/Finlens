
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Wallet, CreditCard } from 'lucide-react';

interface AccountSummaryProps {
  basicInfo: {
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    statement_period_from: string,
    statement_period_to: string,
    opening_balance: number,
    closing_balance: number,
    currency: string
  };
  overallFlow: {
    total_money_in: number,
    total_money_out: number
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
              <p className="font-medium">{basicInfo?.account_holder_name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Bank</p>
              <p className="font-medium">{basicInfo?.bank_name}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Account Number</p>
              <p className="font-medium">{basicInfo?.account_number}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Statement Period</p>
              <p className="font-medium">{basicInfo?.statement_period_from} - {basicInfo?.statement_period_to}</p>
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
              <p className="font-medium">{basicInfo?.opening_balance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Closing Balance</p>
              <p className="text-xl font-bold">{basicInfo?.closing_balance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Change</p>
              <p className="font-medium">
                {basicInfo?.closing_balance > 
                 basicInfo?.opening_balance ? '↑' : '↓'} 
                 ₦{Math.abs(
                   (basicInfo?.closing_balance) - 
                   (basicInfo?.opening_balance)
                 ).toFixed(2).toLocaleString()}
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
            <p className="text-3xl font-bold">{overallFlow?.total_money_in.toLocaleString()}</p>
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
            <p className="text-3xl font-bold">{overallFlow?.total_money_out.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Total withdrawals & debits during this period</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSummary;
