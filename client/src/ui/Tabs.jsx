import React, { useState } from "react";

export const Tabs = ({ defaultValue = 0, labels = [], children, className = "" }) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={className}>
      <div className="flex gap-4 border-b pb-2 mb-4">
        {labels.map((lbl, i) => (
          <button
            key={i}
            className={`px-3 py-1 text-sm font-medium ${
              i === active
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-blue-300"
            }`}
            onClick={() => setActive(i)}
          >
            {lbl}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
};
