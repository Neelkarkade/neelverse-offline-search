import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // safer default than gpt-4o-mini
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("🔍 OpenAI raw response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.warn("⚠️ No reply content found in OpenAI response.");
    }

    return NextResponse.json({ reply: reply || "⚠️ No response from AI." });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    return NextResponse.json({ reply: "⚠️ Error: Unable to get response from AI." });
  }
}
