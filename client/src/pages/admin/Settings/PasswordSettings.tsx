import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Check, Clock, Key } from 'lucide-react';
import { updatePassword } from '@/api/auth'; // Adjust path if needed

const PasswordSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordStrength < 75) {
      setError('Please use a stronger password');
      return;
    }

    try {
      const res = await updatePassword(formData.currentPassword, formData.newPassword);
      setSuccess(res.message || 'Password successfully changed');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setPasswordStrength(0);
    } catch (err: any) {
      setError(err);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Settings</CardTitle>
        <CardDescription>Change your account password</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-700 border-green-200 mb-4">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} required />
            {formData.newPassword && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Password Strength</span>
                  <span>{getStrengthText()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${getStrengthColor()} h-2 rounded-full transition-all`} style={{ width: `${passwordStrength}%` }} />
                </div>
                <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc pl-4">
                  <li className={formData.newPassword.length >= 8 ? 'text-green-500' : ''}>At least 8 characters</li>
                  <li className={/[A-Z]/.test(formData.newPassword) ? 'text-green-500' : ''}>At least one uppercase letter</li>
                  <li className={/[0-9]/.test(formData.newPassword) ? 'text-green-500' : ''}>At least one number</li>
                  <li className={/[^A-Za-z0-9]/.test(formData.newPassword) ? 'text-green-500' : ''}>At least one special character</li>
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            {formData.newPassword && formData.confirmPassword && (
              <p className={`text-xs mt-1 ${formData.newPassword === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                {formData.newPassword === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            <Key className="mr-2 h-4 w-4" />
            Update Password
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Last changed: April 15, 2025
        </div>
        <Button variant="ghost" size="sm">Forgot Password?</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordSettings;
