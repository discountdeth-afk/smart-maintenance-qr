"use client";
import { useState } from "react";
import QRCode from "qrcode";

export default function Generate() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [desc, setDesc] = useState("");

  const handleGenerate = async () => {
    const qrCode = await QRCode.toDataURL(url);
    setQr(qrCode);

    // AIタグ提案
    const res = await fetch("/api/ai-tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desc }),
    });
    const data = await res.json();
    setAiTags(data.tags || []);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">QRコード自動生成</h1>
      <input
        className="border p-2 w-full rounded mb-3"
        placeholder="Googleフォトの共有リンクを貼り付け"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        className="border p-2 w-full rounded mb-3"
        placeholder="この動画・画像の説明（AIタグ生成用）"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        生成
      </button>

      {qr && (
        <div className="mt-6 bg-white p-4 rounded shadow text-center">
          <img src={qr} alt="QR" className="mx-auto" />
          <p className="mt-2 text-sm">{url}</p>
          {aiTags.length > 0 && (
            <div className="mt-3">
              <p className="font-bold">AI提案タグ：</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {aiTags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
