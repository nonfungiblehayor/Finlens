import { useState } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import ChatWithStatement from '@/components/ChatWithStatement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Analysis } from '@/types';
import DataVisualization from '@/components/DataVisualization';

const Index = () => {
  const [showNewUI, setShowNewUI] = useState(false); 
  const [analysis, setAnalysis] = useState<Analysis>()
  const [streamedText, setStreamedText] = useState('')
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
