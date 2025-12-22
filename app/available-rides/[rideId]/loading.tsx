const Loading = () => {
  return (
    <div className="p-4 min-h-screen space-y-6 bg-gray-950 flex flex-col items-center">
      {/* Seat Map Skeleton */}
      <div className="bg-gray-900 max-w-[800px] overflow-hidden p-6 w-full border border-gray-700 rounded-xl m-2">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-2/3 bg-gray-800 rounded" />
          <div className="h-5 w-1/2 bg-gray-800 rounded" />
          {/* Legend */}
          <div className="flex mt-8">
            <div className="flex items-center flex-wrap gap-6 md:justify-between md:ml-auto">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-md"></div>
                <span className="h-3 w-16 bg-gray-800 rounded-sm" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-md"></div>
                <span className="h-3 w-16 bg-gray-800 rounded-sm" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-md"></div>
                <span className="h-3 w-20 bg-gray-800 rounded-sm" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-md"></div>
                <span className="h-3 w-16 bg-gray-800 rounded-sm" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-md"></div>
                <span className="h-3 w-16 bg-gray-800 rounded-sm" />
              </div>
            </div>
          </div>
          <div className="h-3 w-20 bg-gray-800 rounded" />
        </div>

        {/* Seat grid */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-800 rounded" />
          ))}
        </div>
      </div>

      {/* Booking Summary Skeleton */}
      <div className="mb-8 mt-4 p-8 border bg-gray-900 w-full max-w-[800px] rounded-xl animate-pulse">
        {/* Title */}
        <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>

        {/* Content container */}
        <div className="flex flex-col border p-4 rounded-lg gap-6">
          {/* Selected seats */}
          <div className="h-4 w-48 bg-gray-800 rounded"></div>

          {/* Fare */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-800 rounded"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-700 animate-pulse rounded-lg mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
