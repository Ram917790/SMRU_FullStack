// src/components/ApiState.jsx
import React from "react";

export function Loading({ label = "Loading…" }) {
  return (
    <div className="w-full py-10 grid place-items-center text-[#0d315c]">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200" />
        <div className="h-12 w-12 rounded-full border-4 border-[#019e6e] border-t-transparent animate-spin absolute inset-0" />
      </div>
      <p className="mt-3 text-sm font-semibold">{label}</p>
    </div>
  );
}

export function ErrorState({ title = "Couldn’t load", message = "Please try again.", onRetry }) {
  return (
    <div className="w-full py-12 grid place-items-center">
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-6 max-w-md text-center">
        <h3 className="text-lg font-bold text-[#0d315c]">{title}</h3>
        <p className="mt-2 text-slate-600">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#019e6e] px-4 py-2 text-white font-semibold hover:bg-[#0fa571]"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title = "Nothing here yet",
  message = "No data to show right now.",
  action = null,
}) {
  return (
    <div className="w-full py-12 grid place-items-center">
      <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-6 max-w-md text-center">
        <h3 className="text-lg font-bold text-[#0d315c]">{title}</h3>
        <p className="mt-2 text-slate-600">{message}</p>
        {action}
      </div>
    </div>
  );
}

export function InlineError({ children }) {
  return <p className="text-sm font-semibold text-[#970c0c]">{children}</p>;
}

// Also provide a default export so either import style works
const ApiState = { Loading, ErrorState, EmptyState, InlineError };
export default ApiState;
