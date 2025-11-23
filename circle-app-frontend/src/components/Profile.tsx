import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) return <p>Loading...</p>;

  return (
    <div className="w-full p-5 flex flex-col justify-start items-start gap-3 bg-[#262626] rounded-xl">
      <h1 className="text-xl font-semibold text-white mb-1 cursor-default">
        My Profile
      </h1>
      <div className="w-full flex items-center bg-radial-[at_75%_25%] from-[#c2f3d5] via-[#e3d87f] to-[#a0d08e] h-36 rounded-2xl">
        <img
          src={
            user.photo_profile
              ? `http://localhost:3000/uploads/profiles/${user.photo_profile}`
              : "https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
          }
          alt="Profile Picture"
          className="size-24 translate-y-[75%] translate-x-5 border-4 border-[#262626] object-cover rounded-full transition-all hover:scale-120 hover:border-none duration-300 ease-out"
        />
      </div>
      <div className="w-fit self-end">
        <ProfileEdit />
      </div>
      <div className="flex flex-col gap-3 cursor-default">
        <h1 className="text-3xl font-bold text-white">✨{user.full_name}✨</h1>
        <p className=" text-neutral-500">@{user.username}</p>
        <p className="text-white">
          {user.bio ?? "Belum ada bio yang ditambahkan."}
        </p>
        <div className="flex items-center gap-3 text-white">
          <p className="text-neutral-500">
            <span className="text-white font-bold">{user.following || 0}</span>
            &nbsp;Following
          </p>
          <p className="text-neutral-500">
            <span className="text-white font-bold">{user.followers || 0}</span>
            &nbsp;Follower
          </p>
        </div>
      </div>
    </div>
  );
}
