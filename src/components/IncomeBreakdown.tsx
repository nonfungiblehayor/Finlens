
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/formatters';

interface TransferDetail {
  date: string;
  amount: string;
  description: string;
}

interface RegularTransfer {
  source: string;
  totalAmount: string;
  count: number;
  details: TransferDetail[];
}

interface InternalCredit {
  source: string;
  totalAmount: string;
  count: number;
  details: TransferDetail[];
}

interface IncomeBreakdownProps {
  regularTransfers: RegularTransfer[];
  internalCredits: InternalCredit[];
}

const IncomeBreakdown = ({ regularTransfers, internalCredits }: IncomeBreakdownProps) => {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  // Prepare data for the pie chart
  const getChartData = () => {
    const allSources = [...regularTransfers, ...internalCredits].map(source => ({
      name: source.source,
      value: parseFloat(source.totalAmount.replace(/[₦,]/g, '')),
      color: getRandomColor(source.source)
    }));
    
    // Sort by value descending
    return allSources.sort((a, b) => b.value - a.value);
  };

  // Generate a color based on string
  const getRandomColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const chartData = getChartData();

  // Simplified source name for display
  const simplifySourceName = (source: string) => {
    const parts = source.split('/');
    return parts[0].trim();
  };

  const totalIncome = chartData.reduce((sum, item) => sum + item.value, 0);

  const chartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = { color: item.color, label: simplifySourceName(item.name) };
    return acc;
  }, {} as Record<string, { color: string, label: string }>);

  const formatPercentage = (value: number) => {
    return (value / totalIncome * 100).toFixed(1) + '%';
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
            <CardDescription>Breakdown of where your money comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.PieChart>
                    <RechartsPrimitive.Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label={(entry) => `${simplifySourceName(entry.name)} (${formatPercentage(entry.value)})`}
                    >
                      {chartData.map((entry, index) => (
                        <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPrimitive.Pie>
                    <RechartsPrimitive.Tooltip
                      formatter={(value: number) => [formatCurrency(value, '₦'), 'Amount']}
                    />
                  </RechartsPrimitive.PieChart>
                </RechartsPrimitive.ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Income Sources</CardTitle>
            <CardDescription>Your largest sources of income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.slice(0, 5).map((source, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{simplifySourceName(source.name)}</span>
                    <span className="text-sm">{formatCurrency(source.value, '₦')}</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: formatPercentage(source.value),
                        backgroundColor: source.color
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatPercentage(source.value)} of income</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="external">
            <TabsList className="mb-4">
              <TabsTrigger value="external">Regular Transfers</TabsTrigger>
              <TabsTrigger value="internal">Internal/System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="external">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularTransfers.map((transfer, index) => {
                    const amount = parseFloat(transfer.totalAmount.replace(/[₦,]/g, ''));
                    const avg = amount / transfer.count;
                    
                    return (
                      <TableRow 
                        key={index}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => setActiveSource(activeSource === transfer.source ? null : transfer.source)}
                      >
                        <TableCell>{transfer.source}</TableCell>
                        <TableCell>{transfer.totalAmount}</TableCell>
                        <TableCell>{transfer.count}</TableCell>
                        <TableCell>{formatCurrency(avg, '₦')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {activeSource && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">Transactions from: {activeSource}</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...regularTransfers, ...internalCredits]
                        .find(t => t.source === activeSource)?.details
                        .map((detail, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{detail.date}</TableCell>
                            <TableCell>{detail.amount}</TableCell>
                            <TableCell className="max-w-xs truncate">{detail.description}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="internal">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internalCredits.map((credit, index) => {
                    const amount = parseFloat(credit.totalAmount.replace(/[₦,]/g, ''));
                    const avg = amount / credit.count;
                    
                    return (
                      <TableRow 
                        key={index}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => setActiveSource(activeSource === credit.source ? null : credit.source)}
                      >
                        <TableCell>{credit.source}</TableCell>
                        <TableCell>{credit.totalAmount}</TableCell>
                        <TableCell>{credit.count}</TableCell>
                        <TableCell>{formatCurrency(avg, '₦')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {activeSource && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">Transactions from: {activeSource}</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...regularTransfers, ...internalCredits]
                        .find(t => t.source === activeSource)?.details
                        .map((detail, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{detail.date}</TableCell>
                            <TableCell>{detail.amount}</TableCell>
                            <TableCell className="max-w-xs truncate">{detail.description}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeBreakdown;
