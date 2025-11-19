import { Dot, Facebook, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full p-5 flex flex-col gap-1 bg-[#262626] rounded-xl">
      <div className="w-full flex items-center">
        <p className="text-white cursor-default">
          Developed by <span className="font-semibold">Kafa</span>
        </p>
        <Dot className="text-neutral-500" />
        <div className="flex items-center gap-2 text-[#262626]">
          <div className=" bg-white rounded-full transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
            <Github
              className="translate-y-1"
              size={25}
              strokeWidth={0}
              fill="#262626"
            />
          </div>
          <div className="p-1 bg-white rounded-sm transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
            <Linkedin size={18} strokeWidth={0} fill="#262626" />
          </div>
          <div className=" bg-white rounded-full transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
            <Facebook
              className="translate-y-1"
              size={25}
              strokeWidth={0}
              fill="#262626"
            />
          </div>
          <div className="p-1 bg-white rounded-full transition-all hover:scale-110 duration-300 ease-out cursor-pointer">
            <Instagram
              color="#262626"
              size={20}
              strokeWidth={2}
              fill="#ffffff"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm text-neutral-500 cursor-default">
        <p>Powered by</p>
        <img
          src="https://dumbways.id/assets/images/brandred.png"
          alt="Dumbways.id"
          className="w-6 mx-1 translate-y-0.5"
        />
        <p>DumbWays Indonesia</p>
        <Dot className="-mx-2 size-8" />
        <p>#1 Coding Bootcamp</p>
      </div>
    </div>
  );
}
