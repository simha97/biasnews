import React from "react";

interface SelectableButtonProps {
  name: string;
  value: "left" | "center" | "right" | "differences" | "bias"; // <- change here
  selectedSection: "left" | "center" | "right" | "differences" | "bias";
  setSelectedSection: (
    section: "left" | "center" | "right" | "differences" | "bias"
  ) => void;
  color: string; // Tailwind color prefix like "yellow-600" or "purple-700"
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  name,
  value,
  selectedSection,
  setSelectedSection,
  color,
}) => {
  const isSelected = selectedSection === value;

  return (
    <button
      onClick={() => setSelectedSection(value)}
      className={`px-6 py-2.5 rounded-md border text-sm font-medium transition-all duration-300 
        ${
          isSelected
            ? `bg-${color} text-white border-${color}`
            : `bg-gray-200 text-black border-black hover:bg-${color} hover:text-white hover:border-${color}`
        }
      `}
    >
      {name}
    </button>
  );
};

export default SelectableButton;
