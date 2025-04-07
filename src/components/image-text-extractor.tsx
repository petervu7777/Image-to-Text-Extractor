"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Copy, Check, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ImageTextExtractor() {
  const [image, setImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setExtractedText("");
      setCorrectedText("");
      setError(null);
    }
  };

  const extractTextFromImage = async () => {
    if (!image) {
      setError("Please upload an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would use a text extraction API
      // For now, we'll simulate the extraction process
      setTimeout(() => {
        // Simulated extracted text with intentional errors
        const simulatedText =
          "This is a simulated textt extractiion from an image. It contaiins some speling errors that would be corrected by the Gemini API.";
        setExtractedText(simulatedText);

        // Simulate Gemini API spelling correction
        setTimeout(() => {
          const corrected =
            "This is a simulated text extraction from an image. It contains some spelling errors that would be corrected by the Gemini API.";
          setCorrectedText(corrected);
          setIsLoading(false);

          // Auto-copy to clipboard
          navigator.clipboard
            .writeText(corrected)
            .then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });
        }, 1000);
      }, 1500);
    } catch (err) {
      setError("Failed to extract text from image");
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(correctedText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Image Text Extractor</CardTitle>
        <CardDescription>
          Upload an image to extract text, correct spelling with Gemini, and
          copy to clipboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6">
          {image ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded image"
                className="max-h-48 object-contain rounded-md"
              />
              <p className="text-sm text-muted-foreground">{image.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-8 w-8" />
              <p>Upload an image to extract text</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <label className="cursor-pointer">
            <Button variant="outline" type="button">
              <Upload className="mr-2 h-4 w-4" /> Select Image
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <Button onClick={extractTextFromImage} disabled={!image || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Extract & Correct Text"
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {extractedText && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Extracted Text:</h3>
            <Textarea
              value={extractedText}
              readOnly
              className="min-h-24 bg-muted/50"
            />
          </div>
        )}

        {correctedText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Corrected Text (Gemini):</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea value={correctedText} readOnly className="min-h-24" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
