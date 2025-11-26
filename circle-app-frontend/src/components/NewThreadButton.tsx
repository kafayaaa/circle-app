import { ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useState } from "react";
import { createThread } from "@/redux/slices/threadSlice";
import Uploading from "./Uploading";

type Props = {
  name: string;
};

export default function NewThreadButton({ name }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispach = useDispatch<AppDispatch>();

  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setUploadedImg(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setUploading(true);

    const formData = new FormData();
    formData.append("content", content);

    if (image) formData.append("image", image);

    setContent("");
    setImage(null);
    setOpen(false);
    setUploadedImg(false);
    try {
      setTimeout(() => {
        dispach(createThread(formData));
        setUploading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {uploading && <Uploading />}
      <Dialog>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <button className="px-6 py-1.5 bg-[#04a51e] text-white rounded-full cursor-pointer transition-all hover:scale-110 duration-300 ease-out">
            {name}
          </button>
        </DialogTrigger>
        {open && (
          <DialogContent className="w-1/3 bg-[#1d1d1d] border-none">
            <DialogTitle></DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="flex items-start justify-start gap-5 mt-5 border-b border-neutral-700 pb-5">
                <img
                  src={
                    user.photo_profile
                      ? `http://localhost:3000/uploads/profiles/${user.photo_profile}`
                      : "http://localhost:3000/uploads/profiles/default.jpg"
                  }
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <textarea
                  placeholder="What is happening?!"
                  className="w-full resize-none border-none focus:border-none outline-none focus:outline-none placeholder-neutral-500 text-white"
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                  id="imageInput"
                />
              </div>
              {uploadedImg && (
                <div className="w-full flex justify-center items-center mt-5 rounded">
                  <img
                    src={URL.createObjectURL(image!)}
                    alt=""
                    className="w-full rounded-xl"
                  />
                </div>
              )}
              <DialogFooter>
                <div className="w-full flex justify-between items-center mt-5">
                  <label htmlFor="imageInput">
                    <ImagePlus className="text-[#04a51e] cursor-pointer transition-all hover:scale-110 duration-300 ease-out" />
                  </label>
                  <button
                    type="submit"
                    className="px-6 py-1.5 bg-[#04a51e] text-white rounded-full cursor-pointer transition-all hover:scale-110 duration-300 ease-out"
                  >
                    Post
                  </button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
