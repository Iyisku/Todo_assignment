import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/app/store";
import { logout } from "../Redux/features/Auth/authslice";
import { Link, useNavigate } from "react-router";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">Todo App</div>
      <div className="space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
