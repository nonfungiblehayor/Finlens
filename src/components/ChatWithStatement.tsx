
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, Bot, User, Loader2, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useAskData } from '@/utils/ai-model';
import { ChatSkeleton } from './ui/chatskeleton';
import { Message } from '@/types';
import { useMessage } from '@/context/message';
import { callAfterCopy } from '@/utils/afterCopy';
import mixpanel from 'mixpanel-browser';

interface ChatWithStatementProps {
  fileId: string
}

const ChatWithStatement = ({ fileId }: ChatWithStatementProps) => {
  const { message, setMessage } = useMessage()
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample questions for general data analysis
  const sampleQuestions = [
    "What are the main patterns in my data?",
    "Can you summarize the key findings?",
    "What are the most important metrics?",
    "Are there any anomalies or outliers?",
    "What trends do you see over time?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
        mixpanel.track('ask question', {
          'ask_question': 'Question'
        })
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    setMessage(userMessage);
    setInput('');
    setIsLoading(true);
    generateResponse(input).finally(() => {
      setIsLoading(false);
    })
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };
  const [isCopy, setCopy] = useState<{id: number, state: boolean}>()
  callAfterCopy(() => {
    setCopy(undefined)
  }, )
  const copyMessage = (content: string, id: number) => {
      mixpanel.track('use data', {
        'use_data': 'copy response'
      })    
    navigator.clipboard.writeText(content).then(() => {
      setCopy({id: id, state: true})
    })
  }

  const generateResponse = async(userInput: string) => {
    const input = userInput.toLowerCase();
    try {
      const answer = await useAskData(fileId, input)
      const aiMessage: Message = {
        content: answer,
        isUser: false,
        timestamp: new Date()
      };
      setMessage(aiMessage); 
    } catch (error) {
      toast({
        title: "An Error occured",
        description: error,
      });
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Quick Questions</CardTitle>
        <CardDescription>
          Ask quick questions about your data for instant insights
        </CardDescription>
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

        {/* Sample questions */}
        {
          message?.length < 2 && (
            <div className="mb-4 flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={() => handleSampleQuestion(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
          )
        }

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 size={20} className="animate-spin" /> :  <SendIcon size={18} />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatWithStatement;
