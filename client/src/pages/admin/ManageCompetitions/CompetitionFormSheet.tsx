import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetFooter, SheetClose
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateCompetitionMutation } from "@/api/competitions";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CompetitionType } from "@/types/competition";

type CompetitionFormType = Pick<
  CompetitionType,
  "title" | "description" | "guidelines" | "deadline" | "status" | "votes"
>;

const fieldConfig: Record<keyof CompetitionFormType, { label: string; required: boolean }> = {
  title: { label: "Title", required: true },
  description: { label: "Description", required: true },
  guidelines: { label: "Guidelines", required: true },
  deadline: { label: "Deadline", required: true },
  status: { label: "Status", required: true },
  votes: { label: "Votes", required: false },
};

export function CompetitionFormSheet() {
  const [open, setOpen] = useState(false);
  const [createCompetition] = useCreateCompetitionMutation();
  const [form, setForm] = useState<CompetitionFormType>({
    title: "",
    description: "",
    guidelines: "",
    deadline: "",
    status: "draft",
    votes: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CompetitionFormType, string>>>({});

  const handleChange = (field: keyof CompetitionFormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof CompetitionFormType, string>> = {};
    let valid = true;

    for (const key in fieldConfig) {
      const config = fieldConfig[key as keyof CompetitionFormType];
      const value = form[key as keyof CompetitionFormType];

      if (config.required && (!value || value.toString().trim() === "")) {
        newErrors[key as keyof CompetitionFormType] = `${config.label} is required.`;
        valid = false;
        continue;
      }

      if (key === "deadline") {
        const today = new Date().setHours(0, 0, 0, 0);
        const deadlineDate = new Date(value).setHours(0, 0, 0, 0);
        if (deadlineDate < today) {
          newErrors[key as keyof CompetitionFormType] = "Deadline cannot be in the past.";
          valid = false;
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await toast.promise(createCompetition(form), {
        loading: "Creating...",
        success: "Competition created",
        error: "Failed to create",
      });
      setOpen(false);
      setForm({
        title: "",
        description: "",
        guidelines: "",
        deadline: "",
        status: "draft",
        votes: 0,
      });
    } catch (error) {
      console.error("Create failed", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Create Competition</Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>New Competition</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {Object.entries(fieldConfig).map(([key, config]) => {
            const k = key as keyof CompetitionFormType;

            if (k === "status") {
              return (
                <div key={k}>
                  <Label>{config.label}</Label>
                  <Select value={form[k]} onValueChange={(val) => handleChange(k, val)}>
                    <SelectTrigger className={errors[k] ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors[k] && <p className="text-sm text-red-500">{errors[k]}</p>}
                </div>
              );
            }

            const type = k === "deadline" ? "date" : k === "votes" ? "number" : "text";

            return (
              <div key={k}>
                <Label>{config.label}</Label>
                <Input
                  type={type}
                  value={form[k]?.toString() || ""}
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
