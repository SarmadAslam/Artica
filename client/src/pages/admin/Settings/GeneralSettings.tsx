import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';
import { getUsers, updateUser } from '@/api/users';

interface GeneralSettingsFormData {
  siteName: string;
  siteDescription: string;
  siteURL: string;
  contactEmail: string;
  timezone: string;
  dateFormat: string;
  language: string;
}

const GeneralSettings = () => {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GeneralSettingsFormData>({
    siteName: '',
    siteDescription: '',
    siteURL: '',
    contactEmail: '',
    timezone: '',
    dateFormat: '',
    language: ''
  });

  useEffect(() => {
    getUsers()
      .then((res) => {
        const admin = res.find((u: any) => u.isAdmin && u.accessGranted);
        if (admin) {
          setUserId(admin._id);
          setFormData({
            siteName: admin.siteName || 'Artica - Art Freelancing Platform',
            siteDescription: admin.siteDescription || 'A platform for artists to connect, collaborate, and showcase their work.',
            siteURL: admin.siteURL || 'https://www.artica.com',
            contactEmail: admin.contactEmail || admin.email,
            timezone: admin.timezone || 'UTC+0',
            dateFormat: admin.dateFormat || 'MM/DD/YYYY',
            language: admin.language || 'en-US'
          });
        }
      })
      .catch((err) => console.error('Failed to fetch admin settings', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      await updateUser(userId, formData);
      setSaved(true);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your site's basic configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" name="siteName" value={formData.siteName} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteURL">Site URL</Label>
              <Input id="siteURL" name="siteURL" value={formData.siteURL} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={formData.timezone}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(25)].map((_, i) => {
                    const offset = i - 12;
                    const label = `UTC${offset >= 0 ? '+' : ''}${offset}`;
                    return (
                      <SelectItem key={label} value={label}>{label}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={formData.dateFormat}
                onValueChange={(value) => setFormData(prev => ({ ...prev, dateFormat: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {['MM/DD/YYYY','DD/MM/YYYY','YYYY-MM-DD','MMM D, YYYY','D MMM YYYY'].map(fmt => (
                    <SelectItem key={fmt} value={fmt}>{fmt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {[{ code: 'en-US', label: 'English (US)' }, { code: 'en-GB', label: 'English (UK)' }, { code: 'es', label: 'Spanish' }, { code: 'fr', label: 'French' }, { code: 'de', label: 'German' }, { code: 'it', label: 'Italian' }, { code: 'pt', label: 'Portuguese' }, { code: 'ru', label: 'Russian' }, { code: 'zh', label: 'Chinese' }, { code: 'ja', label: 'Japanese' }].map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setFormData({
            siteName: '',
            siteDescription: '',
            siteURL: '',
            contactEmail: '',
            timezone: '',
            dateFormat: '',
            language: ''
          })}>Reset</Button>
          <Button type="submit" disabled={loading}>
            {saved ? <Check className="mr-2 h-4 w-4" /> : null}
            {saved ? 'Saved' : loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default GeneralSettings;
