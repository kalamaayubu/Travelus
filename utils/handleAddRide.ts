import { getVehicleTypes } from "@/actions/driver.action";
import { saveVehicleTypes } from "@/redux/slices/vehicleTypesSlice";
import { AppDispatch } from "@/redux/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleAddRide(
  dispatch: AppDispatch,
  router: AppRouterInstance
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await getVehicleTypes()

    if (!res || res.length === 0) {
      return { success: false, error: "No vehicle types available" }
    }

    const normalized = res.map((item: any) => ({
      id: item.id,
      name: item.type_name,
    }))

    dispatch(saveVehicleTypes(normalized))
    router.push("/driver/post-ride")

    return { success: true }
  } catch (err) {
    return { success: false, error: "Failed to fetch vehicle types" }
  }
}
