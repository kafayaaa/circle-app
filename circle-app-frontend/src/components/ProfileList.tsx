import { FollowButton } from "./FollowButton";

type ProfileListProps = {
  id: number;
  photo_profile: string;
  full_name: string;
  username: string;
  visibility: boolean;
};

export default function ProfileList({
  id,
  photo_profile,
  full_name,
  username,
  visibility,
}: ProfileListProps) {
  return (
    <div className="w-full flex flex-col gap-3 p-5">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-16">
            {photo_profile ? (
              <img
                src={`http://localhost:3000/uploads/profiles/${photo_profile}`}
                alt=""
                className="size-full rounded-full object-cover"
              />
            ) : (
              <img
                src="http://localhost:3000/uploads/profiles/default.jpg"
                alt=""
                className="size-full rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-xl font-bold text-white">{full_name}</h1>
            <p className="text-neutral-500">@{username}</p>
          </div>
        </div>
        <div className={visibility ? "" : "hidden"}>
          <FollowButton targetUserId={id} />
        </div>
      </div>
    </div>
  );
}
