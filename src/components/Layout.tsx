
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
            <BarChart3 className="h-6 w-6 text-primary" />
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
            © {new Date().getFullYear()} Finlens. Your personal financial assistant.
          </p>
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground">
              Built by @eibrahim_ayo for better financial decisions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
