import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp, resendOtp } from "../../../api/auth";
import ButtonLoader from "@/components/ui/ButtonLoader";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const [otpError, setOtpError] = useState<string>("");
  const [otpSuccess, setOtpSuccess] = useState<string>("");
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const [loading, setLoading] = useState({
    verifyLoading: false,
    resendLoading: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpSuccess("");
    setLoading((prev) => ({ ...prev, verifyLoading: true })); // Set verify loading to true

    try {
      await verifyOtp(email, form.getValues().pin);
      setOtpSuccess("Email verified successfully! Redirecting...");
      toast.success("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setOtpError(err || "Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, verifyLoading: false })); // Set verify loading to false
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpSuccess("");
    setLoading((prev) => ({ ...prev, resendLoading: true })); // Set resend loading to true

    try {
      await resendOtp(email);
      setOtpSuccess("OTP has been resent to your email.");
      toast.success("OTP has been resent to your email.");
      setResendCooldown(60); // Start countdown for resend
    } catch (err: any) {
      setOtpError(err || "Failed to resend OTP. Try again later.");
      toast.error("Failed to resend OTP. Try again later.");
    } finally {
      setLoading((prev) => ({ ...prev, resendLoading: false })); // Set resend loading to false
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleVerifyOtp(); // Trigger OTP verification
    toast.success("You submitted the following values:");
    toast.custom((id) => (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>

              {/* Only display the OTP error or form validation error */}
              <div className="flex flex-col items-center justify-center space-y-2">
                {/* Show OTP error first, then validation error */}
                {otpError && (
                  <div className="text-red-600 text-sm font-medium">
                    {otpError}
                  </div>
                )}
                {otpSuccess && (
                  <div className="text-green-600 text-sm font-medium">
                    {otpSuccess}
                  </div>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Verify OTP button */}
        <Button
          type="submit"
          className="w-full"
          disabled={loading.verifyLoading || loading.resendLoading}
        >
          {loading.verifyLoading ? (
            <ButtonLoader
              loading={loading.verifyLoading}
              loadingText="Verifying Your Code..."
              className="flex items-center justify-center"
            />
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Resend OTP button */}
        <Button
          type="button"
          onClick={handleResendOtp}
          disabled={
            loading.resendLoading || loading.verifyLoading || resendCooldown > 0
          }
          variant={"secondary"}
          className="w-full"
        >
          {loading.resendLoading ? (
            <ButtonLoader
              size={10}
              loading={loading.resendLoading}
              loadingText="Resending OTP..."
              className="flex items-center justify-center"
            />
          ) : resendCooldown > 0 ? (
            `Resend in ${resendCooldown}s`
          ) : (
            "Resend OTP"
          )}
        </Button>
      </form>
    </Form>
  );
}
