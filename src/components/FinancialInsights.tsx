
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, TrendingUp, TrendingDown, Wallet, CreditCard } from 'lucide-react';

interface FinancialInsightsProps {
  advice: string[];
}

const FinancialInsights = ({ advice }: FinancialInsightsProps) => {
  // Group advice by importance/type
  const getInsightIcon = (index: number) => {
    // Alternate between different icons based on the index
    const icons = [
      <Info className="h-5 w-5 text-blue-500" />,
      <TrendingUp className="h-5 w-5 text-green-500" />,
      <TrendingDown className="h-5 w-5 text-red-500" />,
      <Wallet className="h-5 w-5 text-purple-500" />,
      <CreditCard className="h-5 w-5 text-orange-500" />
    ];
    
    return icons[index % icons.length];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
          <CardDescription>AI-powered analysis of your spending habits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {advice.map((item, index) => (
            <Alert 
              key={index} 
              className={index % 2 === 0 ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'}
            >
              <div className="flex gap-2">
                {getInsightIcon(index)}
                <AlertDescription className="mt-0">{item}</AlertDescription>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Steps to improve your financial health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Budget Creation
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your spending patterns, you should create a detailed budget that tracks your regular expenses and income.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Use the 50/30/20 rule: 50% for needs, 30% for wants, 20% for savings</li>
              <li>Track cash withdrawals more carefully as they represent a significant portion of your spending</li>
              <li>Consider automating your savings to prevent overspending</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
              Expense Management
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              There are several areas where you could optimize your spending:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Review your recurring bill payments (GOTV, internet) to ensure you're getting the best value</li>
              <li>Consider consolidating your small, frequent data purchases into larger bundles for better value</li>
              <li>Track transfers to individuals to ensure they're necessary and budgeted for</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-purple-500" />
              Savings Strategy
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your income and expenses are nearly equal, leaving little room for savings.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Aim to save at least 10-20% of your income each month</li>
              <li>Set up a separate savings account for emergency funds</li>
              <li>Review your monthly spending to identify non-essential expenses that can be reduced</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialInsights;
