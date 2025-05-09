import { useEffect, useState } from "react";
import { Eye, EyeOff, Key } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ButtonLoader from "../../../components/ui/ButtonLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema with Zod
const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const handleSubmitForm = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!token) {
      setError("Invalid or missing token.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/reset-password",
        { token, newPassword: data.newPassword }
      );
      setSuccessMessage("Your password has been reset successfully.");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login after successful password reset
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [successMessage]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-6">
          {/* New Password Field */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("newPassword")}
                  className="pl-10 pr-2 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none bg-background z-10"
                >
                  {showPassword ? <EyeOff size={18} className="z-10" /> : <Eye size={18} />}
                </button>
              </div>
              {formState.errors.newPassword && (
                <p className="text-red-600 text-sm">
                  {formState.errors.newPassword.message}
                </p>
              )}
            </div>

             {/* Confirm New Password Field */}
             <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="pl-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none bg-background z-10"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formState.errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && <p className="ml-4 text-red-600">{error}</p>}
            {successMessage && (
              <p className="ml-4 text-green-600">{successMessage}</p>
            )}
            {successMessage && (
              <p className="ml-4 text-gray-600">
                You will be redirected to the login page in 3 seconds.{" "}
                <a href="/login" className="underline underline-offset-4">
                  Go to login page now
                </a>
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 text-md w-full"
            disabled={loading}
          >
            {loading ? (
              <ButtonLoader
                size={10}
                loading={loading}
                loadingText="Changing Your Password..."
              />
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}