import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchThreads } from "../redux/slices/threadSlice";
import React from "react";
import MainLayout from "@/layouts/Main";
import NewThread from "@/components/NewThread";
import Thread from "@/components/Thread";

export default function ThreadPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { threads, error } = useSelector((state: RootState) => state.thread);

  console.log(threads);

  // Load pertama kali
  React.useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      <NewThread />
      <div className="w-full flex flex-col items-start ">
        {threads.map((thread) => (
          <Thread
            id={thread.id}
            fullname={thread.createdBy?.full_name ?? "Unknown"}
            username={thread.createdBy?.username ?? "Unknown"}
            profile={thread.createdBy?.photo_profile ?? ""}
            uploaded_at={thread.created_at}
            content={thread.content}
            image={thread.image ?? ""}
            likes_count={thread._count?.likes ?? 0}
            is_liked={thread.is_liked ?? false}
            replies={thread._count?.replies ?? 0}
          />
        ))}
      </div>
    </MainLayout>
  );
}
