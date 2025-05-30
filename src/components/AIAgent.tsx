
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, Bot, User, Loader2, Copy, Brain, BarChart3, MessageSquare, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useAskData, useVisualizeData } from '@/utils/ai-model';
import { ChatSkeleton } from './ui/chatskeleton';
import VisualizationResult from './VisualizationResult';
import { Message } from '@/types';
import { useMessage } from '@/context/message';

interface AIAgentProps {
  fileId: string;
}

const AIAgent = ({ fileId }: AIAgentProps) => {
  const { message, setMessage } = useMessage();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'analysis' | 'visualization' | 'general'>('general');
  const [visualizationResult, setVisualizationResult] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const agentCapabilities = [
    {
      icon: <Brain className="h-4 w-4" />,
      title: "Data Analysis",
      description: "Deep insights and statistical analysis of your data",
      mode: 'analysis' as const
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: "Visualization",
      description: "Create charts, graphs, and visual representations",
      mode: 'visualization' as const
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      title: "General Chat",
      description: "Ask any questions about your data",
      mode: 'general' as const
    }
  ];

  const suggestionsByMode = {
    analysis: [
      "What are the key trends in my data?",
      "Identify outliers and anomalies",
      "Calculate correlation between variables",
      "What insights can you derive from this dataset?"
    ],
    visualization: [
      "Create a bar chart of the top categories",
      "Show me a trend line over time",
      "Generate a pie chart of the distribution",
      "Create a heatmap of the data"
    ],
    general: [
      "Summarize my data in simple terms",
      "What questions should I be asking about this data?",
      "Help me understand what this data means",
      "What actions should I take based on this data?"
    ]
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    setMessage(userMessage);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      if (activeMode === 'visualization') {
        // Handle visualization requests
        const vizResult = await useVisualizeData(fileId, currentInput);
        setVisualizationResult(vizResult);
        
        const aiMessage: Message = {
          content: `I've created a visualization based on your request: "${currentInput}". You can see the result below.`,
          isUser: false,
          timestamp: new Date()
        };
        setMessage(aiMessage);
      } else {
        // Handle analysis and general chat
        const answer = await useAskData(fileId, currentInput);
        const aiMessage: Message = {
          content: answer,
          isUser: false,
          timestamp: new Date()
        };
        setMessage(aiMessage);
      }
    } catch (error) {
      toast({
        title: "An Error occurred",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const [isCopy, setCopy] = useState<{id: number, state: boolean}>();

  const copyMessage = (content: string, id: number) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopy({id: id, state: true});
      setTimeout(() => setCopy(undefined), 800);
    });
  };

  return (
    <div className="space-y-6">
      {/* Agent Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Agent Capabilities
          </CardTitle>
          <CardDescription>
            Choose how you want to interact with your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Agent Chat
              </CardTitle>
              <CardDescription>
                Currently in <Badge variant="outline">{activeMode}</Badge> mode
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          {/* Message history */}
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            {message.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`rounded-full p-1.5 ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {message.isUser ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div>
                    <div className={`rounded-lg px-3 py-2 ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <ReactMarkdown
                        children={message.content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSanitize]}
                      />
                    </div>
                    {!message.isUser && 
                      <Button onClick={() => copyMessage(message?.content, index)} className='bg-transparent hover:bg-transparent text-black'>
                        {isCopy?.id === index && isCopy ? "Copied" :  <Copy size={14} />}
                      </Button>
                    }
                  </div>
                </div>
              </div>
            ))}
            {isLoading && 
              <div className='flex items-center gap-x-2'> 
                <div className={`rounded-full p-1.5 bg-muted`}>
                  <Bot size={16} />
                </div>
                <ChatSkeleton /> 
              </div> 
            }
            <div ref={messagesEndRef} />
          </div>

          {/* Visualization Result */}
          {visualizationResult && (
            <div className="mb-4">
              <VisualizationResult 
                type={visualizationResult.chart_type ? 'chart' : 'table'} 
                data={visualizationResult} 
              />
            </div>
          )}

          {/* Suggestions */}
          {message?.length < 2 && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Suggested prompts for {activeMode} mode:</p>
              <div className="flex flex-wrap gap-2">
                {suggestionsByMode[activeMode].map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask me anything about your data in ${activeMode} mode...`}
              disabled={isLoading}
              className="flex-1 min-h-[60px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="self-end">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> :  <SendIcon size={18} />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgent;
