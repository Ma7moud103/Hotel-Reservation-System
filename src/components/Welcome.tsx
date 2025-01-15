import { useSelector } from "react-redux";
import { RootState } from "../store";

const Welcome = () => {
  const userName = useSelector((state: RootState) => state.user.username);

  return (
    <div className="mt-2 mb-3">
      <p className="font-semibold text-bodyText text-[1.3rem]">
        Hello, {userName}
      </p>
      <h1 className="text-[1.5rem] text-bodyText font-semibold">
        Welcome To Our Hotel
      </h1>
    </div>
  );
};

export default Welcome;
