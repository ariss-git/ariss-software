import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const AddCategory = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Category <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>TODO: Add Category</p>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
