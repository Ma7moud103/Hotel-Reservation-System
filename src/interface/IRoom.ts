export interface IRooms {
  id: number;
  count: number;
  created_at: string;
  type: string;
  status: "booked" | "available";
  regularPrice: number;
  name: string;
  description: string;
  maxCapacity: number;
  image: string;
}
