import { token } from "../utils/Vars";
import supabase from "./supabsase";

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin is not found");
  }

  return data;
}

export async function createBooking(bookingData, formData) {
  if (token === null) throw new Error("you must be logged in ");
  const guestId = sessionStorage.getItem("guestId");

  const newBooking = {
    ...bookingData,
    guestId: guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed"
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  // revalidatePath(`/cabins/${bookingData.cabinId}`);
  // redirect("/cabins/thankyou");
}
