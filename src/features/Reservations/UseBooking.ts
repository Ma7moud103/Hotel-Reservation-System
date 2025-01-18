import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function UseBooking() {
  const { reservedId } = useParams<{ reservedId: string }>();
  console.log(reservedId);
  const {
    data: room,
    isLoading,
    error
  } = useQuery({
    queryKey: ["booking", reservedId],
    queryFn: () => getBooking(Number(reservedId)),
    retry: false
  });

  console.log(room);

  return { room, isLoading, error };
}
