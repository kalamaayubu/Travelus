"use client"
import { X, Loader2, Loader } from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AlertDialog from "@/components/reusable/AlertDialog";
import { reserveSeats } from "@/actions/rider.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setBookingInfo } from "@/redux/slices/bookingInfoSlice";
import { useRouter } from "next/navigation";

interface RiderDialogsProps {
  showLoginDialog: boolean;
  setShowLoginDialog: (open: boolean) => void;

  showRiderFormDialog: boolean;
  setShowRiderFormDialog: (open: boolean) => void;

  showLoginAsPassangerDialog: boolean;
  setShowLoginAsPassangerDialog: (open: boolean) => void;

  showPaymentInitializationDialog: boolean;
  setShowPaymentInitializationDialog: (open: boolean) => void;
  
  isInitializingPush: boolean;
  selectedSeats: string[];
  pricePerSeat: number;
  createdBy: string;
  rideId: string
}

const RiderDialogs = ({
  showLoginDialog,
  setShowLoginDialog,
  showRiderFormDialog,
  setShowRiderFormDialog,
  showLoginAsPassangerDialog,
  setShowLoginAsPassangerDialog,
  showPaymentInitializationDialog,
  setShowPaymentInitializationDialog,
  isInitializingPush,
  selectedSeats,
  pricePerSeat,
  createdBy,
  rideId
}: RiderDialogsProps) => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter()

  // Handle phone number submission
  const onSubmit = async (data: { phoneNumber: string }) => {

    const bookingInfoPayload = {
      rideId: rideId,
      selectedSeats,
      totalCost: selectedSeats.length * pricePerSeat,
      passangerId: user.id,
      driverId: createdBy,
      passangerPhone: data.phoneNumber
    };

    const res = await reserveSeats(bookingInfoPayload);
    if (!res.success) {
      setShowLoginAsPassangerDialog(true)
      return;
    }


    // Save booking info in Redux
    dispatch(setBookingInfo(bookingInfoPayload));
    reset();

    // Open payment dialog
    setShowRiderFormDialog(false);
    setShowPaymentInitializationDialog(true);
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
      <AlertDialog
        open={showRiderFormDialog}
        onOpenChange={setShowRiderFormDialog}
        title="Enter your phone number"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Phone number here..."
            className="mt-2"
            {...register("phoneNumber", { 
              required: "Phone number is required",
              pattern: {
                value: /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/,
                message: "Enter a valid Kenyan phone number"
              }
            })}
          />
          {errors.phoneNumber?.message && (
            <p className="text-sm text-red-500">
              {String(errors.phoneNumber.message)}
            </p>
          )}

          <p className="text-[12px] text-gray-400 -translate-y-4">
            This number will be used to make your payments
          </p>

          <div className="flex items-center justify-end mt-6 gap-4">
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
              className="primary-btn whitespace-nowrap"
            >
              {isSubmitting 
                ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 animate-spin" />
                    Proceeding...
                  </span>
                ) : (
                  "Proceed to pay"
                )
              }
            </button>
          </div>
        </form>
      </AlertDialog>

      {/* Not logged in as a passanger error Dialog */}
      <AlertDialog
        open={showLoginAsPassangerDialog}
        onOpenChange={setShowLoginAsPassangerDialog}
        title="Could not proceed"
        description="You are not logged in as a passenger. Please log in with a passenger account to continue."
        icon={<X className="w-8 h-8 text-red-500"/>}
        onAction={() => {
          router.push("/auth/login")
        }}
        actionLabel="Login as a passenger"
      >

      </AlertDialog>


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
