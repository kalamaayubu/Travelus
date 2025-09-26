"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import AlertDialog from "../reusable/AlertDialog";

const RideConfirmationDialog = ({ notif, onClose, onConfirmed }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | confirming | success | error
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // ✅ Reset state on close
  useEffect(() => {
    if (!notif) {
      resetState();
    }
  }, [notif]);

  const resetState = () => {
    setHoldProgress(0);
    setIsHolding(false);
    setStatus("idle");
    setShowErrorDialog(false);
  };

  // --- Hold logic ---
  useEffect(() => {
    let interval;
    if (isHolding && status === "idle") {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsHolding(false);
            simulateConfirm();
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isHolding, status]);

  const simulateConfirm = () => {
    setStatus("confirming");
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        setStatus("success");
        onConfirmed?.();
      } else {
        setStatus("error");
        setShowErrorDialog(true);
      }
    }, 5000);
  };

  return (
    <>
      {/* ✅ Confirmation dialog */}
      <AlertDialog
        open={!!notif && status !== "success"}
        onOpenChange={onClose}
        title="Confirm Ride Boarding"
        description="Please confirm that you have boarded this ride. Once confirmed, payment will be disbursed to the driver."
        icon={<CheckCircle className="text-orange-500" size={28} />}
      >
        {status === "idle" && (
          <button onClick={onClose} className="secondary-btn w-full mb-3">
            Cancel
          </button>
        )}
        <motion.div
          className={`w-full h-10 rounded-lg overflow-hidden relative ${
            status === "confirming"
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gray-700 cursor-pointer"
          }`}
          onMouseDown={() => status === "idle" && setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => status === "idle" && setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-green-600"
            animate={{ width: `${holdProgress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
            {status === "confirming"
              ? "Confirming..."
              : holdProgress > 0
                ? "Hold to Confirm..."
                : "Press & Hold to Confirm"}
          </span>
        </motion.div>
      </AlertDialog>

      {/* ✅ Success dialog */}
      <AlertDialog
        open={status === "success"}
        onOpenChange={(open) => {
          if (!open) {
            resetState();
            onClose();
          }
        }}
        actionLabel="Okay"
        onAction={() => {
          resetState();
          onClose();
        }}
        title="Ride Confirmed"
        description="Your ride has been confirmed successfully. Payment will be released to the driver."
        icon={<CheckCircle className="text-green-500" size={28} />}
      />

      {/* ✅ Error dialog */}
      <AlertDialog
        open={showErrorDialog}
        onOpenChange={() => setShowErrorDialog(false)}
        title="Confirmation Failed"
        description="We could not confirm your ride. Please try again."
        icon={<XCircle className="text-red-500" size={28} />}
        actions={[
          {
            label: "Cancel",
            variant: "secondary",
            onClick: () => {
              setShowErrorDialog(false);
              resetState();
              onClose();
            },
          },
          {
            label: "Try Again",
            variant: "primary",
            onClick: () => {
              setShowErrorDialog(false);
              setStatus("idle");
              setHoldProgress(0);
            },
          },
        ]}
      />
    </>
  );
};

export default RideConfirmationDialog;
