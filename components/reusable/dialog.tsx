import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReusableDialogProps } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export default function ReusableDialog({ 
    trigger, 
    children, 
    title, 
    description, 
    open, 
    onOpenChange ,
    closable = true,
    contentClassName,
    footer
} : ReusableDialogProps ) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        showCloseButton={closable}
        className={contentClassName}
        // Prevent closing on outside click or escape key if closable is false
        onInteractOutside={(e) => {
            if (!closable) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
            if (!closable) e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-300">{title}</DialogTitle>
          {description && (
            <DialogDescription className="mt-1">{description}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}