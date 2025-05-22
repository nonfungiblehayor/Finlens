
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import * as RechartsPrimitive from "recharts";
import { formatCurrency } from '@/utils/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  data: ChartVisualizationData | TableVisualizationData;
}

const VisualizationResult = ({ type, data }: VisualizationResultProps) => {
  if (!type || !data) return null;

  if (type === 'chart') {
    const chartData = data as ChartVisualizationData;
    
    // Create chart config for the ChartContainer
    const chartConfig: Record<string, {color: string, label: string}> = {};
    chartData.yKeys.forEach((key, index) => {
      chartConfig[key] = { 
        color: chartData.colors[index] || '#60a5fa', 
        label: key.charAt(0).toUpperCase() + key.slice(1)
      };
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
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
    const tableData = data as TableVisualizationData;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {tableData.columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default VisualizationResult;
