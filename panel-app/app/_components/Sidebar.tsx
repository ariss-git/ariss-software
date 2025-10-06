import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white lg:flex hidden flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Sidebar</h2>
      <nav className="space-y-2">
        <Link href="/" className="block hover:bg-gray-700 rounded p-2">
          Dashboard
        </Link>
        <Link href="/settings" className="block hover:bg-gray-700 rounded p-2">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
