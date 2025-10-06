import { Sun } from "lucide-react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center w-full lg:p-2">
      {children}
      <Sun className="w-4 h-4 text-muted-foreground" />
    </div>
  );
};

export default Navbar;
