"use client"

import { getVehicleTypes } from "@/actions/driver.action"
import { saveVehicleTypes } from "@/redux/slices/vehicleTypesSlice"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const AddRideButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useDispatch()

  const handleAddRide = async () => {
    // Fetch vehicle types
    try {
        setIsLoading(true)

        const res = await getVehicleTypes()
        setVehicleTypes(res)

        if (!res || res.length === 0) {
            toast.error('Could not add ride, please try again')
            return;
        }

        // Transform API response -> frontend shape
        const normalized = res.map(item => ({
            id: item.id,
            name: item.type_name
        }))

        // Save the data to the redux (state manager)
        dispatch(saveVehicleTypes(normalized))
        router.push('/driver/post-ride')

        console.log('VEHICLE TYPES:', normalized)
    } catch (error) {
        console.log('Could not add a ride:', error)
        toast.error('Could not add a ride')
    } finally {
        setIsLoading(false)
    }
  }
    
  return (
    <button
        onClick={handleAddRide}
        className="px-8 rounded-lg"
        disabled={isLoading}
    >
        {isLoading
            ? (<span className="flex items-center gap-4"><Loader2 className="animate-spin w-5"/> <span>Just a moment</span></span>)
            : "Add a ride"
        }
    </button>
  )
}

export default AddRideButton