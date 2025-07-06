import { Link } from "react-router-dom";

const Navbar = () => {
  // Dummy authentication state for demonstration
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
    const profile = JSON.parse(localStorage.getItem("user"));
    // console.log(profile.profileImg)
  const handleAuth = () => {
    // setIsLoggedIn((prev) => !prev);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between font-sans">
      <div className="text-xl font-bold text-indigo-600 tracking-wide font-mono">
        Chat App
      </div>
      <div className="flex items-center gap-5">
        <div className="bg-blue-400 h-10 rounded-full w-10">
            <img className="object-cover h-full w-full rounded-full" src={profile.profileImg} alt="" />
        </div>
        <div className="flex items-center gap-4">
            
            <Link to={'/'}>
                <button
                    onClick={handleAuth}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
                >
                    Logout
                </button>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;