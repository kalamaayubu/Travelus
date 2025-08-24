import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
          <Image src={'/assets/logo.svg'} height={200} width={200} alt="Logo" className="w-10"/>
        {/* </div> */}
        <p className="md:text-3xl text-2xl font-bold text-green-500">Travelus</p>
    </div>
  )
}

export default Logo