import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "../pages/products/Products";
import Posters from "../pages/posters/Posters";
import Navbar from "../components/Navbar";

const RouteConfig: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Posters />} />
        <Route path="/product" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
