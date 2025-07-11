
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MessageProvider from "./context/message";
import { SummaryProvider } from "./context/summary";
import ToastProvider from "./context/toast";
import { useEffect } from "react";
import { initMixpanel } from "./utils/mixpanel";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initMixpanel()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MessageProvider>
          <SummaryProvider>
            <ToastProvider />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SummaryProvider>
        </MessageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
