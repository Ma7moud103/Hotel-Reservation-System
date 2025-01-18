export interface Guest {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

export interface Room {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  status: string;
  type: string;
}

export interface IRooms {
  maxCapacity: number;
  cabinId: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  guests: Guest;
  hasBreakfast: boolean;
  id: number;
  isBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  regularPrice: number;
  rooms: Room;
  startDate: string;
  status: string;
  totalPrice: number;
  type: string;
}

export interface IBooking {
  cabinId: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  guests: Guest;
  hasBreakfast: boolean;
  id: number;
  isBreakfase: boolean;
  isPaid: boolean;
  maxCapacity: number;
  numGuests: number;
  numNights: number;
  observations: string;
  regularPrice: number;
  rooms: Room;
  startDate: string;
  status: string;
  totalPrice: number;
  type: string;
}
export interface IOption {
  label: string;
  value: string;
}
export interface ISortBy {
  field: string;
  direction: string;
}

export interface IGetRoomsProps {
  page?: number;
  filter: { filterBy: string; value: string } | null;
  sortBy: ISortBy;
}

export interface ICheckinData {
  guestID: string;
  numGuests: number;
  observations: string | null;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  status: "checked-in" | "checked-out" | "unconfirmed";
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  regularPrice: number;
  cabinId: number;
}
