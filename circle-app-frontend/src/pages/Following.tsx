import { FollowButton } from "@/components/FollowButton";
import { fetchMyFollowings } from "@/redux/slices/followSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FollowingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { following, loading, error } = useSelector(
    (state: RootState) => state.follow
  );

  console.log(following);
  useEffect(() => {
    dispatch(fetchMyFollowings());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        following.map((f) => (
          <div key={f.id} className="w-full flex flex-col gap-3 p-5">
            {f.following_user && (
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-16">
                    {f.following_user.photo_profile ? (
                      <img
                        src={`http://localhost:3000/uploads/profiles/${f.following_user.photo_profile}`}
                        alt=""
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="http://localhost:3000/uploads/profiles/default.jpg"
                        alt=""
                        className="rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
                    <h1 className="text-xl font-bold text-white">
                      {f.following_user.full_name}
                    </h1>
                    <p className="text-neutral-500">
                      @{f.following_user.username}
                    </p>
                  </div>
                </div>

                <FollowButton targetUserId={f.following_user.id} />
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}
