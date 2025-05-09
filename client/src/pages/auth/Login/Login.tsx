import Footer from "../../../features/auth/Components/Footer";
import Header from "../../../features/auth/Components/Header";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <>
    <Header />
     {/* <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
       <div className="border border-gray-300 px-8 py-8 rounded-lg max-w-sm w-full max-w-sm"> */}
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    <Footer />
    </>
  )
}
