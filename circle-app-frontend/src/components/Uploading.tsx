import { LoaderCircle } from "lucide-react";

export default function Uploading() {
  return (
    <div className="fixed inset-0 z-60 flex justify-center items-center bg-[#1d1d1d]/95">
      <div className="flex flex-col justify-center items-center gap-5">
        <LoaderCircle
          size={50}
          strokeWidth={2.5}
          color="#04a51e"
          className="animate-spin"
        />
        <p className="text-xl font-semibold text-white">Uploading...</p>
      </div>
    </div>
  );
}
