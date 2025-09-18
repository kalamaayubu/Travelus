import React from 'react'

const AvailableRidesLoading = () => {
  return (
    <div className="relative flex flex-col min-h-screen p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Skeleton cards */}
            {[...Array(6)].map((_, i) => (   
                <div key={i} className='w-full min-h-40 p-4 py-6 flex flex-col max-w-md mx-auto rounded-lg bg-gray-900'>
                    {/* Card header */}
                    <div className='mb-6'>
                        <div className='h-6 w-3/4 rounded-lg bg-gray-800 m-auto animate-pulse mb-4'/>
                        <div className='h-3 m-auto w-2/3 bg-gray-800 rounded-lg animate-pulse'/>
                    </div>

                    {/* Card content */}
                    <div className="p-6 space-y-4">
                        <div className='h-3 w-2/3 bg-gray-800 rounded-lg animate-pulse'/>
                        <div className='h-2 w-1/2 bg-gray-800 rounded-lg animate-pulse'/>
                        <div className='h-2 w-1/4 bg-gray-800 rounded-lg animate-pulse'/>
                        <div className="flex justify-end">
                            <div className="h-8 w-20 bg-gray-800 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AvailableRidesLoading