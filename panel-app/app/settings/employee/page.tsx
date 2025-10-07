"use client";

import { fetchAllEmployees } from "@/app/_api/panel-user";
import Navbar from "@/app/_components/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Employee {
  panel_user_id: string;
  email: string;
  fullname: string;
  profile_picture: string;
  role: string;
  created_at: string;
}

const FetchAllEmployees = () => {
  const [adminData, setAdminData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 7;

  const filteredData = adminData.filter(
    (admin) =>
      admin.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getAllAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetchAllEmployees();
      console.log(response.data.data);
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching employee", error);
      toast.error("Error Fetching Employee.", {
        description: "Server might be down, please contact the developer.",
        style: { backgroundColor: "red" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <Navbar>
        <BreadcrumbNav />
      </Navbar>
      <div className="flex justify-center items-center w-full flex-col lg:gap-y-10 lg:mt-10">
        <div className="flex justify-between items-center w-full lg:px-4 lg:py-4 shadow rounded-md">
          <div className="flex justify-start items-center lg:px-2 lg:py-1 bg-neutral-100 rounded">
            <input
              placeholder="Search an employee..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="lg:placeholder:text-sm placeholder:text-xs pl-2 focus:outline-none bg-transparent focus:ring-0 lg:w-[220px]"
            />
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex justify-start items-center lg:gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-x-2"
                >
                  Filter <ChevronDown className="stroke-[1] w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="lg:pl-2 lg:pr-6 py-2 text-xs flex justify-start items-start">
                <Link href="/settings/admin">Admin Members</Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table>
          <TableHeader className="bg-neutral-800 text-neutral-100">
            <TableRow className="font-semibold hover:bg-neutral-800 hover:text-neutral-100">
              <TableCell className="px-4">Profile</TableCell>
              <TableCell className="px-4">Name</TableCell>
              <TableCell className="px-4">Email</TableCell>
              <TableCell className="px-4">Role</TableCell>
              <TableCell className="px-4">Joined Date</TableCell>
            </TableRow>
          </TableHeader>
          {paginatedData.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center align-middle lg:h-20 text-muted-foreground"
                >
                  No employee members found.
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {paginatedData.map((admin, idx) => (
                <TableRow
                  key={admin.panel_user_id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-neutral-100"}
                >
                  <TableCell className="border px-4">
                    {admin.profile_picture}
                  </TableCell>
                  <TableCell className="border px-4">
                    {admin.fullname}
                  </TableCell>
                  <TableCell className="border px-4">{admin.email}</TableCell>
                  <TableCell className="border px-4">{admin.role}</TableCell>
                  <TableCell className="border px-4">
                    {admin.created_at.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        {paginatedData.length !== 0 && (
          <Pagination className="absolute bottom-4 mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

const BreadcrumbNav = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/settings">Settings</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="cursor-default">
            Employee Members
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default FetchAllEmployees;
