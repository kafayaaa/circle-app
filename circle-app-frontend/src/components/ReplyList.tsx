import { timeAgo } from "@/utils/timeAgo";
import { Dot, Heart, MessageCircleMore } from "lucide-react";
import { useState } from "react";

type ReplyListProps = {
  id: number;
  photo_profile: string;
  full_name: string;
  username: string;
  content: string;
  created_at: string;
  image: string;
};

export default function ReplyList({
  id,
  photo_profile,
  full_name,
  username,
  content,
  created_at,
  image,
}: ReplyListProps) {
  const [isLiked, setIsLiked] = useState(false);
  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full flex flex-col gap-0">
      <div
        key={id}
        className="w-full flex justify-start items-start gap-5 p-5 border-b border-neutral-700"
      >
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
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <div className="flex items-center gap-2 cursor-default">
            <p className="text-white">{full_name}</p>
            <div className="flex items-center text-sm text-neutral-500">
              <p>@{username}</p>
              <Dot className="-mx-1.5" />
              <p>{timeAgo(created_at)}</p>
            </div>
          </div>
          <p className="text-white whitespace-pre-wrap cursor-default">
            {content}
          </p>
          {image && (
            <img
              src={`http://localhost:3000/uploads/replies/${image}`}
              alt=""
              className="size-4/6 rounded-xl object-cover"
            />
          )}
          <div className="flex items-center gap-5 mt-3 text-lg text-neutral-500">
            <button className="flex items-center gap-1.5 cursor-pointer">
              <Heart
                onClick={handleIsLiked}
                fill={isLiked ? "red" : "none"}
                strokeWidth={isLiked ? "0" : "2"}
                className="transition-all duration-200 ease-out"
              />
              77
            </button>
            <button className="flex items-center gap-1.5 cursor-pointer">
              <MessageCircleMore />
              77
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
