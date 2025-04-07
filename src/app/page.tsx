"use client";

import { useState } from "react";
import ApiKeyInput from "@/components/api-key-input";
import { ChatInterface } from "@/components/chat/chat-interface";

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null);

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
      {!apiKey ? (
        <ApiKeyInput onSubmit={handleApiKeySubmit} />
      ) : (
        <ChatInterface apiKey={apiKey} onSignOut={handleSignOut} />
      )}
    </main>
  );
}
