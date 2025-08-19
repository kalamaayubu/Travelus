"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Bus, Euro } from "lucide-react";
import { RideCardProps } from "@/types";

export default function RideCard({ ride, onEdit, onCancel }: RideCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 text-gray-100 rounded-xl shadow-lg">
      <CardContent className="p-6 space-y-4">

        {/* Departure → Destination */}
        <div className="flex items-center justify-between text-lg font-semibold">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span>{ride.departureLocation}</span>
          </div>
          <span className="text-gray-400">→</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span>{ride.destinationLocation}</span>
          </div>
        </div>

        {/* Date & Vehicle */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{new Date(ride.departureTime).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-yellow-400" />
            <span>{ride.vehicle}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-sm">
          <Euro className="w-4 h-4 text-orange-400" />
          <span>{ride.pricePerSeat} KES</span>
        </div>

        {/* Status */}
        <div className="text-xs text-gray-400">
          Status: <span className="font-medium text-green-400">{ride.status}</span>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button  className="secondary-btn text-sm" onClick={onEdit}>
            Edit
          </button>
          <button  className="destructive-btn text-sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
