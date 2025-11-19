import { timeAgo } from "@/utils/timeAgo";
import { Dot, Heart, MessageCircleMore } from "lucide-react";
import React from "react";

type PostProps = {
  id: number;
  fullname: string;
  username: string;
  profile: string;
  uploaded_at: string;
  content: string;
  image: string;
  likes: number[];
  number_of_replies: number;
};

export default function Post({
  id,
  fullname,
  username,
  profile,
  uploaded_at,
  content,
  image,
  likes,
  number_of_replies,
}: PostProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(likes.length);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div
      key={id}
      className="w-full flex justify-start items-start gap-5 p-5 border-b border-neutral-700"
    >
      {(profile && (
        <img
          src={`http://localhost:3000${profile}`}
          alt=""
          className="size-10 rounded-full"
        />
      )) || (
        <img
          src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
          alt=""
          className="size-10 rounded-full"
        />
      )}
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <div className="flex items-center gap-2 cursor-default">
          <p className="text-white">{fullname}</p>
          <div className="flex items-center text-sm text-neutral-500">
            <p>@{username}</p>
            <Dot className="-mx-1.5" />
            <p>{timeAgo(uploaded_at)}</p>
          </div>
        </div>
        <p className="text-white cursor-default">{content}</p>
        {image && (
          <img
            src={`http://localhost:3000${image}`}
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
            {likes.length}
          </button>
          <button className="flex items-center gap-1.5 cursor-pointer">
            <MessageCircleMore />
            {number_of_replies}
          </button>
        </div>
      </div>
    </div>
  );
}
