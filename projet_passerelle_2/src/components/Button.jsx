import React from "react";

export default function Button({ className, primary, onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} w-full py-2 rounded-3xl font-bold ${
        primary
          ? "bg-blue-500 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-90"
          : "bg-black text-blue-500 border border-gray-400 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-90"
      }`}
    >
      {children}
    </button>
  );
}
