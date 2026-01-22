"use client";

import Image from "next/image";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type ResultType = {
  label: string;
  confidence: number;
  action: string;
};

type Mode = "text" | "image" | "video" | "audio";

export default function Home() {
  const router = useRouter(); // ✅ hook INSIDE component

  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;


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
        res = await fetch(`${API_URL}/analyze/text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
      } else {
        const formData = new FormData();
        formData.append("file", file as File);

        res = await fetch(`${API_URL}/analyze/${mode}`, {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setResult(data);
    } catch {
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

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };

  const isToxic = result?.label === "toxic";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
          <img
            src="/logo/logo.png"
            alt="OpenGuard AI"
            width={100}
            height={100}
          />

        <div className="text-gray-900">
          <h1 className="text-2xl font-bold">OpenGuard AI</h1>
          <p className="text-gray-700">Analyze content</p>
        </div>

          </div>

          <button
            onClick={handleLogout}
            className="text-sm border px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-2">
          Content Moderation Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          Analyze and moderate text, image, video, and audio content
        </p>

        <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as Mode);
              reset();
            }}
            className="border p-2 rounded mb-4 w-full
             text-gray-900 bg-white"
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>

          {mode === "text" ? (
            <textarea
              className="w-full border rounded p-3 mb-3
             text-gray-900 placeholder-gray-400
             focus:outline-none focus:ring"
              rows={4}
              placeholder="Enter text to analyze..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <input
              type="file"
              className="w-full mb-3"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          )}

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <div className="flex gap-2 mb-4">
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

          {result && (
            <div
              className={`p-4 border rounded ${
                isToxic
                  ? "border-red-500 bg-red-50"
                  : "border-green-500 bg-green-50"
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
    </div>
  );
}
