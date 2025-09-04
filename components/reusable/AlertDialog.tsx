"use client"

import ReusableDialog from "./dialog"
import { ReactNode } from "react"

type AlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "success" | "error" | "info"
  title: string
  description?: string
  actionLabel?: ReactNode
  onAction?: () => void
  icon?: ReactNode;
}

export default function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel = "OK",
  onAction,
  icon,
}: AlertDialogProps) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      closable={false}
      contentClassName="bg-gray-900 border border-gray-800"
    >
      <div className="flex flex-col items-center gap-4 p-6">
        {icon && <div className="p-8 bg-gray-800 rounded-full">{icon}</div>}
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
