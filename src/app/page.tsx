"use client";

import { useState } from "react";
import ApiKeyInput from "@/components/api-key-input";
import { ChatInterface } from "@/components/chat/chat-interface";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const router = useRouter();

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    // In a real app, you might want to store this in localStorage or a secure cookie
    // localStorage.setItem("gemini-api-key", key);
  };

  const handleSignOut = () => {
    setApiKey(null);
    // localStorage.removeItem("gemini-api-key");
  };

  // Check if we have a stored API key on component mount
  // useEffect(() => {
  //   const storedKey = localStorage.getItem("gemini-api-key");
  //   if (storedKey) {
  //     setApiKey(storedKey);
  //   }
  // }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={() => router.push("/tools")}>
            Text Extraction Tools
          </Button>
        </div>

        {!apiKey ? (
          <ApiKeyInput onSubmit={handleApiKeySubmit} />
        ) : (
          <ChatInterface apiKey={apiKey} onSignOut={handleSignOut} />
        )}
      </div>
    </main>
  );
}
