import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
  } from "@/components/ui/sheet";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  import { useCreateNewsMutation } from "@/api/news";
  import { toast } from "sonner";
  
  export function NewsFormSheet() {
    const [open, setOpen] = useState(false);
    const [createNews] = useCreateNewsMutation();
    const [form, setForm] = useState({
      title: "",
      content: "",
      category: "general",
      published: false,
    });
  
    const handleChange = (field: string, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = async () => {
      await toast.promise(createNews(form), {
        loading: "Publishing...",
        success: "News published",
        error: "Failed to post",
      });
      setOpen(false);
    };
  
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Create News</Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle>Post News / Update</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>
            <div>
              <Label>Content</Label>
              <Input value={form.content} onChange={(e) => handleChange("content", e.target.value)} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => handleChange("category", e.target.value)} />
            </div>
          </div>
          <SheetFooter className="mt-auto grid gap-2">
            <Button onClick={handleSubmit}>Publish</Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
  