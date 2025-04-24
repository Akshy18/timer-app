import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // Get current route location to highlight active link
  const location = useLocation();
  
  return (
    
    <nav className="flex items-center justify-between p-5 bg-indigo-600">
      {/* App title */}
      <h1 className="text-2xl font-bold text-white">MyTimer</h1>
      
      {/* Navigation links container */}
      <div className="flex items-center space-x-5 mr-5">
        {/* Home link - becomes underlined when active */}
        <Link
          to="/"  // Links to home page
          className={`text-white hover:text-gray-400 ${
            // Underline if currently on home page
            location.pathname === "/" ? "underline" : ""
          }`}
        >
          Home
        </Link>
        
        {/* History link - becomes underlined when active */}
        <Link
          to="/history"  // Links to history page
          className={`text-white hover:text-gray-400 ${
            // Underline if currently on history page
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