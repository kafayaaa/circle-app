import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import {
  CircleUserRound,
  Heart,
  Home,
  LogOut,
  UserRoundSearch,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="fixed w-3/12 inset-y-0 flex flex-col justify-between items-start p-10 border-r border-neutral-700">
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-7xl mb-10 font-semibold text-[#04a51e]">circle</h1>
        <div className="flex flex-col justify-start items-start gap-10">
          <Nav active="/" to="/">
            <Home className="size-7" />
            Home
          </Nav>
          <Nav active="/search" to="/search">
            <UserRoundSearch className="size-7" />
            Search
          </Nav>
          <Nav active={["/follow", "/followings", "/followers"]} to="/follow">
            <Heart className="size-7" />
            Follows
          </Nav>
          <Nav active="/profile" to="/profile">
            <CircleUserRound className="size-7" />
            Profile
          </Nav>
        </div>
        <button className="w-full py-3 mt-10 text-lg font-semibold text-white bg-[#04a51e] rounded-full cursor-pointer transition-all hover:scale-110 duration-300 ease-out">
          Create Post
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-5 text-lg text-white cursor-pointer transition-all hover:scale-110 duration-300 ease-out"
      >
        <LogOut className="size-7" />
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
