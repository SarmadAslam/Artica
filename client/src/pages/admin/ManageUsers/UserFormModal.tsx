// src/features/admin/components/UserFormModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createUser } from "@/api/users"; // ✅ Actual API call

// Validation Schema
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["client", "artist"], { required_error: "Role is required" }),
});

type UserFormValues = z.infer<typeof userSchema>;

export function UserFormModal({ onUserCreated }: { onUserCreated?: () => void }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "client",
    },
  });

  async function onSubmit(values: UserFormValues) {
    try {
      await createUser(values); // ✅ Actual API call
      toast.success("User created successfully!");
      reset();
      setOpen(false);
      onUserCreated?.(); // ✅ Refresh parent view
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label>First Name</Label>
            <Input {...register("firstName")} placeholder="Enter first name" />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label>Last Name</Label>
            <Input {...register("lastName")} placeholder="Enter last name" />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input {...register("email")} placeholder="Enter email" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Role</Label>
            <select {...register("role")} className="w-full border p-2 rounded">
              <option value="client">Client</option>
              <option value="artist">Artist</option>
            </select>
            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
