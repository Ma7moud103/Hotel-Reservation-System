import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BookRoom = () => {
  const { session } = useSelector((state: RootState) => state.auth);
  return (
    <section className="h-full">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum ab sunt
      nesciunt laudantium optio vitae neque explicabo dolore. Deserunt,
      asperiores quaerat! Mollitia soluta veritatis saepe sapiente excepturi
      assumenda officia maiores.
    </section>
  );
};

export default BookRoom;
