'use client';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Mail, Lock, Bell } from 'lucide-react';

import GeneralSettings from './GeneralSettings';
import ProfileSettings from './ProfileSettings';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import NotificationSettings from './NotificationSettings';

import { AppSidebar } from '@/features/admin/components/Sidebar/app-sidebar';
import { SiteHeader } from '@/features/admin/components/Sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const breadcrumbLinks = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Settings' }
];

const tabKeys = ['profile', 'email', 'password', 'notifications', 'general'];

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');

  // Set tab from hash in URL
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (tabKeys.includes(hash)) {
      setTab(hash);
    }
  }, [location.hash]);

  // Sync tab changes to URL
  const handleTabChange = (value: string) => {
    setTab(value);
    navigate(`#${value}`, { replace: true });
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={breadcrumbLinks} />
        <div className="flex flex-col gap-4 px-4 py-6">
          <div className="max-w-4xl w-full mx-auto">
            <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-5 gap-2 mb-6">
              <TabsTrigger value="general" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> General
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Password
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <ProfileSettings />
              </TabsContent>
              <TabsContent value="email">
                <EmailSettings />
              </TabsContent>
              <TabsContent value="password">
                <PasswordSettings />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Settings;
