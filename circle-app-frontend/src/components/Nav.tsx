import { useLocation } from "react-router-dom";

type NavProps = {
  active: string;
  children: React.ReactNode;
};

export default function Nav({ active, children }: NavProps) {
  const location = useLocation();
  const activePage = location.pathname;

  const isActive = activePage === active;

  return (
    <div
      className={`flex items-center gap-5 text-lg ${
        isActive ? "font-bold text-[#04a51e]" : "font-light text-white"
      } cursor-pointer transition-all hover:scale-110 duration-300 ease-out`}
    >
      {children}
    </div>
  );
}
