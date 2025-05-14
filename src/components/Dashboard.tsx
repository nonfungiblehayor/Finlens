
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSummary, CategoryBreakdown } from '@/types';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend
} from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { 
  DollarSign, 
  CreditCard, 
  TrendingDown, 
  TrendingUp, 
  Wallet
} from 'lucide-react';

interface DashboardProps {
  accountSummary: AccountSummary;
  categoryBreakdown: CategoryBreakdown[];
}

const Dashboard = ({ accountSummary, categoryBreakdown }: DashboardProps) => {
  // Calculate savings rate
  const savingsRate = (accountSummary.savings / accountSummary.income) * 100;
  
  // Format date ranges
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const dateRange = `${formatDate(accountSummary.startDate)} - ${formatDate(accountSummary.endDate)}`;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Find top expense categories
  const topCategories = [...categoryBreakdown]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Prepare chart data
  const chartData = [
    { name: "Income", value: accountSummary.income, color: "#4ade80" },
    { name: "Expenses", value: accountSummary.expenses, color: "#f87171" },
    { name: "Savings", value: accountSummary.savings, color: "#60a5fa" },
  ];

  // Chart configuration for the recharts integration
  const chartConfig = {
    Income: { color: "#4ade80", label: "Income" },
    Expenses: { color: "#f87171", label: "Expenses" },
    Savings: { color: "#60a5fa", label: "Savings" }
  };

  // Sort categories by percentage for expense breakdown
  const sortedCategories = [...categoryBreakdown].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      <Card className="col-span-full lg:col-span-3 dashboard-gradient text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">Financial Summary</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            {dateRange}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center space-x-4">
            <Wallet className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(accountSummary.balance)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold">{formatCurrency(accountSummary.income)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TrendingDown className="h-8 w-8" />
            <div>
              <p className="text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold">{formatCurrency(accountSummary.expenses)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Income vs. Expenses</CardTitle>
          <CardDescription>Monthly breakdown of your financial flow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <RechartsPrimitive.ResponsiveContainer>
                <RechartsPrimitive.BarChart data={chartData}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip 
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
                            <div className="mt-1 text-sm">{formatCurrency(payload[0].value as number)}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <RechartsPrimitive.Bar dataKey="value" fill="#60a5fa">
                    {chartData.map((entry, index) => (
                      <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPrimitive.Bar>
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium">Savings Rate</p>
              <p className="text-sm font-medium">{savingsRate.toFixed(1)}%</p>
            </div>
            <Progress value={savingsRate} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {savingsRate >= 20 
                ? "Great job! You're saving a healthy portion of your income." 
                : "Aim to save at least 20% of your income for financial security."}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>Where your money goes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedCategories.map((category) => (
            <div key={category.category} className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{category.category}</p>
                <p className="text-sm">{formatCurrency(category.amount)}</p>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{category.percentage.toFixed(1)}% of expenses</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
