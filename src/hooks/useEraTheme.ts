import { useEffect } from "react";
import type { EraConfig } from "@/data/eraConfig";

export function useEraTheme(config: EraConfig | null) {
  useEffect(() => {
    if (!config) return;
    const root = document.documentElement;
    const vars: Record<string, string> = {
      "--era-primary": config.primaryColor,
      "--era-surface": config.surfaceColor,
      "--era-text": config.textColor,
      "--era-muted": config.mutedColor,
      "--era-glow": config.glowColor,
      "--era-accent": config.accentColor,
      "--era-particle": config.particleColor,
      "--era-navbar": config.navbarTint,
    };
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => {
      Object.keys(vars).forEach((k) => root.style.removeProperty(k));
    };
  }, [config]);
}
