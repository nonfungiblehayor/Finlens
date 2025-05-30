
import { useState } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import ChatWithStatement from '@/components/ChatWithStatement';
import DataVisualization from '@/components/DataVisualization';
import AIAgent from '@/components/AIAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Analysis } from '@/types';

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
              An AI agent for every dataset—get answers, generate visualizations, and drive smarter decisions across all your data.
            </p>
            <FileUpload onAnalysisComplete={setAnalysis} setStreamedText={setStreamedText} streamedText={streamedText}/>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Data Analysis</h1>
              <p className="text-muted-foreground">
                Here's what we found in your data. Explore the different sections below.
              </p>
            </div>
            <button
              onClick={() => setStreamedText("")}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
             Upload a new file
            </button>
          </div>
          
          {showNewUI ? (
           " <BankStatementAnalysis data={sampleBankStatementData} />"
          ) : (
            <>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 justify-items-center">
                  <TabsTrigger value="overview">Data Overview</TabsTrigger>
                  <TabsTrigger value="chat">Ask Questions</TabsTrigger>
                  <TabsTrigger value="visuals">Data Visualization</TabsTrigger>
                  <TabsTrigger value="agent">AI Agent</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                  <TransactionAnalysis analysisReport={streamedText} />
                </TabsContent>
                <TabsContent value="chat" className="mt-6">
                  <ChatWithStatement fileId={analysis?.fileId} />
                </TabsContent>
                <TabsContent value="visuals" className="mt-6">
                  <DataVisualization fileId={analysis?.fileId} />
                </TabsContent>
                <TabsContent value="agent" className="mt-6">
                  <AIAgent fileId={analysis?.fileId} />
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
