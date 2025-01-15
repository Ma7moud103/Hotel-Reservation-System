import { IRooms } from "../interface/IRoom";
import supabase from "./supabsase";

export async function getRooms(): Promise<IRooms[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch rooms");
  }

  return data;
}
