import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { IRooms } from "../../interface/IRoom";
import { getRooms } from "../../services/apiRooms";
import { PAGE_SIZE } from "../../utils/Vars";

interface GetRoomsResponse {
  data: IRooms[];
  count: number;
}
export function UseRooms(isCheckingIn: boolean | null) {
  const [searchParams] = useSearchParams();
  const QueryClient = useQueryClient();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //filter by type of room
  const filterValue = searchParams.get("type");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filterBy: "type", value: filterValue };

  //sort
  const sortByRaw = searchParams.get("sortBy") || "price-ase";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //get rooms
  const {
    data: rooms,
    error,
    isLoading
  } = useQuery<GetRoomsResponse>({
    queryKey: ["rooms", page, filter, sortBy, isCheckingIn],
    queryFn: () => getRooms({ page, filter, sortBy })
  });

  //prefetching the data
  if (rooms) {
    const pageCount = Math.ceil(rooms?.count / PAGE_SIZE);
    if (page < pageCount) {
      QueryClient.prefetchQuery({
        queryKey: ["rooms", page + 1, filter, sortBy, isCheckingIn],
        queryFn: () => getRooms({ page: page + 1, filter, sortBy })
      });
    }

    if (page > 1)
      QueryClient.prefetchQuery({
        queryKey: ["rooms", page - 1, filter, sortBy, isCheckingIn],
        queryFn: () => getRooms({ page: page - 1, filter, sortBy })
      });
  }

  return { rooms, isLoading, error };
}
