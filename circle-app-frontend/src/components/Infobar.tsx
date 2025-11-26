import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Profile from "./Profile";
import Suggest from "./Suggest";

export default function Infobar() {
  const location = useLocation();
  const currentPath =
    location.pathname.endsWith("/profile") ||
    location.pathname.endsWith("/my-threads") ||
    location.pathname.includes("/my-medias");
  return (
    <div className="fixed flex flex-col gap-5 inset-y-0 w-4/12 p-10">
      {currentPath ? (
        <></>
      ) : (
        <div className="w-full p-5 bg-[#262626] rounded-xl">
          <h1 className="text-xl font-semibold text-white mb-4 cursor-default">
            My Profile
          </h1>
          <Profile />
        </div>
      )}
      <Suggest />
      <Footer />
    </div>
  );
}
