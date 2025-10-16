import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./_components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
