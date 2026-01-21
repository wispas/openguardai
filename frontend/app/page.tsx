"use client";

import { useState } from "react";

type ResultType = {
  label: string;
  confidence: number;
  action: string;
};

type Mode = "text" | "image" | "video" | "audio";

export default function Home() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeContent = async () => {
    setError("");
    setResult(null);

    if (mode === "text" && !text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    if (mode !== "text" && !file) {
      setError("Please upload a file to analyze.");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (mode === "text") {
        res = await fetch("http://127.0.0.1:8000/analyze/text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
      } else {
        const formData = new FormData();
        formData.append("file", file as File);

        res = await fetch(`http://127.0.0.1:8000/analyze/${mode}`, {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Backend not reachable or error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setText("");
    setFile(null);
    setResult(null);
    setError("");
  };

  const isToxic = result?.label === "toxic";

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-1">🛡️ OpenGuard AI</h1>
        <p className="text-sm text-gray-600 mb-4">
          Multimodal AI content moderation
        </p>

        {/* MODE SELECTOR */}
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as Mode);
            reset();
          }}
          className="border p-2 rounded mb-3 w-full"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        {/* INPUT */}
        {mode === "text" ? (
          <textarea
            className="w-full border rounded p-3 mb-2"
            rows={4}
            placeholder="Enter text to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <input
            type="file"
            className="w-full mb-2"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        )}

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={analyzeContent}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button onClick={reset} className="border px-4 py-2 rounded">
            Reset
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div
            className={`mt-6 p-4 border rounded ${
              isToxic ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"
            }`}
          >
            <p className="font-semibold mb-1">
              Status:{" "}
              <span className={isToxic ? "text-red-600" : "text-green-600"}>
                {result.label.toUpperCase()}
              </span>
            </p>

            <p className="text-sm mb-2">
              Recommended Action: <b>{result.action}</b>
            </p>

            <div className="text-sm mb-1">Confidence</div>
            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className={`h-3 rounded ${
                  isToxic ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>

            <p className="text-xs mt-1">
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
