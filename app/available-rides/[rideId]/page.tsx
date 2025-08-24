'use client'

import { getRideDetails } from "@/actions/rider.action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { RideDetailsProps, SeatsLayout, SeatRow } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const RideDetailsPage = () => {
    const [ride, setRide] = useState<RideDetailsProps | null>(null);
    const [loading, setLoading] = useState(true);
    const { rideId } = useParams<{ rideId: string }>()

    // Fetch the ride details including the seats layout
    useEffect(() => {
        const fetchRideDetails = async () => {
            const res = await getRideDetails(rideId);
            console.log('RESULT:', res)
            setRide(res)
            setLoading(false)
        }

        fetchRideDetails()
    }, [rideId])

    if (loading || !ride) return <p className="p-6">Loading ride details...</p>;

    const { 
        departureLocation, 
        destinationLocation, 
        departureTime, 
        pricePerSeat, 
        vehicle, 
        bookings } = ride;
    
    const seatsLayout: SeatsLayout = vehicle?.seats_layout
    console.log('SEAT LAYOUT:', seatsLayout)

    const bookedSeats = bookings?.map((b: { seatNumber: string }) => b.seatNumber) || []
    console.log('BOOKED SEATS:', bookedSeats)

  return (
    <div className="p-6 space-y-6 bg-gray-950 flex flex-col">
      {/* Ride Info */}
      <Card className="bg-gray-900">
        <CardContent className="space-y-2">
          <p><strong>Departure:</strong> {new Date(departureTime).toLocaleString()}</p>
          <p><strong>Price per seat:</strong> KES {pricePerSeat}</p>
          <p><strong>Vehicle Type:</strong> {vehicle?.type_name}</p>
        </CardContent>
      </Card>

      {/* Seat Map */}
      {seatsLayout ? (
        <Card className="bg-gray-900 m-auto">
          <CardContent>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-8"><MapPin className="text-purple-600"/>{departureLocation} → {destinationLocation}</h2>
            <div className="flex flex-col gap-6 min-w-fit mb-10">
              {seatsLayout.layout.map((row: SeatRow, rowIndex: number) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                  {row.seats.map((seat, seatIndex: number) => {
                    // Compute a unique seat ID (e.g. "2-3")
                    const seatId = `${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`;
                    const isBooked = bookedSeats.includes(seatId);

                    if (seat === "Aisle") {
                      return <div key={seatIndex} className="w-10" />; // spacing
                    }
                    if (seat === "DoorGap") {
                      return <div key={seatIndex} className="w-10 h-10 border-2 border-dashed rounded-lg flex items-center justify-center text-xs">Door</div>;
                    }
                    if (seat === "Driver") {
                      return <div key={seatIndex} className="w-10 h-10 ml-3 text-white rounded-lg flex items-center justify-center text-xs">
                        <Image src={"/assets/steeringWheel.svg"} height={500} width={500} alt="Driver"/>
                      </div>;
                    }

                    // Regular seat
                    return (
                      <Button
                        key={seatIndex}
                        variant={isBooked ? "destructive" : "outline"}
                        className={cn(
                          "w-10 h-10 rounded-md",
                          isBooked && "cursor-not-allowed bg-gray-600"
                        )}
                        disabled={isBooked}
                      >
                        {seatId}
                      </Button>
                    );
                  })}
                </div>
              ))}
            </div>
            <hr />
            <div className="mb-8">
              <h2>Summary</h2>
              <p>Selected seats: </p>
              <p className="bg-green-700 p-4 rounded-t-lg flex items-center justify-between">Fare: <span>{pricePerSeat}/=</span></p>
            </div>

            <button className="primary-btn float-right">
              Proceed
            </button>
          </CardContent>
        </Card>
      ) : (
        <p>No seat layout available</p>
      )}
    </div>
  );
}

export default RideDetailsPage