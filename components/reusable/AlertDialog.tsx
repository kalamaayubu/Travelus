"use client";

import ReusableDialog from "./dialog"
import { ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "destructive"

type DialogAction = {
  label: ReactNode
  variant?: ButtonVariant
  onClick?: () => void
}

type AlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "success" | "error" | "info"
  title: string
  description?: string
  /** single action shorthand (kept for backwards compatibility) */
  actionLabel?: ReactNode
  onAction?: () => void
  /** multiple actions */
  actions?: DialogAction[]
  icon?: ReactNode
  children?: ReactNode
}

export default function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  onAction,
  actions,
  icon,
  children,
}: AlertDialogProps) {
  // map variant → css class
  const getButtonClass = (variant: ButtonVariant = "primary") =>
    variant === "primary"
      ? "primary-btn"
      : variant === "secondary"
      ? "secondary-btn"
      : "destructive-btn"


  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      closable={false}
      contentClassName="bg-gray-800 border border-gray-800"
    >
      <div className="flex flex-col items-center gap-4">
        {icon && <div className="p-8 bg-gray-700/50 rounded-full">{icon}</div>}
        <h2 className="text-xl font-bold text-gray-200 text-center">{title}</h2>
        {description && (
          <p className="text-sm text-gray-400 text-center">{description}</p>
        )}

        {/* If children exist, render them directly */}
        {children ? (
          <div className="w-full">{children}</div>
        ) : actions && actions.length > 0 ? (
          <div className="flex justify-center gap-4 mt-4 w-full">
            {actions.map((action, i) => (
              <button
                key={i}
                className={getButtonClass(action.variant) + " py-2 flex-1 whitespace-nowrap"}
                onClick={() => {
                  action.onClick?.()
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : (
          <button
            className="primary-btn py-3 mt-4 w-full"
            onClick={() => {
              onOpenChange(false)
              onAction?.()
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </ReusableDialog>
  )
}
