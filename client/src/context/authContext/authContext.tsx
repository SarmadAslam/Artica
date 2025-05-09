import { createContext, ReactNode, useState } from "react";
import { initialSignInFormData, initialSignUpFormData } from "../../config/config";

// Create the context with a default value of null
export const AuthContext = createContext<any>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    return <AuthContext.Provider value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
      }}>{children}</AuthContext.Provider>;
}
