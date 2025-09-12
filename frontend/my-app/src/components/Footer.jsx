import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0d315c] text-white py-12 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-8 justify-between text-center md:text-left">
        {/* About */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-2xl font-bold text-warning">SMRU</h3>
          <p className="text-white text-base">Rehabilitation University</p>
          <p className="text-white/80 text-sm leading-relaxed my-4">
            India's leading private university for rehabilitative sciences,
            empowering students to heal, restore, and uplift lives.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, i) => (
                <Icon
                  key={i}
                  className="text-xl cursor-pointer hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                />
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl font-bold text-warning mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/departments"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Schools
              </Link>
            </li>
            <li>
              <a
                href="https://admissions.smru.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Admissions
              </a>
            </li>
            <li>
              <Link
                to="/careers"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl font-bold text-warning mb-4">Programs</h4>
          <ul className="space-y-2">
            {[
              "School of Rehabilitation Sciences",
              "School of Health Science",
              "School of Engineering",
              "School of Psychology",
              "School of Special Need Education",
              "School of Speech & Hearing",
              "School of Nursing & Public Health",
              "School of Pharmaceutical Sciences",
            ].map((prog, i) => (
              <li key={i}>
                <Link
                  to="/departments"
                  className="text-white/80 hover:text-[#019e6e] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                >
                  {prog}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl font-bold text-warning mb-4">Contact Info</h4>
          <p className="flex items-start gap-3 text-white/80 mb-3">
            <FaMapMarkerAlt className="text-[#019e6e] mt-1" />
            Near Ramoji Film City, Deshmukhi Village,
            <br />
             Pochampally Mandal,
            Yadadri Bhongir District,
            Hyderabad -508284, Telangana, India.
          </p>
          {["+91-7331119430", "+91-7331119431", "+91-7331119432"].map(
            (phone) => (
              <p
                key={phone}
                className="flex items-start gap-3 text-white/80 mb-3"
              >
                <FaPhoneAlt className="text-[#019e6e] mt-1" />
                {phone}
              </p>
            )
          )}
          <p className="flex items-start gap-3 text-white/80">
            <FaEnvelope className="text-[#019e6e] mt-1" />
            reach@smru.in
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/70 text-sm">
       Copyrights © SMRU
      </div>
    </footer>
  );
};

export default Footer;
