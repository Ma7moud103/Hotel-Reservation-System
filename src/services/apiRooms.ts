import { IBooking, IGetRoomsProps, IRooms } from "../interface/IRoom";
import { PAGE_SIZE, token } from "../utils/Vars";
import supabase from "./supabsase";

interface GetRoomsResponse {
  data: IRooms[];
  count: number;
}

export async function getRooms({
  page,
  filter,
  sortBy
}: IGetRoomsProps): Promise<GetRoomsResponse> {
  let query = supabase.from("hotelRooms").select("*", {
    count: "exact"
  });

  if (token === null) null;

  query = query.eq("isReserved", false);

  //filter
  if (filter) query = query["eq"](filter.filterBy, filter.value);

  //sort
  if (sortBy) {
    const { field, direction } = sortBy;
    const [min, max] = direction.split("To").map(Number);

    if (direction.includes("To")) {
      query = query
        .gte(field, min)
        .lte(field, max)
        .order(field, { ascending: true });
    } else if (direction.includes("Up")) {
      query = query.gte(field, 800).order(field, { ascending: true });
    } else {
      query = query.order(field, {
        ascending: direction === "asc"
      });
    }
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Failed to fetch rooms");
  }

  return { data: data as IRooms[], count: count ?? 0 };
}

export async function getRoom(id: number) {
  if (token === null) null;

  const { data, error } = await supabase
    .from("hotelRooms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Room is not found");
  }

  return data as IRooms;
}
