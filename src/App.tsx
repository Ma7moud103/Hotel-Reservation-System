import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import BookRoom from "./features/Reservations/BookRoom";
import RoomDetails from "./features/Rooms/RoomDetails";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reservations from "./pages/Reservations";
import Signup from "./pages/Signup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});
function App() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to={"dashboard"} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="bookRoom" element={<BookRoom />} />
              <Route path=":roomId" element={<RoomDetails />} />
            </Route>
            <Route path="login" element={<Login />} />,
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
export default App;
