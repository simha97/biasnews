"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [keyword] = useState("Israel");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyze = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3001/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
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

    analyze();
  }, [keyword]);

  return (
    <div className="">
      {loading && <p>Analyzing news articles...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <pre className="whitespace-pre-wrap text-sm">{result}</pre>
      )}
    </div>
  );
}
