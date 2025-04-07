"use client";

import { useState, useRef, useEffect } from "react";
import { ChatInput } from "./chat-input";
import { Message, ChatMessage } from "./message";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { ModelSettings, ModelSettingsPanel } from "./model-settings";

interface ChatInterfaceProps {
  apiKey: string;
  onSignOut: () => void;
}

export function ChatInterface({ apiKey, onSignOut }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [modelSettings, setModelSettings] = useState<ModelSettings>({
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `This is a simulated response to: "${content}". In a real implementation, this would be a response from the Gemini API using your API key and the specified model settings.`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message to Gemini API:", error);
      setIsLoading(false);

      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSettingsChange = (newSettings: ModelSettings) => {
    setModelSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-xl font-bold">Gemini Chat</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {showSettings && (
        <ModelSettingsPanel
          settings={modelSettings}
          onSave={handleSettingsChange}
          onCancel={() => setShowSettings(false)}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-muted-foreground">
            <div>
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation with Gemini AI</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
