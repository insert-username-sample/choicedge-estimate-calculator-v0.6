import { Link } from "react-router-dom";
import { User } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-md py-3 px-6 flex items-center justify-between">
      {/* Logo on the left */}
      <Link to="/">
        <img src="https://framerusercontent.com/images/ELh8fVRtwHFS53g8rJIe2WKSSY.png?scale-down-to=512" alt="Choicedge Logo" className="h-16 w-auto object-contain" />
      </Link>

      {/* Navigation Links on the right */}
      <nav className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-[#9c8b75] transition-colors">
          Home
        </Link>
        <Link to="/history" className="text-gray-700 hover:text-[#9c8b75] transition-colors">
          History
        </Link>
        <Link to="/version-info" className="text-gray-700 hover:text-[#9c8b75] transition-colors">
          Version Info
        </Link>
        <Link to="/about-dev" className="text-gray-700 hover:text-[#9c8b75] transition-colors">
          About Dev
        </Link>

        {/* User Icon with Circular Hover Effect */}
        <Link to="/profile" className="relative group">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 transition-colors duration-300 hover:bg-[#9c8b75]">
            <User className="w-6 h-6 text-gray-700 group-hover:text-white" />
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
