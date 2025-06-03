
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
export const agentChart = [{
  chart_type: "bar",
  data: {
    barData: [202418, 150000, 37500, 35580, 26750],
    labels: ["Ayodeji", "ibrahim", "xhully", "id wire", "logic"]
  },
  title: "Top 5 income sources",
  type: "chart"
}]
export const mockAgentDate = {
  "analysis": "Based on the provided OPay Account Statement for IBRAHIM AYODEJI IBRAHIM from March 15, 2025, to May 13, 2025, the following key insights were identified:\n\n*   **Account Activity:** The account shows high transaction volume with 102 credit transactions and 109 debit transactions within the ~2-month period.\n*   **Significant Fund Sources:** A major portion of credits comes from individuals like BILIKIS IYABO IBRAHIM and also transactions described as 'Transfer from IBRAHIM, AYODEJI IBRAHIM' and 'Transfer from null' which might represent internal transfers or other credit types.\n*   **Primary Expenditures:** Frequent debits are made for 'Mobile Data' and 'Airtime'. Transfers to specific individuals (e.g., ZHULKIFIL SULEIMAN, KEHINDE IREWAMI OLOKODANA, AKEEM LANRE OLATUNDE) and businesses (e.g., GREENLIGHT PLANET SUN KING NIGERIA LIMITED, sulfam foods, Trendit Media Ltd) are also significant.\n*   **OWealth Integration:** The account actively uses the OWealth feature, with frequent 'OWealth Deposit (AutoSave)' transactions moving funds out of the primary wallet balance into OWealth. The OWealth balance grew significantly during the period, earning small amounts of interest daily.\n*   **Transaction Costs:** An 'Electronic Money Transfer Levy' is applied to many outward transfers.\n*   **Overall Movement:** The total debits (#572,054.00) exceed the total credits (#469,159.66) over the statement period, indicating a net outflow if starting from a zero balance, aligning with the detailed transaction list starting from a #0.00 balance and ending with a non-zero balance.\n*   **Balance Context:** The main summary balances appear inconsistent (#0.00 opening/closing) compared to the detailed transactions, but the 'Current Balance' (#10,373.40) aligns closely with the 'Summary - OWealth Balance' closing figure (#10,373.23), suggesting the detailed transaction list and current balance likely reflect the combined OPay wallet and OWealth activity.",
  "answer_question": [
    {
      "question": "What is the total value of funds transferred to each unique counterparty?",
      "answer": "Okay, here is the breakdown of the total value of funds transferred *from* the account owner (IBRAHIM AYODEJI IBRAHIM) to each unique counterparty, based on the debit transactions listed in the statement:\n\n**Summary of Funds Transferred To Unique Counterparties:**\n\n*   **Ibrahim Ayodeji Ibrahim** (Transfers to self or internal accounts): ₦140,700.00\n*   **GREENLIGHT PLANET SUN KING NIGERIA LIMITED:** ₦130,140.00\n*   **OWealth Deposit (AutoSave)** (Internal OPay transfers): ₦64,030.00\n*   **AIRTEL-DEAL3072-Ilorin Shop - Sales:** ₦30,000.00\n*   **TV:** ₦16,800.00\n*   **ZHULKIFIL SULEIMAN:** ₦16,020.00\n*   **sulfam foods owned by FARIDOH ABDUL:** ₦10,500.00\n*   **AKEEM LANRE OLATUNDE:** ₦10,250.00\n*   **LAWAL ZAKA:** ₦7,200.00\n*   **Easykolad Multibiz 2:** ₦6,220.00\n*   **Airtime:** ₦5,700.00\n*   **ABDULRASHEED OLUWASEUN TAIWO:** ₦3,000.00\n*   **KEHINDE IREWAMI OLOKODANA:** ₦3,000.00\n*   **Mobile Data:** ₦3,024.00\n*   **OMOKAYODE OLASHEU BABATUNDE:** ₦2,900.00\n*   **MUMMY OPE GENERAL MERCHANT:** ₦2,100.00\n*   **OLUWAKEMI SEUN ADEGBOYE:** ₦2,100.00\n*   **Trendit Media Ltd FLW:** ₦2,050.00\n*   **kolawole samson jimoh:** ₦2,000.00\n*   **ABDULGAFAR TOYIN IBRAHIM:** ₦2,000.00\n*   **ABDULLAHI OLAWALE IBRAHIM:** ₦1,500.00\n*   **FORTUNETECH LIMITED:** ₦1,080.00\n*   **HONGKONG FORTUNETECH LIMITED FLW:** ₦1,600.00\n*   **MUHAMMADTUKUR ATIKU:** ₦1,000.00\n*   **TAIYE IREBAMI OLOKODANA:** ₦1,000.00\n*   **ABDULGAFAR OLUWAFERAMI AYUBA:** ₦1,000.00\n*   **ABUBAKAR ADAMU BALA:** ₦3,000.00\n*   **YUSUF BARAKAT ADEBISI:** ₦5,000.00\n*   **SUNDAY SAMUEL ADEWOLE:** ₦500.00\n*   **TEMITOPE AJOKE OBANAYO:** ₦500.00\n*   **F.I.S MULTI-BIZ VENTURES - FAUSAT BIDEMI ISMAIL SULAIMAN:** ₦600.00\n*   **BABATUNDE AFUSAT BOLA:** ₦400.00\n*   **Electronic Money Transfer Levy:** ₦300.00\n\nPlease note that \"OWealth Deposit (AutoSave)\", \"Mobile Data\", \"Airtime\", and \"Electronic Money Transfer Levy\" are categorised here as counterparties as they represent entities or services to which funds were transferred out of the account, even if they are not traditional personal or business recipients in every case. \"Transfer to Ibrahim Ayodeji Ibrahim\" seems to represent transfers between accounts owned by the same individual."
    },
    {
      "question": "How does the frequency of OWealth deposits compare to other transaction types?",
      "answer": "Based on the provided account statement:\n\n1.  The only type of OWealth deposit explicitly listed is **\"OWealth Deposit (AutoSave)\"**.\n2.  In the \"Summary - OWealth Balance\" section (where these deposits are recorded as inflows to the OWealth account), there are **5** instances of \"OWealth Deposit (AutoSave)\" listed between March 15, 2025, and May 13, 2025. (March 15, March 26, April 13, April 14, April 15).\n\nComparing this frequency to other transaction types:\n\n*   **OWealth Interest Earned:** These transactions occur almost **daily** in the OWealth Balance summary, making them the *most frequent* type of OWealth transaction and the most frequent transaction overall in this period (counting over 60 instances).\n*   **Transfers (from/to others):** These are also very frequent, appearing multiple times across both the Wallet and OWealth summaries, and are significantly more frequent than OWealth AutoSave deposits.\n*   **Mobile Data & Airtime purchases:** These also appear quite frequently throughout the statement (over 20 instances combined), more often than OWealth AutoSave deposits.\n*   **Electronic Money Transfer Levy:** These appear several times (6 instances), also more frequently than OWealth AutoSave deposits.\n\nIn summary, \"OWealth Deposit (AutoSave)\" occurs relatively infrequently (5 times in the statement period) compared to most other transaction types listed, particularly compared to OWealth Interest Earned, transfers, mobile data, and airtime purchases."
    },
    {
      "question": "What is the total amount spent on Electronic Money Transfer Levy?",
      "answer": "Based on the document provided, the \"Electronic Money Transfer Levy\" transactions are listed in the main \"Summary - Wallet Balance\" table.\n\nLet's sum the debit amounts for these transactions:\n\n*   Apr 08: -50.00\n*   Apr 08: -50.00\n*   Apr 09: -50.00\n*   Apr 11: -50.00\n*   Apr 13: -50.00\n*   Apr 19: -50.00\n*   May 13: -50.00\n\nTotal Electronic Money Transfer Levy spent = 50 + 50 + 50 + 50 + 50 + 50 + 50 = 350.\n\nThe total amount spent on Electronic Money Transfer Levy is **#350.00**."
    }
  ],
  "visualization": [
    {
      "chart_type": "bar",
      "data": {
        "barData": [
          130140,
          131100,
          125950,
          11330,
          3000
        ],
        "labels": [
          "GREENLIGHT PLANET SUN KING NIGERIA LIMITED",
          "Transfer to Ibrahim Ayodeji Ibrahim",
          "OWealth Deposit (AutoSave)",
          "Transfer to ZHULKIFIL SULEIMAN",
          "Transfer to ABUBAKAR ADAMU BALA"
        ]
      },
      "title": "Top 5 Debit Transaction Descriptions by Total Amount",
      "type": "chart"
    },
    {
      "chart_type": "line",
      "data": {
        "datasets": [
          {
            "data": [
              {
                "x": "2025-03-15T00:00:00",
                "y": 0
              },
              {
                "x": "2025-03-15T11:59:22",
                "y": 3000
              },
              {
                "x": "2025-03-15T16:16:41",
                "y": 900
              },
              {
                "x": "2025-03-15T22:18:13",
                "y": 0
              },
              {
                "x": "2025-03-18T15:16:03",
                "y": 68
              },
              {
                "x": "2025-03-18T15:16:16",
                "y": 0
              },
              {
                "x": "2025-03-20T12:50:10",
                "y": 3000
              },
              {
                "x": "2025-03-20T14:28:41",
                "y": 0
              },
              {
                "x": "2025-03-21T08:28:40",
                "y": 2500
              },
              {
                "x": "2025-03-21T09:03:20",
                "y": 2150
              },
              {
                "x": "2025-03-21T09:06:31",
                "y": 50
              },
              {
                "x": "2025-03-21T11:19:42",
                "y": 250
              },
              {
                "x": "2025-03-21T11:20:14",
                "y": 400
              },
              {
                "x": "2025-03-21T11:21:31",
                "y": 50
              },
              {
                "x": "2025-03-21T22:13:26",
                "y": 0
              },
              {
                "x": "2025-03-24T11:17:30",
                "y": 3000
              },
              {
                "x": "2025-03-24T11:32:15",
                "y": 0
              },
              {
                "x": "2025-03-26T20:38:18",
                "y": 1000
              },
              {
                "x": "2025-03-26T22:18:47",
                "y": 0
              },
              {
                "x": "2025-04-04T05:31:57",
                "y": 1000
              },
              {
                "x": "2025-04-04T05:33:25",
                "y": 500
              },
              {
                "x": "2025-04-04T14:47:37",
                "y": 0
              },
              {
                "x": "2025-04-08T08:05:25",
                "y": 30000
              },
              {
                "x": "2025-04-08T08:05:30",
                "y": 29950
              },
              {
                "x": "2025-04-08T08:06:18",
                "y": 30450
              },
              {
                "x": "2025-04-08T08:06:47",
                "y": 450
              },
              {
                "x": "2025-04-08T08:08:50",
                "y": 50450
              },
              {
                "x": "2025-04-08T08:08:56",
                "y": 50400
              },
              {
                "x": "2025-04-08T08:53:24",
                "y": 330
              },
              {
                "x": "2025-04-08T17:51:56",
                "y": 17130
              },
              {
                "x": "2025-04-08T17:52:01",
                "y": 17080
              },
              {
                "x": "2025-04-08T17:52:34",
                "y": 280
              },
              {
                "x": "2025-04-08T19:52:53",
                "y": 1280
              },
              {
                "x": "2025-04-08T19:54:49",
                "y": 280
              },
              {
                "x": "2025-04-08T22:14:40",
                "y": 0
              },
              {
                "x": "2025-04-09T19:33:09",
                "y": 150000
              },
              {
                "x": "2025-04-09T19:33:14",
                "y": 149950
              },
              {
                "x": "2025-04-09T19:59:27",
                "y": 18850
              },
              {
                "x": "2025-04-09T20:07:30",
                "y": 16850
              },
              {
                "x": "2025-04-09T22:14:45",
                "y": 0
              },
              {
                "x": "2025-04-11T05:11:28",
                "y": 80100
              },
              {
                "x": "2025-04-11T05:11:34",
                "y": 80050
              },
              {
                "x": "2025-04-11T05:14:29",
                "y": 0
              },
              {
                "x": "2025-04-11T09:30:53",
                "y": 6000
              },
              {
                "x": "2025-04-11T09:43:29",
                "y": 6500
              },
              {
                "x": "2025-04-11T09:43:50",
                "y": 350
              },
              {
                "x": "2025-04-11T15:10:07",
                "y": 0
              },
              {
                "x": "2025-04-13T13:33:16",
                "y": 10000
              },
              {
                "x": "2025-04-13T13:33:21",
                "y": 9950
              },
              {
                "x": "2025-04-13T19:14:17",
                "y": 9850
              },
              {
                "x": "2025-04-13T21:47:04",
                "y": 9350
              },
              {
                "x": "2025-04-13T22:06:07",
                "y": 0
              },
              {
                "x": "2025-04-14T16:46:56",
                "y": 9000
              },
              {
                "x": "2025-04-14T16:48:49",
                "y": 7970
              },
              {
                "x": "2025-04-14T20:28:16",
                "y": 4960
              },
              {
                "x": "2025-04-14T22:11:37",
                "y": 0
              },
              {
                "x": "2025-04-15T08:24:16",
                "y": 3000
              },
              {
                "x": "2025-04-15T12:18:27",
                "y": 1980
              },
              {
                "x": "2025-04-15T17:36:10",
                "y": 0
              },
              {
                "x": "2025-04-15T18:11:04",
                "y": 5000
              },
              {
                "x": "2025-04-15T18:12:00",
                "y": 2990
              },
              {
                "x": "2025-04-15T20:19:31",
                "y": 2190
              },
              {
                "x": "2025-04-15T22:13:00",
                "y": 0
              },
              {
                "x": "2025-04-17T20:09:48",
                "y": 1000
              },
              {
                "x": "2025-04-17T20:11:08",
                "y": 500
              },
              {
                "x": "2025-04-17T20:11:20",
                "y": 0
              },
              {
                "x": "2025-04-19T08:42:42",
                "y": 20000
              },
              {
                "x": "2025-04-19T08:42:49",
                "y": 19950
              },
              {
                "x": "2025-04-19T11:16:12",
                "y": 18950
              },
              {
                "x": "2025-04-19T14:01:46",
                "y": 18450
              },
              {
                "x": "2025-04-19T15:12:46",
                "y": 15450
              },
              {
                "x": "2025-04-19T15:15:34",
                "y": 10450
              },
              {
                "x": "2025-04-19T17:49:53",
                "y": 12950
              },
              {
                "x": "2025-04-19T19:45:26",
                "y": 11950
              },
              {
                "x": "2025-04-19T22:11:42",
                "y": 0
              },
              {
                "x": "2025-04-23T11:05:53",
                "y": 2000
              },
              {
                "x": "2025-04-23T11:06:12",
                "y": 0
              },
              {
                "x": "2025-04-24T08:11:02",
                "y": 500
              },
              {
                "x": "2025-04-24T08:11:52",
                "y": 0
              },
              {
                "x": "2025-04-25T18:44:28",
                "y": 3000
              },
              {
                "x": "2025-04-25T18:44:47",
                "y": 500
              },
              {
                "x": "2025-04-25T22:14:50",
                "y": 0
              },
              {
                "x": "2025-04-27T16:54:40",
                "y": 250
              },
              {
                "x": "2025-04-27T16:54:55",
                "y": 0
              },
              {
                "x": "2025-05-02T20:57:50",
                "y": 1000
              },
              {
                "x": "2025-05-02T20:58:35",
                "y": 0
              },
              {
                "x": "2025-05-07T19:19:09",
                "y": 1500
              },
              {
                "x": "2025-05-07T19:20:09",
                "y": 1000
              },
              {
                "x": "2025-05-07T19:27:43",
                "y": 500
              },
              {
                "x": "2025-05-07T19:28:36",
                "y": 0
              },
              {
                "x": "2025-05-07T20:05:26",
                "y": 1000
              },
              {
                "x": "2025-05-07T20:05:54",
                "y": 0
              },
              {
                "x": "2025-05-10T09:52:25",
                "y": 5000
              },
              {
                "x": "2025-05-10T22:16:51",
                "y": 0
              },
              {
                "x": "2025-05-13T08:40:05",
                "y": 20000
              },
              {
                "x": "2025-05-13T08:40:06",
                "y": 19950
              },
              {
                "x": "2025-05-13T17:40:05",
                "y": 18950
              },
              {
                "x": "2025-05-13T18:18:29",
                "y": 13950
              },
              {
                "x": "2025-05-13T21:23:56",
                "y": 10950
              },
              {
                "x": "2025-05-13T22:13:26",
                "y": 0
              }
            ],
            "label": "Wallet Balance (N)"
          }
        ]
      },
      "title": "Wallet Account Balance Trend over Statement Period",
      "type": "chart"
    },
    {
      "chart_type": "bar",
      "data": {
        "barData": [
          190568,
          35500,
          3750
        ],
        "labels": [
          "IBRAHIM AYODEJI IBRAHIM",
          "BILIKIS IYABO IBRAHIM",
          "null"
        ]
      },
      "title": "Total Amount Transferred from Most Frequent Credit Sources",
      "type": "chart"
    }
  ]
}