import { createReply } from "@/redux/slices/replySlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

type ReplyProps = {
  photo_profile: string;
};

export default function ReplyForm({ photo_profile }: ReplyProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImg, setUploadedImg] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!user || !id) return <p>Internal Server Error</p>;

  const handleUploadedImg = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (content) formData.append("content", content);
    if (image) formData.append("image", image);

    setContent("");
    setImage(null);
    setUploadedImg(false);

    try {
      setTimeout(() => {
        dispatch(createReply({ id: id, formData }));
        setUploading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {uploading && (
        <div className="fixed inset-0 z-20 flex justify-center items-center bg-[#1d1d1d]/95">
          <div className="flex flex-col justify-center items-center gap-5">
            <LoaderCircle
              size={50}
              strokeWidth={2.5}
              color="#04a51e"
              className="animate-spin"
            />
            <p className="text-xl font-semibold text-white">Uploading...</p>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex  flex-col items-center justify-center gap-10 px-5 py-8 border-b border-neutral-700"
      >
        <div className="w-full flex items-start justify-between gap-10">
          <div className="w-full flex items-start gap-5">
            {(photo_profile && (
              <img
                src={`http://localhost:3000/uploads/profiles/${photo_profile}`}
                alt=""
                className="size-10 rounded-full"
              />
            )) || (
              <img
                src="http://localhost:3000/uploads/profiles/default.jpg"
                alt=""
                className="size-10 rounded-full"
              />
            )}
            <textarea
              rows={3}
              className="w-full resize-none text-2xl text-neutral-500 placeholder-neutral-500 border-none focus:border-none outline-none focus:outline-none caret-neutral-500"
              placeholder="Type your reply!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="w-fit flex justify-end gap-5 items-center">
            <label htmlFor="imageInput">
              <ImagePlus
                color="white"
                className="cursor-pointer transition-all hover:scale-110 duration-300 ease-out"
              />
            </label>
            <input
              type="file"
              accept="img/*"
              onChange={handleUploadedImg}
              id="imageInput"
              className="hidden"
            />
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#04a51e] text-white rounded-full cursor-pointer transition-all hover:scale-110 duration-300 ease-out"
            >
              Post
            </button>
          </div>
        </div>
        {uploadedImg && (
          <div className="w-full flex justify-center items-center">
            <img
              src={URL.createObjectURL(image!)}
              alt="Uploaded Image"
              className="w-1/2 rounded-2xl"
            />
          </div>
        )}
      </form>
    </>
  );
}
