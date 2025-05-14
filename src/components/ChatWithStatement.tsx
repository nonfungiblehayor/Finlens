
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, Bot, User } from 'lucide-react';
import { BankStatementAnalysis } from '@/types';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWithStatementProps {
  statementData: BankStatementAnalysis;
}

const ChatWithStatement = ({ statementData }: ChatWithStatementProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your financial assistant. I've analyzed your bank statement and I'm ready to answer your questions about your finances. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample questions the user might want to ask
  const sampleQuestions = [
    "What was my highest expense last month?",
    "How much did I spend on dining out?",
    "What's my average daily spending?",
    "Where can I reduce my expenses?",
    "How much did I save this month?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle message submission
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      generateResponse(input);
      setIsLoading(false);
    }, 1500);
  };

  // Function to handle clicking a sample question
  const handleSampleQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };

  // Generate AI response based on user input
  const generateResponse = (userInput: string) => {
    // Simple keyword-based responses for demonstration
    const input = userInput.toLowerCase();
    let responseContent = '';

    // Very basic simulation of AI responses based on keywords
    if (input.includes('highest expense') || input.includes('biggest expense')) {
      const highestCategory = [...statementData.categoryBreakdown].sort((a, b) => b.amount - a.amount)[0];
      responseContent = `Your highest expense category was ${highestCategory.category} at $${highestCategory.amount.toFixed(2)}, which represents ${highestCategory.percentage.toFixed(1)}% of your total expenses.`;
    } else if (input.includes('dining') || input.includes('restaurants') || input.includes('food')) {
      const foodCategory = statementData.categoryBreakdown.find(c => c.category.toLowerCase().includes('food') || c.category.toLowerCase().includes('dining'));
      if (foodCategory) {
        responseContent = `You spent $${foodCategory.amount.toFixed(2)} on ${foodCategory.category}, which is ${foodCategory.percentage.toFixed(1)}% of your total expenses.`;
      } else {
        responseContent = `I couldn't find a specific food or dining category in your statement. Would you like me to look for specific restaurant transactions instead?`;
      }
    } else if (input.includes('average') && (input.includes('daily') || input.includes('per day'))) {
      const dailyAvg = statementData.accountSummary.expenses / 30; // Assuming 30 days
      responseContent = `Your average daily spending is approximately $${dailyAvg.toFixed(2)} based on this statement period.`;
    } else if (input.includes('reduce') || input.includes('cut') || input.includes('save money')) {
      const topCategories = [...statementData.categoryBreakdown].sort((a, b) => b.amount - a.amount).slice(0, 2);
      responseContent = `To reduce expenses, consider looking at your top spending categories: ${topCategories[0].category} ($${topCategories[0].amount.toFixed(2)}) and ${topCategories[1].category} ($${topCategories[1].amount.toFixed(2)}). Even a 10% reduction in these areas could save you $${((topCategories[0].amount + topCategories[1].amount) * 0.1).toFixed(2)} per month.`;
    } else if (input.includes('save') || input.includes('savings')) {
      const savingsRate = (statementData.accountSummary.savings / statementData.accountSummary.income) * 100;
      responseContent = `You saved $${statementData.accountSummary.savings.toFixed(2)} this period, which is ${savingsRate.toFixed(1)}% of your income. ${savingsRate >= 20 ? 'Great job maintaining a healthy savings rate!' : 'Financial experts typically recommend saving at least 20% of your income.'}`;
    } else {
      // Default response
      responseContent = `I'm not entirely sure about "${userInput}". Could you rephrase or try asking about your spending patterns, savings rate, or specific expense categories?`;
    }

    // Add AI response to messages
    const aiMessage: Message = {
      content: responseContent,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Ask About Your Finances</CardTitle>
        <CardDescription>
          Chat with our AI assistant about your bank statement
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {/* Message history */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map((message, index) => (
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
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Sample questions */}
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

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your finances..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendIcon size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatWithStatement;
