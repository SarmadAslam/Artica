import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Mail } from "lucide-react";
import ButtonLoader from "../../../components/ui/ButtonLoader";

// Validation schema using zod
const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required." }),
});

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Initialize the form with react-hook-form and zod
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Send email for password reset
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email: data.email });
      setSuccessMessage("A password reset link has been sent to your email.");
    } catch (err: any) {
      setError("An error occurred while sending the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            {/* Display error for invalid email */}
            {form.formState.errors.email && (
              <div className="text-red-600 text-sm font-medium">
                {form.formState.errors.email.message}
              </div>
            )}
          </div>

          {/* Error and Success Message */}
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          {successMessage && <div className="text-green-600 text-sm font-medium">{successMessage}</div>}

          {/* Submit Button with Loader */}
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? (
              <ButtonLoader
                loading={loading}
                loadingText="Sending..."
                className="flex items-center justify-center"
              />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </div>
      </form>

      {/* Back to Login */}
      <div className="text-center">
        <a href="/login" className="underline underline-offset-4 text-[#421970] hover:text-[#9C27B0]">Back to Login</a>
      </div>
    </div>
  );
}
