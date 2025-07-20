import React from "react";

interface BiasSectionSelectorProps {
  selectedSection: "left" | "center" | "right" | "differences" | "bias";
  setSelectedSection: (
    section: "left" | "center" | "right" | "differences" | "bias"
  ) => void;
}

const BiasSectionSelector: React.FC<BiasSectionSelectorProps> = ({
  selectedSection,
  setSelectedSection,
}) => {
  const sections = [
    { key: "left", label: "Left", color: "blue-700" },
    { key: "center", label: "Center", color: "gray-800" },
    { key: "right", label: "Right", color: "red-700" },
  ] as const;

  return (
    <div className="inline-flex flex-row bg-neutral-200 p-1 rounded-xl gap-2">
      {sections.map(({ key, label, color }, idx) => (
        <React.Fragment key={key}>
          <button
            onClick={() => setSelectedSection(key)}
            className={`inline-flex px-6 py-2.5 rounded-md border text-sm font-medium transition-all duration-300
              ${
                selectedSection === key
                  ? `bg-${color} text-white border-${color}`
                  : `bg-neutral-200 text-black border-neutral-200 hover:bg-${color} hover:text-white hover:border-${color}`
              }
            `}
          >
            {label}
          </button>
          {idx < sections.length - 1 && <div className="border border-white" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BiasSectionSelector;
