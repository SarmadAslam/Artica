
import Header from "../../../features/auth/Components/Header"
import { InputOTPForm } from "./InputOTPForm"

export default function VerifyOTP() {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Verify Your Email</h2>
        <InputOTPForm />
    </div>
    </>
  )
}
