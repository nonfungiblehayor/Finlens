import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from './ui/button';
import { Loader2, Save } from 'lucide-react';
import { handleDownload, handleDownloadChart } from '@/utils/savepdf';
import type { Chart as ChartJS, } from 'chart.js';
import LineChart from './ui/visual-chart/line-chart';
import BarChart from './ui/visual-chart/bar-chart';
import PieChart from './ui/visual-chart/pie-chart';

interface VisualizationResultProps {
  type: 'chart' | 'table' | null;
  data: any;
}

const components = {
  table: ({node, ...props}) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg" {...props} />
    </div>
  ),
  thead: ({node, ...props}) => (
    <thead className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase" {...props} />
  ),
  tbody: ({node, ...props}) => (
    <tbody className="divide-y divide-gray-200 text-sm text-gray-800" {...props} />
  ),
  tr: ({node, ...props}) => <tr className="hover:bg-gray-50" {...props} />,
  th: ({node, ...props}) => (
    <th className="px-4 py-2 whitespace-nowrap" {...props} />
  ),
  td: ({node, ...props}) => (
    <td className="px-4 py-2 whitespace-nowrap" {...props} />
  ),
};

const VisualizationResult = ({ type, data }: VisualizationResultProps) => {
  const containerRef = useRef();
  const chartRef = useRef<ChartJS<'bar'>>(null);
  const [savingState, setSavingState] = useState<boolean>()
  const handleSavePdf = () => {
    setSavingState(true)
    handleDownload(containerRef)
  }
  const handleSaveChart = () => {
    setSavingState(true)
    handleDownloadChart(chartRef, data?.title)
  }
  function callAfterCopy(fn) {
    setTimeout(fn, 800)
  }
  callAfterCopy(() => {
    setSavingState(false)
  }, )
  if (!type || !data) return null;
  if (type === 'chart') {
    return (
      <Card className='w-full self-center'>
        <CardHeader className='flex flex-row items-center justify-between px-4'>
          <CardTitle>Data Visualization</CardTitle>
          <Button onClick={handleSaveChart} disabled={savingState}>
            {savingState ? <Loader2 size={10} className="animate-spin"/> :  <div className='flex items-center gap-x-2'>
              Save Chart
              <Save size={10}/>
            </div>}
          </Button>
        </CardHeader>
        <CardContent className='flex items-center justify-center'>
          {data && data?.chart_type === "bar" && <BarChart title={data?.title} labels={data?.data?.labels} data={data?.data?.barData} />}
          {data && data?.chart_type === "pie" && 
          <PieChart title={data?.title} labels={data?.data?.labels} data={data?.data?.data} borderColors={data?.data?.borderColor} bgColors={data?.data?.backgroundColor}/>
          }
        </CardContent>
        {data && data?.chart_type === "line" && <LineChart title={data?.title} data={data?.data?.datasets} />}
      </Card>
    );
  } else if (type === 'table') {
    return (
      <Card  className='w-full self-center'>
        <CardHeader className='flex flex-row items-center justify-between px-4'>
          <CardTitle>Visualization Result</CardTitle>
          <Button disabled={savingState} onClick={handleSavePdf}>
            {savingState ? <Loader2 size={10} className="animate-spin"/> :  <div className='flex items-center gap-x-2'>
              Save Result
              <Save size={10}/>
              </div>}
          </Button>
        </CardHeader>
        <CardContent ref={containerRef}>
                 <ReactMarkdown
                        components={components}
                        children={data?.markdown}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSanitize]}
                      />
        </CardContent>
      </Card>
    );
  }
  return null;
};
export default VisualizationResult;