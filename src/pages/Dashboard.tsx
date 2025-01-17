import Rooms from "../features/Rooms/Rooms";
import Welcome from "../components/Welcome";
import RoomsOperation from "../features/Rooms/RoomsOperation";

const Dashboard = () => {
  return (
    <section className="sm:px-2 lg:px-4">
      <Welcome />
      <div className="p-4 border rounded-sm">
        <RoomsOperation />
        <Rooms />
      </div>
    </section>
  );
};

export default Dashboard;
