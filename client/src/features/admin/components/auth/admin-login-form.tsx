import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 React Router for redirection
import { cn } from "../../../../lib/utils";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Brush, Eye, EyeOff, Mail, Key } from "lucide-react";
import { loginAdmin } from "@/api/auth";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 👈 useNavigate for programmatic navigation

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setEmailError(false);
    setPasswordError(false);
    setLoading(true);

    try {
      const response = await loginAdmin({ email, password });
      localStorage.setItem("token", response.token!);
      navigate("/admin/dashboard"); // 👈 redirect using React Router
    } catch (err: any) {
      setLoading(false);
      if (err === "Email not verified. Please verify OTP.") {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(err || "Username or password is incorrect.");
        setEmailError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex w-8 items-center justify-center rounded-md">
                <Brush className="size-6" />
              </div>
            </a>
            <h1 className="text-xl font-bold">Login as Admin</h1>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500 pl-10" : "pl-10"}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500 pl-10 pr-12" : "pl-10 pr-12"}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && <p className="ml-4 text-red-600">{error}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
