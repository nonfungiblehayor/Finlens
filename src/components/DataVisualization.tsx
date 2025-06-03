import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVisualizeData } from '@/utils/ai-model';
import { Loader2, ChartBar, Table } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import VisualizationResult from './VisualizationResult';
import { PageSkeleton } from './ui/chatskeleton';
import { chartType } from '@/types';

interface requiredProps {
  fileId: string
}

const DataVisualization = ({ fileId }: requiredProps) => {
  const [visualizationPrompt, setVisualizationPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [visualizationResult, setVisualizationResult] = useState<{data: string | chartType, type: 'chart' | 'table' | null}>(null)
  const generateVisualization = async () => {
    if (!visualizationPrompt.trim()) return;
    setIsGenerating(true)
    useVisualizeData(fileId, visualizationPrompt).then((res) => {
      console.log(res)
      setVisualizationResult({data: res, type: res?.type})
    }).catch((error) => {
      console.log(error)
      toast.error("An error occured try again later")
    }).finally(() => {
      setIsGenerating(false)
    })
  };
  const visualizationExample = [
    "Create a bar chart to illustrate my top 5 income sources",
    "Show a table for all my credit transactions",
    "Create a table to show all my debit transactions",
    "Use a bar chart to visualize my monthly expenses by category"
  ]
  const testWithExample = (content: string) => {
    setVisualizationPrompt(content)
  }
  return (
    <>
    {
       (
        <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl font-bold">Data Visualization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start justify-start space-y-8 w-full">
        <div className="bg-muted/50 w-6/12 self-center p-4 h-full rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Describe how you would like to visualize your data. For example:
            </p>
            <div className='flex flex-wrap gap-2 mb-4'>
            {visualizationExample.map((example, index) => (
              <Button key={index}
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => testWithExample(example)}
              >{example}</Button>
            ))}
            </div>
            <div className="space-y-3">
              <Textarea 
                placeholder="Describe the visualization you want..."
                value={visualizationPrompt}
                onChange={(e) => setVisualizationPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button 
                onClick={generateVisualization} 
                disabled={!visualizationPrompt.trim() || isGenerating}
                className="w-full"
              >
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                  <>
                    {visualizationResult?.type === 'chart' || !visualizationResult?.type ? 
                      <ChartBar className="mr-2 h-4 w-4" /> : 
                      <Table className="mr-2 h-4 w-4" />
                    }
                    Generate Visualization
                  </>
                )}
              </Button>
            </div>
          </div>
        {isGenerating ? (
            <div className="flex justify-center self-center items-center w-6/12">
              <PageSkeleton />
            </div>
          ) : visualizationResult ? (
            <VisualizationResult 
              type={visualizationResult?.type} 
              data={visualizationResult?.data} 
            />
          ) : null}
        </CardContent>
      </Card> 
      )
    }
    </>
  );
};
export default DataVisualization;
// setTimeout(() => {
//   // This is a mock response - in a real implementation, this would come from the API
//   // Based on the prompt, determine if it's likely a chart or table request
//   const isChartRequest = visualizationPrompt.toLowerCase().includes('chart') || 
//                         visualizationPrompt.toLowerCase().includes('graph') ||
//                         visualizationPrompt.toLowerCase().includes('plot');
  
//   if (isChartRequest) {
//     // Sample chart data
//     setVisualizationType('chart');
//     setVisualizationResult({
//       type: 'bar',
//       data: [
//         { name: 'January', income: 4000, expenses: 3500 },
//         { name: 'February', income: 5000, expenses: 4500 },
//         { name: 'March', income: 3000, expenses: 2800 },
//         { name: 'April', income: 6000, expenses: 5500 },
//         { name: 'May', income: 4500, expenses: 4000 },
//       ],
//       xKey: 'name',
//       yKeys: ['income', 'expenses'],
//       colors: ['#4ade80', '#f87171']
//     });
//   } else {
//     // Sample table data
//     setVisualizationType('table');
//     setVisualizationResult({
//       columns: ['Category', 'Amount', 'Percentage'],
//       data: [
//         { Category: 'Food & Groceries', Amount: '₦44,370.00', Percentage: '19.5%' },
//         { Category: 'Transportation', Amount: '₦33,000.00', Percentage: '14.5%' },
//         { Category: 'Bills & Utilities', Amount: '₦120,760.00', Percentage: '53.0%' },
//         { Category: 'Miscellaneous', Amount: '₦29,370.00', Percentage: '13.0%' }
//       ]
//     });
//   }
  
//   setIsGenerating(false);
// }, 2000);
