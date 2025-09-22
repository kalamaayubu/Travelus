import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SeatRow, SeatMapProps } from "@/types";
import { CalendarRange, MapPin } from "lucide-react";

const DriverSeatMap = ({
  departureLocation,
  destinationLocation,
  departureTime,
  seatsLayout,
  seatsByStatus,
  selectedSeats,
  onSeatSelect,
}: SeatMapProps) => {
  console.log(`DE DATA: ${departureLocation}`);
  return (
    <Card className="bg-gray-900 max-w-[800px] w-full">
      <CardContent>
        {/* Trip info */}
        <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
          <MapPin className="text-purple-600" />
          {departureLocation} → {destinationLocation}
        </h2>
        <p className="flex items-center gap-2">
          <CalendarRange className="text-blue-700" />
          {new Date(departureTime).toLocaleString()}
        </p>
        {/* Legend */}
        <div className="flex mt-8">
          <div className="flex items-center flex-wrap gap-6 md:justify-between md:ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-md"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-600 rounded-md"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 opacity-60 bg-red-500 rounded-md"></div>
              <span>Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-800 border rounded-md"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-md"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        <p className="mt-6 font-semibold text-xl">Preserve a seat</p>

        {/* Seat Layout */}
        <div className="flex flex-col gap-6 mt-14">
          {seatsLayout.layout.map((row: SeatRow, rowIndex: number) => {
            let colNumber = 0;

            // Mapping seats
            return (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {row.seats.map((seat, seatIndex: number) => {
                  if (seat === "Aisle")
                    return <div key={seatIndex} className="w-10" />;
                  if (seat === "DoorGap")
                    return (
                      <div
                        key={seatIndex}
                        className="w-10 h-10 border-2 border-dashed rounded-lg flex items-center justify-center text-xs"
                      >
                        Door
                      </div>
                    );
                  if (seat === "Driver")
                    return (
                      <div
                        key={seatIndex}
                        className="w-10 h-10 ml-1 text-white rounded-lg flex items-center justify-center text-xs"
                      >
                        <Image
                          src={"/assets/steeringWheel.svg"}
                          height={500}
                          width={500}
                          alt="Driver"
                        />
                      </div>
                    );

                  colNumber += 1;
                  const rowLetter = String.fromCharCode(65 + rowIndex);
                  const seatId = `${rowLetter}${colNumber}`;

                  const isBooked = seatsByStatus.BOOKED.includes(seatId);
                  const isReserved = seatsByStatus.RESERVED.includes(seatId);
                  const isBlocked = seatsByStatus.BLOCKED.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <div
                      onClick={
                        !isBooked && !isReserved && !isBlocked
                          ? () => onSeatSelect(seatId)
                          : undefined
                      }
                      key={seatIndex}
                      className={cn(
                        "w-10 h-10 opacity-100 active:scale-90 transition-all duration-300 cursor-pointer rounded-md flex items-center select-none bg-gray-800 border justify-center",
                        isBooked &&
                          "cursor-not-allowed active:scale-100 opacity-60 bg-green-700",
                        isReserved &&
                          "cursor-not-allowed active:scale-100 opacity-60 bg-yellow-600",
                        isBlocked &&
                          "cursor-not-allowed active:scale-100 opacity-60 bg-red-500",
                        isSelected && "bg-blue-800 border-none"
                      )}
                    >
                      {seatId}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverSeatMap;
