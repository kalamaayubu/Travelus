import React, { ReactNode } from "react";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export interface ReusableDialogProps {
  trigger?: ReactNode
  children: ReactNode
  title?: string
  description?: string // optional if you don’t always pass one
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closable?: boolean
  contentClassName?: string 
  footer?: React.ReactNode
}

export type PostRideFormData = {
  departureLocation: string;
  destinationLocation: string;
  vehicleType?: string;
  pricePerSeat: number;
  driverPhone?: string;
  departureTime: Date;
  nationalId?: string;
};

export type Ride = {
  id?: string;
  departureLocation: string;
  destinationLocation: string;
  departureTime: string; // stored as ISO string in DB
  pricePerSeat: number;
  vehicle_types?: {
    type_name: string;
    capacity: number;
  };
  driverId?: string;
  vehicle?: string;
  status?: "Active" | "Completed" | "Cancelled";
  createdAt?: string;
  bookings?: { count: number}[];
  remainingSeats: number;
};

export type RideCardProps = {
  ride: Ride;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export type PublicRideCardProps = {
  departure: string;
  destination: string;
  date: string;
  vehicle: string; // Just the vehicle type_name
  availableSeats: number;
  price: number;
  onViewDetails: () => void;
};

export type AvailableRidesListProps = {
  rides: {
    id: string;
    departureLocation: string;
    destinationLocation: string;
    departureTime: string;
    vehicle?: string;
    availableSeats: number;
    pricePerSeat: number;
    status?: string;
  }[];
};

export type Booking = {
  id: string;
  seatNumber: string;
  userId: string;
}

export type Vehicle = {
  id: string;
  type_name: string;
  capacity: number;
  seat_layout: SeatsLayout;
}

export type RideDetailsProps = {
  id: string;
  createdBy: string;
  departureLocation: string;
  destinationLocation: string;
  departureTime: string;
  pricePerSeat: number;
  vehicle: Vehicle | null;
  bookings: Booking[]
  availableSeats: number;
  status: string
}

export type SeatRow = {
  row: number;
  seats: (number | "Aisle" | "DoorGap" | "Driver" | null)[];
};

export type SeatsLayout = {
  layout: SeatRow[];
};

export interface VehicleType {
    id: string;
    name: string;
}

export interface VehicleTypesState {
    value: VehicleType[]
}

export interface WaitlistFormData {
  email: string;
}

export interface FeedbackFormData {
  name?: string;
  email?: string;
  content: string;
}

export interface BookingInfoProps {
  rideId: string,
  selectedSeats: string[]
  totalCost: number;
  passangerId: string;
  driverId: string;
  passangerPhone: string
}

export type SeatStatus = "AVAILABLE" | "SELECTED" | "RESERVED" | "BOOKED" | "BLOCKED";