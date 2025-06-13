import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import AgentBarChart from './ui/agent-chart/agent-bar-chart';
import AgentPieChart from './ui/agent-chart/agent-pie-chart';
import AgentLineChart from './ui/agent-chart/agent-line-chart';
import { Loader2, Save } from 'lucide-react';
import { useRef, useState } from 'react';
import { handleDownloadChart } from '@/utils/savepdf';
import type { Chart as ChartJS, } from 'chart.js';
import { Button } from './ui/button';
import mixpanel from 'mixpanel-browser';
interface VisualizationResultProps {
    type: 'chart' | 'table' | any | null;
    data: any;
    title: string,
    chart_type: string
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
const AgentVisualization = ({ type, data, title, chart_type}: VisualizationResultProps) => {
  const [savingState, setSavingState] = useState<boolean>()
  const containerRef = useRef();
  const barchartRef = useRef<ChartJS<'bar'>>(null);
  const linechartRef = useRef<ChartJS<'line'>>(null)
  const piechartRef = useRef<ChartJS<'pie'>>(null)
    const handleSaveChart = () => {
      mixpanel.track('use data', {
        'use_data': 'save chart'
      })
      setSavingState(true)
      if(chart_type === "bar") {
        handleDownloadChart(barchartRef, title)
      }else if(chart_type === "line") {
        handleDownloadChart(linechartRef, title)
      }else if(chart_type === 'pie') {
        handleDownloadChart(piechartRef, title)
      } else {
        handleDownloadChart(containerRef, "table-analysis")
      }
    }
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
                {data && chart_type === "bar" && <AgentBarChart chartRef={barchartRef} title={title} data={data?.barData} labels={data?.labels}/>}
                {data && chart_type === "line" && <AgentLineChart chartRef={linechartRef} title={title} data={data}/>}
                <CardContent className='flex items-center justify-center'>
                    {data && chart_type === "pie" && <AgentPieChart chartRef={piechartRef} title={title} labels={data?.labels} data={data?.data} borderColors={data?.borderColor} bgColors={data?.backgroundColor}/>}
                </CardContent>
        </Card>
    )
    } else if (type === 'table') {
        return (
          <Card  className='w-full self-center'>
            <CardHeader className='flex flex-row items-center justify-between px-4'>
              <CardTitle>Visualization Result</CardTitle>
              <Button disabled={savingState} onClick={handleSaveChart}>
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
}
export default AgentVisualization