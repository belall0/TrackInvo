import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import AppSidebar from '@/components/common/Sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex h-full w-full flex-col">
        <div className="flex items-center border-b border-gray-200 p-4">
          <SidebarTrigger className="mr-4 rounded-md p-2 hover:bg-gray-100" />
        </div>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
