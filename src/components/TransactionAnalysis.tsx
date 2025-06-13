import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Transaction } from '@/types';
import { Input } from '@/components/ui/input';
import { Copy, CreditCard } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from './ui/button';
import { useState } from 'react';

interface TransactionAnalysisProps {
  analysisReport: string;
}

const TransactionAnalysis = ({ analysisReport }: TransactionAnalysisProps) => {
   const [isCopy, setCopy] = useState(false)
    const handleCopy = () => {
      navigator.clipboard.writeText(analysisReport).then(() => {
        setCopy(true)
      })
    }
    function callAfterCopy(fn) {
      setTimeout(fn, 800)
    }
    callAfterCopy(() => {
      setCopy(undefined)
    }, )

  return (
    <Card className="animate-fade-in h-[600px] overflow-y-scroll">
      <CardHeader className='sticky top-0 bg-white'>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
               Analysis Report 
            </CardTitle>
            <CardDescription>Here’s a detailed overview of your data</CardDescription>
          </div>
          <div className='flex items-center gap-4'>
          <Button disabled={isCopy} onClick={handleCopy}>
            {isCopy ? "Copied" : <> Copy Markdown <Copy size={20}/></>}
          </Button>
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
