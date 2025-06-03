
import { useState } from 'react';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import TransactionAnalysis from '@/components/TransactionAnalysis';
import ChatWithStatement from '@/components/ChatWithStatement';
import DataVisualization from '@/components/DataVisualization';
import AIAgent from '@/components/AIAgent';
import { Analysis } from '@/types';
import { BarChart3, Bot, Brain, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [showNewUI, setShowNewUI] = useState(false); 
  const [analysis, setAnalysis] = useState<Analysis>()
  const [streamedText, setStreamedText] = useState('')
  const [activeMode, setActiveMode] = useState<'analysis' | 'visualization' | 'chat' | 'agent'>('analysis');
    const agentCapabilities = [
      {
        icon: <Brain className="h-4 w-4" />,
        title: "Data Analysis",
        description: "Deep insights and statistical analysis of your data",
        mode: 'analysis' as const
      },
      {
        icon: <MessageSquare className="h-4 w-4" />,
        title: "General Chat",
        description: "Ask any questions about your data",
        mode: 'chat' as const
      },
      {
        icon: <BarChart3 className="h-4 w-4" />,
        title: "Visualization",
        description: "Create charts, tables, and visual representations",
        mode: 'visualization' as const
      },
      {
        icon: <Bot className="h-4 w-4" />,
        title: "AI Agent",
        description: "Autonomously performs data analysis, generates visualizations, and answers queries about your data",
        mode: 'agent' as const
      }
    ];
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
              <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-4">
                  {agentCapabilities.map((capability) => (
                          <Card 
                            key={capability.mode}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              activeMode === capability.mode ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => setActiveMode(capability.mode)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${
                                  activeMode === capability.mode ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                }`}>
                                  {capability.icon}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{capability.title}</h3>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {capability.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                  ))}
              </div>
              {
                activeMode === "analysis" && (
                  <TransactionAnalysis analysisReport={streamedText} />
                )
              }
              {
                activeMode === "chat" && (
                  <ChatWithStatement fileId={analysis?.fileId} />
                )
              }
              {
                activeMode === "visualization" && (
                  <DataVisualization fileId={analysis?.fileId} />
                )
              }
              {
                activeMode === "agent" && (
                  <AIAgent fileId={analysis?.fileId} />
                )
              }
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
