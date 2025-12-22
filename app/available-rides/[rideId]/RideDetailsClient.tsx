"use client";

import { seatBooked } from "@/actions/rider.action";
import { useEffect, useState } from "react";
import { RideDetailsProps, SeatsLayout } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SeatMap from "@/components/SeatMap";
import BookingSummary from "@/components/BookingSummary";
import RiderDialogs from "@/components/RiderDialogs";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";

interface Props {
  initialRide: RideDetailsProps | null;
}

export default function RideDetailsClient({ initialRide }: Props) {
  const [ride, setRide] = useState<RideDetailsProps | null>(initialRide);
  const [isProceeding, setIsProceeding] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRiderFormDialog, setShowRiderFormDialog] = useState(false);
  const [showLoginAsPassangerDialog, setShowLoginAsPassangerDialog] =
    useState(false);
  const [showPaymentInitializationDialog, setShowPaymentInitializationDialog] =
    useState(false);
  const [isInitializingPush, setIsInitializingPush] = useState(false);
  const [showSuccessPayDialog, setShowSuccessPayDialog] = useState(false);

  const bookingInfo = useSelector((state: RootState) => state.bookingInfo);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const role = user?.user_metadata?.role;

  const supabase = createClient();
  const router = useRouter();

  // 🔥 Realtime updates (client-only)
  useEffect(() => {
    if (!ride?.id) return;

    const channel = supabase
      .channel(`bookings-realtime-${ride.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
          filter: `rideId=eq.${ride.id}`,
        },
        async () => {
          const res = await fetch(`/api/rider/get-ride-details/${ride.id}`);
          const data = await res.json();
          setRide(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ride?.id, supabase]);

  if (!ride) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Could not load trip details. Please check your network
      </div>
    );
  }

  // --------- REST OF YOUR CODE IS UNCHANGED ---------

  const seatsByStatus: SeatsByStatus = ride.bookings.reduce(
    (acc: SeatsByStatus, booking: Booking) => {
      if (!booking.seatNumber) return acc;

      const seats = booking.seatNumber
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const rawStatus = booking.status;
      const normalizedStatus = rawStatus === "COMPLETED" ? "BOOKED" : rawStatus;

      if (!normalizedStatus || !(normalizedStatus in acc)) return acc;

      acc[normalizedStatus as keyof SeatsByStatus].push(...seats);
      return acc;
    },
    {
      BOOKED: [],
      RESERVED: [],
      BLOCKED: [],
      CANCELLED: [],
      AVAILABLE: [],
    }
  );

  const seatsLayout: SeatsLayout = ride.vehicle?.seats_layout;

  return (
    <>
      <ScrollToTopOnMount />
      <div className="p-4 min-h-screen space-y-6 bg-gray-950 flex flex-col items-center">
        {seatsLayout ? (
          <>
            <SeatMap
              departureLocation={ride.departureLocation}
              destinationLocation={ride.destinationLocation}
              departureTime={ride.departureTime}
              seatsLayout={seatsLayout}
              seatsByStatus={seatsByStatus}
              selectedSeats={selectedSeats}
              onSeatSelect={(seatId) => {
                if (
                  seatsByStatus.BOOKED.includes(seatId) ||
                  seatsByStatus.RESERVED.includes(seatId) ||
                  seatsByStatus.BLOCKED.includes(seatId)
                )
                  return;

                setSelectedSeats((prev) =>
                  prev.includes(seatId)
                    ? prev.filter((s) => s !== seatId)
                    : [...prev, seatId]
                );
              }}
            />

            <BookingSummary
              selectedSeats={selectedSeats}
              pricePerSeat={ride.pricePerSeat}
              isProceeding={isProceeding}
              onProceed={() => {
                setIsProceeding(true);

                if (!isAuthenticated) {
                  setIsProceeding(false);
                  setShowLoginDialog(true);
                  return;
                }

                if (role !== "rider") {
                  setShowLoginAsPassangerDialog(true);
                  return;
                }

                setIsProceeding(false);
                setShowRiderFormDialog(true);
              }}
            />
          </>
        ) : (
          <p>No seat layout available</p>
        )}

        <RiderDialogs
          showLoginDialog={showLoginDialog}
          setShowLoginDialog={setShowLoginDialog}
          showRiderFormDialog={showRiderFormDialog}
          setShowRiderFormDialog={setShowRiderFormDialog}
          showLoginAsPassangerDialog={showLoginAsPassangerDialog}
          setShowLoginAsPassangerDialog={setShowLoginAsPassangerDialog}
          showPaymentInitializationDialog={showPaymentInitializationDialog}
          setShowPaymentInitializationDialog={
            setShowPaymentInitializationDialog
          }
          isInitializingPush={isInitializingPush}
          onStartPayment={async () => {
            setIsInitializingPush(true);
            try {
              const res = await fetch("/api/payments/mpesa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  phoneNumber: "0795753289",
                  amount: 1500,
                }),
              });

              const data = await res.json();

              if (data.success) {
                toast.success("STK sent. Please confirm payment on your phone");
                setShowPaymentInitializationDialog(false);

                setTimeout(async () => {
                  const result = await seatBooked(bookingInfo.value?.bookingId);

                  if (result.success) {
                    setShowSuccessPayDialog(true);
                  } else {
                    toast.error("Failed to mark seats as BOOKED");
                  }
                }, 6000);
              } else {
                toast.error(data.message || "Payment failed");
              }
            } finally {
              setIsInitializingPush(false);
            }
          }}
          showSuccessPayDialog={showSuccessPayDialog}
          setShowSuccessPayDialog={setShowSuccessPayDialog}
          selectedSeats={selectedSeats}
          pricePerSeat={ride.pricePerSeat}
          createdBy={ride.createdBy}
          rideId={ride.id}
        />
      </div>
    </>
  );
}
