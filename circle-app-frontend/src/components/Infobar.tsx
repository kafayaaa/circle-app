import Footer from "./Footer";
import Profile from "./Profile";
import Suggest from "./Suggest";

export default function Infobar() {
  return (
    <div className="fixed flex flex-col gap-5 inset-y-0 w-4/12 p-10">
      <Profile />
      <Suggest />
      <Footer />
    </div>
  );
}
