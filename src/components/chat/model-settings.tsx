"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export interface ModelSettings {
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
}

interface ModelSettingsPanelProps {
  settings: ModelSettings;
  onSave: (settings: ModelSettings) => void;
  onCancel: () => void;
}

export function ModelSettingsPanel({
  settings,
  onSave,
  onCancel,
}: ModelSettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<ModelSettings>(settings);

  const handleChange = (key: keyof ModelSettings, value: number) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Card className="mx-auto my-4 w-full max-w-md">
      <CardHeader>
        <CardTitle>Model Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature">
              Temperature: {localSettings.temperature.toFixed(1)}
            </Label>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[localSettings.temperature]}
            onValueChange={(value) => handleChange("temperature", value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness: Lower values are more deterministic, higher
            values are more creative.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="topK">Top K: {localSettings.topK}</Label>
          </div>
          <Slider
            id="topK"
            min={1}
            max={100}
            step={1}
            value={[localSettings.topK]}
            onValueChange={(value) => handleChange("topK", value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Limits vocabulary to top K tokens at each step.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="topP">Top P: {localSettings.topP.toFixed(2)}</Label>
          </div>
          <Slider
            id="topP"
            min={0}
            max={1}
            step={0.01}
            value={[localSettings.topP]}
            onValueChange={(value) => handleChange("topP", value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Nucleus sampling: Only consider tokens with cumulative probability
            &lt; top_p.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxOutputTokens">Max Output Tokens</Label>
          <Input
            id="maxOutputTokens"
            type="number"
            min={1}
            max={8192}
            value={localSettings.maxOutputTokens}
            onChange={(e) =>
              handleChange("maxOutputTokens", parseInt(e.target.value) || 1024)
            }
          />
          <p className="text-xs text-muted-foreground">
            Maximum number of tokens to generate in the response.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(localSettings)}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
}
