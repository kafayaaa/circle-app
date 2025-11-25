import MainLayout from "@/layouts/Main";
import { fetchMyFollowings } from "@/redux/slices/followSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FollowPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { following, loading, error } = useSelector(
    (state: RootState) => state.follow
  );
  console.log(following);
  useEffect(() => {
    dispatch(fetchMyFollowings());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      <div className="w-full min-h-screen flex flex-col">
        <div className="w-full grid grid-cols-2">
          <div className="w-full flex justify-center items-center py-5 text-xl font-bold text-white border-b-4 border-[#04a51e]">
            Following
          </div>
          <div className="w-full flex justify-center items-center py-5 text-xl font-bold text-white border-b-4 border-[#04a51e]">
            Follower
          </div>
        </div>

        {following.map((f) => (
          <div key={f.id} className="w-full flex flex-col gap-3 p-5">
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
              <button className="px-5 py-2 font-medium text-[#04a51e] border border-[#04a51e] rounded-full">
                Unfollow
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
