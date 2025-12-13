"use client";

import { getRideDetails } from "@/actions/rider.action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomLoader from "@/components/CustomLoader";
import { RideDetailsProps, SeatsLayout } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SeatMap from "@/components/SeatMap";
import BookingSummary from "@/components/BookingSummary";
import RiderDialogs from "@/components/RiderDialogs";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const RideDetailsPage = () => {
  const [ride, setRide] = useState<RideDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
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

  const { rideId } = useParams<{ rideId: string }>();
  const bookingInfo = useSelector((state: RootState) => state.bookingInfo); // Booking information
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const role = user?.user_metadata?.role;

  const supabase = createClient();
  const router = useRouter();

  // Helper function to fetch ride details
  const fetchRideDetails = async () => {
    const res = await getRideDetails(rideId);
    setRide(res);
    setLoading(false);
  };

  // Fetch ride details
  useEffect(() => {
    fetchRideDetails();
    window.scrollTo(0, 0); // Scroll to top of the page even if the ride details are not ready
  }, [rideId]);

  // 🔥 Real-time subscription for seats status updates
  useEffect(() => {
    if (!rideId) return;

    // Subscribe to changes on bookings table for this rideId
    const channel = supabase
      .channel(`bookings-realtime-${rideId}`) // scoped channel (for the current ride id only)
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT | UPDATE | DELETE
          schema: "public",
          table: "bookings",
          filter: `rideId=eq.${rideId}`, // ✅ only this ride
        },
        (payload) => {
          console.log("Realtime payload:", payload);
          fetchRideDetails(); // Refetch the ride details when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, rideId, supabase]);

  if (loading) {
    return <CustomLoader />;
  }

  if (!ride) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Could not load trip details. Please check your network
      </div>
    );
  }

  // ✅ Compute seatsByStatus from bookings
  const seatsByStatus: SeatsByStatus = ride.bookings.reduce(
    (acc: SeatsByStatus, booking: Booking) => {
      const seats = booking.seatNumber.split(",").map((s) => s.trim());
      acc[booking.status] = [...acc[booking.status], ...seats];
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

  // Seat selection handler
  const handleSeatSelect = (seatId: string) => {
    if (
      seatsByStatus.BOOKED.includes(seatId) ||
      seatsByStatus.RESERVED.includes(seatId) ||
      seatsByStatus.BLOCKED.includes(seatId)
    ) {
      return; // ❌ do nothing if seat is not free
    }

    setSelectedSeats(
      (prev) =>
        prev.includes(seatId)
          ? prev.filter((s) => s !== seatId) // remove if already selected
          : [...prev, seatId] // add if not selected
    );
  };

  // Proceed to provide phone number
  const handleProceedBooking = () => {
    setIsProceeding(true);

    // Ensure user is loged in
    if (!isAuthenticated) {
      setIsProceeding(false);
      setShowLoginDialog(true);
      return;
    }

    // Ensure user is logged in as a passanger(with a passanger account)
    if (role !== "rider") {
      setShowLoginAsPassangerDialog(true);
      return;
    }

    setIsProceeding(false);
    setShowRiderFormDialog(true);
  };

  // Handle STK push initialization
  const handleSTKPush = async () => {
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
      } else {
        toast.error(data.message || "Payment failed");
      }
    } catch {
      toast.error("Payment failed");
    } finally {
      setIsInitializingPush(false);
    }
  };

  const {
    id,
    createdBy,
    departureLocation,
    destinationLocation,
    departureTime,
    pricePerSeat,
    vehicle,
  } = ride;

  const seatsLayout: SeatsLayout = vehicle?.seats_layout;

  return (
    <div className="p-4 space-y-6 bg-gray-950 flex flex-col items-center">
      {seatsLayout ? (
        <>
          {/* Seat Map */}
          <SeatMap
            departureLocation={departureLocation}
            destinationLocation={destinationLocation}
            departureTime={departureTime}
            seatsLayout={seatsLayout}
            seatsByStatus={seatsByStatus} // ✅ aligned
            selectedSeats={selectedSeats}
            onSeatSelect={handleSeatSelect}
          />

          {/* Booking Summary */}
          <BookingSummary
            selectedSeats={selectedSeats}
            pricePerSeat={pricePerSeat}
            isProceeding={isProceeding}
            onProceed={handleProceedBooking}
          />
        </>
      ) : (
        <p>No seat layout available</p>
      )}

      {/* Rider Dialogs */}
      <RiderDialogs
        showLoginDialog={showLoginDialog}
        setShowLoginDialog={setShowLoginDialog}
        showRiderFormDialog={showRiderFormDialog}
        setShowRiderFormDialog={setShowRiderFormDialog}
        showLoginAsPassangerDialog={showLoginAsPassangerDialog}
        setShowLoginAsPassangerDialog={setShowLoginAsPassangerDialog}
        showPaymentInitializationDialog={showPaymentInitializationDialog}
        setShowPaymentInitializationDialog={setShowPaymentInitializationDialog}
        isInitializingPush={isInitializingPush}
        onStartPayment={handleSTKPush}
        showSuccessPayDialog={showSuccessPayDialog}
        setShowSuccessPayDialog={setShowSuccessPayDialog}
        selectedSeats={selectedSeats}
        pricePerSeat={pricePerSeat}
        createdBy={createdBy}
        rideId={id}
      />
    </div>
  );
};

export default RideDetailsPage;
