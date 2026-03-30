import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string = (body as any).question?.toLowerCase();

    const filePath = path.join(process.cwd(), "data", "search.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const searchData = JSON.parse(fileData);

    let answer = "No offline result found 🚀";
    for (const key of Object.keys(searchData)) {
      if (question.includes(key.toLowerCase())) {
        answer = searchData[key];
        break;
      }
    }

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      answer: "Error reading offline search ❌"
    }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
