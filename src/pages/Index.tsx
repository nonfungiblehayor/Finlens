
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import Dashboard from '@/components/Dashboard';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import FinancialAdvice from '@/components/FinancialAdvice';
import FinancialQuiz from '@/components/FinancialQuiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStatementAnalysis } from '@/utils/mockData';

const Index = () => {
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  return (
    <Layout>
      {!isAnalysisComplete ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="max-w-lg w-full px-4">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome to Wallet Wisdom</h1>
            <p className="text-center text-muted-foreground mb-10">
              Your AI-powered financial assistant to help you make smarter money decisions
            </p>
            <FileUpload onAnalysisComplete={() => setIsAnalysisComplete(true)} />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Financial Analysis</h1>
            <p className="text-muted-foreground">
              Here's what we found in your bank statement. Explore the different sections below.
            </p>
          </div>
          
          <Dashboard 
            accountSummary={mockStatementAnalysis.accountSummary} 
            categoryBreakdown={mockStatementAnalysis.categoryBreakdown} 
          />
          
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="advice">Financial Advice</TabsTrigger>
              <TabsTrigger value="quiz">Financial Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-6">
              <TransactionAnalysis transactions={mockStatementAnalysis.transactions} />
            </TabsContent>
            <TabsContent value="advice" className="mt-6">
              <FinancialAdvice insights={mockStatementAnalysis.insights} />
            </TabsContent>
            <TabsContent value="quiz" className="mt-6">
              <FinancialQuiz questions={mockStatementAnalysis.quizQuestions} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Layout>
  );
};

export default Index;
