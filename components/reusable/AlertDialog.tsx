"use client"

import { Check, X } from "lucide-react"
import ReusableDialog from "./dialog"

type AlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "success" | "error" | "info"
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  closable?: boolean
}

const iconMap = {
  success: <Check className="text-green-500 w-8 h-8" />,
  error: <X className="text-red-500 w-8 h-8" />,
  info: <span className="text-blue-500 text-2xl">ℹ️</span>,
}

export default function AlertDialog({
  open,
  onOpenChange,
  type = "info",
  title,
  description,
  actionLabel = "OK",
  onAction,
  closable = false,
}: AlertDialogProps) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      closable={closable}
      contentClassName="bg-gray-900 border border-gray-800"
    >
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="p-8 bg-gray-800 rounded-full">{iconMap[type]}</div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
        {description && (
          <p className="text-sm text-gray-400 text-center">{description}</p>
        )}
        <button
          className="primary-btn py-3 mt-4 w-full"
          onClick={() => {
            onOpenChange(false)
            onAction?.()
          }}
        >
          {actionLabel}
        </button>
      </div>
    </ReusableDialog>
  )
}
