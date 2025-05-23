import { dataSummary, summaryType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
const TransactionContext = createContext<summaryType>(null)
export const useTransaction = () => useContext(TransactionContext)
export const TransactionProvider = ({children}: {children: ReactNode}) => {
    const [transactions, setTransactions] = useState<dataSummary>(null)
    const setTransactionData = (data: dataSummary) => {
        setTransactions(data)
    }
    const values = {
        summary: transactions,
        setSummary: setTransactionData
    }
    return (
        <TransactionContext.Provider value={values}>
            {children}
        </TransactionContext.Provider>
    )
}