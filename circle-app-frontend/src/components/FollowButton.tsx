import { refreshUser } from "@/redux/slices/authSlice";
import {
  addFollow,
  fetchMyFollowings,
  unfollow,
} from "@/redux/slices/followSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface FollowButtonProps {
  targetUserId: number;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const activeUser = useSelector((state: RootState) => state.auth.user);
  const { following, loading } = useSelector(
    (state: RootState) => state.follow
  );
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    // optional: fetch followings once component mounts
    if (activeUser) {
      dispatch(fetchMyFollowings());
    }
  }, [activeUser, dispatch]);

  if (!activeUser) {
    return null;
  }

  const isFollowing =
    following?.some(
      (f) =>
        Number(f.follower_id) === Number(activeUser.id) &&
        Number(f.following_id) === Number(targetUserId)
    ) ?? false;

  console.log(isFollowing);
  console.log("FOLLOWING LIST:", following);
  console.log("ACTIVE:", activeUser?.id);
  console.log("TARGET:", targetUserId);

  const handleClick = async () => {
    if (localLoading || loading) return;

    setLocalLoading(true);

    try {
      if (isFollowing) {
        await dispatch(
          unfollow({
            userId: activeUser.id,
            unfollow_id: targetUserId,
          })
        ).unwrap();
      } else {
        await dispatch(
          addFollow({ userId: activeUser.id, add_follow_id: targetUserId })
        ).unwrap();
      }
      await dispatch(fetchMyFollowings());
      await dispatch(refreshUser());
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={localLoading || loading}
      className={`px-5 py-2 rounded-full border text-white transition-all hover:scale-110 duration-300 ease-out ${
        isFollowing
          ? "text-[#04a51e] border-[#04a51e] bg-transparent"
          : "bg-[#04a51e] border-none text-white"
      } ${localLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {localLoading ? "Processing..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};
