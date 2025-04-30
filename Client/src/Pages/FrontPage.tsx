import { Link } from "react-router";

const FrontPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-2xl">
        Todo App
      </h1>
      <p className="text-lg mb-8 text-gray-300 drop-shadow-2xl">
        Organize your tasks efficiently and stay productive.
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-white text-black px-6 py-2 font-semibold rounded shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_12px_30px_rgba(0,0,0,1)] transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white text-black px-6 py-2 font-semibold rounded shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_12px_30px_rgba(0,0,0,1)] transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
