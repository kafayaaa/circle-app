import { ImagePlus } from "lucide-react";

export default function NewPost() {
  return (
    <div className="w-full pt-10 pb-5 border-b border-neutral-700 px-5">
      <h1 className="text-2xl text-white mb-7 cursor-default">Home</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
            alt=""
            className="size-10"
          />
          <p className="text-lg text-neutral-500 cursor-default">
            What is happening?!
          </p>
        </div>
        <div className="flex items-center gap-5">
          <ImagePlus className="text-[#04a51e] cursor-pointer transition-all hover:scale-110 duration-300 ease-out" />
          <button className="px-6 py-1.5 bg-[#04a51e] text-white rounded-full cursor-pointer transition-all hover:scale-110 duration-300 ease-out">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
