import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Reservations from "./pages/Reservations";
import Signup from "./pages/Signup";
import RoomDetails from "./components/RoomDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate replace to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path=":roomId" element={<RoomDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
