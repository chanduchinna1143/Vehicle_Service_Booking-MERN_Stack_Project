import { Link, useNavigate } from "react-router-dom";

const Naviga = ({ loggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white shadow-lg px-6 py-4 flex justify-between items-center border-b-2 border-yellow-400">
      <div className="text-3xl font-extrabold text-stone-300 tracking-wide drop-shadow-md cursor-pointer select-none">
        HONDA
      </div>

      <div className="flex items-center gap-6 text-sm font-medium">
        <NavLink to="/" label="Home" />
        <NavLink to="/Services" label="Services" />
        <NavLink to="/zero" label="About" />

        {loggedIn ? (
          <>
            <NavLink to="/booking" label="Book" />
            <NavLink to="/userstatus" label="My Status" />
            <button
              onClick={logoutAndRedirect}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded-md font-semibold transition transform hover:scale-105 shadow-md border border-yellow-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-md shadow-md transition transform hover:scale-105 border border-yellow-500"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
  >
    {label}
  </Link>
);

export default Naviga;
