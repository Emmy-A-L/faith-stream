import { FaRegUserCircle, FaUserCheck } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";




const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="fixed top-0 w-full flex justify-between items-center bg-gray-700 text-white py-4 px-6">
      <img src="/winners-logo.png" alt="Winners Chapel Logo" className="w-8" />
      <h1 className="text-xl font-bold">Faith Stream</h1>
      {!isAuthenticated ? (<FaRegUserCircle className="text-3xl" />) : (<FaUserCheck className="text-3xl" />)}
    </div>
  )
}

export default Header