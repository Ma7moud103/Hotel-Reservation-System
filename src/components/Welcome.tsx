const username = sessionStorage.getItem("userName");
const Welcome = () => {
  return (
    <div className="mt-2 mb-3">
      <p className="font-semibold text-bodyText text-[1.3rem]">
        Hello, {username}
      </p>
      <h1 className="text-[1.5rem] text-bodyText font-semibold">
        Welcome To Our Hotel
      </h1>
    </div>
  );
};

export default Welcome;
