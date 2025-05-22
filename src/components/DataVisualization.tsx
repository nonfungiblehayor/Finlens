
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVisualizeData } from '@/utils/ai-model';
import BankStatementAnalysis from './BankStatementAnalysis';
import { dataSummary } from '@/types';
import { Loader2 } from 'lucide-react';

interface requiredProps {
  fileId: string
}

const DataVisualization = ({ fileId }: requiredProps) => {
  const [report, setReport] = useState<dataSummary>()
  // useEffect(() => {
  //     useVisualizeData(fileId).then((res) => {
  //       console.log(res)
  //       setReport(res)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  return (
    <Card className="animate-fade-in">
      <CardHeader>
      </CardHeader>
      <CardContent className="space-y-6 flex w-full items-center justify-center">
        {/* {report ?   */}
        <BankStatementAnalysis data={report}/> 
         {/* : <Loader2 className="h-30 w-30 animate-spin" /> } */}
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
