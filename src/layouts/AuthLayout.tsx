import Navigation from "../components/Navigation";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: IProps) => {
  return (
    <div className="w-full bg-mainBg h-screen">
      <Navigation />

      <main className="p-3 ">{children}</main>
    </div>
  );
};

export default AuthLayout;
