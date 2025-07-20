"use client";
import { useState } from "react";
import BiasSectionSelector from "./components/BiasButtons";
import SelectableButton from "./components/SelectableButton";
import AnalysisList from "./components/AnalysisList";

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

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<
    "left" | "center" | "right" | "differences" | "bias"
  >("center");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: input }),
      });

      if (!response.ok) throw new Error("Failed to fetch analysis");

      const data = await response.json();
      setResult(data.analysis);
      console.log(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const shouldCenter = !result;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="circle z-0 top-[5rem] left-[-4rem] bg-blue-400 "></div>
      <div className="circle z-0 top-[-1rem] right-[-3rem] bg-red-400"></div>
      <div className="circle z-0 bottom-[-10rem] left-1/2 -translate-x-1/2 center bg-white"></div>

      {/* Foreground */}
      <div
        className={`relative z-10 flex flex-col items-center gap-4 px-4 ${
          shouldCenter ? "justify-center min-h-screen" : "pt-10"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 justify-center w-full max-w-3xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter keyword (ex: Ukraine)"
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Get Analysis
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}

        {/* Result */}
        {loading && (
          <div className="w-full max-w-5xl bg-amber-50 text-black p-5 rounded-xl">
            <p>Analyzing news articles...</p>
          </div>
        )}

        {!loading && result && (
          <div className="w-full max-w-5xl bg-amber-50 text-black p-5 rounded-xl">
            <h1 className="text-3xl mb-4 p-2">{result.title}</h1>
            {/* buttons */}
            <div className="flex flex-wrap gap-4">
              <BiasSectionSelector
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
              <SelectableButton
                name="Differences"
                value="differences"
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                color="yellow-600"
              />

              <SelectableButton
                name="Bias"
                value="bias"
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                color="purple-700"
              />
            </div>
            <AnalysisList selectedSection={selectedSection} result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
