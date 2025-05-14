
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizQuestion } from '@/types';
import { Check, HelpCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FinancialQuizProps {
  questions: QuizQuestion[];
}

const FinancialQuiz = ({ questions }: FinancialQuizProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    setIsAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)}/${questions.length}`,
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Literacy Quiz</CardTitle>
          <CardDescription>No questions available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
      message = "Excellent! You have a solid understanding of financial concepts.";
    } else if (percentage >= 60) {
      message = "Good job! You have a decent grasp of financial literacy.";
    } else {
      message = "Keep learning! Building financial knowledge takes time.";
    }
    
    return (
      <Card className="animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>Test your financial knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
              <svg className="h-32 w-32" viewBox="0 0 100 100">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="10"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeDasharray={`${percentage * 2.51} 251.2`}
                  strokeLinecap="round"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold">Your Score: {score}/{questions.length}</p>
            <p className="text-center text-muted-foreground mt-4">{message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestart}>Take Quiz Again</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          Financial Literacy Quiz
        </CardTitle>
        <CardDescription>Test your financial knowledge</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        
        <h3 className="text-lg font-medium">{currentQuizQuestion.question}</h3>
        
        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(parseInt(value, 10))}>
          {currentQuizQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 py-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                {option}
              </Label>
              {isAnswered && index === selectedAnswer && index === currentQuizQuestion.correctAnswer && (
                <Check className="h-5 w-5 text-green-500" />
              )}
              {isAnswered && index === selectedAnswer && index !== currentQuizQuestion.correctAnswer && (
                <X className="h-5 w-5 text-red-500" />
              )}
              {isAnswered && index === currentQuizQuestion.correctAnswer && index !== selectedAnswer && (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </RadioGroup>
        
        {isAnswered && (
          <Alert className="bg-muted/50 mt-4">
            <AlertDescription>
              {currentQuizQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswered ? (
          <Button onClick={handleAnswer}>Submit Answer</Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FinancialQuiz;
