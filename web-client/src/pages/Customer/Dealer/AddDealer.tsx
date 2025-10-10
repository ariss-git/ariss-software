import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddDealer = () => {
  return (
    <div className="flex justify-start items-start w-full flex-col lg:gap-y-10 lg:p-10">
      <div className="flex justify-start items-start lg:w-[300px] flex-col gap-y-2">
        <Label>Email</Label>
        <Input className="w-full rounded" />
      </div>
      <div className="flex justify-start items-start lg:w-[300px] flex-col gap-y-2">
        <Label>Phone</Label>
        <Input className="w-full rounded" />
      </div>
      <div className="flex justify-start items-start lg:w-[300px] flex-col gap-y-2">
        <Label>Name</Label>
        <Input className="w-full rounded" />
      </div>
      <div className="flex justify-start items-start lg:w-[300px] flex-col gap-y-2">
        <Label>GSTIN</Label>
        <Input className="w-full rounded" />
      </div>
      <div className="flex justify-start items-start lg:w-[300px] flex-col gap-y-2">
        <Label>Business</Label>
        <Input className="w-full rounded" />
      </div>
    </div>
  );
};

export default AddDealer;
