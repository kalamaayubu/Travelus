"use client"
import { X, Loader2, Loader } from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AlertDialog from "@/components/reusable/AlertDialog";
import ReusableDialog from "@/components/reusable/dialog";
import { collectRiderPhoneNumber } from "@/actions/rider.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setBookingInfo } from "@/redux/slices/bookingInfoSlice";

interface RiderDialogsProps {
  showLoginDialog: boolean;
  setShowLoginDialog: (open: boolean) => void;
  showRiderFormDialog: boolean;
  setShowRiderFormDialog: (open: boolean) => void;
  showPaymentInitializationDialog: boolean;
  setShowPaymentInitializationDialog: (open: boolean) => void;
  isInitializingPush: boolean;
  selectedSeats: string[];
  pricePerSeat: number;
  createdBy: string;
}

const RiderDialogs = ({
  showLoginDialog,
  setShowLoginDialog,
  showRiderFormDialog,
  setShowRiderFormDialog,
  showPaymentInitializationDialog,
  setShowPaymentInitializationDialog,
  isInitializingPush,
  selectedSeats,
  pricePerSeat,
  createdBy
}: RiderDialogsProps) => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // Handle phone number submission
  const onSubmit = async (data: { phoneNumber: string }) => {
    const payload = {
      phoneNumber: data.phoneNumber,
      userId: user.id
    };

    const res = await collectRiderPhoneNumber(payload);
    if (!res.success) {
      toast.error(res.error);
      return;
    }


    // Save booking info in Redux
    const bookingInfoPayload = {
      selectedSeats,
      totalCost: selectedSeats.length * pricePerSeat,
      passangerId: user.id,
      driverId: createdBy,
      passangerPhone: data.phoneNumber
    };
    
    dispatch(setBookingInfo(bookingInfoPayload));
    reset();

    // Open payment dialog
    setShowPaymentInitializationDialog(true);
    setShowRiderFormDialog(false);
  };

  return (
    <>
      {/* Login Required Dialog */}
      <AlertDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        title="Login Required"
        description="Please log in to continue with your booking."
        icon={<X className="w-8 h-8 text-red-500"/>}
        onAction={() => {
          window.location.href = "/auth/login";
        }}
      />

      {/* Rider Phone Form Dialog */}
      <ReusableDialog
        open={showRiderFormDialog}
        onOpenChange={setShowRiderFormDialog}
        title="Enter your phone number"
        closable={false}
        contentClassName="bg-gray-900 border-1 border-gray-800 flex flex-col justify-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            placeholder="Phone number here..."
            className="mt-4"
            {...register("phoneNumber", { 
              required: "Phone number is required",
              pattern: {
                value: /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/,
                message: "Enter a valid Kenyan phone number"
              }
            })}
          />
          {errors.phoneNumber?.message && (
            <p className="text-sm text-red-500">{String(errors.phoneNumber.message)}</p>
          )}

          <p className="text-[12px] text-gray-400">This number will be used to make your payments</p>

          <div className="flex items-center mt-8 gap-4 float-right">
            <button 
              type="button"
              className="secondary-btn"
              onClick={() => setShowRiderFormDialog(false)}
            >
              Cancel
            </button>
            <button 
                type="submit"
                disabled={isSubmitting}
            >
              { isSubmitting 
                ? <span className="flex items-center justify-center gap-4"><Loader2 className="w-4 animate-spin"/>Proceeding...</span> 
                : "Proceed to pay"
              }
            </button>
          </div>
        </form>
      </ReusableDialog>

      {/* Payment Initialization Dialog */}
      <AlertDialog
        open={showPaymentInitializationDialog}
        onOpenChange={setShowPaymentInitializationDialog}
        title="Almost There"
        icon={<FaMoneyBill className="w-8 h-8 text-orange-500"/>}
        description="Start your payment process by clicking on the button below"
        actionLabel={
          isInitializingPush 
            ? <p className="flex items-center justify-center gap-2"><Loader className="animate-spin"/>Initializing <span className="animate-pulse">...</span></p> 
            : "Start payment"
        }
      />
    </>
  );
};

export default RiderDialogs;
