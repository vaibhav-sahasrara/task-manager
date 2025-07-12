import React from "react";

export const ScrollArea = ({ children, className = "" }) => {
  return (
    <div className={`overflow-auto max-h-[400px] p-2 ${className}`}>
      {children}
    </div>
  );
};
