import {
  ArrowLeftRight,
  Bell,
  BookCheck,
  Landmark,
  LayoutDashboard,
  Menu,
  Moon,
  NotebookPen,
  Package2,
  PanelLeftClose,
  PanelRightClose,
  ShoppingCart,
  TicketPercent,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  return (
    <nav className="w-full h-16 dark:bg-black bg-black text-stone-100 dark:text-stone-100 flex items-center px-0 justify-between fixed top-0 left-0 z-50 border-b dark:border-stone-500 border-black">
      <div className="flex justify-between items-center w-full lg:px-2 px-4">
        <div className="flex justify-center items-center lg:gap-x-4 gap-x-2">
          {/* <h1 className="text-4xl font-light text-stone-100 dark:text-stone-100 font-posterama uppercase tracking-tight">
                        Ariss
                    </h1> */}
          <MobileSheet />
          <img
            className="lg:max-w-32 max-w-24"
            src="/Ariss_Logo.png"
            alt="Logo"
          />
        </div>

        <div className="flex justify-center items-center lg:gap-x-4">
          <button
            className="lg:block hidden cursor-pointer"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <PanelLeftClose
                size={16}
                className="text-stone-100 dark:text-stone-100 stroke-[1.5]"
              />
            ) : (
              <PanelRightClose
                size={16}
                className="text-stone-100 dark:text-stone-100 stroke-[1.5]"
              />
            )}
          </button>
          <Moon className="w-4 h-4 stroke-[1.5]" />
          <Bell className="w-4 h-4 stroke-[1.5]" />
          <span className="w-8 h-8 rounded-full bg-orange-500 lg:ml-4 lg:mr-2" />
        </div>
      </div>
    </nav>
  );
};

const MobileSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => {
    setIsOpen(false);
  };
  return (
    <div className="block lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button>
            <Menu
              onClick={() => setIsOpen(true)}
              size={16}
              className="text-stone-100 dark:text-stone-100 stroke-[1.5]"
            />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-y-6 justify-start items-start h-full w-full bg-black text-[#ABB9E8] font-work px-6 py-10 text-xl overflow-y-auto"
        >
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/"
          >
            <LayoutDashboard size={16} className="mr-2" /> Dashboard
          </Link>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center gap-x-2 text-xl">
                <Users size={16} className="mr-2" /> Customers
              </AccordionTrigger>
              <AccordionContent className="flex justify-start items-start flex-col gap-y-4 text-base mt-4">
                <Link onClick={closeSheet} to="/customers">
                  All Customers
                </Link>
                <Link onClick={closeSheet} to="/customers/distributors">
                  Distributors
                </Link>
                <Link onClick={closeSheet} to="/customers/dealers/approved">
                  Approved Dealers
                </Link>
                <Link onClick={closeSheet} to="/customers/dealers/not-approved">
                  Disapproved Dealers
                </Link>
                <Link onClick={closeSheet} to="/customers/technicians">
                  Technicians
                </Link>
                <Link onClick={closeSheet} to="/customers/backoffices">
                  Backoffices
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="flex items-center gap-x-2 text-xl">
                <Package2 size={16} className="mr-2" />
                Products
              </AccordionTrigger>
              <AccordionContent className="flex justify-start items-start flex-col gap-y-4 text-base mt-4">
                <Link onClick={closeSheet} to="/categories">
                  Categories
                </Link>
                <Link onClick={closeSheet} to="/subcategories">
                  Subcategories
                </Link>
                <Link onClick={closeSheet} to="/products">
                  Products
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/discounts"
          >
            <TicketPercent size={16} className="mr-2" /> Discounts
          </Link>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/rma"
          >
            <ArrowLeftRight size={16} className="mr-2" /> RMA
          </Link>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/orders"
          >
            <ShoppingCart size={16} className="mr-2" /> Orders
          </Link>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/invoices"
          >
            <Landmark size={16} className="mr-2" /> Invoices
          </Link>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/courses"
          >
            <BookCheck size={16} className="mr-2" /> Courses
          </Link>
          <Link
            className="flex items-center gap-x-2"
            onClick={closeSheet}
            to="/tests"
          >
            <NotebookPen size={16} className="mr-2" /> Tests
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
