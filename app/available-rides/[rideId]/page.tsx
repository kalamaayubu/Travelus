'use client'

import { getRideDetails } from "@/actions/rider.action"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card";
import { RideDetailsProps, SeatsLayout, SeatRow } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Armchair, Calendar, Check, Loader2, MapPin, X } from "lucide-react";
import ReusableDialog from "@/components/reusable/dialog";
import CustomLoader from "@/components/CustomLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AlertDialog from "@/components/reusable/AlertDialog";

const RideDetailsPage = () => {
    const [ride, setRide] = useState<RideDetailsProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [isProceeding, setIsProceeding] = useState(false)
    const { rideId } = useParams<{ rideId: string }>()
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showRiderFormDialog, setShowRiderFormDialog] = useState(false)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)


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

    // Function to handle selected seat
    const handleSelectedSeats = (e) => {
      const seat = e.target.textContent;

      setSelectedSeats(prev => {
        if (prev.includes(seat)) {
          // Deselect if already selected
          return prev.filter(s => s !== seat);
        }
        // otherwise add it
        return [...prev, seat]
      })
    }

    // Function to proceed booking
    const handleProceedBooking = async () => {
      setIsProceeding(true)

      // Check if user is authenticated
      if (!isAuthenticated) {
        setIsProceeding(false)
        setShowLoginDialog(true)
        return
      }

      // Collect user information(phone number)
      setIsProceeding(false)
      setShowRiderFormDialog(true)
    }

    if (loading || !ride) 
      return (
        <CustomLoader message="Loading trip details"/>
      );
      

    const { 
        departureLocation, 
        destinationLocation, 
        departureTime, 
        pricePerSeat, 
        vehicle, 
        bookings } = ride;
    
    const seatsLayout: SeatsLayout = vehicle?.seats_layout
    console.log('SEAT LAYOUT:', seatsLayout)

const bookedSeats = bookings
  ?.flatMap((b: { seatNumber: string }) => 
    b.seatNumber.split(",").map(seat => seat.trim()) // split into array + remove spaces
  ) || []
    console.log('BOOKED SEATS:', bookedSeats)

  return (
    <>
    <div className="p-4 space-y-6 bg-gray-950 flex flex-col items-center">
      {/* Seat Map */}
      {seatsLayout ? (
        <Card className="bg-gray-900 max-w-[800px] w-full">
          <CardContent>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-8"><MapPin className="text-purple-600"/>{departureLocation} → {destinationLocation}</h2>
            <p className="flex items-center gap-2"><Calendar className="text-blue-700"/>{new Date(departureTime).toLocaleString()}</p>
            <div className="flex mt-8">
              <div className="flex items-center flex-wrap gap-6 justify-between md:ml-auto">
                <div className="flex items-center gap-2">
                  <div  className="w-8 h-8 bg-green-700 rounded-md"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div  className="w-8 h-8 bg-gray-800 border rounded-md"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div  className="w-8 h-8 bg-blue-700 rounded-md"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 mb-14 mt-14">
              {seatsLayout.layout.map((row: SeatRow, rowIndex: number) => {
                let colNumber = 0; // Count only real seats on a row(exclude door, and gaps)

                return (
                  <div key={rowIndex} className="flex gap-2 justify-center">
                  {row.seats.map((seat, seatIndex: number) => {
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

                    // Regular seat: Incremement column number
                    colNumber += 1;
                    // Compute a unique seat ID (e.g. "B3")
                    const rowLetter = String.fromCharCode(65 + rowIndex);
                    const seatId = `${rowLetter}${colNumber}`;
                    const isBooked = bookedSeats.includes(seatId)
                    const isSelected = selectedSeats.includes(seatId)

                    return (
                      <div
                        onClick={!isBooked ? handleSelectedSeats : undefined}
                        key={seatIndex}
                        className={cn(
                          "w-10 h-10 opacity-100 active:scale-90 transition-all duration-300 cursor-pointer rounded-md flex items-center select-none bg-gray-800 border justify-center",
                          isBooked && "cursor-not-allowed active:scale-100 opacity-60 bg-green-700",
                          isSelected && "bg-blue-800 border-none"
                        )}>
                        {seatId}
                      </div>
                    );
                  })}
                </div>
                )
              })}
            </div>
            <hr />
            <div className="mb-8 py-6">
              <h2 className="mb-4">Summary</h2>
              <div className="flex flex-col border p-4 rounded-lg gap-6">
                <p>Selected seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : 'NONE'} </p>
                <p className="flex items-center justify-between">Fare (per seat): <span>{ pricePerSeat }/=</span></p>
                <div>
                  {selectedSeats.length > 0 
                    ? (
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex relative w-10 h-10 bg-gray-700 rounded-full p-2">
                          <Armchair className=""/>
                          <div className="bg-gray-50 rounded-full absolute -translate-y-5 translate-x-4 w-6 h-6 text-center text-gray-900">{selectedSeats.length}</div>
                        </div>
                        <p className="flex items-center justify-between gap-4"><span>Total cost: </span><span>{ selectedSeats.length * pricePerSeat }/=</span></p>
                      </div>
                    ) : (
                      ''
                    )
                  }
                </div>
                <button
                  onClick={handleProceedBooking}
                  disabled={selectedSeats.length === 0}
                  className={cn(
                    "px-4 py-2 rounded-lg font-semibold transition-all mt-8",
                    selectedSeats.length === 0
                      ? "bg-gray-600 cursor-not-allowed opacity-50 active:scale-100"
                      :  ""
                  )}>
                  { isProceeding 
                    ? <span className="flex items-center justify-center gap-4"><Loader2 className="w-4 animate-spin"/>Proceeding...</span> 
                    : 'Proceed'
                  }
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>No seat layout available</p>
      )}
    </div>

    {/* Login prompt incase user is not authenticated */}
    <AlertDialog
      open={showLoginDialog}
      onOpenChange={setShowLoginDialog}
      type="error"
      title="Login Required"
      description="Please log in to continue with your booking."
      onAction={() => {
        window.location.href = '/auth/login'
      }}
    />

    {/* Rider information collection dialog */}
    <ReusableDialog
      open={showRiderFormDialog}
      onOpenChange={setShowRiderFormDialog}
      title="Enter your phone number"
      // description="This phone number will be used to make the booking payments"
      closable={true}
      contentClassName="bg-gray-900 border-1 border-gray-800"
    >
      <form>
        <input
          type="number"
          name="phone_number"
          placeholder="Phone number here..."
          className="mt-4"
        />
        <p className="text-sm text-gray-400">This number will be used to make your payments</p>
        <p className="flex items-center gap-2 mt-6">
          <span className="text-white bg-green-600 p-2 rounded-full"><Check/></span>
          <span>If the number is correct, proceed to pay.</span>
        </p>
        <button
          className="mt-8 w-full"
        >
          { isProceeding 
            ? <span className="flex items-center justify-center gap-4"><Loader2 className="w-4 animate-spin"/>Just a moment...</span> 
            : 'Proceed to pay'
          }
        </button>
      </form>
    </ReusableDialog>
    </>
  );
}

export default RideDetailsPage