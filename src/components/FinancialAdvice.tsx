
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FinancialInsight } from '@/types';
import { Info } from 'lucide-react';

interface FinancialAdviceProps {
  insights: FinancialInsight[];
}

const FinancialAdvice = ({ insights }: FinancialAdviceProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Info className="h-4 w-4 text-orange-500" />;
      case 'opportunity':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'tip':
        return <Info className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getInsightVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950";
      case 'opportunity':
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950";
      case 'tip':
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950";
      default:
        return "";
    }
  };

  // Group insights by type
  const warningInsights = insights.filter(insight => insight.type === 'warning');
  const opportunityInsights = insights.filter(insight => insight.type === 'opportunity');
  const tipInsights = insights.filter(insight => insight.type === 'tip');

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Financial Advice & Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {warningInsights.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-orange-600">Areas of Attention</h3>
            {warningInsights.map((insight) => (
              <Alert key={insight.id} className={getInsightVariant(insight.type)}>
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <AlertTitle>{insight.title}</AlertTitle>
                </div>
                <AlertDescription className="mt-2">{insight.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {opportunityInsights.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-600">Opportunities</h3>
            {opportunityInsights.map((insight) => (
              <Alert key={insight.id} className={getInsightVariant(insight.type)}>
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <AlertTitle>{insight.title}</AlertTitle>
                </div>
                <AlertDescription className="mt-2">{insight.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {tipInsights.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-green-600">Helpful Tips</h3>
            {tipInsights.map((insight) => (
              <Alert key={insight.id} className={getInsightVariant(insight.type)}>
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <AlertTitle>{insight.title}</AlertTitle>
                </div>
                <AlertDescription className="mt-2">{insight.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-4">Additional Financial Guidance</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Building an Emergency Fund</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">An emergency fund is your financial safety net. Aim to save 3-6 months of essential expenses.</p>
                <p className="text-sm text-muted-foreground">Based on your current income and expenses, setting aside $300-500 per month could build your emergency fund within a year.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Optimizing Your Housing Costs</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Housing should ideally be less than 30% of your income. Consider roommates, negotiating rent, or exploring more affordable neighborhoods if your housing costs exceed this threshold.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>50/30/20 Budget Rule</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">A balanced budget allocates:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>50% for needs (housing, food, utilities)</li>
                  <li>30% for wants (entertainment, dining out, shopping)</li>
                  <li>20% for savings and debt repayment</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAdvice;
