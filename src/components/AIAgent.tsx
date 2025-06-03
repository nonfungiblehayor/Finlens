
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useAgent } from '@/utils/ai-model';
import { PageSkeleton } from './ui/chatskeleton';
import { useSummary } from '@/context/summary';
import AgentVisualization from './agentVisualization';
import { mockAgentDate } from '@/utils/mockData';
import { useRef, useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { callAfterCopy } from '@/utils/afterCopy';
interface AIAgentProps {
  fileId: string;
}

const AIAgent = ({ fileId }: AIAgentProps) => {
    const { summary, setSummary } = useSummary()
    const containerRef = useRef<HTMLDivElement>();
    const [isLoading, setLoading] = useState<boolean>()
    const [isCopy, setCopy] = useState<boolean>()
    const handleCopy = () => {
      setCopy(true)
      if(containerRef.current) {
      navigator.clipboard.writeText(containerRef.current.textContent)
      }
    }
    callAfterCopy(() => {
      setCopy(undefined)
    }, )
  const handleStartAgent = async() => {
    setLoading(true)
    setSummary(undefined)
    await useAgent(fileId).then((response) => {
      setSummary(response)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <div className="space-y-6">
      <Card className="h-[600px] overflow-y-scroll flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
              <CardTitle onClick={() => console.log(summary)} className="flex items-center gap-2">
                 Finlens Data analysis Agent
              </CardTitle>
              <div className='flex items-center gap-x-2'>
                  <Button onClick={handleStartAgent} disabled={!summary || isLoading}>
                    <RefreshCw />
                  </Button>
                  <Button onClick={handleCopy} disabled={isCopy || !summary || isLoading}>
                    {isCopy ? "Copied" : <Copy />}
                  </Button>
              </div>
          </div>
        </CardHeader>
        {!summary && !isLoading && (
          <CardContent className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <Card className='w-6/12 self-center text-center py-4 flex gap-y-4 flex-col justify-center items-center'>
              <p className='font-bold'>Unlock the Power of Our AI Agent</p>
              <div className='w-10/12 text-muted-foreground text-[14px]'>
                Meet your new intelligent assistant designed to seamlessly ingests your raw datasets, uncovers hidden patterns,
                and delivers meaningful, actionable insights without you having to write a single line of code.
                Our AI Agent is built to handle the entire data analysis pipeline autonomously, so you can focus on
                making decisions, not wrangling spreadsheets.
              </div>
              <Button onClick={handleStartAgent}>Run Analysis</Button>
          </Card>
          </CardContent>
        )}
        {!summary && isLoading && (
          <CardContent className="flex-1 flex flex-col items-center justify-center overflow-hidden">
              <PageSkeleton />
          </CardContent>
        )}
        {
          summary && !isLoading && (
            <CardContent ref={containerRef} className='flex flex-col gap-y-4'>
                <ReactMarkdown
                  children={summary.analysis}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize]}
                />
                <div>
                  {summary?.answer_question?.map((data, index) => (
                      <ReactMarkdown
                      key={index}
                      children={data.answer}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                    />                    
                  ))}
                </div>
                {summary?.visualization?.map((data, index) => (
                      <AgentVisualization key={index} title={data?.title} chart_type={data?.chart_type} data={data?.data} type={data?.type} />
                  ))}
            </CardContent>
           )
        } 
      </Card>
    </div>
  );
};

export default AIAgent;
