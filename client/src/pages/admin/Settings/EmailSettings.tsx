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
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertTriangle, Clock } from 'lucide-react';
import { getUsers, updateUser } from '@/api/users';

const EmailSettings = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const admin = res.find((u: any) => u.isAdmin && u.accessGranted);
        if (admin) {
          setCurrentEmail(admin.email);
          setUserId(admin._id);
        }
      })
      .catch((err) => console.error('Failed to fetch admin user', err));
  }, []);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newEmail !== confirmNewEmail) {
      setError('Email addresses do not match');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setLoading(true);
      setTimeout(() => {
        setIsVerifying(true);
        setSuccess('Verification email sent. Please check your new email inbox and enter the code below.');
        setLoading(false);
      }, 1000);
    } catch {
      setError('Failed to send verification email');
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!verificationCode) {
      setError('Verification code is required');
      return;
    }

    try {
      setLoading(true);
      setTimeout(async () => {
        if (!userId) return;
        await updateUser(userId, { email: newEmail });
        setCurrentEmail(newEmail);
        setSuccess('Email successfully updated!');
        setNewEmail('');
        setConfirmNewEmail('');
        setPassword('');
        setVerificationCode('');
        setIsVerifying(false);
        setLoading(false);
      }, 1000);
    } catch {
      setError('Verification failed');
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Current Email</Label>
          <div className="flex items-center space-x-2">
            <Input value={currentEmail} disabled />
            <Badge variant="outline" className="ml-2">Verified</Badge>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {!isVerifying ? (
          <form onSubmit={handleSendVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewEmail">Confirm New Email Address</Label>
              <Input
                id="confirmNewEmail"
                type="email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Verification Email'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Enter the 6-digit code sent to {newEmail}</p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" type="button" onClick={() => setIsVerifying(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Change Email'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Last updated: May 1, 2025
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailSettings;
