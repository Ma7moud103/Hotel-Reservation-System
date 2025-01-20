import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { IBooking } from "../../interface/IRoom";

export function UseBooking() {
  const { reservedId } = useParams<{ reservedId: string }>();
  const {
    data: room,
    isLoading,
    error
  } = useQuery<IBooking, Error>({
    queryKey: ["booking", reservedId],
    queryFn: () => getBooking(Number(reservedId)),
    retry: false
  });

  return { room, isLoading, error };
}
