"use client";
import { useState } from "react";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Manage() {
  const [links, setLinks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addLink = () => {
    if (!input) return;
    setLinks([...links, input]);
    setInput("");
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF();
    for (let i = 0; i < links.length; i++) {
      const canvas = await QRCode.toCanvas(links[i]);
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 20, 20 + i * 70, 50, 50);
      pdf.text(links[i], 80, 50 + i * 70);
      if (i < links.length - 1) pdf.addPage();
    }
    pdf.save("QR_manuals.pdf");
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">QR一覧とPDF出力</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full rounded mb-3"
        placeholder="リンクを追加"
      />
      <button
        onClick={addLink}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        追加
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {links.map((link, i) => (
          <div key={i} className="bg-white p-4 rounded shadow text-center">
            <img
              src={QRCode.toDataURL(link)}
              alt="QR"
              className="mx-auto"
            />
            <p className="text-xs mt-2 break-words">{link}</p>
          </div>
        ))}
      </div>

      {links.length > 0 && (
        <button
          onClick={downloadPDF}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        >
          QRコードをPDFでダウンロード
        </button>
      )}
    </main>
  );
}
