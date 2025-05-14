
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface DailySpending {
  date: string;
  amount: number;
}

interface SpendingCategory {
  category: string;
  amount: string;
}

interface SpendingRecipient {
  recipient: string;
  amount: string;
}

interface SpendingTrendsProps {
  dailySpendingData: DailySpending[];
  topSpendingCategories: SpendingCategory[];
  topSpendingRecipients: SpendingRecipient[];
}

const SpendingTrends = ({
  dailySpendingData,
  topSpendingCategories,
  topSpendingRecipients
}: SpendingTrendsProps) => {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${month}/${day}/${year}`;
  };

  // Sort data by date
  const sortedData = [...dailySpendingData].sort((a, b) => {
    const dateA = new Date(formatDate(a.date));
    const dateB = new Date(formatDate(b.date));
    return dateA.getTime() - dateB.getTime();
  });

  // Group data by month
  const monthlyData = sortedData.reduce((acc, item) => {
    const date = new Date(formatDate(item.date));
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: monthYear,
        total: 0,
        count: 0,
        days: []
      };
    }
    
    acc[monthYear].total += item.amount;
    acc[monthYear].count += 1;
    acc[monthYear].days.push(item);
    
    return acc;
  }, {} as Record<string, { month: string, total: number, count: number, days: DailySpending[] }>);

  // Convert to array and calculate averages
  const monthlyChartData = Object.values(monthlyData).map(month => ({
    name: month.month,
    total: month.total,
    average: month.total / month.count
  }));

  // Calculate spending trends
  const calculateTrend = () => {
    if (monthlyChartData.length < 2) return { trend: 0, message: "Insufficient data for trend analysis" };
    
    const firstMonth = monthlyChartData[0].total;
    const lastMonth = monthlyChartData[monthlyChartData.length - 1].total;
    
    const trend = ((lastMonth - firstMonth) / firstMonth) * 100;
    let message = "";
    
    if (trend > 15) {
      message = "Your spending has increased significantly. Review your expenses to identify areas for potential savings.";
    } else if (trend > 5) {
      message = "Your spending has slightly increased. Monitor your expenses to maintain financial control.";
    } else if (trend < -15) {
      message = "Your spending has decreased significantly. Great job managing your expenses!";
    } else if (trend < -5) {
      message = "Your spending has slightly decreased. Keep up the good work!";
    } else {
      message = "Your spending remains relatively stable.";
    }
    
    return { trend, message };
  };

  const trend = calculateTrend();

  // Find high spending days
  const highSpendingDays = sortedData
    .filter(day => day.amount > 50000) // Threshold for high spending (50,000 naira)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Chart configurations
  const monthlyChartConfig = {
    total: { color: "#f97316", label: "Total Spending" },
    average: { color: "#60a5fa", label: "Daily Average" }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trends</CardTitle>
            <CardDescription>How your spending changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={monthlyChartConfig}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.BarChart data={monthlyChartData}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey="name" />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip 
                      formatter={(value: number) => formatCurrency(value, '₦')}
                    />
                    <RechartsPrimitive.Legend />
                    <RechartsPrimitive.Bar dataKey="total" fill="#f97316" name="Total Spending" />
                    <RechartsPrimitive.Bar dataKey="average" fill="#60a5fa" name="Daily Average" />
                  </RechartsPrimitive.BarChart>
                </RechartsPrimitive.ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              {trend.trend > 0 ? (
                <ArrowUp className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-green-500" />
              )}
              <p className={`text-sm font-medium ${trend.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(trend.trend).toFixed(1)}% {trend.trend > 0 ? 'increase' : 'decrease'} in spending
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{trend.message}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Spending Pattern</CardTitle>
            <CardDescription>Your spending fluctuation by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={{ amount: { color: "#8b5cf6", label: "Spending" }}}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.LineChart data={sortedData.slice(-30)}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis 
                      dataKey="date"
                      tick={{fontSize: 12}}
                      tickFormatter={(value) => {
                        const parts = value.split('/');
                        return `${parts[0]}/${parts[1]}`;
                      }} 
                    />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip 
                      formatter={(value: number) => formatCurrency(value, '₦')}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <RechartsPrimitive.Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8b5cf6" 
                      name="Spending"
                      activeDot={{ r: 6 }}
                    />
                  </RechartsPrimitive.LineChart>
                </RechartsPrimitive.ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Highest Spending Days</h4>
              <div className="space-y-2">
                {highSpendingDays.map((day, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{day.date}</span>
                    <span className="font-medium">{formatCurrency(day.amount, '₦')}</span>
                  </div>
                ))}
                
                {highSpendingDays.length === 0 && (
                  <p className="text-sm text-muted-foreground">No unusually high spending days found.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
            <CardDescription>Where your money goes most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topSpendingCategories.map((category, index) => {
                // Parse amount for visualization
                const amount = parseFloat(category.amount.replace(/[₦,]/g, ''));
                // Calculate relative width for bar (assuming the highest amount is 100%)
                const maxAmount = Math.max(
                  ...topSpendingCategories.map(cat => parseFloat(cat.amount.replace(/[₦,]/g, '')))
                );
                const width = (amount / maxAmount) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{category.category}</span>
                      <span className="text-sm">{category.amount}</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Recipients</CardTitle>
            <CardDescription>Who receives your money the most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topSpendingRecipients.map((recipient, index) => {
                // Parse amount for visualization
                const amount = parseFloat(recipient.amount.replace(/[₦,]/g, ''));
                // Calculate relative width for bar (assuming the highest amount is 100%)
                const maxAmount = Math.max(
                  ...topSpendingRecipients.map(rec => parseFloat(rec.amount.replace(/[₦,]/g, '')))
                );
                const width = (amount / maxAmount) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{recipient.recipient}</span>
                      <span className="text-sm">{recipient.amount}</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-secondary to-accent"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpendingTrends;
