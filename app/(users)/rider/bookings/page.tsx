"use client";

import { getMyBookings } from "@/actions/rider.action";
import RideConfirmationDialog from "@/components/rider/RideConfirmationDialog";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { Calendar, MapPin, Car, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function MyBookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const data = await getMyBookings(userId);
      console.log("Fetched bookings:", data);

      // Ensure we don't display duplicate bookings in the UI
      const uniqueById = Array.from(
        new Map((data || []).map((b: any) => [b.id, b])).values()
      );

      setBookings(uniqueById as any);
      setIsLoading(false);
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <div className="space-y-4">
        {/* Loading skeletons */}
        {isLoading &&
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-2xl p-5 shadow-md animate-pulse"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-3 w-full md:w-2/3">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 bg-gray-700 rounded-full" />
                    <div className="h-4 w-16 bg-gray-700 rounded-full" />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-700 mt-1" />
                    <div className="space-y-2 w-full">
                      <div className="h-4 w-40 bg-gray-700 rounded-md" />
                      <div className="h-4 w-32 bg-gray-800 rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                  <div className="h-6 w-20 bg-gray-700 rounded-full" />
                  <div className="h-4 w-24 bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>
          ))}

        {/* Loaded bookings */}
        {!isLoading &&
          bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-2xl p-5 shadow-md transition-all
            ${
              booking.status === "COMPLETED"
                ? "opacity-60 cursor-not-allowed"
                : booking.status === "RESERVED"
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer hover:shadow-xl"
            }`}
              onClick={() =>
                booking.status !== "COMPLETED" &&
                booking.status !== "RESERVED" &&
                setSelectedBooking(booking)
              }
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {dayjs(booking.ride.departureTime).format("DD MMM YYYY")}
                    </span>

                    <Clock className="w-4 h-4 ml-3" />
                    <span>
                      {dayjs(booking.ride.departureTime).format("hh:mm A")}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-green-400 mt-1" />
                    <div className="text-sm">
                      <p className="font-medium">
                        {booking.ride.departureLocation}
                      </p>
                      <p className="text-gray-400">
                        to {booking.ride.destinationLocation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "COMPLETED"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "RESERVED"
                          ? "bg-orange-500/20 text-orange-400" // RESERVED → orange
                          : "bg-blue-500/20 text-blue-400" // BOOKED (and others) → blue
                    }`}
                  >
                    {booking.status}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Car className="w-4 h-4 text-gray-400" />
                    <span>
                      KSH. {booking.ride.pricePerSeat * booking.count}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        {selectedBooking && (
          <RideConfirmationDialog
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onConfirmed={async () => {
              // Refresh bookings after confirmation
              const data = await getMyBookings(userId);
              setBookings(data);
              setSelectedBooking(null);
            }}
          />
        )}
      </div>

      {!isLoading && bookings.length === 0 && (
        <div className="mt-24 flex flex-col items-center text-center text-gray-300">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 border border-gray-700">
            <Car className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-sm text-gray-400 max-w-md">
            You haven&apos;t reserved any seats so far. Once you book a ride, it
            will appear here so you can easily review and manage it.
          </p>
        </div>
      )}
    </div>
  );
}
