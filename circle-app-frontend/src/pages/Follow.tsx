import MainLayout from "@/layouts/Main";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function FollowPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isFollowing =
    currentPath.endsWith("/follow") || currentPath.endsWith("/followings");
  const isFollower = currentPath.endsWith("/followers");
  return (
    <MainLayout>
      <div className="w-full min-h-screen flex flex-col">
        <div className="w-full grid grid-cols-2 border-b border-neutral-700">
          <Link
            to={"followings"}
            className={`w-full flex justify-center items-center py-5 text-xl font-bold text-white cursor-pointer ${
              isFollowing ? "border-b-4 border-[#04a51e]" : ""
            }`}
          >
            Following
          </Link>
          <Link
            to={"followers"}
            className={`w-full flex justify-center items-center py-5 text-xl font-bold text-white cursor-pointer ${
              isFollower ? "border-b-4 border-[#04a51e]" : ""
            }`}
          >
            Follower
          </Link>
        </div>
        <Outlet />
      </div>
    </MainLayout>
  );
}
