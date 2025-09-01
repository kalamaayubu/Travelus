import { Loader } from "lucide-react"

interface CustomLoaderProps {
    message: string;
}

const CustomLoader = ({message}: CustomLoaderProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-svh">
        <Loader className="animate-spin text-gray-200"/>
        <p className="text-gray-400 font-semibold flex items-center text-xl">
            <span>{message}</span> 
            <span className="animate-pulse"> ...</span>
        </p>
    </div>
  )
}

export default CustomLoader