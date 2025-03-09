import Link from 'next/link';
import { signOut } from '@/auth/auth';

import { LuHouse } from 'react-icons/lu';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiPower } from 'react-icons/ci';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/Logo';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: LuHouse,
  },
  { title: 'Customers', url: '/dashboard/customers', icon: HiOutlineUsers },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}>
              <SidebarMenuButton asChild>
                <button className="flex w-full items-center gap-2">
                  <CiPower className="size-5" />
                  <span>Sign Out</span>
                </button>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
