import { IRooms } from "../interface/IRoom";
import { PAGE_SIZE, token } from "../utils/Vars";
import supabase from "./supabsase";

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, rooms(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("room is not found");
  }

  return data;
}

interface IProps {
  data: IRooms[];
  count: number;
}

export async function getBookings(
  guestId: string,
  page: number
): Promise<IProps> {
  let query = supabase
    .from("bookings")

    .select("*, rooms(*), guests(*)", {
      count: "exact"
    })
    .eq("guestID", guestId)
    .order("startDate");

  if (token === null) null;

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

  return { data: data as IRooms[], count: count ?? 0 };
}

export async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
