import { CheckCircle, XCircle } from "lucide-react";

interface PasswordRequirementsProps {
  password: string;
}

const requirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "At least one uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "At least one lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "At least one number", test: (pw: string) => /\d/.test(pw) },
  { label: "At least one special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <ul className="flex flex-col gap-1 mt-2 text-sm">
      {requirements.map((req, index) => {
        const isValid = req.test(password);
        return (
          <li key={index} className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle size={16} className="text-green-600" />
            ) : (
              <XCircle size={16} className="text-red-600" />
            )}
            <span className={isValid ? "text-green-700" : "text-red-700"}>
              {req.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
