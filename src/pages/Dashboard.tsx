import Filter from "../components/Filter";
import Rooms from "../features/Rooms/Rooms";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <section className="sm:px-2 lg:px-4">
      <Welcome />
      <div className="p-4 border rounded-sm">
        <Filter />
        <Rooms />
      </div>
    </section>
  );
};

export default Dashboard;
