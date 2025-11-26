import { Link, useLocation } from "react-router-dom";

type NavProps = {
  active: string | string[];
  to: string;
  children: React.ReactNode;
};

export default function Nav({ active, to, children }: NavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = Array.isArray(active)
    ? active.some((a) =>
        a === "/" ? pathname === "/" : pathname.startsWith(a)
      )
    : active === "/"
    ? pathname === "/"
    : pathname.startsWith(active);

  return (
    <Link to={to}>
      <div
        className={`flex items-center gap-5 text-lg ${
          isActive ? "font-bold text-[#04a51e]" : "font-light text-white"
        } cursor-pointer transition-all hover:scale-110 duration-300 ease-out`}
      >
        {children}
      </div>
    </Link>
  );
}
