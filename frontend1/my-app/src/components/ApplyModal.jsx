import React, { useEffect } from "react";

export default function ApplyModal({ open, onClose }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffaf3a] text-white text-xl font-bold transition-transform hover:scale-110 hover:rotate-3"
        >
          ×
        </button>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-[#0d315c]">
          Apply to SMRU
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Submit your interest and our admissions team will reach out.
        </p>

        {/* Form */}
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo submit — wire your real form here.");
            onClose?.();
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0d315c] focus:ring-1 focus:ring-[#0d315c] outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0d315c] focus:ring-1 focus:ring-[#0d315c] outline-none"
            required
          />
          <input
            type="Mobile Number"
            placeholder="Mobile Number"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0d315c] focus:ring-1 focus:ring-[#0d315c] outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0d315c] focus:ring-1 focus:ring-[#0d315c] outline-none"
            required
          />
          <button
            type="submit"
            className="mt-2 h-11 rounded-md bg-[#019e6e] px-6 text-sm font-semibold text-white transition hover:bg-[#0d315c]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
