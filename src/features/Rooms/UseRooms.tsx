import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";
import { IRooms } from "../../interface/IRoom";

export function UseRooms() {
  const {
    data: rooms,
    error,
    isLoading
  } = useQuery<IRooms[]>({
    queryKey: ["rooms"],
    queryFn: getRooms
  });

  return { rooms, isLoading, error };
}
