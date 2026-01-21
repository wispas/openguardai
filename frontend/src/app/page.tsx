"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/analyze/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">🛡️ OpenGuard AI</h1>

        <textarea
          className="w-full border rounded p-3 mb-4"
          rows={4}
          placeholder="Enter text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyzeText}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-6 p-4 border rounded">
            <p><b>Label:</b> {result.label}</p>
            <p><b>Confidence:</b> {result.confidence}</p>
            <p><b>Action:</b> {result.action}</p>
          </div>
        )}
      </div>
    </main>
  );
}
