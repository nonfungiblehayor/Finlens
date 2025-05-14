import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/formatters';

interface TransactionDetail {
  date: string;
  amount: string;
  description: string;
}

interface CategorySpending {
  type?: string;
  recipient?: string;
  recipientOrService?: string;
  totalAmount: string;
  count: number;
  details: TransactionDetail[];
}

interface ExpenditureBreakdownProps {
  transfersToIndividuals: CategorySpending[];
  businessPayments: CategorySpending[];
  billsAndUtilities: CategorySpending[];
  foodAndGroceries: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  transportation: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  laundry: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  upkeep: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  posExpenses: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  webPayments: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  cashWithdrawals: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  miscellaneous: {
    totalAmount: string;
    count: number;
    details: TransactionDetail[];
  };
  bankCharges: CategorySpending[];
  otherPayments: CategorySpending[];
}

const ExpenditureBreakdown = ({
  transfersToIndividuals,
  businessPayments,
  billsAndUtilities,
  foodAndGroceries,
  transportation,
  laundry,
  upkeep,
  posExpenses,
  webPayments,
  cashWithdrawals,
  miscellaneous,
  bankCharges,
  otherPayments
}: ExpenditureBreakdownProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<CategorySpending | null>(null);

  // Calculate category totals
  const calculateTotal = (items: CategorySpending[]) => {
    return items.reduce((acc, item) => {
      return acc + parseFloat(item.totalAmount.replace(/[₦,]/g, ''));
    }, 0);
  };

  const transfersTotal = calculateTotal(transfersToIndividuals);
  const businessTotal = calculateTotal(businessPayments);
  const billsTotal = calculateTotal(billsAndUtilities);
  const foodTotal = parseFloat(foodAndGroceries.totalAmount.replace(/[₦,]/g, ''));
  const transportationTotal = parseFloat(transportation.totalAmount.replace(/[₦,]/g, ''));
  const laundryTotal = parseFloat(laundry.totalAmount.replace(/[₦,]/g, ''));
  const upkeepTotal = parseFloat(upkeep.totalAmount.replace(/[₦,]/g, ''));
  const posTotal = parseFloat(posExpenses.totalAmount.replace(/[₦,]/g, ''));
  const webTotal = parseFloat(webPayments.totalAmount.replace(/[₦,]/g, ''));
  const cashTotal = parseFloat(cashWithdrawals.totalAmount.replace(/[₦,]/g, ''));
  const miscTotal = parseFloat(miscellaneous.totalAmount.replace(/[₦,]/g, ''));
  const bankChargesTotal = calculateTotal(bankCharges);
  const otherPaymentsTotal = calculateTotal(otherPayments);

  const categoryTotals = [
    { name: "Transfers to Individuals", value: transfersTotal, color: "#60a5fa" },
    { name: "Business & Services", value: businessTotal, color: "#f97316" },
    { name: "Bills & Utilities", value: billsTotal, color: "#8b5cf6" },
    { name: "Food & Groceries", value: foodTotal, color: "#84cc16" },
    { name: "Transportation", value: transportationTotal, color: "#06b6d4" },
    { name: "Laundry", value: laundryTotal, color: "#14b8a6" },
    { name: "Upkeep", value: upkeepTotal, color: "#a3e635" },
    { name: "POS Expenses", value: posTotal, color: "#eab308" },
    { name: "Web Payments", value: webTotal, color: "#ec4899" },
    { name: "Cash Withdrawals", value: cashTotal, color: "#ef4444" },
    { name: "Miscellaneous", value: miscTotal, color: "#a855f7" },
    { name: "Bank Charges", value: bankChargesTotal, color: "#6b7280" },
    { name: "Other Payments", value: otherPaymentsTotal, color: "#64748b" }
  ].filter(cat => cat.value > 0).sort((a, b) => b.value - a.value);
  
  const totalExpenditure = categoryTotals.reduce((sum, item) => sum + item.value, 0);

  const chartConfig = categoryTotals.reduce((acc, item) => {
    acc[item.name] = { color: item.color, label: item.name };
    return acc;
  }, {} as Record<string, { color: string, label: string }>);

  const formatPercentage = (value: number) => {
    return (value / totalExpenditure * 100).toFixed(1) + '%';
  };

  const getDetailsTable = (item: CategorySpending | null) => {
    if (!item) return null;
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Transaction Details</h4>
        <div className="max-h-[300px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.details.map((detail, idx) => (
                <TableRow key={idx}>
                  <TableCell>{detail.date}</TableCell>
                  <TableCell>{detail.amount}</TableCell>
                  <TableCell className="max-w-xs truncate">{detail.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Expenditure Categories</CardTitle>
            <CardDescription>How you spent your money</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig}>
                <RechartsPrimitive.ResponsiveContainer>
                  <RechartsPrimitive.PieChart>
                    <RechartsPrimitive.Pie
                      data={categoryTotals}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label={(entry) => `${entry.name.split(" ")[0]} (${formatPercentage(entry.value)})`}
                    >
                      {categoryTotals.map((entry, index) => (
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
            <CardTitle>Top Spending Categories</CardTitle>
            <CardDescription>Where most of your money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTotals.slice(0, 5).map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm">{formatCurrency(category.value, '₦')}</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: formatPercentage(category.value),
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatPercentage(category.value)} of expenses
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Expenditure</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transfers" onValueChange={(value) => {
            setActiveCategory(value);
            setActiveItem(null);
          }}>
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
              <TabsTrigger value="businesses">Businesses</TabsTrigger>
              <TabsTrigger value="bills">Bills & Utilities</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="transport">Transportation</TabsTrigger>
              <TabsTrigger value="cash">Cash Withdrawals</TabsTrigger>
              <TabsTrigger value="other">Other Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transfers">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfersToIndividuals.map((transfer, index) => {
                    const amount = parseFloat(transfer.totalAmount.replace(/[₦,]/g, ''));
                    const avg = amount / transfer.count;
                    
                    return (
                      <TableRow 
                        key={index}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => setActiveItem(transfer)}
                      >
                        <TableCell>{transfer.recipient}</TableCell>
                        <TableCell>{transfer.totalAmount}</TableCell>
                        <TableCell>{transfer.count}</TableCell>
                        <TableCell>{formatCurrency(avg, '₦')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              
              {getDetailsTable(activeItem)}
            </TabsContent>
            
            <TabsContent value="businesses">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business/Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessPayments.map((payment, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => setActiveItem(payment)}
                    >
                      <TableCell>{payment.recipientOrService}</TableCell>
                      <TableCell>{payment.totalAmount}</TableCell>
                      <TableCell>{payment.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {getDetailsTable(activeItem)}
            </TabsContent>
            
            <TabsContent value="bills">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billsAndUtilities.map((bill, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => setActiveItem(bill)}
                    >
                      <TableCell>{bill.type}</TableCell>
                      <TableCell>{bill.totalAmount}</TableCell>
                      <TableCell>{bill.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {getDetailsTable(activeItem)}
            </TabsContent>
            
            <TabsContent value="food">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Food & Groceries</h3>
                  <p className="text-muted-foreground">Total: {foodAndGroceries.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm">Transactions: {foodAndGroceries.count}</p>
                  <p className="text-sm">Average: {formatCurrency(parseFloat(foodAndGroceries.totalAmount.replace(/[₦,]/g, '')) / foodAndGroceries.count, '₦')}</p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodAndGroceries.details.map((detail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{detail.date}</TableCell>
                      <TableCell>{detail.amount}</TableCell>
                      <TableCell>{detail.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="transport">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Transportation</h3>
                  <p className="text-muted-foreground">Total: {transportation.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm">Transactions: {transportation.count}</p>
                  <p className="text-sm">Average: {formatCurrency(parseFloat(transportation.totalAmount.replace(/[₦,]/g, '')) / transportation.count, '₦')}</p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transportation.details.map((detail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{detail.date}</TableCell>
                      <TableCell>{detail.amount}</TableCell>
                      <TableCell>{detail.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="cash">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Cash Withdrawals</h3>
                  <p className="text-muted-foreground">Total: {cashWithdrawals.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm">Transactions: {cashWithdrawals.count}</p>
                  <p className="text-sm">Average: {formatCurrency(parseFloat(cashWithdrawals.totalAmount.replace(/[₦,]/g, '')) / cashWithdrawals.count, '₦')}</p>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashWithdrawals.details.map((detail, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{detail.date}</TableCell>
                      <TableCell>{detail.amount}</TableCell>
                      <TableCell>{detail.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="other">
              <Tabs defaultValue="misc">
                <TabsList className="mb-4">
                  <TabsTrigger value="misc">Miscellaneous</TabsTrigger>
                  <TabsTrigger value="laundry">Laundry</TabsTrigger>
                  <TabsTrigger value="pos">POS Expenses</TabsTrigger>
                  <TabsTrigger value="web">Web Payments</TabsTrigger>
                  <TabsTrigger value="bank">Bank Charges</TabsTrigger>
                  <TabsTrigger value="other-payments">Other Payments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="misc">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Miscellaneous</h3>
                      <p className="text-muted-foreground">Total: {miscellaneous.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm">Transactions: {miscellaneous.count}</p>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {miscellaneous.details.map((detail, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{detail.date}</TableCell>
                          <TableCell>{detail.amount}</TableCell>
                          <TableCell>{detail.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Similar pattern for other tabs */}
                <TabsContent value="laundry">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Laundry</h3>
                      <p className="text-muted-foreground">Total: {laundry.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm">Transactions: {laundry.count}</p>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {laundry.details.map((detail, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{detail.date}</TableCell>
                          <TableCell>{detail.amount}</TableCell>
                          <TableCell>{detail.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                {/* Other tabs follow similar pattern */}
                <TabsContent value="pos">
                  {/* POS Expenses table */}
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">POS Expenses</h3>
                      <p className="text-muted-foreground">Total: {posExpenses.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm">Transactions: {posExpenses.count}</p>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posExpenses.details.map((detail, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{detail.date}</TableCell>
                          <TableCell>{detail.amount}</TableCell>
                          <TableCell>{detail.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="web">
                  {/* Web Payments table */}
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Web Payments</h3>
                      <p className="text-muted-foreground">Total: {webPayments.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm">Transactions: {webPayments.count}</p>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webPayments.details.map((detail, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{detail.date}</TableCell>
                          <TableCell>{detail.amount}</TableCell>
                          <TableCell>{detail.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="bank">
                  {/* Bank Charges table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankCharges.map((charge, index) => (
                        <TableRow 
                          key={index}
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => setActiveItem(charge)}
                        >
                          <TableCell>{charge.type}</TableCell>
                          <TableCell>{charge.totalAmount}</TableCell>
                          <TableCell>{charge.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {getDetailsTable(activeItem)}
                </TabsContent>
                
                <TabsContent value="other-payments">
                  {/* Other Payments table */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Transactions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otherPayments.map((payment, index) => (
                        <TableRow 
                          key={index}
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => setActiveItem(payment)}
                        >
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.totalAmount}</TableCell>
                          <TableCell>{payment.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {getDetailsTable(activeItem)}
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenditureBreakdown;
