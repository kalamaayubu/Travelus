import React, { ReactNode } from "react";

export type SignupFormData = {
  role: string;
  name: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export interface ReusableDialogProps {
  trigger?: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closable?: boolean;
  contentClassName?: string;
  footer?: React.ReactNode;
}

export type PostRideFormData = {
  departureLocation: string;
  destinationLocation: string;
  vehicleType?: string;
  pricePerSeat: number;
  driverPhone?: string;
  departureTime: Date;
  nationalId?: string;
  confirmation?: boolean;
};

export type Ride = {
  id?: string;
  departureLocation: string;
  destinationLocation: string;
  departureTime: string;
  pricePerSeat: number;
  vehicle_types?: {
    type_name: string;
    capacity: number;
    seats_layout?: { layout: SeatRow[] };
  };
  driverId?: string;
  vehicle?: string;
  seatsLayout?: { layout: SeatRow[] };
  seatsByStatus?: {
    BOOKED: string[];
    RESERVED: string[];
    BLOCKED: string[];
    CANCELLED: string[];
    AVAILABLE: string[];
  };
  status?: "Active" | "Completed" | "Cancelled";
  createdAt?: string;
  bookings?: BookingStatusProps[];
  remainingSeats: number;
};

export type RideCardProps = {
  ride: Ride;
  onEdit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
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
};

export type Vehicle = {
  id: string;
  type_name: string;
  capacity: number;
  seat_layout: SeatsLayout;
};

export type RideDetailsProps = {
  id: string;
  createdBy: string;
  departureLocation: string;
  destinationLocation: string;
  departureTime: string;
  pricePerSeat: number;
  vehicle: Vehicle | null;
  bookings: Booking[];
  availableSeats: number;
  status: string;
};

export type SeatRow = {
  row: number;
  seats: (number | "Aisle" | "DoorGap" | "Driver" | null)[];
};

export type SeatsLayout = {
  layout: SeatRow[];
};

export interface SeatMapProps {
  departureLocation: string;
  destinationLocation: string;
  departureTime: string;
  seatsLayout: SeatsLayout;
  seatsByStatus: {
    BOOKED: string[];
    RESERVED: string[];
    BLOCKED: string[];
    CANCELLED: string[];
    AVAILABLE: string[];
  };
  selectedSeats: string[];
  onSeatSelect: (seat: string) => void;

  // DriverSeatMap  props
  onReserveSeats?: () => void;
  isReserving?: boolean;
}

export interface VehicleType {
  id: string;
  name: string;
}

export interface VehicleTypesState {
  value: VehicleType[];
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
  rideId: string;
  selectedSeats: string[];
  totalCost: number;
  passangerId: string;
  driverId: string;
  passangerPhone: string;
}

// 1. Booking status
export interface BookingStatusProps {
  id: string;
  count: number;
  status: "RESERVED" | "BOOKED" | "BLOCKED" | "AVAILABLE" | "CANCELLED";
  seatNumber: string; // e.g. "B3, B4"
}

// 2. SeatsByStatus type
export type SeatsByStatus = {
  BOOKED: string[];
  RESERVED: string[];
  BLOCKED: string[];
  CANCELLED: string[];
  AVAILABLE: string[];
};

export type SeatStatus =
  | "AVAILABLE"
  | "SELECTED"
  | "RESERVED"
  | "BOOKED"
  | "BLOCKED";

export type DriverSeatReservationProps = {
  rideId: string;
  count: number;
  seatNumber: string[];
  userId: string;
  userType: "driver" | "rider";
  status: SeatStatus;
};

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  separator?: boolean;
  icon?: ReactNode;
  className?: string;
};

export interface ReusableDropdownProps {
  triggerText?: string;
  trigger?: ReactNode; // Custom trigger node
  label?: string;
  items: DropdownItem[];
  contentClassName?: string; // For styling
}

export type RideFilterForm = {
  search: string;
  vehicle: string;
  maxPrice: string;
  date: string;
};

export interface EmailProps {
  to: string;
  subject: string;
  body: string;
}
