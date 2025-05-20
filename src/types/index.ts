import { Dispatch, SetStateAction } from "react";

export interface Analysis {
  fileId: string,
  report: string,
  analysisState: boolean
}

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}
export interface messageType {
  message: Message[],
  setMessage: Dispatch<SetStateAction<Message>>
}
export interface dataSummary {
  statement_details: {
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    statement_period_from: string,
    statement_period_to: string,
    opening_balance: number,
    closing_balance: number,
    currency: string
  },
  summary: {
    total_money_in: number,
    total_money_out: number
  },
  transactions: {
    allTransactions: [
      {
        amount: number, 
        date: string,
        description: string,
        sender_or_receiver: string,
        debit_or_credit: string,
        refrence: string,
        bank: string
      }
    ],
    financeBreakdown: {
      income: number,
      expenses: number,
      savings: number
    },
    listofpeople: [
      {
        name: string,
        number_of_times: number,
        total_amount: number
      }
    ],
    spendingBreakdown: [
      {
        category: string,
        total_amount: number
      }
    ],
    monthlySpends: [
      {
        month: string,
        total_amount: number
      }
    ],
    "top-5-InflowSource": [
      {
        name: string,
        total_amount: number
      }
    ],
    "top-5-OutflowSource": [
      {
        name: string,
        total_amount: number
      }
    ]
  }
}

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

// Bank Statement types
export interface BankStatement {
  basicAccountInfo: {
    name: string;
    accountNumber: string;
    dateRange: string;
    openingBalance: string;
    closingBalance: string;
  };
  overallAccountFlow: {
    moneyIn: string;
    moneyOut: string;
  };
  transactionAnalysis: {
    incomeCredit: {
      regularTransferFrom: Array<{
        source: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
      internalOrCreditReversals: Array<{
        source: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
    };
    expendituresDebit: {
      transferToIndividuals: Array<{
        recipient: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
      paymentsToBusinessesAndServices: Array<{
        recipientOrService: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
      billsAndUtilities: Array<{
        type: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
      foodAndGroceries: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      transportation: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      laundry: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      upkeep: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      posExpenses: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      webPayments: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      cashWithdrawals: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      miscellaneous: {
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      };
      bankCharges: Array<{
        type: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
      otherPayments: Array<{
        type: string;
        totalAmount: string;
        count: number;
        details: Array<{
          date: string;
          amount: string;
          description: string;
        }>;
      }>;
    };
  };
  dailySpendingData: Array<{
    date: string;
    amount: number;
  }>;
  financialAdvice: string[];
  dashboardMetrics: {
    totalIncome: string;
    totalExpenses: string;
    netFlow: string;
    topIncomeSources: Array<{
      source: string;
      amount: string;
    }>;
    topSpendingCategories: Array<{
      category: string;
      amount: string;
    }>;
    topSpendingRecipients: Array<{
      recipient: string;
      amount: string;
    }>;
  };
}
