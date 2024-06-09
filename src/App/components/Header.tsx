import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <Link
        to="/"
        className="text-lg font-semibold"
        onClick={handleHeaderClick}
      >
        {title}
      </Link>
      <nav>
        <Link to="/about-us" className="mx-4 hover:underline">
          About Us
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
