import Empty from "../../components/Empty";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { IBooking } from "../../interface/IRoom";
import Reservation from "./Reservation";
import { UseBookings } from "./UseBookings";

const Bookings = () => {
  const { bookings, isLoading } = UseBookings();

  const data = bookings?.data;
  const count = bookings?.count ?? 0;

  if (isLoading) return <Loading />;

  if (!data || data.length === 0) return <Empty />;
  return (
    <>
      <div className="grid justify-center grid-cols-1 sm:p-3 mt-3 sm:border rounded-lg sm:border-borderLightGray gap-y-5 md:gap-4 md:grid-cols-2 lg:grid-cols-3 h-full">
        {data.map((booking: IBooking) => (
          <Reservation key={booking.id} room={booking} />
        ))}
      </div>
      <div>
        <Pagination count={count} />
      </div>
    </>
  );
};

export default Bookings;
