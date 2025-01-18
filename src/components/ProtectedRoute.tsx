import { ReactNode } from "react";
import { token } from "../utils/Vars";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  if (token !== null || isAuthorized) {
    return <>{children}</>;
  } else {
    return <Login />;
  }
};

export default ProtectedRoute;
