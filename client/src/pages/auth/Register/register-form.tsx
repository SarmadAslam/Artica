import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Key, CheckCircle, XCircle } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import axios from "axios";
import ButtonLoader from "../../../components/ui/ButtonLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { countries } from "../../../data/countries";

const RegisterSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
  country: z.string().nonempty({ message: "Please select a country" }),
});

// Password validation rules
const passwordRules = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "At least one uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "At least one lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "At least one number", test: (pw: string) => /\d/.test(pw) },
  { label: "At least one special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="flex flex-col gap-1 mt-2 text-sm">
      {passwordRules.map((rule, index) => {
        const isValid = rule.test(password);
        return (
          <li key={index} className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle size={16} className="text-green-600" />
            ) : (
              <XCircle size={16} className="text-red-600" />
            )}
            <span className={isValid ? "text-green-700" : "text-red-700"}>
              {rule.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role");

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (data: any) => {
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        { ...data, role },
        { withCredentials: true }
      );
      window.location.href = `/verify-otp?email=${encodeURIComponent(data.email)}`;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const allPasswordValid = passwordRules.every((rule) => rule.test(passwordValue));

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <a href="/" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md"></div>
          <span className="sr-only">RungLey</span>
        </a>
        <h1 className="text-2xl font-bold pt-4">Welcome to RungLey</h1>
        <p className="text-sm text-muted-foreground">Create your account by filling in the details below</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" {...register("firstName")} className="h-12" />
            {formState.errors.firstName && <p className="text-red-600 text-sm">{formState.errors.firstName.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" {...register("lastName")} className="h-12" />
            {formState.errors.lastName && <p className="text-red-600 text-sm">{formState.errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="email" type="email" {...register("email")} className="pl-10 h-12" />
            {formState.errors.email && <p className="text-red-600 text-sm">{formState.errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password (8 or more characters)"
              {...register("password")}
              className="pl-10 pr-10 h-12"
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => {
                if (allPasswordValid) {
                  setShowPasswordRules(false);
                }
              }}
              onChange={(e) => {
                setPasswordValue(e.target.value);
                setValue("password", e.target.value, { shouldValidate: true });
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none bg-background z-10"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {showPasswordRules && <PasswordRequirements password={passwordValue} />}

          {formState.errors.password && <p className="text-red-600 text-sm">{formState.errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <select id="country" {...register("country")} className="h-12 pl-3 border rounded focus:bg-background bg-background">
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {formState.errors.country && <p className="text-red-600 text-sm">{formState.errors.country.message}</p>}
        </div>

        <Button type="submit" className="h-12 text-md w-full" disabled={loading}>
          {loading ? (
            <ButtonLoader size={10} loading={loading} loadingText="Creating Your Account..." />
          ) : (
            "Create my account"
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
        </div>

        <div className="flex flex-col gap-4 sm:grid-cols-2">
          <Button variant="outline" className="w-full h-12">
            Continue with Apple
          </Button>
          <Button variant="outline" className="w-full h-12">
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4 text-[#421970] hover:text-[#9C27B0]">
          Login
        </a>
      </div>
    </form>
  );
}
