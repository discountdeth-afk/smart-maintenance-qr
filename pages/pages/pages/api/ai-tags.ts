import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { desc } = req.body;
  if (!desc) return res.status(400).json({ error: "desc required" });

  const prompt = `以下の修理説明文から3～5個のタグを日本語で抽出してください。\n\n${desc}`;
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const tags = completion.choices[0].message?.content
    ?.split(/[,、\s\n]+/)
    .filter((t) => t.length > 0)
    .slice(0, 5);

  res.status(200).json({ tags });
}
