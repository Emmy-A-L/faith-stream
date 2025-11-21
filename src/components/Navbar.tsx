import { IoHome } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import { useMediaQuery } from "../hooks/useMediaQueries";
import { useAuth } from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/Firebase";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {isMobile ? (
        /* Mobile Navbar */
        <div className="fixed bottom-0 flex justify-around items-center w-screen h-18 rounded-t-2xl px-4 py-2 bg-gray-100 glass text-gray-700 z-50">
          {/* Home Icon */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
            }
            end
          >
            <IoHome title="Home" size={24} />
          </NavLink>
          {/* Live Icon */}
          <NavLink
            to="/live"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
            }
          >
            <RiLiveLine title="Live Service" size={24} />
          </NavLink>
          {/* Past Sermon Icon */}
          <NavLink
            to="/sermons"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
            }
          >
            <MdOutlineLiveTv title="Past Sermons" size={24} />
          </NavLink>
          {/* Sign Out Button || User Icon Button */}
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="text-gray-300 hover:text-red-400"
            >
              <FiLogOut title="Sign Out" size={24} />
            </button>
          ) : (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-red-500" : "text-gray-300 hover:text-red-400"
              }
            >
              <CiLogin title="Sign Up" size={24} />
            </NavLink>
          )}
        </div>
      ) : (
        /* Desktop Navbar */
        <div className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-gray-100 glass text-gray-700 z-50">
          <img src="/winners-logo.png" alt="Winners Chapel Logo" className="w-10" />
          <div className="flex items-center space-x-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
                }`
              }
              end
            >
              <IoHome size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/live"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
                }`
              }
            >
              <RiLiveLine size={20} />
              <span>Live Service</span>
            </NavLink>
            <NavLink
              to="/sermons"
              className={({ isActive }) =>
                `flex items-center gap-1 ${
                  isActive ? "text-red-500" : "text-gray-700 hover:text-red-400"
                }`
              }
            >
              <MdOutlineLiveTv size={20} />
              <span>Past Sermons</span>
            </NavLink>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-4 py-2 rounded ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`
                }
              >
                Sign Up
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
