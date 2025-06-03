import { dataSummary, summaryType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
const SummaryContext = createContext<summaryType>(null)
export const useSummary = () => useContext(SummaryContext)
export const SummaryProvider = ({children}: {children: ReactNode}) => {
    const [summaryState, setSummaryState] = useState<dataSummary>()
    const setSummaryData = (data: dataSummary) => {
        setSummaryState(data)
    }
    const values = {
        summary: summaryState,
        setSummary: setSummaryData
    }
    return (
        <SummaryContext.Provider value={values}>
            {children}
        </SummaryContext.Provider>
    )
}