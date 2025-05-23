
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { formatCurrency } from '@/utils/formatters';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from './ui/button';
import { Loader2, Save } from 'lucide-react';
import { handleDownload } from '@/utils/savepdf';

interface ChartVisualizationData {
  type: string;
  data: any[];
  xKey: string;
  yKeys: string[];
  colors: string[];
}

interface TableVisualizationData {
  columns: string[];
  data: Record<string, string>[];
}

interface VisualizationResultProps {
  type: 'chart' | 'table' | null;
  data: string;
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
  const [savingState, setSavingState] = useState<boolean>()
  const handleSavePdf = () => {
    setSavingState(true)
    handleDownload(containerRef)
  }
  function callAfterCopy(fn) {
    setTimeout(fn, 800)
  }
  callAfterCopy(() => {
    setSavingState(false)
  }, )
  if (!type || !data) return null;
  if (type === 'chart') {
    const chartData = data as any;
    const chartConfig: Record<string, {color: string, label: string}> = {};
    chartData.yKeys.forEach((key, index) => {
      chartConfig[key] = { 
        color: chartData.colors[index] || '#60a5fa', 
        label: key.charAt(0).toUpperCase() + key.slice(1)
      };
    });
    return (
      <Card className='w-6/12'>
        <CardHeader>
          <CardTitle>Financial Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-full">
            <ChartContainer config={chartConfig}>
              <RechartsPrimitive.ResponsiveContainer>
                {chartData.type === 'bar' ? (
                  <RechartsPrimitive.BarChart data={chartData.data}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey={chartData.xKey} />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip formatter={(value: number) => formatCurrency(value, '₦')} />
                    <RechartsPrimitive.Legend />
                    {chartData.yKeys.map((key, index) => (
                      <RechartsPrimitive.Bar 
                        key={key}
                        dataKey={key} 
                        fill={chartData.colors[index] || '#60a5fa'} 
                      />
                    ))}
                  </RechartsPrimitive.BarChart>
                ) : chartData.type === 'line' ? (
                  <RechartsPrimitive.LineChart data={chartData.data}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey={chartData.xKey} />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip formatter={(value: number) => formatCurrency(value, '₦')} />
                    <RechartsPrimitive.Legend />
                    {chartData.yKeys.map((key, index) => (
                      <RechartsPrimitive.Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={chartData.colors[index] || '#60a5fa'}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </RechartsPrimitive.LineChart>
                ) : (
                  <RechartsPrimitive.PieChart>
                    <RechartsPrimitive.Pie
                      data={chartData.data}
                      dataKey={chartData.yKeys[0]}
                      nameKey={chartData.xKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.data.map((entry, index) => (
                        <RechartsPrimitive.Cell 
                          key={`cell-${index}`}
                          fill={chartData.colors[index % chartData.colors.length]}
                        />
                      ))}
                    </RechartsPrimitive.Pie>
                    <RechartsPrimitive.Tooltip formatter={(value: number) => formatCurrency(value, '₦')} />
                    <RechartsPrimitive.Legend />
                  </RechartsPrimitive.PieChart>
                )}
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
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
                        children={data}
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
