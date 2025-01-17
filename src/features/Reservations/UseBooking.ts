import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function UseBooking() {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    data: room,
    isLoading,
    error
  } = useQuery({
    queryKey: ["bookings", roomId],
    queryFn: () => getBooking(Number(roomId)),
    retry: false
  });

  return { room, isLoading, error };
}
