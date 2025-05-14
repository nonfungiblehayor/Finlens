
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { formatCurrency } from '@/utils/formatters';

interface TransactionFlowProps {
  income: string;
  expenses: string;
  netFlow: string;
  dailySpending: Array<{
    date: string;
    amount: number;
  }>;
}

const TransactionFlow = ({ income, expenses, netFlow, dailySpending }: TransactionFlowProps) => {
  // Format data for the transaction flow chart
  const transactionFlowData = [
    { name: "Money In", value: parseFloat(income.replace(/[₦,]/g, '')), color: "#4ade80" },
    { name: "Money Out", value: parseFloat(expenses.replace(/[₦,]/g, '')), color: "#f87171" }
  ];

  // Format data for the daily spending chart
  const dailySpendingFormatted = dailySpending.map(day => ({
    date: day.date,
    amount: day.amount
  }));

  // Sort by date
  dailySpendingFormatted.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('/'));
    const dateB = new Date(b.date.split('/').reverse().join('/'));
    return dateA.getTime() - dateB.getTime();
  });

  // Group by month for the chart
  const monthlySpending = dailySpendingFormatted.reduce((acc, item) => {
    const dateParts = item.date.split('/');
    const month = dateParts[1];
    const year = dateParts[2];
    const monthYear = `${month}/${year}`;
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    
    acc[monthYear] += item.amount;
    return acc;
  }, {} as Record<string, number>);

  const monthlySpendingData = Object.entries(monthlySpending).map(([monthYear, total]) => ({
    month: monthYear,
    amount: total
  }));

  // Chart configuration
  const flowChartConfig = {
    "Money In": { color: "#4ade80", label: "Money In" },
    "Money Out": { color: "#f87171", label: "Money Out" }
  };

  const dailyChartConfig = {
    amount: { color: "#60a5fa", label: "Amount" }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={flowChartConfig}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.BarChart data={transactionFlowData}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey="name" />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip 
                      formatter={(value: number) => formatCurrency(value, '₦')}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="flex items-center">
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: payload[0].payload.color }}
                                />
                                <span className="ml-2 font-medium">{payload[0].name}</span>
                              </div>
                              <div className="mt-1 text-sm">₦{(payload[0].value as number).toLocaleString()}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <RechartsPrimitive.Bar dataKey="value" fill="#60a5fa">
                      {transactionFlowData.map((entry, index) => (
                        <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPrimitive.Bar>
                  </RechartsPrimitive.BarChart>
                </RechartsPrimitive.ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium">Net Flow: <span className={parseFloat(netFlow.replace('₦', '')) >= 0 ? 'text-green-600' : 'text-red-600'}>
                {netFlow}
              </span></p>
              <p className="text-xs text-muted-foreground mt-1">
                {parseFloat(netFlow.replace('₦', '')) >= 0 
                  ? 'Your income exceeded your expenses during this period.' 
                  : 'Your expenses exceeded your income during this period.'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={dailyChartConfig}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.AreaChart data={monthlySpendingData}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey="month" />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip 
                      formatter={(value: number) => formatCurrency(value, '₦')}
                    />
                    <RechartsPrimitive.Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#60a5fa" 
                      fill="#60a5fa" 
                      fillOpacity={0.3}
                    />
                  </RechartsPrimitive.AreaChart>
                </RechartsPrimitive.ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4">
              <p className="text-sm text-center text-muted-foreground">
                This chart shows your spending patterns over time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionFlow;
