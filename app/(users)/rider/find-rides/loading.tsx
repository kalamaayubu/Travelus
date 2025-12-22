export default function LoadingAvailableRides() {
  return (
    <div className="space-y-6 p-8 animate-pulse">
      {/* Heading */}
      <div className="h-7 w-48 bg-gray-800 rounded-md" />

      {/* Filter form */}
      <div className="grid md:grid-cols-4 gap-4 bg-gray-900 p-4 rounded-lg sticky top-0 z-20">
        <div className="h-10 bg-gray-800 rounded-md" />
        <div className="h-10 bg-gray-800 rounded-md" />
        <div className="h-10 bg-gray-800 rounded-md" />
        <div className="h-10 bg-gray-800 rounded-md" />
      </div>

      {/* Fixed-height cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-xl p-5 h-[260px] flex flex-col justify-between"
          >
            {/* Route section */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-800 rounded" />
              <div className="h-4 w-2/3 bg-gray-800 rounded" />
            </div>

            {/* Meta info */}
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-800 rounded" />
              <div className="h-4 w-20 bg-gray-800 rounded" />
            </div>

            {/* CTA / price row */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-gray-800 rounded" />
              <div className="h-9 w-24 bg-gray-700 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
