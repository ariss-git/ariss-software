import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Sidebar />
        <div className="lg:ml-64">{children}</div>
      </main>
      <footer></footer>
    </>
  );
};

export default DashboardLayout;
