import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import { useState, useRef } from "react"
import { toast } from "sonner"

export type FieldType = "text" | "number" | "date" | "select" | "boolean"

export type RowDetailSheetProps<T> = {
  row: T
  labelKey?: keyof T
  triggerContent?: React.ReactNode
  onSave: (id: string, updatedData: T) => Promise<void>
  fieldConfig?: Partial<Record<keyof T, { label?: string; type?: FieldType; options?: string[]; required?: boolean }>>
  refetch?: () => void;
}

export function RowDetailSheet<T extends Record<string, any>>({
  row,
  labelKey,
  triggerContent,
  onSave,
  fieldConfig = {},
  refetch,
}: RowDetailSheetProps<T>) {
  const [form, setForm] = useState<T>(row)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  const handleChange = (key: keyof T, value: any) => {
    setForm({ ...form, [key]: value })
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateForm = (): boolean => {
    let valid = true;
    let newErrors: Partial<Record<keyof T, string>> = {};

    for (const key in form) {
      const config = fieldConfig[key];
      const value = form[key];

      if (config?.required && (!value || String(value).trim() === "")) {
        newErrors[key] = "This field is required.";
        valid = false;
      }

      if (config?.type === "number" && value && isNaN(Number(value))) {
        newErrors[key] = "Must be a valid number.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true)
    try {
      await toast.promise(onSave(row.id, form), {
        loading: "Saving...",
        success: "Updated successfully",
        error: "Failed to update",
      });
      sheetCloseRef.current?.click();
      setForm(row);
      setErrors({});
      refetch?.();
    } finally {
      setSaving(false);
    }
  }

  const renderField = (key: keyof T, value: any) => {
    const config = fieldConfig[key] || {}
    const type = config.type || (typeof value === "boolean" ? "boolean" : "text")
    const label = config.label ?? String(key).replace(/([A-Z])/g, " $1")

    if (type === "select" && config.options) {
      return (
        <Select value={String(value)} onValueChange={(val) => handleChange(key, val)}>
          <SelectTrigger className={errors[key] ? "border-red-500" : ""}><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>
            {config.options.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    if (type === "boolean") {
      return (
        <Select value={String(value)} onValueChange={(val) => handleChange(key, val === "true")}> 
          <SelectTrigger className={errors[key] ? "border-red-500" : ""}><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="true">True</SelectItem>
            <SelectItem value="false">False</SelectItem>
          </SelectContent>
        </Select>
      )
    }

    if (type === "date") {
      return (
        <Input
          type="date"
          value={new Date(value).toISOString().split("T")[0]}
          onChange={(e) => handleChange(key, e.target.value)}
          className={errors[key] ? "border-red-500" : ""}
        />
      )
    }

    return (
      <Input
        type={type}
        value={String(value)}
        onChange={(e) => handleChange(key, e.target.value)}
        className={errors[key] ? "border-red-500" : ""}
      />
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {triggerContent ?? (
          <Button variant="link" className="px-0 text-left text-foreground">
            {row[labelKey || "id"]}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit Details</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto py-4 text-sm">
          {Object.entries(form).map(([key, value]) => {
            if (["_id", "id", "createdAt", "updatedAt"].includes(key)) return null
            return (
              <div key={key} className="flex flex-col gap-1">
                <Label className="capitalize">{fieldConfig[key as keyof T]?.label || key}</Label>
                {renderField(key as keyof T, value)}
                {errors[key as keyof T] && (
                  <div className="text-red-500 text-xs">{errors[key as keyof T]}</div>
                )}
              </div>
            )
          })}
        </div>
        <SheetFooter className="mt-4 grid grid-cols-1 gap-2">
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <div className="flex items-center gap-2">
                <span>Saving...</span>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <SheetClose asChild>
            <Button ref={sheetCloseRef} variant="outline" onClick={() => { setForm(row); setErrors({}); }}>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
