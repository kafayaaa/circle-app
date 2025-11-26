import { ImagePlus } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import NewThreadButton from "./NewThreadButton";

export default function NewPost() {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return <p>Loading...</p>;
  return (
    <>
      <div className="w-full pt-10 pb-5 border-b border-neutral-700 px-5">
        <h1 className="text-2xl text-white mb-7 cursor-default">Home</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-5">
            <img
              src={
                user.photo_profile
                  ? `http://localhost:3000/uploads/profiles/${user.photo_profile}`
                  : "http://localhost:3000/uploads/profiles/default.jpg"
              }
              alt=""
              className="size-10 rounded-full object-cover"
            />
            <p className="text-lg text-neutral-500 cursor-default">
              What is happening?!
            </p>
          </div>
          <div className="flex items-center gap-5">
            <ImagePlus className="text-[#04a51e] cursor-pointer transition-all hover:scale-110 duration-300 ease-out" />
            <NewThreadButton name="Post" />
          </div>
        </div>
      </div>
    </>
  );
}
