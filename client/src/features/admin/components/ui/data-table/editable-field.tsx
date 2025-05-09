import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type EditableFieldProps = {
  id?: string;
  label: string;
  initialValue: string | number;
  onSubmit: (value: string) => Promise<void> | void;
  inputClassName?: string;
  type?: "text" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  validateAsNumber?: boolean;
};

export function EditableField({
  id,
  label,
  initialValue,
  onSubmit,
  inputClassName,
  type = "text",
  options = [],
  placeholder = "",
  required = false,
  validateAsNumber = false,
}: EditableFieldProps) {
  const [value, setValue] = useState(String(initialValue));
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (required && !value.trim()) {
      setError("This field is required.");
      return;
    }

    if (validateAsNumber && isNaN(Number(value))) {
      setError("Please enter a valid number.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(value);
      setEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        {editing ? (
          type === "select" ? (
            <Select
              value={value}
              onValueChange={(val) => setValue(val)}
              disabled={loading}
            >
              <SelectTrigger id={id} className={cn("h-8 w-48", error && "border-red-500") }>
                <SelectValue placeholder={placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={id}
              className={cn("h-8", inputClassName, error && "border-red-500")}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={loading}
              placeholder={placeholder}
            />
          )
        ) : (
          <div className="text-sm text-foreground min-w-[5rem]">
            {value || <span className="text-muted-foreground italic">(empty)</span>}
          </div>
        )}

        {!editing ? (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={loading}
              onClick={handleSubmit}
              aria-label="Save"
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={loading}
              onClick={() => {
                setValue(String(initialValue));
                setEditing(false);
                setError(null);
              }}
              aria-label="Cancel"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
