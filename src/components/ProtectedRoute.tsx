import { ReactNode } from "react";
import { token } from "../utils/Vars";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const session = useSelector((state: RootState) => state.auth.session);
  if (token !== null || session) {
    return <>{children}</>;
  } else {
    return <Login />;
  }
};

export default ProtectedRoute;
