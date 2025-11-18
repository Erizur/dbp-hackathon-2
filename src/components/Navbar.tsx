import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide hover:text-indigo-300 transition-colors"
        >
          MyApp
        </Link>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Courses
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
