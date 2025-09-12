import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ReusableDialogProps } from "@/types";
import { X } from "lucide-react";

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
      <DialogOverlay className="fixed inset-0 bg-gray-800/5 backdrop-blur-sm" />


      <DialogContent
        showCloseButton={closable}
        className={`sm:max-w-md z-50 rounded-xl border border-gray-700 bg-white/10 text-gray-200 shadow-lg ${contentClassName ?? ""}`}

        // Prevent closing on outside click or escape key if closable is false
        onInteractOutside={(e) => {
            if (!closable) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
            if (!closable) e.preventDefault()
        }}
      >
        {/* Custom Close Button */}
        {closable && (
          <DialogClose asChild>
            <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-300 bg-transparent outline-none">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        )}

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