const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-600 text-center p-8 gap-16">
      <img src="/winners-logo.png" alt="Winners Chapel Logo" className="w-32" />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white">
          Welcome to Faith Stream
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Your one-stop solution for all faith-based sermons from Faith
          Tabernacle
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
