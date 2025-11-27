import Thread from "@/components/Thread";
import { fetchMyThreads } from "@/redux/slices/threadSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyThreadsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { threads, error } = useSelector((state: RootState) => state.thread);
  console.log(threads);
  useEffect(() => {
    dispatch(fetchMyThreads());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full flex flex-col items-start ">
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          id={thread.id}
          fullname={thread.createdBy?.full_name ?? "Unknown"}
          username={thread.createdBy?.username ?? "Unknown"}
          profile={thread.createdBy?.photo_profile ?? "default.jpg"}
          uploaded_at={thread.created_at}
          content={thread.content}
          image={thread.image ?? ""}
          likes_count={thread._count?.likes ?? 0}
          is_liked={thread.is_liked ?? false}
          replies={thread._count?.replies ?? 0}
          detail={false}
        />
      ))}
    </div>
  );
}
