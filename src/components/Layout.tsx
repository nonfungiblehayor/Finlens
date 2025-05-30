
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className='bg-[#60a5fa] rounded-[6px]'>
             <img src='/finlens2.png' className='w-10 h-10'/>
            </div>
            <h1 className="text-xl font-bold">Finlens</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {/* This space is reserved for future navigation or user profile */}
          </div>
        </div>
      </header>
      <main className={cn("container py-6", className)}>
        {children}
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Finlens. Your AI-powered data analyst.
          </p>
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground">
              Built by <a href='https://x.com/eibrahim_ayo'>@eibrahim_ayo</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
