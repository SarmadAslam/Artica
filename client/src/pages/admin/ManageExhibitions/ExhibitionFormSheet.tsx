import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetFooter, SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select";
import { useCreateExhibitionMutation } from "@/api/exhibitions";
import { ExhibitionType } from "@/types/exhibition";

type ExhibitionFormType = Pick<
  ExhibitionType,
  "title" | "description" | "guidelines" | "startDate" | "endDate" | "status"
>;

const fieldConfig: Record<keyof ExhibitionFormType, { label: string; required: boolean }> = {
  title: { label: "Title", required: true },
  description: { label: "Description", required: true },
  guidelines: { label: "Guidelines", required: true },
  startDate: { label: "Start Date", required: true },
  endDate: { label: "End Date", required: true },
  status: { label: "Status", required: true },
};

export function ExhibitionFormSheet() {
  const [open, setOpen] = useState(false);
  const [createExhibition] = useCreateExhibitionMutation();
  const [form, setForm] = useState<ExhibitionFormType>({
    title: "",
    description: "",
    guidelines: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ExhibitionFormType, string>>>({});

  const handleChange = (key: keyof ExhibitionFormType, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof ExhibitionFormType, string>> = {};
    let valid = true;

    for (const key in fieldConfig) {
      const val = form[key as keyof ExhibitionFormType];
      if (fieldConfig[key as keyof ExhibitionFormType].required && !val) {
        newErrors[key as keyof ExhibitionFormType] = `${fieldConfig[key as keyof ExhibitionFormType].label} is required.`;
        valid = false;
      }
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(form.startDate).setHours(0, 0, 0, 0);
    const end = new Date(form.endDate).setHours(0, 0, 0, 0);

    if (start < today) {
      newErrors.startDate = "Start date cannot be in the past.";
      valid = false;
    }

    if (end <= start) {
      newErrors.endDate = "End date must be after the start date.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await toast.promise(createExhibition(form), {
      loading: "Creating...",
      success: "Exhibition created",
      error: "Failed to create",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Create Exhibition</Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>New Exhibition</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          {Object.entries(fieldConfig).map(([key, config]) => {
            const k = key as keyof ExhibitionFormType;
            const inputType = k.includes("Date") ? "date" : "text";

            if (k === "status") {
              return (
                <div key={k}>
                  <Label>{config.label}</Label>
                  <Select value={form[k]} onValueChange={(val) => handleChange(k, val)}>
                    <SelectTrigger className={errors[k] ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors[k] && <p className="text-sm text-red-500">{errors[k]}</p>}
                </div>
              );
            }

            return (
              <div key={k}>
                <Label>{config.label}</Label>
                <Input
                  type={inputType}
                  value={form[k]}
                  onChange={(e) => handleChange(k, e.target.value)}
                  className={errors[k] ? "border-red-500" : ""}
                />
                {errors[k] && <p className="text-sm text-red-500">{errors[k]}</p>}
              </div>
            );
          })}
        </div>
        <SheetFooter className="mt-auto">
          <Button onClick={handleSubmit}>Submit</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
