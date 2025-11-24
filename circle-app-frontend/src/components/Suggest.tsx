import { fetchUsers } from "@/redux/slices/userSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowButton } from "./FollowButton";

export default function Suggest() {
  const dispatch = useDispatch<AppDispatch>();

  const activeUser = useSelector((state: RootState) => state.auth.user);

  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full p-5 flex flex-col gap-5 bg-[#262626] rounded-xl">
      <h1 className="text-2xl font-semibold text-white cursor-default">
        Suggested for you
      </h1>
      {Array.isArray(users) &&
        users.map((user) => (
          <div
            key={user.id}
            className={`w-full flex justify-between ${
              activeUser?.id === user.id ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center gap-3">
              {user.photo_profile ? (
                <img
                  src={`http://localhost:3000/uploads/profiles/${user.photo_profile}`}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <img
                  src={`http://localhost:3000/uploads/profiles/default.jpg`}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
              )}
              <div className="cursor-default">
                <h1 className="font-semibold text-white">{user.full_name}</h1>
                <p className="text-sm text-neutral-500">@{user.username}</p>
              </div>
            </div>
            <form className="w-fit self-end">
              <input type="hidden" name="add_follow_id" value={user.id} />
              <FollowButton targetUserId={user.id} />
            </form>
          </div>
        ))}
    </div>
  );
}
