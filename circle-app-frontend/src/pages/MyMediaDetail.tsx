import ReplyForm from "@/components/ReplyForm";
import ReplyList from "@/components/ReplyList";
import Thread from "@/components/Thread";
import { fetchReplies } from "@/redux/slices/replySlice";
import { fetchThreadById } from "@/redux/slices/threadSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function MyMediaDetailPage() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const { threadDetail } = useSelector((state: RootState) => state.thread);
  const { replies } = useSelector((state: RootState) => state.reply);
  const isLiked = threadDetail?.is_liked;

  const [open, setOpen] = useState(false);
  // Load pertama kali
  useEffect(() => {
    if (id) dispatch(fetchThreadById(id));
    if (id) dispatch(fetchReplies(id));
  }, [dispatch, id]);

  if (!user) return <p>Loading...</p>;
  if (!threadDetail) return <p>No Data Found!</p>;

  console.log(threadDetail);
  return (
    <div className="fixed inset-0 z-50 w-full h-screen grid grid-cols-12 bg-[#1d1d1d]">
      <div className="col-span-8 w-full h-screen px-5 flex items-center justify-center border-r border-neutral-700">
        <Link to="/profile/my-medias">
          <CircleX
            color="white"
            size={30}
            strokeWidth={2}
            className="absolute top-5 left-10"
          />
        </Link>
        <img
          src={`http://localhost:3000/uploads/threads/${threadDetail.image}`}
          alt="Image"
          className="size-full object-cover"
          onClick={() => setOpen(true)}
        />
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <img
              src={`http://localhost:3000/uploads/threads/${threadDetail.image}`}
              alt="Image"
              className="size-full object-contain"
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </div>
      <div className="col-span-4 w-full">
        <Thread
          id={threadDetail.id}
          fullname={threadDetail.createdBy?.full_name ?? "Unknown"}
          username={threadDetail.createdBy?.username ?? "Unknown"}
          profile={threadDetail.createdBy?.photo_profile ?? ""}
          uploaded_at={threadDetail.created_at}
          content={threadDetail.content}
          image={""}
          likes_count={threadDetail._count?.likes ?? 0}
          is_liked={isLiked}
          replies={threadDetail._count?.replies ?? 0}
        />
        <ReplyForm photo_profile={user.photo_profile ?? ""} />
        {replies.map((reply) => (
          <ReplyList
            id={reply.id}
            photo_profile={reply.user.photo_profile ?? ""}
            full_name={reply.user.full_name}
            username={reply.user.username}
            content={reply.content}
            created_at={reply.created_at}
            image={reply.image ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
