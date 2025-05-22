
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVisualizeData } from '@/utils/ai-model';
import BankStatementAnalysis from './BankStatementAnalysis';
import { dataSummary } from '@/types';
import { Loader2, ChartBar, Table } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import VisualizationResult from './VisualizationResult';

interface requiredProps {
  fileId: string
}

const DataVisualization = ({ fileId }: requiredProps) => {
  const [report, setReport] = useState<dataSummary>();
  const [visualizationPrompt, setVisualizationPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [visualizationResult, setVisualizationResult] = useState<any>(null);
  const [visualizationType, setVisualizationType] = useState<'chart' | 'table' | null>(null);

  // This would be replaced with actual API call in production
  const generateVisualization = async () => {
    if (!visualizationPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is a mock response - in a real implementation, this would come from the API
      // Based on the prompt, determine if it's likely a chart or table request
      const isChartRequest = visualizationPrompt.toLowerCase().includes('chart') || 
                            visualizationPrompt.toLowerCase().includes('graph') ||
                            visualizationPrompt.toLowerCase().includes('plot');
      
      if (isChartRequest) {
        // Sample chart data
        setVisualizationType('chart');
        setVisualizationResult({
          type: 'bar',
          data: [
            { name: 'January', income: 4000, expenses: 3500 },
            { name: 'February', income: 5000, expenses: 4500 },
            { name: 'March', income: 3000, expenses: 2800 },
            { name: 'April', income: 6000, expenses: 5500 },
            { name: 'May', income: 4500, expenses: 4000 },
          ],
          xKey: 'name',
          yKeys: ['income', 'expenses'],
          colors: ['#4ade80', '#f87171']
        });
      } else {
        // Sample table data
        setVisualizationType('table');
        setVisualizationResult({
          columns: ['Category', 'Amount', 'Percentage'],
          data: [
            { Category: 'Food & Groceries', Amount: '₦44,370.00', Percentage: '19.5%' },
            { Category: 'Transportation', Amount: '₦33,000.00', Percentage: '14.5%' },
            { Category: 'Bills & Utilities', Amount: '₦120,760.00', Percentage: '53.0%' },
            { Category: 'Miscellaneous', Amount: '₦29,370.00', Percentage: '13.0%' }
          ]
        });
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  // In a production environment, you would implement the API call here
  // useEffect(() => {
  //   if (fileId) {
  //     useVisualizeData(fileId).then((res) => {
  //       console.log(res)
  //       setReport(res)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // }, [fileId])

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl font-bold">Data Visualization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Describe how you would like to visualize your financial data. For example:
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            "Show me a bar chart of my monthly expenses by category" or "Create a table of my top 5 income sources"
          </p>
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
                  {visualizationType === 'chart' || !visualizationType ? 
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
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : visualizationResult ? (
          <VisualizationResult 
            type={visualizationType} 
            data={visualizationResult} 
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
