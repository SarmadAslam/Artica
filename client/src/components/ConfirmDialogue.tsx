import { useState, cloneElement, isValidElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void> | void;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as React.ReactElement, {
        onClick: (e: any) => {
          e.stopPropagation(); // important
          e.preventDefault(); // important
          setOpen(true);
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }
        },
      })
    : trigger;

  return (
    <>
      {triggerNode}
      <Dialog open={open} onOpenChange={(isOpen) => !loading && setOpen(isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
              {loading ? "Processing..." : confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
