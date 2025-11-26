import { fetchMyThreads } from "@/redux/slices/threadSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyMediasPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { threads, error } = useSelector((state: RootState) => state.thread);
  console.log(threads);
  useEffect(() => {
    dispatch(fetchMyThreads());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full p-2 grid grid-cols-3 gap-2">
      {threads.map((thread) => (
        <Link
          key={thread.id}
          to={`/profile/my-medias/${thread.id}`}
          className="size-full aspect-square"
        >
          <img
            src={`http://localhost:3000/uploads/threads/${thread.image}`}
            alt=""
            className="size-full rounded object-cover cursor-pointer hover:scale-105 transition-all duration-300 ease-out"
          />
        </Link>
      ))}
    </div>
  );
}
