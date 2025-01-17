import { IBooking } from "./../../interface/IRoom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../../services/apiRooms";

interface IProps {
  data: IBooking | undefined;
  isLoading: boolean;
  error: unknown;
}
export function UseRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    data: room,
    isLoading,
    error
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoom(Number(roomId)),
    retry: false
  });

  return { room, isLoading, error };
}
