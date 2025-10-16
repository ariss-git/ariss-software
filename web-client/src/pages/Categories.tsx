import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  MoreHorizontal,
  Pen,
  PlusCircle,
  Search,
  Trash,
} from "lucide-react";

const Categories = () => {
  return (
    <div className="flex flex-col lg:gap-y-6 justify-center items-center w-full lg:px-6 lg:py-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center lg:gap-x-2 border pr-3 py-2 shadow rounded">
          <input
            className="w-[300px] lg:placeholder:text-sm placeholder:text-xs lg:text-sm text-xs pl-2 focus:outline-none focus:ring-0"
            placeholder="Search categories..."
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
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Router</TableCell>
            <TableCell>Blah blah blah...</TableCell>
            <TableCell>Image here...</TableCell>
            <TableCell className="flex justify-start items-center gap-x-3">
              <Trash className="w-4 h-4 text-red-500" />
              <Pen className="w-4 h-4" />
              <MoreHorizontal className="w-4 h-4" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Categories;
