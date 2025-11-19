export default function Profile() {
  return (
    <div className="w-full p-5 flex flex-col justify-start items-start gap-3 bg-[#262626] rounded-xl">
      <h1 className="text-xl font-semibold text-white mb-1 cursor-default">
        My Profile
      </h1>
      <div className="w-full flex items-center bg-radial-[at_75%_25%] from-[#c2f3d5] via-[#e3d87f] to-[#a0d08e] h-36 rounded-2xl">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
          alt="Profile Picture"
          className="size-24 translate-y-[75%] translate-x-5 border-4 border-[#262626] rounded-full transition-all hover:scale-120 hover:border-none duration-300 ease-out"
        />
      </div>
      <button className="w-fit self-end px-5 py-2 border border-white rounded-full text-white transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
        Edit Profile
      </button>
      <div className="flex flex-col gap-3 cursor-default">
        <h1 className="text-3xl font-bold text-white">✨Hehehe✨</h1>
        <p className=" text-neutral-500">@hehehe</p>
        <p className="text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et tempora,
          minus quas similique, animi sed iste inventore assumenda tenetur,
          distinctio sit consequuntur nisi consequatur reiciendis eligendi
          dolorum cumque. Quidem, sit.
        </p>
        <div className="flex items-center gap-3 text-white">
          <p className="text-neutral-500">
            <span className="text-white font-bold">777</span>&nbsp;Following
          </p>
          <p className="text-neutral-500">
            <span className="text-white font-bold">777</span>&nbsp;Follower
          </p>
        </div>
      </div>
    </div>
  );
}
