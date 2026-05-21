import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { VoiceSettings } from "@/lib/voice/types";
import {
  getDefaultVoiceName,
  realtimeVoiceOptions,
  voicePersonaOptions,
} from "@/lib/voice/voiceCatalog";
import { cn } from "@/lib/utils";

interface VoiceSettingsControlsProps {
  settings: VoiceSettings;
  updateSettings: (changes: Partial<VoiceSettings>) => void;
}

const providerLabel: Record<VoiceSettings["provider"], string> = {
  "openai-realtime": "OpenAI Realtime",
  "gemini-live": "Gemini Live",
  "browser-fallback": "Browser fallback",
};

const aiProviderLabel: Record<VoiceSettings["aiProvider"], string> = {
  "openai-realtime": "OpenAI Realtime",
  "gemini-live": "Gemini Live",
};

export function VoiceSettingsControls({
  settings,
  updateSettings,
}: VoiceSettingsControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Voice provider</p>
          <p className="text-xs text-muted-foreground">
            {providerLabel[settings.provider]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {settings.muted ? (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume2 className="h-4 w-4 text-primary" />
          )}
          <Switch
            checked={!settings.muted}
            onCheckedChange={(checked) => updateSettings({ muted: !checked })}
            aria-label="Toggle voice audio"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-secondary/20 px-3 py-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Browser fallback</p>
          <p className="text-xs text-muted-foreground">
            Use browser speech for playback and recognition instead of AI voice services.
          </p>
        </div>
        <Switch
          checked={settings.provider === "browser-fallback"}
          onCheckedChange={(checked) =>
            updateSettings({
              provider: checked ? "browser-fallback" : settings.aiProvider,
            })
          }
          aria-label="Toggle browser fallback voice"
        />
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm font-semibold text-foreground">AI provider</p>
          <p className="text-xs text-muted-foreground">
            Choose which AI voice engine to return to when browser fallback is off.
          </p>
        </div>
        <Select
          value={settings.aiProvider}
          onValueChange={(value) =>
            updateSettings({
              aiProvider: value as VoiceSettings["aiProvider"],
              provider:
                settings.provider === "browser-fallback"
                  ? settings.provider
                  : (value as VoiceSettings["aiProvider"]),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an AI provider" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(aiProviderLabel).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          aria-label="Slow playback"
          onClick={() => updateSettings({ rate: 0.75 })}
          className={cn(settings.rate < 1 && "border-primary bg-primary/10")}
        >
          Slow
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-label="Normal playback"
          onClick={() => updateSettings({ rate: 1 })}
          className={cn(settings.rate >= 1 && "border-primary bg-primary/10")}
        >
          Normal
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-label="Female voice"
          onClick={() =>
            updateSettings({
              voiceGender: "female",
              voiceName: getDefaultVoiceName("female"),
            })
          }
          className={cn(settings.voiceGender === "female" && "border-primary bg-primary/10")}
        >
          Female
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-label="Male voice"
          onClick={() =>
            updateSettings({
              voiceGender: "male",
              voiceName: getDefaultVoiceName("male"),
            })
          }
          className={cn(settings.voiceGender === "male" && "border-primary bg-primary/10")}
        >
          Male
        </Button>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm font-semibold text-foreground">Voice style</p>
          <p className="text-xs text-muted-foreground">
            Choose the specific {settings.voiceGender} voice used across practice.
          </p>
        </div>
        <Select
          value={settings.voiceName}
          onValueChange={(value) => updateSettings({ voiceName: value as VoiceSettings["voiceName"] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {realtimeVoiceOptions[settings.voiceGender].map((voice) => (
              <SelectItem key={voice.id} value={voice.id}>
                {voice.label} - {voice.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm font-semibold text-foreground">Tutor persona</p>
          <p className="text-xs text-muted-foreground">
            This affects how the AI tutor sounds and carries itself in conversation.
          </p>
        </div>
        <Select
          value={settings.voicePersona}
          onValueChange={(value) =>
            updateSettings({ voicePersona: value as VoiceSettings["voicePersona"] })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a persona" />
          </SelectTrigger>
          <SelectContent>
            {voicePersonaOptions.map((persona) => (
              <SelectItem key={persona.id} value={persona.id}>
                {persona.label} - {persona.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <label className="block text-xs text-muted-foreground">
        Volume
        <input
          aria-label="Voice volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={settings.volume}
          onChange={(event) => updateSettings({ volume: Number(event.target.value) })}
          className="mt-2 w-full accent-primary"
        />
      </label>
    </div>
  );
}
