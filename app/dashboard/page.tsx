"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DownloadPage() {
  const router = useRouter();

  const handleDownload = () => {
    // Logic for initiating the download can go here
    console.log("Download initiated");
  };

  const handleDocs = () => {
    router.push("/docs");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-4">Proofly</h1>
      <p className="text-lg mb-6">
        Generate Professional Invoices, Bills, and Receipts Effortlessly
      </p>
      
      {/* Description */}
      <p className="text-lg mb-8">
        Create, customize, and manage receipts for your business in minutes with multi-currency, tax, and email integration.
      </p>
      
      {/* Download Button */}
      <Button onClick={handleDownload} className="text-black bg-white py-3 px-6 rounded-lg mb-6">
        Download
      </Button>

      {/* Docs Button */}
      <Button onClick={handleDocs} className="text-black bg-white py-3 px-6 rounded-lg mb-6">
        View Documentation
      </Button>
    </div>
  );
}

export default DownloadPage;
