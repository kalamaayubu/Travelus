import CustomLoader from "./CustomLoader"

export default function RouteLoader() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-3/4 m-auto">
        {/* <p className="green-indigo_text-gradient text-2xl font-semibold animate-pulse">Just a moment...</p> */}
        {/* <Image 
            src={'/assets/staticCar.svg'} 
            width={1000} 
            height={800} 
            alt="Loading..."
            priority
            className="w-3/4"
        /> */}
        <CustomLoader message="Just a moment" />
    </div>
  )
}

