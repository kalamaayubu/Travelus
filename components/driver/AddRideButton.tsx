"use client"


import { Loader2, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import AlertDialog from "../reusable/AlertDialog"
import { handleAddRide } from "@/utils/handleAddRide"

const AddRideButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()

    // Fetch the vehicle types before navigating to post ride
    const onAddRide = async () => {
        setIsLoading(true)
        const result = await handleAddRide(dispatch, router)

        if (!result.success) {
            setIsLoading(false)
            setShowErrorDialog(true)
            console.error(result.error)
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }
    
  return (
    <>
        <button
            onClick={onAddRide}
            className="px-4 whitespace-nowrap rounded-md bg-green-500/20 py-2 text-green-400 hover:bg-green-500/30 transition-colors"
            disabled={isLoading}
        >
            {isLoading
                ? (<span className="flex items-center gap-2"><Loader2 className="animate-spin w-4"/> <span>Loading...</span></span>)
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
                        onAddRide()
                        setShowErrorDialog(false)
                    }
                }
            ]}
        />
    </>
  )
}

export default AddRideButton