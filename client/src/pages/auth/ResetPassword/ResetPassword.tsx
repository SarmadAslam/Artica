import Footer from "../../../features/auth/Components/Footer";
import Header from "../../../features/auth/Components/Header";
import ResetPasswordForm from "./reset-password";



export default function ResetPassword() {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center min-h-screen justify-center gap-6 bg-background p-6 md:p-10">
      <h2 className="text-3xl font-semibold text-center">Reset Password</h2>
      <div className="w-full max-w-lg">
        <ResetPasswordForm />
      </div>
    </div>
    <Footer />
    </>
  )
}
