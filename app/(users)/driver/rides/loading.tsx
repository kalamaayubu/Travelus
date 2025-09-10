export default function Loading() {
  return (
    <div className="p-6 md:p-0 space-y-6">
      {/* Ride cards skeleton */}
      <div className="flex gap-6 flex-wrap justify-center md:justify-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 p-4 h-64 sm:w-72 w-full bg-gray-800 rounded-xl shadow-md border border-gray-700 animate-pulse"
          >
            {/* Top row: locations */}
            <div className="flex justify-between items-center mb-8">
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
              <div className="h-6 w-28 bg-gray-700 rounded"></div>
            </div>

            {/* Middle row: details */}
            <div className="flex flex-col gap-6 mb-4">
              <div className="h-2 w-full bg-gray-700 rounded"></div>
              <div className="h-2 w-32 bg-gray-700 rounded"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Bottom row: action button */}
            <div className="h-2 w-10 bg-gray-700 rounded-lg float-right"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
