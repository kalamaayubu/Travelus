'use client';

import { postRide } from '@/actions/driver.action';
import ReusableDialog from '@/components/reusable/dialog';
import { Button } from '@/components/ui/button';
import { PostRideFormData } from '@/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function PostRidePage() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1); // Track which dialog step
  const router = useRouter();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isValid }, 
    trigger 
  } = useForm<PostRideFormData>({ mode: 'onChange' });

  // Open dialog on page load
  useEffect(() => {
    setOpen(true)
  }, []);

  // Proceed to next step with validation
  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(prev => prev + 1);
  }

  const prevStep = () => setStep(prev => prev - 1);

  // Handle final submission
  const onSubmit = async (data: PostRideFormData) => {
    try {
      const res = await postRide(data);
      if (!res.success) {
        toast.error('Error posting ride: ' + res.error);
        return
      }
      toast.success(res.message || 'Ride posted successfully!');
      // Redirect to driver/rides page
      router.push('/driver/rides')
    } finally {
    }
  }

  return (
    <div className='bg-green-950'>
       <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step 1 */}
      {step === 1 && (
        <ReusableDialog
          open={open}
          onOpenChange={setOpen}
          title="Step 1: Basic Ride Details"
          description="Provide key ride information"
          closable={false}
          contentClassName="bg-gray-900 border-1 border-gray-600"
        >
          <input
            type="text"
            placeholder="From (Departure Location)"
            className="input"
            {...register('departureLocation', { required: "Departure location is required",  
              validate: (value) => value !== 'Same as Destination' || "Departure can't be the same as destination",
              minLength: { value: 3, message: "Must be at least 3 characters" }
            })}
          />
          {errors.departureLocation && (
            <p className="text-red-500 text-sm -translate-y-3">{errors.departureLocation.message}</p>
          )}

          <input
            type="text"
            placeholder="To (Destination Location)"
            className="input"
            {...register('destinationLocation', {
              required: "Destination is required", 
              validate: (value) => value !== 'Same as Departure' || "Destination can't be the same as departure",
              minLength: { value: 3, message: "Must be at least 3 characters" }
            })}
          />
          {errors.destinationLocation && (
            <p className="text-red-500 text-sm -translate-y-3">{errors.destinationLocation.message}</p>
          )}

          <div className="flex justify-end mt-4">
            <Button onClick={nextStep} className='primary-btn' disabled={!isValid}>Proceed</Button>
          </div>
        </ReusableDialog>
      )}


      {/* Step 2 */}
      {step === 2 && (
        <ReusableDialog
          open={open}
          onOpenChange={setOpen}
          title="Step 2: Route Info"
          description="Enter the travel route"
          closable={false}
          contentClassName="bg-gray-900 border-gray-700"
        >
          <input
            type="number"
            placeholder="Number of Seats"
            className="input"
            {...register('seatsAvailable', { 
              required: "Enter number of seats available",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Must be greater than 0",
              min: { value: 1, message: "At least 1 seat is required"} 
            })}
          />
          {errors.seatsAvailable && (
            <p className="text-red-500 text-sm -translate-y-3">{errors.seatsAvailable.message}</p>
          )}
          
          <input
            type='number'
            placeholder="Price per Seat"
            {...register('pricePerSeat', { 
              valueAsNumber: true,
              validate: (value) => value >= 0 || "Price can't be negative",
              min: { value: 100, message: "Price must be at least 100/=" }
            })}
          />
          {errors.pricePerSeat && (
            <p className="text-red-500 text-sm -translate-y-3">{errors.pricePerSeat.message}</p>
          )}

          <div className='flex flex-col gap-2 sm:flex-row sm:justify-end mt-4'>
            <Button className='secondary-btn' onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} className='primary-btn'>Proceed</Button>
          </div>
        </ReusableDialog>
      )}


      {/* Step 3 */}
      {step === 3 && (
        <ReusableDialog
          open={open}
          onOpenChange={setOpen}
          title="Step 3: Contact & Departure"
          description="Enter M-Pesa phone number and departure time"
          closable={false}
          contentClassName="bg-gray-900 border-gray-700"
        >
          <input
            type="tel"
            id='driverPhone'
            placeholder="Your M-Pesa phone number"
            {...register('driverPhone', { 
              required: "Phone number is required",
              pattern: {
                value: /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8}|\+2547\d{8}|\+2541\d{8})$/,
                message: "Enter a valid Kenyan phone number"
              }
            })}
          />
          {errors.driverPhone && (
            <p className="text-red-500 text-sm -translate-y-2">{errors.driverPhone.message}</p>
          )}
          
          <input
            type='datetime-local'
            id='departureTime'
            placeholder="Departure time"
            {...register('departureTime', { 
              required: "Departure time is required",
              validate: (value) => new Date(value) > new Date() || "Departure time must be in the future",
            })}
          />
          {errors.departureTime && (
            <p className="text-red-500 text-sm -translate-y-2">{errors.departureTime.message}</p>
          )}

          <div className='flex flex-col gap-2 sm:flex-row sm:justify-end mt-4'>
            <Button className='secondary-btn' onClick={prevStep}>Back</Button>
            <Button onClick={nextStep} className='primary-btn'>Proceed</Button>
          </div>
        </ReusableDialog>
      )}


      {/* Step 4 */}
      {step === 4 && (
        <ReusableDialog
          open={open}
          onOpenChange={setOpen}
          title="Step 4: Confirmation & Submission"
          description="Review and confirm your ride"
          closable={false}
          contentClassName="bg-gray-900 border-gray-700"
        >
          <input
            type='number'
            placeholder='National ID number'
            className='input'
            {...register('nationalId', { 
              required: 'National ID is required',
              pattern: {
                value: /^\d{8,10}$/,
                message: 'Enter a valid National ID number'
              }
            })}
          />
          {errors.nationalId && (
            <p className="text-red-500 text-sm -translate-y-2">{errors.nationalId.message}</p>
          )}

          <input
            type="text"
            placeholder="Driver Phone Number"
            disabled
            className="bg-gray-700 opacity-60"
            {...register('driverPhone', { required: 'Phone is required' })}
          />
          <p className='text-[12px] text-gray-400 -translate-y-3'>You will receive your payments through this number</p>
          <p className="text-sm text-gray-300">✅ All details entered. Confirm and submit.</p>

          <div className='flex flex-col gap-2 sm:flex-row sm:justify-end mt-4'>
            <Button type='button' disabled={isSubmitting} className={`secondary-btn ${isSubmitting ? 'cursor-not-allowed ' : ''}`} onClick={prevStep}>Back</Button>
            <Button 
              disabled={isSubmitting || !isValid}
              className={`primary-btn ${isSubmitting ? 'cursor-not-allowed ' : ''}`}
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? <span className='flex items-center gap-4'><Loader2 className='animate-spin w-5'/>Submitting ride...</span> : 'Submit Ride'}
            </Button>
          </div>
        </ReusableDialog>
      )}
    </form>
    </div>
  );
}
