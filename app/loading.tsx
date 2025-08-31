import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-3/4 m-auto min-h-screen">
        <Image 
            src={'/assets/staticCar.svg'} 
            width={1000} 
            height={800} 
            alt="Loading..."
            priority
            className="w-3/4"
        />
        <p className="green-indigo_text-gradient text-2xl font-semibold animate-pulse">Just a moment...</p>
    </div>
  )
}

