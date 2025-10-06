import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftRight,
  Bell,
  BookCheck,
  ChevronDown,
  Landmark,
  LayoutDashboard,
  Notebook,
  NotebookPen,
  Package2,
  Settings,
  ShoppingCart,
  TicketPercent,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-neutral-900 text-white lg:flex hidden flex-col">
      <div className="flex justify-start items-center w-full flex-col gap-2">
        <div className="flex justify-center items-center w-full my-4">
          <Image src="/Ariss_Logo.png" alt="Logo" width={150} height={100} />
        </div>
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex justify-start items-start gap-x-2.5">
            <Image
              src="/pfp.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border"
            />
            <div className="flex justify-start items-start flex-col">
              <h5 className="font-semibold text-sm">Saad Sayyed</h5>
              <h5 className="text-xs text-muted-foreground">saad@gmail.com</h5>
            </div>
          </div>
          <div className="p-1 bg-neutral-700 rounded">
            <ChevronDown size={10} color="white" />
          </div>
        </div>
      </div>
      <div className="mt-3 px-4 opacity-40">
        <Separator />
      </div>
      <div className="flex justify-start items-start w-full flex-col gap-y-2 my-4 px-4 overflow-y-auto">
        <AllLinks />
      </div>
    </aside>
  );
}

const AllLinks = () => {
  return (
    <>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <LayoutDashboard size={20} />
        </span>
        <Link href="/">Dashboard</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <Users size={20} />
        </span>
        <Link href="/">Customers</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <Package2 size={20} />
        </span>
        <Link href="/">Products</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <TicketPercent size={20} />
        </span>
        <Link href="/">Discounts</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <ArrowLeftRight size={20} />
        </span>
        <Link href="/">RMA</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <ShoppingCart size={20} />
        </span>
        <Link href="/">Orders</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <Landmark size={20} />
        </span>
        <Link href="/">Invoices</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <BookCheck size={20} />
        </span>
        <Link href="/">Courses</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <Notebook size={20} />
        </span>
        <Link href="/">Question Papers</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <NotebookPen size={20} />
        </span>
        <Link href="/">Questions</Link>
      </div>
      <div className="flex justify-start items-center gap-x-2 w-full py-2 pl-1 rounded hover:bg-neutral-800 duration-300">
        <span>
          <Settings size={20} />
        </span>
        <Link href="/settings">Settings</Link>
      </div>
      <div className="flex justify-between items-center w-full py-2 px-1 rounded hover:bg-neutral-800 duration-300">
        <div className="flex justify-start items-center gap-x-2">
          <span>
            <Bell size={20} />
          </span>
          <Link href="/settings">Notifications</Link>
        </div>
        <div className="p-1 bg-neutral-700 rounded text-neutral-300 text-xs">
          10
        </div>
      </div>
    </>
  );
};
