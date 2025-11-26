import Profile from "@/components/Profile";
import MainLayout from "@/layouts/Main";
import { fetchMyFollowings } from "@/redux/slices/followSlice";
import type { AppDispatch } from "@/redux/store";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const currentPath = location.pathname;

  const isThread =
    currentPath.endsWith("/profile") || currentPath.endsWith("/my-threads");
  const isMedia = currentPath.endsWith("/my-medias");

  useEffect(() => {
    dispatch(fetchMyFollowings());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="w-full py-10">
        <div className="w-full flex flex-col px-5 mb-8">
          <div className="flex items-center gap-3 text-3xl font-semibold text-white mb-4">
            <Link
              to={"/"}
              className="cursor-pointer transition-all hover:scale-110 duration-300 ease-out"
            >
              <ArrowLeft size={30} strokeWidth={3} />
            </Link>
            <h1 className="cursor-default">My Profile</h1>
          </div>
          <Profile />
        </div>
        <div className="w-full grid grid-cols-2 border-b border-neutral-700">
          <Link
            to={"my-threads"}
            className={`w-full flex justify-center items-center py-5 text-xl font-bold text-white cursor-pointer ${
              isThread ? "border-b-4 border-[#04a51e]" : ""
            }`}
          >
            My Threads
          </Link>
          <Link
            to={"my-medias"}
            className={`w-full flex justify-center items-center py-5 text-xl font-bold text-white cursor-pointer ${
              isMedia ? "border-b-4 border-[#04a51e]" : ""
            }`}
          >
            Media
          </Link>
        </div>
        <Outlet />
      </div>
    </MainLayout>
  );
}
