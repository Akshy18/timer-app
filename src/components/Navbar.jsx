import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="flex items-center justify-between p-5 bg-indigo-600 ">
      <h1 className="text-2xl font-bold text-white">MyTimer</h1>
      <div className="flex items-center space-x-5 mr-5">
        <Link
          to="/"
          className={`text-white hover:text-gray-400 ${
            location.pathname === "/" ? "underline" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`text-white hover:text-gray-400 ${
            location.pathname === "/history" ? "underline" : ""
          }`}
        >
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
