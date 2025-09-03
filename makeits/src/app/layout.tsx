import type { Metadata } from 'next';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export const metadata: Metadata = {
  title: 'EcoChampion Quests',
  description: 'Become an EcoChampion by taking on quests and challenges.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const childProps = (children as React.ReactElement)?.props?.childProp;
  const segment = childProps?.segment;
  const parallelRoutes = childProps?.parallelRoutes;

 const isAdminPage = parallelRoutes?.children?.props?.childProp?.segment === 'admin';
  

 const isAuthPage = segment === 'login' || segment === 'register';

  const AuthPagesLayout = ({ children }: { children: React.ReactNode }) => (
     <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );

  const AppLayout = ({ children }: { children: React.ReactNode }) => (
     <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <AppHeader />
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
  );

  const AdminLayout = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
  

  const getLayout = () => {
    if (isAdminPage) {
      return AdminLayout;
    }
    if (isAuthPage) {
      return AuthPagesLayout;
    }
    // Landing page has no layout
    if (segment === '__PAGE__') {
       return ({ children }: { children: React.ReactNode }) => <>{children}</>;
    }
    return AppLayout;
  }

  const LayoutComponent = getLayout();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LayoutComponent>{children}</LayoutComponent>
        <Toaster />
      </body>
    </html>
  );
}
