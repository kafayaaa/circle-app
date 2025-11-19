export default function Suggest() {
  return (
    <div className="w-full p-5 flex flex-col gap-5 bg-[#262626] rounded-xl">
      <h1 className="text-2xl font-semibold text-white cursor-default">
        Suggested for you
      </h1>
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
            alt=""
            className="size-10 rounded-full"
          />
          <div className="cursor-default">
            <h1 className="font-semibold text-white">Hahaha</h1>
            <p className="text-sm text-neutral-500">@hahaha</p>
          </div>
        </div>
        <button className="w-fit self-end px-5 py-2 border border-white rounded-full text-white transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
          Follow
        </button>
      </div>
    </div>
  );
}
