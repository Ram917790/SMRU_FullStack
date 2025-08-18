import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    // Taller bar so the logo can be larger; logo sits flush to the left edge
    <nav className="bg-[#0d315c] text-white fixed top-0 w-full z-[999] shadow-md border-b-4 border-[#019e6e] h-20 md:h-24">
      <div className="flex items-center justify-between h-full">
        {/* Logo (flush left, no container padding) */}
        <Link to="/" onClick={closeMenu} className="flex items-center h-full shrink-0">
          <img
            src={logo}
            alt="SMRU Logo"
            className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 pr-6">
          <li>
            <Link to="/" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/departments" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Schools
            </Link>
          </li>
          <li>
            {/* External Admissions link */}
            <a
              href="https://admissions.smru.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-[#ffaf3a] transition"
            >
              Admissions
            </a>
          </li>
          <li>
            <Link to="/careers" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Careers
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col cursor-pointer pr-4"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`h-[3px] w-[25px] bg-white my-1 transition-all ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`h-[3px] w-[25px] bg-white my-1 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-[3px] w-[25px] bg-white my-1 transition-all ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="flex flex-col items-center gap-4 bg-[#0d315c] py-4 md:hidden">
          <li>
            <Link to="/" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/departments" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Schools
            </Link>
          </li>
          <li>
            <a
              href="https://admissions.smru.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-[#ffaf3a] transition"
            >
              Admissions
            </a>
          </li>
          <li>
            <Link to="/careers" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Careers
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu} className="text-lg font-medium hover:text-[#ffaf3a] transition">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
