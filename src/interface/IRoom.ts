export interface Guest {
  countryFlag: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
}

// export interface Room {
//   created_at: string;
//   description: string;
//   discount: number;
//   id: number;
//   image: string;
//   maxCapacity: number;
//   name: string;
//   regularPrice: number;
//   status: string;
//   type: string;
// }

export interface IRooms {
  name: string;
  availableFrom: Date;
  availableTo: Date;
  breakfastPrice: number;
  created_at: Date;
  description: string;
  id: number;
  image: string;
  isReserved: boolean;
  price: number;
  type: "single" | "double" | "suite";
}

export interface IBooking {
  created_at: string;
  endDate: string;
  id: number;
  isBreakfast: boolean;
  roomId: number;
  startDate: string;
  totalPrice: number;
  userId: string;

  hotelRooms: IRooms;
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
  roomId: number;
  startDate: Date | undefined | string;
  endDate: Date | undefined | string;
  userId: string;
  isBreakfast: boolean;
  totalPrice: number;
}
