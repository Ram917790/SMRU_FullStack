// Navbar.jsx — UI-only refinements: active states via NavLink, focus-visible, subtle backdrop; no logic changes.
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    // Taller bar so the logo can be larger; logo sits flush to the left edge
    <nav className="bg-[#0d315c]/95 backdrop-blur text-white fixed top-0 w-full z-[999] shadow-md border-b-4 border-[#019e6e] h-20 md:h-24">
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
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-warning" : "hover:text-warning"}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-warning" : "hover:text-warning"}`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-warning" : "hover:text-warning"}`}>
              Schools
            </NavLink>
          </li>
          <li>
            {/* External Admissions link */}
            <a
              href="https://admissions.smru.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-warning transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              Admissions
            </a>
          </li>
          <li>
            <NavLink to="/careers" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-warning" : "hover:text-warning"}`}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-warning" : "hover:text-warning"}`}>
              Contact
            </NavLink>
          </li>
          <li>
            {/* Campus 360 link */}
            <a
              href="https://www.google.co.in/maps/uv?hl=en&pb=!1s0x3bcb72a555555573%3A0xa6e5c60c56c9ffd!3m1!7e115!4s%2Fmaps%2Fplace%2Fstmarys%2Bgroup%2Bof%2Binstitutions%2F%4017.3320062%2C78.7276328%2C3a%2C75y%2C260.33h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sCqjunw4dGqkAAAQvOdM3Zg*212e0*214m2*213m1*211s0x0%3A0xa6e5c60c56c9ffd!5sstmarys%20group%20of%20institutions%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sCqjunw4dGqkAAAQvOdM3Zg&sa=X&ved=0ahUKEwjHzqysuNHMAhUISI8KHYbZDmUQoB8IezAK"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-warning transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              Campus 360
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col cursor-pointer pr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded"
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
        <ul className="flex flex-col items-center gap-4 bg-[#0d315c]/95 backdrop-blur py-4 md:hidden">
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-[#ffaf3a]" : "hover:text-[#ffaf3a]"}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-[#ffaf3a]" : "hover:text-[#ffaf3a]"}`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-[#ffaf3a]" : "hover:text-[#ffaf3a]"}`}>
              Schools
            </NavLink>
          </li>
          <li>
            <a
              href="https://admissions.smru.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-[#ffaf3a] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              Admissions
            </a>
          </li>
          <li>
            <NavLink to="/careers" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-[#ffaf3a]" : "hover:text-[#ffaf3a]"}`}>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `text-lg font-medium transition rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${isActive ? "text-[#ffaf3a]" : "hover:text-[#ffaf3a]"}`}>
              Contact
            </NavLink>
          </li>
          <li>
            {/* Campus 360 link */}
            <a
              href="https://www.google.co.in/maps/uv?hl=en&pb=!1s0x3bcb72a555555573%3A0xa6e5c60c56c9ffd!3m1!7e115!4s%2Fmaps%2Fplace%2Fstmarys%2Bgroup%2Bof%2Binstitutions%2F%4017.3320062%2C78.7276328%2C3a%2C75y%2C260.33h%2C90t%2Fdata%3D*213m4*211e1*213m2*211sCqjunw4dGqkAAAQvOdM3Zg*212e0*214m2*213m1*211s0x0%3A0xa6e5c60c56c9ffd!5sstmarys%20group%20of%20institutions%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e2!2sCqjunw4dGqkAAAQvOdM3Zg&sa=X&ved=0ahUKEwjHzqysuNHMAhUISI8KHYbZDmUQoB8IezAK"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-[#ffaf3a] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              Campus 360
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
