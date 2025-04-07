"use client";

import ImageTextExtractor from "@/components/image-text-extractor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ToolsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vietnamese Text Extraction</h1>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Chat
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <ImageTextExtractor />
        </div>
      </div>
    </div>
  );
}
