import ReplyForm from "@/components/ReplyForm";

import MainLayout from "@/layouts/Main";
import { fetchThreadById } from "@/redux/slices/threadSlice";
import { fetchReplies } from "@/redux/slices/replySlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReplyList from "@/components/ReplyList";
import Thread from "@/components/Thread";
import { ArrowLeft } from "lucide-react";

export default function ThreadDetail() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const { threadDetail } = useSelector((state: RootState) => state.thread);
  const { replies } = useSelector((state: RootState) => state.reply);
  const isLiked = threadDetail?.is_liked;

  useEffect(() => {
    if (id) dispatch(fetchThreadById(id));
    if (id) dispatch(fetchReplies(id));
  }, [dispatch, id]);

  if (!user) return <p>Loading...</p>;
  if (!threadDetail) return <p>No Data Found!</p>;

  console.log(threadDetail);

  return (
    <MainLayout>
      <div className="p-5">
        <Link to="/" className="flex items-center mt-7 gap-2 cursor-pointer">
          <ArrowLeft className="size-7" color="white" strokeWidth={2} />
          <p className=" text-3xl font-medium text-white">Status</p>
        </Link>
      </div>
      <Thread
        id={threadDetail.id}
        fullname={threadDetail.createdBy?.full_name ?? "Unknown"}
        username={threadDetail.createdBy?.username ?? "Unknown"}
        profile={threadDetail.createdBy?.photo_profile ?? "default.jpg"}
        uploaded_at={threadDetail.created_at}
        content={threadDetail.content}
        image={threadDetail.image ?? ""}
        likes_count={threadDetail._count?.likes ?? 0}
        is_liked={isLiked}
        replies={threadDetail._count?.replies ?? 0}
        detail={true}
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
    </MainLayout>
  );
}
