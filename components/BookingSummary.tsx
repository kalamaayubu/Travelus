"use client"
import { Armchair, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingSummaryProps {
  selectedSeats: string[];
  pricePerSeat: number;
  isProceeding: boolean;
  onProceed: () => void;
}

const BookingSummary = ({
  selectedSeats,
  pricePerSeat,
  isProceeding,
  onProceed
}: BookingSummaryProps) => {
  return (
    <div className="mb-8 p-8 border bg-gray-900 w-full max-w-[800px] rounded-xl -translate-y-8">
      <h2 className="mb-4 text-2xl text-gray-300">Summary</h2>
      <div className="flex flex-col border p-4 rounded-lg gap-6">
        <p>Selected seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : 'NONE'} </p>
        <p className="flex items-center justify-between">Fare (per seat): <span>{ pricePerSeat }/=</span></p>

        {selectedSeats.length > 0 && (
          <div className="flex items-center justify-between mt-2">
            <div className="flex relative w-10 h-10 bg-gray-700 rounded-full p-2">
              <Armchair />
              <div className="bg-gray-50 rounded-full absolute -translate-y-5 translate-x-4 w-6 h-6 text-center text-gray-900">{selectedSeats.length}</div>
            </div>
            <p className="flex items-center justify-between gap-4">
              <span>Total cost: </span><span>{ selectedSeats.length * pricePerSeat }/=</span>
            </p>
          </div>
        )}

        <button
          onClick={onProceed}
          disabled={selectedSeats.length === 0}
          className={cn(
            "px-4 py-2 rounded-lg font-semibold transition-all mt-8",
            selectedSeats.length === 0
              ? "bg-gray-600 cursor-not-allowed opacity-50 active:scale-100"
              : ""
          )}
        >
          { isProceeding 
            ? <span className="flex items-center justify-center gap-4"><Loader2 className="w-4 animate-spin"/>Proceeding...</span> 
            : 'Proceed'
          }
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
