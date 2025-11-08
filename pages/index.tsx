import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">Smart Maintenance QR System</h1>
      <p className="mb-10 text-gray-700">
        修理マニュアルをQR化・自動タグ・PDF出力までワンクリックで。
      </p>
      <div className="space-x-4">
        <Link href="/generate">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700">
            QRマニュアル生成
          </button>
        </Link>
        <Link href="/manage">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-xl shadow-md hover:bg-gray-700">
            一覧とPDF出力
          </button>
        </Link>
      </div>
    </main>
  );
}
