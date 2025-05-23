
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSummary from '@/components/AccountSummary';
import TransactionFlow from '@/components/TransactionFlow';
import IncomeBreakdown from '@/components/IncomeBreakdown';
import ExpenditureBreakdown from '@/components/ExpenditureBreakdown';
import SpendingTrends from '@/components/SpendingTrends';
import FinancialInsights from '@/components/FinancialInsights';
import { BankStatement, dataSummary } from '@/types';

interface BankStatementAnalysisProps {
  data: dataSummary;
}

const BankStatementAnalysis = ({ data }: BankStatementAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">
          Here's a comprehensive overview of your financial activities from {data?.statement_details?.statement_period_from} to  {data?.statement_details?.statement_period_to}.
        </p>
      </div>
      <AccountSummary 
        basicInfo={data?.statement_details} 
        overallFlow={data?.summary} 
      />
    </div>
  );
};

export default BankStatementAnalysis;
