const Loader = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-700/30 z-40">
      <div className="flex justify-center items-center w-22 h-22 rounded-full">
        <img
          src="/winners-logo.png"
          alt="Living Faith Church World Wide Logo"
          className="w-16 animate-ping"
        />
      </div>
    </div>
  );
};

export default Loader;
