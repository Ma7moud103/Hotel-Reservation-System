const Loading = () => {
  return (
    <div className="absolute top-0 bottom-0 z-10 flex items-center justify-center start-0 end-0 bg-blur">
      <div className="w-16 h-16 border-4 rounded-full border-accentGold border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
