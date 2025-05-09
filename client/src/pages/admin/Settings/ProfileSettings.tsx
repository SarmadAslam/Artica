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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check } from 'lucide-react';
import { getUsers, updateUser } from '@/api/users';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  about: string;
  country: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const ProfileSettings = () => {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    about: '',
    country: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  });

  useEffect(() => {
    getUsers()
      .then((res) => {
        const admin = res.find((u: any) => u.isAdmin && u.accessGranted);
        if (admin) {
          setUserId(admin._id);
          setFormData({
            firstName: admin.firstName || '',
            lastName: admin.lastName || '',
            email: admin.email,
            phone: admin.phone || '',
            about: admin.about || '',
            country: admin.country || '',
            twitter: admin.twitter || '',
            linkedin: admin.linkedin || '',
            instagram: admin.instagram || ''
          });
        }
      })
      .catch((err) => console.error('Failed to fetch user data', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      await updateUser(userId, formData);
      setSaved(true);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const initials = `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase();

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and public profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" value={formData.email} disabled />
                <p className="text-xs text-gray-500">To change your email, use the Email Settings tab</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Bio</Label>
              <Textarea id="about" name="about" value={formData.about} onChange={handleChange} rows={4} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['twitter', 'linkedin', 'instagram'].map((platform) => (
                <div key={platform} className="space-y-2">
                  <Label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      {platform === 'linkedin' ? 'in/' : '@'}
                    </span>
                    <Input
                      id={platform}
                      name={platform}
                      value={formData[platform as keyof typeof formData]}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {saved && <Check className="mr-2 h-4 w-4" />} {saved ? 'Saved' : loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileSettings;
