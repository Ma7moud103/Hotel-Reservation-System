import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { IBooking } from "../../interface/IRoom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/Vars";

interface IProps {
  data: IBooking[];
  count: number;
}
export function UseBookings() {
  const guestId = sessionStorage.getItem("guestId");
  const [searchParams] = useSearchParams();
  const QueryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //get rooms
  const {
    data: bookings,
    error,
    isLoading
  } = useQuery<IProps>({
    queryKey: ["bookings", page],
    queryFn: () => getBookings(String(guestId), page)
  });

  //prefetching the data
  if (bookings) {
    const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);
    if (page < pageCount) {
      QueryClient.prefetchQuery({
        queryKey: ["bookings", page + 1],
        queryFn: () => getBookings(String(guestId), page + 1)
      });
    }

    if (page > 1)
      QueryClient.prefetchQuery({
        queryKey: ["bookings", page - 1],
        queryFn: () => getBookings(String(guestId), page + 1)
      });
  }

  return { bookings, isLoading, error };
}
