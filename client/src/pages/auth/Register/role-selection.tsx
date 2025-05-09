"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { RadioGroup } from "../../../components/ui/radio-group";

// Zod schema to validate form data
const FormSchema = z.object({
  type: z.enum(["client", "artist"], {
    required_error: "You need to select a role.",
  }),
});

export function RoleSelection() {
  const [role, setRole] = useState<string>(""); // Track selected role
  const navigate = useNavigate(); // Using React Router's useNavigate

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: undefined, // Ensure the default value is empty
    },
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Store the role in localStorage (optional)
    localStorage.setItem("role", data.type);

    // Navigate to the register page with the selected role
    navigate(`/register?role=${data.type}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Join as a Client or Artist</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value} // Bind the RadioGroup value to form field value
                    onValueChange={(value) => {
                      field.onChange(value); // Update form value
                      setRole(value); // Set the selected role
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <Card
                      onClick={() => {
                        setRole("client");
                        field.onChange("client"); // Ensure form state updates
                      }}
                      className={`p-6 border rounded-lg cursor-pointer transition-all ${
                        role === "client" ? "border-[#FD7000] shadow-lg" : "border-gray-300"
                      }`}
                    >
                      <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <FormLabel className="text-xl text-center font-semibold cursor-pointer">
                          I’m a client, looking to hire artists or buy artwork
                        </FormLabel>
                      </CardContent>
                    </Card>

                    <Card
                      onClick={() => {
                        setRole("artist");
                        field.onChange("artist"); // Ensure form state updates
                      }}
                      className={`p-6 border cursor-pointer rounded-lg transition-all ${
                        role === "artist" ? "border-[#FD7000] shadow-lg" : "border-gray-300"
                      }`}
                    >
                      <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <FormLabel className="text-xl text-center font-semibold cursor-pointer">
                          I’m an artist, looking to sell artwork or apply for jobs
                        </FormLabel>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!role} // Disable the button if no role is selected
            className="w-full disabled:cursor-not-allowed h-12"
          >
            {role
              ? `Join as ${role.charAt(0).toUpperCase() + role.slice(1)}`
              : "Select a role to continue"}
          </Button>
        </form>
      </Form>
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4 text-[#421970] hover:text-[#9C27B0]">
  Login
</a>
      </p>
    </div>
  );
}