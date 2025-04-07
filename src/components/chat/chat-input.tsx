"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-end gap-2">
      <div className="relative flex-1">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-24 resize-none pr-12 pt-3"
          disabled={disabled}
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {message.length} / 32000
        </div>
      </div>
      <Button type="submit" size="icon" disabled={!message.trim() || disabled}>
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
