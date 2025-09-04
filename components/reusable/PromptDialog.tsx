'use client';

import { useState } from "react";
import ReusableDialog from "./dialog"
import { X } from "lucide-react";

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export default function ActionDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  onAction,
}: ActionDialogProps) {

    const [showLoginDialog, setShowLoginDialog] = useState(false);
    
    // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <ReusableDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        closable={false}
        contentClassName="bg-gray-900 border-[2px] border-gray-600"
      >
        <div onClick={handleCloseDialog} className="relative mx-auto justify-center p-10 flex flex-col cursor-pointer opacity-80 items-center bg-gray-800 hover:opacity-100 hover:border hover:border-gray-600 rounded-full">
          <X className="font-bold text-red-600 opacity-100"/>
        </div>
        <p className="text-center text-xl font-bold">{title}</p>
        <p className="text-sm text-center text-gray-400">
          {description}
        </p>
        <button className="primary-btn py-5 mt-4" onClick={() => (window.location.href = '/auth/login')}>
            {actionLabel}
          </button>
      </ReusableDialog>
  )
}