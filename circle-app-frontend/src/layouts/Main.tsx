import Infobar from "@/components/Infobar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full grid grid-cols-12 bg-[#1d1d1d]">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-5 border border-neutral-700">{children}</div>
        <div className="col-span-4">
          <Infobar />
        </div>
      </div>
    </>
  );
}
