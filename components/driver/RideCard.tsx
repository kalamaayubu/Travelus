"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Bus, Euro, MoreHorizontal, MoreVertical, Users } from "lucide-react";
import { RideCardProps } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function RideCard({ ride, onEdit, onCancel, onDelete }: RideCardProps) {
  const [showRidePostActions, setShowRidePostActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowRidePostActions(false);
      }
    };

    // 
    if (showRidePostActions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showRidePostActions]);

  return (
    <div className="relative">
      <Card className="w-full border-none max-w-md mx-auto hover:bg-gray-800 text-gray-300 rounded-md bg-gray-700/20 transition-colors duration-300">
        <CardContent className="space-y-3">

          {/* Departure → Destination */}
          <div className="flex items-center justify-evenly text-xl font-bold mb-10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span>{ride.departureLocation}</span>
            </div>
            <span className="text-gray-400">→</span>
            <div className="flex items-center gap-2">
              <span>{ride.destinationLocation}</span>
            </div>
          </div>

          {/* Date & Vehicle */}
          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{new Date(ride.departureTime).toLocaleString()}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">{ride.vehicle}</span>
            </div>
          </div>

          {/* Remaining seats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-400">{ride.remainingSeats} Empty seats</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-400">
              Status: <span className="font-medium text-green-400">{ride.status}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mr-1">
              <span className="text-orange-400 text-xl">@</span>
              <span>{ride.pricePerSeat} KES</span>
            </div>
          </div>

          {/* More actions */}
            <MoreVertical 
              onClick={() => setShowRidePostActions(prev => !prev)} 
              className="w-5 h-5 text-gray-300 cursor-pointer float-right" 
              />
        </CardContent>
      </Card>

      {/* Actions container */}
      {showRidePostActions && (
        <div ref={actionsRef} className="flex flex-col overflow-hidden text-sm text-center absolute bottom-2 right-12 bg-gray-800 border rounded-sm">
          <p className="border-b py-2 px-6 cursor-pointer active:scale-110 hover:bg-white/5 hover:text-gray-100 transition-all duration-300" onClick={onEdit}>
            Edit
          </p>
          {ride.status !== "Completed" && (
            <p className="py-2 px-6 border-b cursor-pointer active:scale-110 hover:bg-white/5 hover:text-gray-100 transition-all duration-300" onClick={onCancel}>
              {ride.status === "Active" 
                ? "Cancel"
                : "Reinstate"
              }
            </p>
          )}
          <p className="py-2 px-6 cursor-pointer active:scale-110 hover:bg-white/5 hover:text-gray-100 transition-all duration-300" onClick={onDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
