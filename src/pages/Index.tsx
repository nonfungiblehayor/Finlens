import { useState } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import ChatWithStatement from '@/components/ChatWithStatement';
import BankStatementAnalysis from '@/components/BankStatementAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockStatementAnalysis } from '@/utils/mockData';
import { Analysis } from '@/types';
import DataVisualization from '@/components/DataVisualization';

// Sample bank statement data
const sampleBankStatementData = {
  basicAccountInfo: {
    name: "IBRAHIM AYODEJI IBRAHIM",
    accountNumber: "2007132656",
    dateRange: "01/01/2025 - 14/05/2025",
    openingBalance: "₦2.14",
    closingBalance: "₦20.14"
  },
  overallAccountFlow: {
    moneyIn: "₦2,279,594.00",
    moneyOut: "₦2,279,576.00"
  },
  // All the rest of the data from the provided JSON structure
  transactionAnalysis: {
    // ... This would be populated with the full data structure
    incomeCredit: {
      regularTransferFrom: [],
      internalOrCreditReversals: []
    },
    expendituresDebit: {
      transferToIndividuals: [],
      paymentsToBusinessesAndServices: [],
      billsAndUtilities: [],
      foodAndGroceries: { totalAmount: "₦0", count: 0, details: [] },
      transportation: { totalAmount: "₦0", count: 0, details: [] },
      laundry: { totalAmount: "₦0", count: 0, details: [] },
      upkeep: { totalAmount: "₦0", count: 0, details: [] },
      posExpenses: { totalAmount: "₦0", count: 0, details: [] },
      webPayments: { totalAmount: "₦0", count: 0, details: [] },
      cashWithdrawals: { totalAmount: "₦0", count: 0, details: [] },
      miscellaneous: { totalAmount: "₦0", count: 0, details: [] },
      bankCharges: [],
      otherPayments: []
    }
  },
  dailySpendingData: [],
  financialAdvice: [
    "Your spending is quite high and varied, covering numerous categories and recipients.",
    "A significant portion of your outflow is categorized as 'Expenses Withdrawal' or 'Muzammil Withdrawal'."
  ],
  dashboardMetrics: {
    totalIncome: "₦2,279,594.00",
    totalExpenses: "₦2,279,576.00",
    netFlow: "₦18.00",
    topIncomeSources: [
      {source: "Muzammil Ismail / Polaris Bank", amount: "₦380,000.00"},
      {source: "Ibrahim Ayodeji Ibrahim / Jaiz Bank", amount: "₦450,200.00"}
    ],
    topSpendingCategories: [
      {category: "Cash Withdrawals", amount: "₦197,240.00"},
      {category: "Payments to Businesses and Services", amount: "₦120,914.00"}
    ],
    topSpendingRecipients: [
      {recipient: "Ibrahim Ayodeji (Self/Linked)", amount: "₦16,320.00"},
      {recipient: "Muhammadbello Tosho Ibrahim", amount: "₦31,000.00"}
    ]
  }
};

const Index = () => {
  const [showNewUI, setShowNewUI] = useState(false); // Toggle between new and old UI
  const [analysis, setAnalysis] = useState<Analysis>()
  const [streamedText, setStreamedText] = useState('HHellow')
  return (
    <Layout>
      {!streamedText ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <div className="max-w-lg w-full px-4">
            <h1 className="text-3xl font-bold text-center mb-2">Welcome to Finlens</h1>
            <p className="text-center text-muted-foreground mb-10">
              Your AI-powered financial data analyst to help you make smarter money decisions
            </p>
            <FileUpload onAnalysisComplete={setAnalysis} setStreamedText={setStreamedText} streamedText={streamedText}/>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Financial Analysis</h1>
              <p className="text-muted-foreground">
                Here's what we found in your financial data. Explore the different sections below.
              </p>
            </div>
            <button
              onClick={() => setShowNewUI(!showNewUI)}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Switch to {showNewUI ? 'Classic' : 'Enhanced'} View
            </button>
          </div>
          
          {showNewUI ? (
           " <BankStatementAnalysis data={sampleBankStatementData} />"
          ) : (
            <>
              {/* <Dashboard 
                accountSummary={mockStatementAnalysis.accountSummary} 
                categoryBreakdown={mockStatementAnalysis.categoryBreakdown} 
              /> */}
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="grid w-full grid-cols-3 justify-items-center">
                  <TabsTrigger value="transactions">Account overview</TabsTrigger>
                  <TabsTrigger value="chat">Ask Questions</TabsTrigger>
                  <TabsTrigger value="visuals">Data Visualization</TabsTrigger>
                </TabsList>
                <TabsContent value="transactions" className="mt-6">
                  <TransactionAnalysis analysisReport={streamedText} />
                </TabsContent>
                <TabsContent value="chat" className="mt-6">
                  <ChatWithStatement fileId={analysis?.fileId} />
                </TabsContent>
                <TabsContent value="visuals" className="mt-6">
                  <DataVisualization fileId={analysis?.fileId} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
