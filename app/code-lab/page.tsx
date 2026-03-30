"use client";
import { useState } from "react";

export default function CodeLab() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Code Lab 💻</h1>
      <p className="mt-4 text-lg text-gray-300">
        Experiment, learn, and build with code here in NeelVerse.
      </p>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="mt-4 p-2 text-black w-80"
      />
      <button
        onClick={handleAsk}
        className="mt-2 px-4 py-2 bg-blue-600 rounded"
      >
        Ask
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-gray-800 rounded w-96">
          <p className="text-lg text-green-400">{answer}</p>
        </div>
      )}
    </main>
  );
}
