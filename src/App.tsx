import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./hooks/useMediaQueries";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import LivePage from "./pages/LivePage";
import SermonPage from "./pages/SermonPage";
import Header from "./components/Header";
import SignupPage from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
// import Loader from "./components/Loader";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if the welcome screen has already been shown in this session
    const hasSeenWelcome = sessionStorage.getItem("welcome_shown");

    if (isMobile && !hasSeenWelcome) {
      setShowWelcome(true);
      sessionStorage.setItem("welcome_shown", "true");
    }
  }, [isMobile]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <>
      {/* Show mobile-only welcome screen once per session */}
      {isMobile && showWelcome ? (
        <div className="relative flex justify-center items-center w-screen h-screen z-999">
          <span
            className="absolute top-5 right-5 p-4"
            onClick={handleCloseWelcome}
          >
            <IoClose className="text-[42px]" />
          </span>
          <WelcomePage />
        </div>
      ) : (
        <>
          {isMobile ? <Header /> : null}
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes */}
            <Route
              path="/sermons"
              element={
                // <SermonPage />
                <ProtectedRoute>
                  <SermonPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
