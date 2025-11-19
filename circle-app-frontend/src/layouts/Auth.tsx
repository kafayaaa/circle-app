export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#1d1d1d]">
        {children}
      </div>
    </>
  );
}
