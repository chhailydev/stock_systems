import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="pt-3 ps-3 flex items-center gap-5">
      <Link
        className="hover:text-blue-500 active:text-red-300 focus:text-blue-600"
        to={`/`}
      >
        POSTER
      </Link>
      <Link
        className="hover:text-blue-500 active:text-red-400 focus:text-blue-600"
        to={`/product`}
      >
        PRODUCT
      </Link>
    </nav>
  );
};

export default Navbar;
