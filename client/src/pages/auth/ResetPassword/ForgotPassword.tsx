import Header from "../../../features/auth/Components/Header";
import { ForgotPasswordForm } from "./forgot-password";



export default function ForgotPassword() {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background p-6 md:p-10">
      
      <h2 className="text-3xl font-semibold text-center">Forgot Password</h2>
      <div className="w-full max-w-lg">
        <ForgotPasswordForm />
      </div>
    </div>
    </>
  )
}
