import { IBooking } from "./../interface/IRoom";
import { PAGE_SIZE } from "../utils/Vars";
import supabase from "./supabsase";

export async function getBooking(id: number): Promise<IBooking> {
  const token = sessionStorage.getItem("token");

  if (token === null) null;
  const { data, error } = await supabase
    .from("reservations")
    .select("*, hotelRooms(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("room is not found");
  }

  return data as IBooking;
}

interface IProps {
  data: IBooking[];
  count: number;
}

export async function getBookings(
  guestId: string,
  page: number
): Promise<IProps> {
  const token = sessionStorage.getItem("token");

  if (token === null) null;
  let query = supabase
    .from("reservations")

    .select("*, hotelRooms(*)", {
      count: "exact"
    })
    .eq("userId", guestId)
    .order("startDate");

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookings: IBooking[] =
    data?.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at),
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      room: item["hotel-rooms"]
    })) || [];

  return { data: bookings, count: count ?? 0 };
}

export async function deleteBooking(reservationId: number, roomId: number) {
  const token = sessionStorage.getItem("token");

  if (token === null) null;

  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  } else {
    const { error } = await supabase
      .from("hotelRooms")
      .update({ isReserved: false })
      .eq("id", roomId);
    if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
    }
  }
}

// export async function getBookedDatesByCabinId(roomId: number) {
//   let today: String | Date = new Date();
//   today.setUTCHours(0, 0, 0, 0);
//   today = today.toISOString();

//   // Getting all bookings
//   const { data, error } = await supabase
//     .from("hotel-rooms")
//     .select("*")
//     .eq("id", roomId)
//     .or(`startDate.gte.${today},isReserved.eq.true`);

//   if (error) {
//     console.error(error);
//     throw new Error("rooms could not get loaded");
//   }

//   const bookedDates = data
//     .map((room) => {
//       return eachDayOfInterval({
//         start: new Date(room.startDate),
//         end: new Date(room.endDate)
//       });
//     })
//     .flat();

//   return bookedDates;
// }
