"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setKeyword(input); // Update keyword
    setLoading(true);
    setError(null);
    setResult("");

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
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const shouldCenter = !loading && !result && !error;

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

        {/* Result */}
        <div className="w-full max-w-5xl bg-amber-50 text-black p-5 rounded-xl">
          {loading && <p>Analyzing news articles...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && result && (
            <pre className="whitespace-pre-wrap text-sm mt-6">{result}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
