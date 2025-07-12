import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl shadow p-4 bg-white dark:bg-gray-900 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
