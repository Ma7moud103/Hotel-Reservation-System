import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const MainLayout = () => {
  return (
    <div className="w-full bg-mainBg">
      <Navigation />

      <main className="p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
