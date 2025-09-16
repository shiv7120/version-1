'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import {
  LayoutDashboard,
  BookCopy,
  Target,
  Users,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/quizzes', icon: BookCopy, label: 'Manage Quizzes' },
  { href: '/admin/challenges', icon: Target, label: 'Manage Challenges' },
  { href: '/admin/students', icon: Users, label: 'Students' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <div className="p-2">
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Admin Panel</div>
        </div>
        <SidebarMenu className="flex-1">
          {navItems.map((item) => (
             <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior>
                <a className="block">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  >
                  <item.icon className="w-5 h-5 mr-3" aria- hidden="true"/>
                
                  {item.label}
                </SidebarMenuButton>
                </a>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" legacyBehavior>
                <a className="block">
                
                <SidebarMenuButton> <ArrowLeft className="w-5 h-5 mr-3" aria-hidden="true"/>
                        Back to App
                </SidebarMenuButton>
                  </a>
              </Link>
            </SidebarMenuItem>
              
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
