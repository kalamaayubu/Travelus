"use client"

import { getVehicleTypes } from "@/actions/driver.action"
import { saveVehicleTypes } from "@/redux/slices/vehicleTypesSlice"
import { Loader2, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import AlertDialog from "../reusable/AlertDialog"

const AddRideButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()

  const handleAddRide = async () => {
    // Fetch vehicle types
    try {
        setIsLoading(true)

        const res = await getVehicleTypes()
        setVehicleTypes(res)

        if (!res || res.length === 0) {
            // Dont proceed if there is no vehicle types
            setIsLoading(false)
            setShowErrorDialog(true)
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
        toast.error('Could not create a ride')
    }
  }
    
  return (
    <>
        <button
            onClick={handleAddRide}
            className="px-4 whitespace-nowrap rounded-md bg-green-500/20 py-2 text-green-400 hover:bg-green-500/30 transition-colors"
            disabled={isLoading}
        >
            {isLoading
                ? (<span className="flex items-center gap-2"><Loader2 className="animate-spin w-5"/> <span>Just a moment</span></span>)
                : <span className="flex items-center gap-2"><Plus className="w-4"/>Create a ride</span>
            }
        </button>

        <AlertDialog
            open={showErrorDialog}
            onOpenChange={setShowErrorDialog}
            title="Could not proceed"
            icon={<X className="w-5 h-5 text-red-500"/>}
            description="Could not fetch the necessary information for you to proceed. Please check your internet connection and try again."
            actions={[
                {
                    label: 'Cancel',
                    onClick: () => {
                        setShowErrorDialog(false)
                    }
                },
                {
                    label: 'Try Again',
                    onClick: () => {
                        handleAddRide()
                        setShowErrorDialog(false)
                    }
                }
            ]}
        />
    </>
  )
}

export default AddRideButton