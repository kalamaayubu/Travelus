"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicRideCardProps } from "@/types";
import { Users, MapPin, Calendar, Bus } from "lucide-react";


export default function PublicRideCard({
  departure,
  destination,
  date,
  vehicle,
  availableSeats,
  price,
  onBook,
}: PublicRideCardProps) {

  return (
    <Card className="w-full group max-w-md mx-auto bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-purple-400" />
          {departure}
          <span className="text-gray-400">→</span>
          {destination}
        </CardTitle>
        <p className="text-sm mt-2 text-gray-400 text-center flex items-center justify-center gap-2">
          <Bus className="w-4 h-4 text-yellow-400" /> {vehicle}
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span>{date}</span>
        </div>

        {/* Seats */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-green-400" />
          <span>
            {availableSeats}{" "}
            <span className="text-gray-400">seats available</span>
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-orange-400">{price} KES</span>
          <span className="text-gray-400">per seat</span>
        </div>

        {/* CTA buttons */}
        <div className="flex opacity-30 group-hover:opacity-90 transition-all duration-500 items-center justify-end gap-4 mt-8 text-sm">
          <button onClick={onBook} className="primary-btn px-4">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
