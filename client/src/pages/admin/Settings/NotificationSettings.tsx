import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { useUpdateNewsMutation } from '@/api/news';

interface NotificationSettingsData {
  [key: string]: boolean;
}

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState<NotificationSettingsData>({
    systemUpdates: true,
    securityAlerts: true,
    accountActivity: true,
    newUsers: false,
    newJobs: true,
    newCompetitions: true,
    dailyDigest: true,
    weeklyReport: true,
    marketingEmails: false
  });

  const [pushNotifications, setPushNotifications] = useState<NotificationSettingsData>({
    loginAttempts: true,
    systemAlerts: true,
    newMessages: true,
    contentUpdates: false,
    userActions: true
  });

  const [saved, setSaved] = useState(false);
  const [updateNews, { isLoading }] = useUpdateNewsMutation();

  const handleEmailChange = (setting: string) => {
    setEmailNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handlePushChange = (setting: string) => {
    setPushNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNews({
        id: 'notifications',
        data: {
          emailNotifications,
          pushNotifications
        }
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to update notifications:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const allEnabled = Object.values(emailNotifications).every(val => val);
                  const toggled = Object.fromEntries(
                    Object.entries(emailNotifications).map(([key]) => [key, !allEnabled])
                  );
                  setEmailNotifications(toggled);
                }}
              >
                {Object.values(emailNotifications).every(val => val) ? 'Disable All' : 'Enable All'}
              </Button>
            </div>

            <Separator />

            {Object.entries(emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="capitalize text-base">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <p className="text-sm text-gray-500">Email alert for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={() => handleEmailChange(key)}
                />
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Push Notifications</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const allEnabled = Object.values(pushNotifications).every(val => val);
                  const toggled = Object.fromEntries(
                    Object.entries(pushNotifications).map(([key]) => [key, !allEnabled])
                  );
                  setPushNotifications(toggled);
                }}
              >
                {Object.values(pushNotifications).every(val => val) ? 'Disable All' : 'Enable All'}
              </Button>
            </div>

            <Separator />

            {Object.entries(pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="capitalize text-base">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <p className="text-sm text-gray-500">Push alert for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={() => handlePushChange(key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {saved && <Check className="mr-2 h-4 w-4" />} {saved ? 'Saved' : isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NotificationSettings;
