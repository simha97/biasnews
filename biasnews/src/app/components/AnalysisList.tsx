import React from "react";

type SelectedSection = "left" | "center" | "right" | "differences" | "bias";

type AnalysisResult = {
  title: string;
  summaries: {
    left: string[];
    center: string[];
    right: string[];
  };
  differences: string[];
  biasIndicators: string[];
};

interface AnalysisListProps {
  selectedSection: SelectedSection;
  result: AnalysisResult;
}

const AnalysisList: React.FC<AnalysisListProps> = ({
  selectedSection,
  result,
}) => {
  let items: string[] = [];

  switch (selectedSection) {
    case "left":
      items = result.summaries.left;
      break;
    case "center":
      items = result.summaries.center;
      break;
    case "right":
      items = result.summaries.right;
      break;
    case "differences":
      items = result.differences;
      break;
    case "bias":
      items = result.biasIndicators;
      break;
  }

  if (items.length === 0) {
    return (
      <div className="mt-6 text-sm italic text-gray-500">
        No summaries found for this side.
      </div>
    );
  }

  return (
    <div className="mt-6 text-sm">
      <ul className="list-disc pl-5 text-xl space-y-4">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisList;
