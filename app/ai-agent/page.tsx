"use client";
import { useState } from "react";

const features = [
  {
    title: "Code Helper",
    description: "Instant suggestions, bug fixes, and refactoring tips for your code.",
    icon: "💻",
  },
  {
    title: "Idea Generator",
    description: "Spark your next big idea with creative prompts and brainstorming.",
    icon: "💡",
  },
  {
    title: "Workflow Optimizer",
    description: "Automate tasks and streamline your dev flow with smart shortcuts.",
    icon: "⚙️",
  },
  {
    title: "Design Assistant",
    description: "Generate UI ideas, color palettes, and layout suggestions.",
    icon: "🎨",
  },
  {
    title: "Learning Buddy",
    description: "Ask questions, get explanations, and learn by doing.",
    icon: "📚",
  },
  {
    title: "Prompt Engineer",
    description: "Craft better prompts for AI tools and unlock their full potential.",
    icon: "🧠",
  },
];

export default function AIAgentPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      const errorReply = { sender: "bot", text: "⚠️ Error: Unable to reach AI service." };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 md:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
          Meet Your AI Agent 🤖
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your personal assistant for code, creativity, and productivity. Powered by intelligence, built for builders.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Chat Interface */}
      <section className="bg-gray-800 rounded-xl p-6 shadow-md max-w-3xl mx-auto">
        <div className="h-64 overflow-y-auto mb-4 border border-gray-700 rounded p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white text-right"
                  : "bg-gray-700 text-gray-200 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white p-2 rounded outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </section>
    </main>
  );
}