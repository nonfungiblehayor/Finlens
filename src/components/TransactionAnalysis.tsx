import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Transaction } from '@/types';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface TransactionAnalysisProps {
  analysisReport: string;
}

const TransactionAnalysis = ({ analysisReport }: TransactionAnalysisProps) => {


  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Transaction Analysis
            </CardTitle>
            <CardDescription>Track and filter your financial activities</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {analysisReport !== "" &&  <ReactMarkdown
          children={analysisReport}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        />}
      </CardContent>
    </Card>
  );
};

export default TransactionAnalysis;
