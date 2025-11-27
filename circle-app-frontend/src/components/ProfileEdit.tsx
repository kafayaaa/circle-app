import type { RootState } from "@/redux/store";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/slices/userSlice";
import { ImageUp } from "lucide-react";

export default function ProfileEdit() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    full_name: user?.full_name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    photo_profile: null as File | null,
  });
  const [open, setOpen] = useState(false);

  const [uploadedImg, setUploadedImg] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, photo_profile: e.target.files[0] });
    }
    setUploadedImg(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    const fd = new FormData();
    fd.append("username", formData.username);
    fd.append("full_name", formData.full_name);
    fd.append("email", formData.email);
    fd.append("bio", formData.bio);
    if (formData.photo_profile) {
      fd.append("photo_profile", formData.photo_profile);
    } else {
      fd.append("photo_profile", user.photo_profile!);
    }
    setOpen(false);

    await dispatch(updateUser(fd));
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <button className=" px-5 py-2 border border-white rounded-full text-white transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
          Edit Profile
        </button>
      </DialogTrigger>
      {open && (
        <DialogContent className="bg-[#1d1d1d] border-none">
          <h1 className="text-xl font-semibold text-white mb-1">
            Edit Profile
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input type="hidden" value={formData.email} />
            <div className="w-full flex items-center bg-radial-[at_75%_25%] from-[#c2f3d5] via-[#e3d87f] to-[#a0d08e] h-36 rounded-2xl">
              <label htmlFor="photo_profile" className="relative">
                {uploadedImg ? (
                  <img
                    src={URL.createObjectURL(formData.photo_profile!)}
                    alt="Profile Picture"
                    className="size-24 translate-y-[75%] translate-x-5 border-4 border-[#262626] object-cover rounded-full transition-all "
                  />
                ) : (
                  <img
                    src={
                      user.photo_profile
                        ? `http://localhost:3000/uploads/profiles/${user.photo_profile}`
                        : "http://localhost:3000/uploads/profiles/default.jpg"
                    }
                    alt="Profile Picture"
                    className="size-24 translate-y-[75%] translate-x-5 border-4 border-[#262626] object-cover rounded-full transition-all "
                  />
                )}
                <div className="absolute bottom-0 left-0 translate-y-[75%] translate-x-5 flex justify-center items-center bg-black/35 size-24 rounded-full">
                  <ImageUp
                    className=""
                    size={30}
                    color="white"
                    strokeWidth={2}
                  />
                </div>
              </label>
              <input
                type="file"
                id="photo_profile"
                name="photo_profile"
                className="hidden"
                onChange={handleFile}
              />
            </div>
            <div className="w-full flex flex-col items-stretch gap-3 mt-15">
              <div className="w-full px-3 py-1.5 border border-neutral-500 rounded-xl">
                <label htmlFor="full_name" className="text-sm text-neutral-500">
                  Fullname
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  className="w-full border-none focus:border-none outline-none focus:outline-none caret-neutral-500 text-white"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 py-1.5 border border-neutral-500 rounded-xl">
                <label htmlFor="username" className="text-sm text-neutral-500">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border-none focus:border-none outline-none focus:outline-none caret-neutral-500 text-white"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 py-1.5 border border-neutral-500 rounded-xl">
                <label htmlFor="bio" className="text-sm text-neutral-500">
                  Bio
                </label>
                <textarea
                  rows={5}
                  id="bio"
                  name="bio"
                  className="w-full resize-none border-none focus:border-none outline-none focus:outline-none caret-neutral-500 text-white"
                  value={formData.bio ?? ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="self-end mt-5 px-5 py-2 bg-[#04a51e] rounded-full font-medium text-white transition-all hover:scale-110 duration-300 ease-out"
            >
              Update
            </button>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
