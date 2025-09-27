"use client";

import { postRide } from "@/actions/driver.action";
import ComboBox from "@/components/reusable/ComboBox";
import ReusableDialog from "@/components/reusable/dialog";
import { Button } from "@/components/ui/button";
import { PostRideFormData } from "@/types";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import type { RootState } from "@/redux/store";

export default function PostRidePage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // Track dialog steps
  const vehicleTypes = useSelector(
    (state: RootState) => state.vehicleTypes.value
  );

  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    trigger,
  } = useForm<PostRideFormData>({ mode: "onChange" });

  // Watch confirmation checkbox before submission
  const confirmationChecked = watch("confirmation");

  // On page load, open dialog and parse vehicle types
  useEffect(() => {
    setOpen(true);
  }, []);

  // Proceed to next step with validation
  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Handle final submission
  const onSubmit = async (data: PostRideFormData) => {
    console.log("DATA TO BE SUBMITTED:", data);
    try {
      const res = await postRide(data);
      if (!res.success) {
        toast.error("Error posting ride: " + res.error);
        return;
      }
      toast.success(res.message || "Ride posted successfully!");
      // Redirect to driver/rides page
      router.push("/driver/rides");
    } catch (error) {
      console.log("Error posting ride:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Some fancy stuff here... people will go wow!! */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {step === 1 && (
          <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            title="Step 1: Route Info"
            description="Provide key ride information"
            closable={false}
            contentClassName="bg-gray-900 border-1 border-gray-600"
          >
            <input
              type="text"
              placeholder="From (Departure Location)"
              className="input"
              {...register("departureLocation", {
                required: "Departure location is required",
                validate: (value) =>
                  value !== "Same as Destination" ||
                  "Departure can't be the same as destination",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
            />
            {errors.departureLocation && (
              <p className="text-red-500 text-sm -translate-y-3">
                {errors.departureLocation.message}
              </p>
            )}

            <input
              type="text"
              placeholder="To (Destination Location)"
              className="input"
              {...register("destinationLocation", {
                required: "Destination is required",
                validate: (value) =>
                  value !== "Same as Departure" ||
                  "Destination can't be the same as departure",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
            />
            {errors.destinationLocation && (
              <p className="text-red-500 text-sm -translate-y-3">
                {errors.destinationLocation.message}
              </p>
            )}

            <input
              type="datetime-local"
              id="departureTime"
              placeholder="Departure time"
              {...register("departureTime", {
                required: "Departure time is required",
                validate: (value) =>
                  new Date(value) > new Date() ||
                  "Departure time must be in the future",
              })}
            />
            {errors.departureTime && (
              <p className="text-red-500 text-sm -translate-y-2">
                {errors.departureTime.message}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
              <Button onClick={router.back} className="secondary-btn">
                Cancel
              </Button>
              <Button
                onClick={nextStep}
                className="primary-btn"
                disabled={!isValid}
              >
                Proceed
              </Button>
            </div>
          </ReusableDialog>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            title="Step 2: Basic ride details"
            description="Enter basic ride details"
            closable={false}
            contentClassName="bg-gray-900 border-gray-700"
          >
            <Controller
              name="vehicleType"
              control={control}
              rules={{ required: "Vehicle type is required" }}
              render={({ field }) => (
                <ComboBox
                  options={vehicleTypes.map((vt) => ({
                    label: vt.name,
                    value: vt.id,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select your vehicle type"
                />
              )}
            />
            {errors.vehicleType && (
              <p className="text-red-500 text-sm -translate-y-3">
                {errors.vehicleType.message}
              </p>
            )}

            <input
              type="number"
              placeholder="Price per Seat"
              {...register("pricePerSeat", {
                valueAsNumber: true,
                validate: (value) => value >= 0 || "Price can't be negative",
                min: { value: 100, message: "Price must be at least 100/=" },
              })}
            />
            {errors.pricePerSeat && (
              <p className="text-red-500 text-sm -translate-y-3">
                {errors.pricePerSeat.message}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
              <Button className="secondary-btn" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} className="primary-btn">
                Proceed
              </Button>
            </div>
          </ReusableDialog>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            title="Step 3: Personal information"
            description="Enter your M-Pesa number and national ID"
            closable={false}
            contentClassName="bg-gray-900 border-gray-700"
          >
            <input
              type="tel"
              id="driverPhone"
              placeholder="Your M-Pesa phone number"
              {...register("driverPhone", {
                required: "Phone number is required",
                pattern: {
                  value:
                    /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/,
                  message: "Enter a valid Kenyan phone number",
                },
              })}
            />
            {errors.driverPhone && (
              <p className="text-red-500 text-sm -translate-y-2">
                {errors.driverPhone.message}
              </p>
            )}

            <input
              type="number"
              placeholder="National ID number"
              className="input"
              {...register("nationalId", {
                required: "National ID is required",
                pattern: {
                  value: /^\d{8,10}$/,
                  message: "Enter a valid National ID number",
                },
              })}
            />
            {errors.nationalId && (
              <p className="text-red-500 text-sm -translate-y-2">
                {errors.nationalId.message}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-4">
              <Button className="secondary-btn" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} className="primary-btn">
                Proceed
              </Button>
            </div>
          </ReusableDialog>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <ReusableDialog
            open={open}
            onOpenChange={setOpen}
            title="Step 4: Confirmation & Submission"
            description="Review your ride details before submitting"
            closable={false}
            contentClassName="bg-gray-900 border-gray-700"
          >
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                <strong>From:</strong> {watch("departureLocation")}
              </p>
              <p>
                <strong>To:</strong> {watch("destinationLocation")}
              </p>
              <p>
                <strong>Departure:</strong>{" "}
                {new Date(watch("departureTime")).toLocaleString()}
              </p>
              <p>
                <strong>Vehicle:</strong>{" "}
                {vehicleTypes.find((v) => v.id === watch("vehicleType"))?.name}
              </p>
              <p>
                <strong>Price per seat:</strong> {watch("pricePerSeat")} KES
              </p>
              <p>
                <strong>Phone (M-Pesa):</strong> {watch("driverPhone")}
              </p>
              <p>
                <strong>National ID:</strong> {watch("nationalId")}
              </p>
            </div>

            <p className="text-yellow-400 mt-4 text-sm">
              ⚠️ Note: Once submitted, you won’t be able to edit this ride. If
              something is incorrect, go back and adjust it before proceeding.
            </p>

            {/* Confirmation checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="confirm"
                className="w-4 h-4 accent-green-600 cursor-pointer"
                {...register("confirmation", {
                  required: "You must confirm before submitting",
                })}
              />
              <label htmlFor="confirm" className="text-sm text-gray-300">
                I confirm that the above details are correct
              </label>
            </div>
            {errors.confirmation && (
              <p className="text-red-500 text-sm">
                {errors.confirmation.message}
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end mt-6">
              <Button
                type="button"
                disabled={isSubmitting}
                className={`secondary-btn ${isSubmitting ? "cursor-not-allowed" : ""}`}
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                disabled={isSubmitting || !isValid || !confirmationChecked}
                className={`primary-btn ${isSubmitting ? "cursor-not-allowed" : ""}`}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-4">
                    <Loader2 className="animate-spin w-5" /> Submitting ride...
                  </span>
                ) : (
                  "Submit Ride"
                )}
              </Button>
            </div>
          </ReusableDialog>
        )}
      </form>
    </div>
  );
}
