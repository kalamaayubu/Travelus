"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import AlertDialog from "../reusable/AlertDialog";
import { completeBooking } from "@/actions/rider.action";

const RideConfirmationDialog = ({ booking, onClose, onConfirmed }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | confirming | success | error
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    if (!booking) resetState();
  }, [booking]);

  const resetState = () => {
    setHoldProgress(0);
    setIsHolding(false);
    setStatus("idle");
    setShowErrorDialog(false);
  };

  // Hold logic
  useEffect(() => {
    let interval;
    if (isHolding && status === "idle") {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsHolding(false);
            confirmBooking();
            return 100;
          }
          return prev + 3;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isHolding, status]);

  const confirmBooking = async () => {
    if (!booking?.id) {
      console.error("Booking ID is missing!", booking);
      setStatus("error");
      setShowErrorDialog(true);
      return;
    }

    setStatus("confirming");
    try {
      await completeBooking(booking.id);
      setStatus("success");
      onConfirmed?.();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setShowErrorDialog(true);
    }
  };

  return (
    <>
      <AlertDialog
        open={!!booking && status !== "success"}
        onOpenChange={onClose}
        title="Confirm Ride Boarding"
        description="Press and hold the button below to confirm that you have got the ride."
        icon={<CheckCircle className="text-orange-500" size={28} />}
      >
        <motion.div
          className={`w-full h-10 rounded-lg overflow-hidden relative mb-3 ${
            status === "confirming"
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600/20 border border-green-600 cursor-pointer"
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
          <span className="absolute select-none inset-0 flex items-center justify-center text-white">
            {status === "confirming"
              ? "Confirming..."
              : holdProgress > 0
                ? "Hold to Confirm..."
                : "Press & Hold to Confirm"}
          </span>
        </motion.div>
        {status === "idle" && (
          <button onClick={onClose} className="secondary-btn w-full">
            Cancel
          </button>
        )}
      </AlertDialog>

      {/* Success dialog */}
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
        description="Your ride has been confirmed successfully. Have a nice time."
        icon={<CheckCircle className="text-green-500" size={28} />}
      />

      {/* Error dialog */}
      <AlertDialog
        open={showErrorDialog}
        onOpenChange={() => setShowErrorDialog(false)}
        title="Confirmation Failed"
        description="We could not confirm your ride. Please try again."
        icon={<X className="text-red-500" size={28} />}
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
