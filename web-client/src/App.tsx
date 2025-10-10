import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddDealer from "./pages/Customer/Dealer/AddDealer";
import AllLinks from "./pages/Dashboard/AllLinks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllLinks />} />
        <Route path="customer/dealer/add" element={<AddDealer />} />
      </Routes>
    </Router>
  );
};

export default App;
