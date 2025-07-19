import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQueries";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import LivePage from "./pages/LivePage";
import SermonPage from "./pages/SermonPage";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile && isVisible ? (
        <div className="relative flex justify-center items-center w-screen h-screen z-999">
          <span
            className="absolute top-5 right-5 p-4"
            onClick={() => setIsVisible(!isVisible)}
          >
            <IoClose className="text-[42px]" />
          </span>
          {isVisible ? <WelcomePage /> : null}
        </div>
      ) : null}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/live" element={<LivePage />} />
        <Route
          path="/sermons"
          element={
            <SermonPage />
            // <ProtectedRoute>
            //   <SermonPage />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
