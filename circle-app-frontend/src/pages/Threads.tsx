import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchThreads } from "../redux/slices/threadSlice";
import React from "react";
import MainLayout from "@/layouts/Main";
import NewPost from "@/components/NewPost";
import Post from "@/components/Post";

export default function ThreadPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { threads, loading, error } = useSelector(
    (state: RootState) => state.threads
  );

  // Load pertama kali
  React.useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (loading) return <p>Loading threads...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(threads);

  return (
    <MainLayout>
      <NewPost />
      <div className="w-full flex flex-col items-start">
        {threads.map((thread) => (
          <Post
            id={thread.id}
            fullname={thread.createdBy?.full_name ?? "Unknown"}
            username={thread.createdBy?.username ?? "Unknown"}
            profile={thread.createdBy?.photo_profile ?? ""}
            uploaded_at={thread.created_at}
            content={thread.content}
            image={thread.image ?? ""}
            likes={[]}
            number_of_replies={thread.number_of_replies ?? 0}
          />
        ))}
      </div>
    </MainLayout>
  );
}
