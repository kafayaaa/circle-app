import { handleLike } from "@/redux/slices/likeSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { timeAgo } from "@/utils/timeAgo";
import { Dot, Heart, MessageCircleMore } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

type ThreadProps = {
  id: number;
  fullname: string;
  username: string;
  profile: string;
  uploaded_at: string;
  content: string;
  image: string;
  likes_count: number;
  is_liked: boolean | undefined;
  replies: number | null;
};

export default function Thread({
  id,
  fullname,
  username,
  profile,
  uploaded_at,
  content,
  image,
  likes_count,
  is_liked,
  replies,
}: ThreadProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const { likes } = useSelector((state: RootState) => state.like);
  const likeData = likes.find((l) => l.thread_id === id);
  const currentLikes = likeData ? likeData.likes_count : likes_count;

  // const [like, setLike] = React.useState(likes);
  const [isLiked, setIsLiked] = React.useState(is_liked);

  React.useEffect(() => {
    setIsLiked(is_liked);
  }, [is_liked]);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
    dispatch(handleLike({ thread_id: id, user_id: user?.id ?? 0 }));
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5 p-5 border-b border-neutral-700">
      <Link to={"/thread-detail/" + id}>
        <div className="flex items-center gap-4 mb-4">
          {(profile && (
            <img
              src={`http://localhost:3000/uploads/profiles/${profile}`}
              alt=""
              className="size-10 rounded-full object-cover"
            />
          )) || (
            <img
              src="https://localhost:3000/uploads/profiles/default.jpg"
              alt=""
              className="size-10 rounded-full object-cover"
            />
          )}
          <div className="flex items-center gap-2 cursor-default">
            <p className="text-white">{fullname}</p>
            <div className="flex items-center text-sm text-neutral-500">
              <p>@{username}</p>
              <Dot className="-mx-1.5" />
              <p>{timeAgo(uploaded_at)}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-3">
          <p className="text-white whitespace-pre-wrap cursor-default">
            {content}
          </p>
          {image && (
            <div className="size-4/6 aspect-square">
              <img
                src={`http://localhost:3000/uploads/threads/${image}`}
                alt=""
                className="size-full rounded-xl object-cover"
              />
            </div>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-5 mt-3 text-lg text-neutral-500">
        <button className="flex items-center gap-1.5 cursor-pointer">
          <Heart
            onClick={handleIsLiked}
            fill={isLiked ? "red" : "none"}
            strokeWidth={isLiked ? "0" : "2"}
            className="transition-all duration-200 ease-out"
          />
          {currentLikes}
        </button>
        <button className="flex items-center gap-1.5 cursor-pointer">
          <MessageCircleMore />
          {replies}
        </button>
      </div>
    </div>
  );
}
