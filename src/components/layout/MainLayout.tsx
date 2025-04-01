
import React from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className={cn("flex-1 p-6 md:p-8", className)}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
