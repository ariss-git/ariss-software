"use client";

import { fetchAllAdmins } from "@/app/_api/panel-user";
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
  const itemsPerPage = 5;

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
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-10">
      <input
        placeholder="Search admins..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="lg:placeholder:text-sm placeholder:text-xs pl-2 focus:outline-none focus:ring-0"
      />
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
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
              className={idx % 2 === 0 ? "bg-white" : "bg-neutral-100"}
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
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                // disabled={currentPage === 1}
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
                // disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FetchAllAdmins;
