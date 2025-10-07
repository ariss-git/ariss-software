"use client";

import { fetchAllAdmins } from "@/app/_api/panel-user";
import Navbar from "@/app/_components/Navbar";
import { Badge } from "@/components/ui/badge";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Admin {
  panel_user_id: string;
  email: string;
  fullname: string;
  profile_picture: string;
  role: string;
  created_at: string;
}

const FetchAllAdmins = () => {
  const [adminData, setAdminData] = useState<Admin[]>([]);
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
    try {
      const response = await fetchAllAdmins();
      console.log(response.data.data);
      setAdminData(response.data.data);
    } catch (error) {
      console.error("Error fetching admin", error);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <>
      <Navbar>
        <BreadcrumbNav />
      </Navbar>
      <div className="flex justify-center items-center w-full flex-col lg:gap-y-10 lg:mt-10">
        <div className="flex justify-between items-center w-full lg:px-4 lg:py-4 shadow rounded-md border">
          <div className="flex justify-start items-center lg:px-2 lg:py-1 bg-neutral-100 rounded">
            <input
              placeholder="Search an admin..."
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
            <Button>Add Admin</Button>
            <Button variant="outline">Filter</Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="font-semibold">
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((admin, idx) => (
              <TableRow
                key={admin.panel_user_id}
                className={
                  idx % 2 === 0 ? "bg-white border" : "bg-neutral-100 border"
                }
              >
                <TableCell>{admin.profile_picture}</TableCell>
                <TableCell>{admin.fullname}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>{admin.created_at.split("T")[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
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
          <BreadcrumbPage>Admin</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default FetchAllAdmins;
