import Header from "../../../features/auth/Components/Header";
import { RegisterForm } from "./register-form"

export default function Register() {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 ">
      <div className="w-full max-w-lg">
        <RegisterForm />
      </div>
    </div>
    </>
  );
}

