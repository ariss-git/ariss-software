import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./_components/MainLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
