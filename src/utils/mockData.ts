
import { BankStatementAnalysis } from '../types';

export const mockStatementAnalysis: BankStatementAnalysis = {
  accountSummary: {
    balance: 5870.42,
    income: 4200.00,
    expenses: 2950.58,
    savings: 1249.42,
    startDate: '2023-04-01',
    endDate: '2023-04-30',
  },
  transactions: [
    {
      id: '1',
      date: '2023-04-01',
      description: 'Salary Deposit',
      amount: 4200.00,
      category: 'Income',
      type: 'income'
    },
    {
      id: '2',
      date: '2023-04-02',
      description: 'Grocery Store',
      amount: 152.35,
      category: 'Food',
      type: 'expense'
    },
    {
      id: '3',
      date: '2023-04-05',
      description: 'Electric Bill',
      amount: 95.20,
      category: 'Utilities',
      type: 'expense'
    },
    {
      id: '4',
      date: '2023-04-07',
      description: 'Internet Provider',
      amount: 75.99,
      category: 'Utilities',
      type: 'expense'
    },
    {
      id: '5',
      date: '2023-04-10',
      description: 'Restaurant Dinner',
      amount: 86.75,
      category: 'Food',
      type: 'expense'
    },
    {
      id: '6',
      date: '2023-04-12',
      description: 'Gas Station',
      amount: 45.30,
      category: 'Transportation',
      type: 'expense'
    },
    {
      id: '7',
      date: '2023-04-15',
      description: 'Rent Payment',
      amount: 1500.00,
      category: 'Housing',
      type: 'expense'
    },
    {
      id: '8',
      date: '2023-04-18',
      description: 'Phone Bill',
      amount: 65.99,
      category: 'Utilities',
      type: 'expense'
    },
    {
      id: '9',
      date: '2023-04-20',
      description: 'Clothing Store',
      amount: 125.50,
      category: 'Shopping',
      type: 'expense'
    },
    {
      id: '10',
      date: '2023-04-22',
      description: 'Movie Tickets',
      amount: 28.50,
      category: 'Entertainment',
      type: 'expense'
    },
    {
      id: '11',
      date: '2023-04-25',
      description: 'Online Subscription',
      amount: 15.99,
      category: 'Subscription',
      type: 'expense'
    },
    {
      id: '12',
      date: '2023-04-28',
      description: 'Pharmacy',
      amount: 42.30,
      category: 'Health',
      type: 'expense'
    },
    {
      id: '13',
      date: '2023-04-30',
      description: 'Gym Membership',
      amount: 55.00,
      category: 'Health',
      type: 'expense'
    },
  ],
  categoryBreakdown: [
    { category: 'Housing', amount: 1500.00, percentage: 50.8, color: '#f87171' },
    { category: 'Food', amount: 239.10, percentage: 8.1, color: '#fbbf24' },
    { category: 'Utilities', amount: 237.18, percentage: 8.0, color: '#60a5fa' },
    { category: 'Health', amount: 97.30, percentage: 3.3, color: '#34d399' },
    { category: 'Shopping', amount: 125.50, percentage: 4.3, color: '#a78bfa' },
    { category: 'Transportation', amount: 45.30, percentage: 1.5, color: '#fb923c' },
    { category: 'Entertainment', amount: 28.50, percentage: 1.0, color: '#ec4899' },
    { category: 'Subscription', amount: 15.99, percentage: 0.5, color: '#8b5cf6' }
  ],
  insights: [
    {
      id: '1',
      title: 'Housing Costs',
      description: 'Housing costs represent over 50% of your monthly expenses. The recommended maximum is 30%. Consider exploring lower-cost housing options or finding ways to increase income.',
      type: 'warning'
    },
    {
      id: '2',
      title: 'Potential Savings',
      description: 'Your monthly savings rate is approximately 30% of your income, which is excellent! Consider setting up automatic transfers to a high-yield savings account to maximize interest.',
      type: 'opportunity'
    },
    {
      id: '3',
      title: 'Food Expenses',
      description: 'Your food expenses could be optimized by cooking more meals at home. Restaurant spending represents 36% of your total food budget.',
      type: 'tip'
    },
    {
      id: '4',
      title: 'Emergency Fund',
      description: 'Based on your current savings rate, you could build a 3-month emergency fund in about 5 months. Consider prioritizing this goal before other financial objectives.',
      type: 'tip'
    },
  ],
  quizQuestions: [
    {
      id: '1',
      question: 'What is the recommended maximum percentage of your income that should go to housing expenses?',
      options: ['20%', '30%', '50%', '70%'],
      correctAnswer: 1,
      explanation: 'Financial experts recommend that housing costs should not exceed 30% of your monthly income to maintain a balanced budget.'
    },
    {
      id: '2',
      question: 'Based on your spending analysis, which category represents your highest monthly expense?',
      options: ['Food', 'Transportation', 'Housing', 'Entertainment'],
      correctAnswer: 2,
      explanation: 'Housing is your largest expense at 50.8% of your total monthly spending.'
    },
    {
      id: '3',
      question: 'What is a good first financial goal to work towards?',
      options: ['Buying a car', 'Building an emergency fund', 'Investing in stocks', 'Taking a vacation'],
      correctAnswer: 1,
      explanation: 'An emergency fund covering 3-6 months of essential expenses provides financial security and should be a priority before other financial goals.'
    },
    {
      id: '4',
      question: 'What percentage of your income are you currently saving each month?',
      options: ['Less than 10%', 'About 20%', 'About 30%', 'More than 40%'],
      correctAnswer: 2,
      explanation: 'Based on your financial data, you\'re saving approximately 30% of your monthly income, which is an excellent savings rate!'
    },
  ]
};
