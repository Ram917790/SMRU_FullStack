// App.jsx
import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Admissions from "./pages/Admissions.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";

import Schools from "./pages/Schools.jsx";
import School from "./pages/School.jsx";          // ✅ changed to point to the new School.jsx file
import Department from "./pages/Department.jsx";
import Program from "./pages/Program.jsx";

import LeaderProfile from "./pages/LeaderProfile.jsx";
import { FaWhatsapp } from "react-icons/fa";

export const ApplyModalContext = createContext({ openApplyModal: () => {} });

const AlertModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-['Poppins']">
    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-sm text-center">
      <p className="text-lg mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-6 py-2 bg-[#0d315c] text-white rounded-md hover:bg-[#019e6e] focus:outline-none focus:ring-2 focus:ring-[#0d315c] focus:ring-opacity-50 transition duration-200 shadow-md font-semibold"
      >
        OK
      </button>
    </div>
  </div>
);

export default function App() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationType, setApplicationType] = useState("faculty");
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    program: "",
    message: "",
    qualification: "",
    specialization: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);

  const whatsappNumber = "9154929260";

  const openApplyModal = () => {
    setApplicationType("faculty");
    setShowApplyModal(true);
  };
  const closeAlertModal = () => setShowAlertModal(false);

  const handleApplyInput = (e) => {
    const { name, value } = e.target;
    setApplyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("applicationType", applicationType);
    Object.entries(applyForm).forEach(([key, value]) => formData.append(key, value));
    formData.append("timestamp", new Date().toISOString());

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxI4fzSvgmqGkX39jUXkzGCp_nzzFYOJvae6GQ5kS-Nw5y7qTxYQoamWmVoafFINxJ/exec",
        { method: "POST", body: formData }
      );
      if (response.ok) {
        setAlertMessage("Application submitted successfully!");
        setShowAlertModal(true);
        setApplyForm({
          fullName: "",
          email: "",
          mobile: "",
          program: "",
          message: "",
          qualification: "",
          specialization: "",
        });
        setApplicationType("faculty");
        setShowApplyModal(false);
      } else {
        setAlertMessage("Submission failed. Please try again.");
        setShowAlertModal(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setAlertMessage("Network issue. Please try again later.");
      setShowAlertModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openNpfPopup = () => {
    const btn = document.querySelector(
      ".npfWidgetButton.npfWidget-1724ed5dcfaa2cb0aabd46c4d9c7d8df"
    );
    if (btn) btn.click();
    else {
      setAlertMessage("Enquiry form is loading. Please try again in a moment.");
      setShowAlertModal(true);
    }
  };

  const goToStudentAdmissions = () => {
    setShowApplyModal(false);
    window.open("https://admissions.smru.in", "_blank");
  };

  return (
    <ApplyModalContext.Provider value={{ openApplyModal }}>
      <Router>
        <Navbar />
        <ScrollToTop />

        <main className="pt-[70px] sm:pt-[90px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/leadership/all" element={<About />} />
            <Route path="/leadership/:slug" element={<LeaderProfile />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />

            {/* Schools hierarchy */}
            <Route path="/schools" element={<Schools />} />                 {/* List all schools */}
            <Route path="/schools/:schoolSlug" element={<School />} />      {/* School → Departments */}
            <Route path="/schools/:schoolSlug/:deptSlug" element={<Department />} /> {/* Department → Programs */}
            <Route path="/schools/:schoolSlug/:deptSlug/:programSlug" element={<Program />} /> {/* Program detail */}

            <Route path="/departments" element={<Navigate to="/schools" replace />} />
            <Route path="/departments/:id" element={<Navigate to="/schools" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Enquire Now */}
        <button
          type="button"
          aria-label="Enquire Now"
          onClick={openNpfPopup}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[1200] bg-red-600 text-white font-bold w-[44px] h-[120px] shadow-2xl cursor-pointer flex items-center justify-center transition hover:bg-red-800 rounded-l-xl"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "0.95rem",
            letterSpacing: "0.06em",
            borderTopLeftRadius: "0.6rem",
            borderBottomLeftRadius: "0.6rem",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <span className="rotate-180">Enquire Now</span>
        </button>

        {/* WhatsApp */}
        <a
          className="fixed right-4 bottom-6 z-[1201] bg-[#26ff00] text-white p-2 rounded-full shadow-lg transition hover:scale-110 flex items-center justify-center sm:right-3 sm:bottom-4"
          href={`https://wa.me/9154929260?text=Hello%20SMRU%20Team%2C%20I%20have%20a%20query.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="text-[40px] sm:text-[36px]" />
        </a>

        {showAlertModal && <AlertModal message={alertMessage} onClose={closeAlertModal} />}
        <Footer />

        <style>{`
          ::-webkit-scrollbar { width: 22px; height: 22px; background: #e6f2ff; border-radius: 12px; }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #1976d2 0%, #0d315c 100%);
            border-radius: 12px; border: 4px solid #e6f2ff; min-height: 48px; min-width: 48px;
            box-shadow: 0 4px 16px 0 rgba(25,118,210,0.18), 0 0 0 2px #1976d222;
            transition: background 0.3s, box-shadow 0.3s; position: relative;
          }
          ::-webkit-scrollbar-thumb::after {
            content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
            width: 60%; height: 60%; border-radius: 8px; background: rgba(255,255,255,0.18); box-shadow: 0 0 8px 2px #fff3;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #0d315c 0%, #1976d2 100%);
            box-shadow: 0 4px 24px 0 rgba(25,118,210,0.22), 0 0 0 3px #1976d233;
          }
          ::-webkit-scrollbar-thumb:active {
            background: linear-gradient(135deg, #1976d2 80%, #0d315c 100%);
            box-shadow: 0 4px 32px 0 rgba(25,118,210,0.28), 0 0 0 4px #0d315c44;
          }
          ::-webkit-scrollbar-track {
            background: linear-gradient(90deg, #e6f2ff 60%, #cfe2ff 100%);
            border-radius: 12px; margin: 6px 0; box-shadow: inset 0 0 10px #e6f2ff, 0 1px 0 #1976d211;
          }
          ::-webkit-scrollbar-corner { background: #e6f2ff; }
          html, body { scrollbar-width: thick; scrollbar-color: #1976d2 #e6f2ff; }
        `}</style>
      </Router>
    </ApplyModalContext.Provider>
  );
}
