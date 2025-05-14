
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface AccountSummary {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  startDate: string;
  endDate: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'opportunity';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface BankStatementAnalysis {
  accountSummary: AccountSummary;
  transactions: Transaction[];
  categoryBreakdown: CategoryBreakdown[];
  insights: FinancialInsight[];
  quizQuestions: QuizQuestion[];
}
