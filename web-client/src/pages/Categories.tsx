import { fetchAllCategories } from "@/api/category-api";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FetchCategory } from "@/types/category-types";
import {
  Filter,
  MoreHorizontal,
  Pen,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";

const Categories = () => {
  const [data, setData] = useState<FetchCategory[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 2;

  const filteredData = data.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getAllCategories = async () => {
    try {
      const res = await fetchAllCategories();
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex flex-col lg:gap-y-6 justify-center items-center w-full lg:px-6 lg:py-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center lg:gap-x-2 border pr-3 py-2 shadow rounded">
          <input
            className="w-[300px] lg:placeholder:text-sm placeholder:text-xs lg:text-sm text-xs pl-2 focus:outline-none focus:ring-0"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex justify-start items-center lg:gap-x-4">
          <Button>
            Add Category <PlusCircle className="w-4 h-4" />
          </Button>
          <Button variant={"outline"}>
            <Filter />
          </Button>
        </div>
      </div>
      <Table className="text-left border">
        <TableHeader>
          {tableHeading.map((heading, idx) => (
            <TableHead key={idx} className="text-white">
              {heading.title}
            </TableHead>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedData.map((category, idx) => (
            <TableRow key={category.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>
                {category.description ? category.description : "N/A"}
              </TableCell>
              <TableCell>
                <img
                  src={category.image}
                  alt={category.title}
                  width={20}
                  height={20}
                />
              </TableCell>
              <TableCell className="flex justify-start items-center gap-x-3">
                <Trash className="w-4 h-4 text-red-500" />
                <Pen className="w-4 h-4" />
                <MoreHorizontal className="w-4 h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        {paginatedData.length !== 0 && (
          <Pagination className="lg:mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
    </div>
  );
};

const tableHeading = [
  {
    title: "Sr No.",
  },
  {
    title: "Title",
  },
  {
    title: "Description",
  },
  {
    title: "Image",
  },
  {
    title: "Actions",
  },
];

export default Categories;
