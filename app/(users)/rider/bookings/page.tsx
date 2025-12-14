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
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getMyBookings(userId);
      console.log("Fetched bookings:", data);
      setBookings(data);
    };
    fetchBookings();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-800 rounded-2xl p-5 shadow-md transition-all
            ${
              booking.status === "COMPLETED"
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:shadow-xl"
            }`}
            onClick={() =>
              booking.status !== "COMPLETED" && setSelectedBooking(booking)
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
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {booking.status}
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span>KSH. {booking.ride.pricePerSeat * booking.count}</span>
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

      {bookings.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <p>You have not made any bookings yet.</p>
        </div>
      )}
    </div>
  );
}
