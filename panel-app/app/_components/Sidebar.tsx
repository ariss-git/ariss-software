import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-black w-64 h-screen lg:flex hidden justify-start items-start flex-col gap-y-6 fixed top-0 left-0 z-50 text-white p-10">
      <Link href="/">Dashboard</Link>
      <Link href="/settings">Settings</Link>
    </aside>
  );
};

export default Sidebar;
