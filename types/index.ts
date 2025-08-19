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
  title: string
  description?: string // optional if you don’t always pass one
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closable: boolean
  contentClassName?: string 
  footer?: React.ReactNode
}

export type PostRideFormData = {
  departureLocation: string;
  destinationLocation: string;
  seatsAvailable: number;
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
  seatsAvailable?: number;
  driverId?: string;
  vehicle?: string;
  status?: "Active" | "Completed" | "Cancelled";
  createdAt?: string;
};

export type RideCardProps = {
  ride: Ride;
  onEdit: () => void;
  onCancel: () => void;
};
