
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
        <h1 className="text-3xl font-bold mb-2">Your Bank Statement Analysis</h1>
        <p className="text-muted-foreground">
          Here's a comprehensive analysis of your financial activity from {data?.statement_details?.statement_period_from} to  {data?.statement_details?.statement_period_to}.
        </p>
      </div>

      <AccountSummary 
        basicInfo={data?.statement_details} 
        overallFlow={data?.summary} 
      />

      <Tabs defaultValue="transaction-flow" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="transaction-flow">Transaction Flow</TabsTrigger>
          <TabsTrigger value="income">Income Sources</TabsTrigger>
          <TabsTrigger value="expenditures">Expenditures</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights & Advice</TabsTrigger>
        </TabsList>
        
        {/* <TabsContent value="transaction-flow">
          <TransactionFlow 
            income={data.overallAccountFlow.moneyIn} 
            expenses={data.overallAccountFlow.moneyOut}
            netFlow={data.dashboardMetrics.netFlow}
            dailySpending={data.dailySpendingData} 
          />
        </TabsContent>
        
        <TabsContent value="income">
          <IncomeBreakdown 
            regularTransfers={data.transactionAnalysis.incomeCredit.regularTransferFrom}
            internalCredits={data.transactionAnalysis.incomeCredit.internalOrCreditReversals} 
          />
        </TabsContent>
        
        <TabsContent value="expenditures">
          <ExpenditureBreakdown 
            transfersToIndividuals={data.transactionAnalysis.expendituresDebit.transferToIndividuals}
            businessPayments={data.transactionAnalysis.expendituresDebit.paymentsToBusinessesAndServices}
            billsAndUtilities={data.transactionAnalysis.expendituresDebit.billsAndUtilities}
            foodAndGroceries={data.transactionAnalysis.expendituresDebit.foodAndGroceries}
            transportation={data.transactionAnalysis.expendituresDebit.transportation}
            laundry={data.transactionAnalysis.expendituresDebit.laundry}
            upkeep={data.transactionAnalysis.expendituresDebit.upkeep}
            posExpenses={data.transactionAnalysis.expendituresDebit.posExpenses}
            webPayments={data.transactionAnalysis.expendituresDebit.webPayments}
            cashWithdrawals={data.transactionAnalysis.expendituresDebit.cashWithdrawals}
            miscellaneous={data.transactionAnalysis.expendituresDebit.miscellaneous}
            bankCharges={data.transactionAnalysis.expendituresDebit.bankCharges}
            otherPayments={data.transactionAnalysis.expendituresDebit.otherPayments}
          />
        </TabsContent>
        
        <TabsContent value="trends">
          <SpendingTrends 
            dailySpendingData={data.dailySpendingData}
            topSpendingCategories={data.dashboardMetrics.topSpendingCategories}
            topSpendingRecipients={data.dashboardMetrics.topSpendingRecipients}
          />
        </TabsContent>
        
        <TabsContent value="insights">
          <FinancialInsights advice={data.financialAdvice} />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default BankStatementAnalysis;
