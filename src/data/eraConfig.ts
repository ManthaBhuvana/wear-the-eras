export type ParticleType =
  | "stars"
  | "sparkles"
  | "leaves"
  | "glitch"
  | "hearts"
  | "fog"
  | "snowflakes"
  | "petals"
  | "confetti"
  | "none";

export interface EraConfig {
  slug: string;
  name: string;
  tagline: string;
  heroBg: string;
  heroImage?: string;
  particleColor: string;
  primaryColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  glowColor: string;
  accentColor: string;
  particleType: ParticleType;
  mood: string;
  collections: string[];
  intro: string;
  easterEgg?: string;
  navbarTint: string;
  cardGradient: string;
}

export const eras: EraConfig[] = [
  {
  slug: "debut",
  name: "Country Girl Collection",
  tagline: "She had the stars in her eyes.",
  heroBg:
    "radial-gradient(ellipse at 30% 70%, #c0cfde 0%, #1db0df 45%, #1D4737 100%)",
  cardGradient: "linear-gradient(160deg, #c0cfde 0%, #1db0df 55%, #1D4737 100%)",
  particleColor: "#fef3c7",
  primaryColor: "#1db0df",
  surfaceColor: "#c0cfde",
  textColor: "#10281F",
  mutedColor: "#1D4737",
  glowColor: "rgba(29,176,223,0.35)",
  accentColor: "#7ca84e",
  particleType: "sparkles",
  mood: "Country · Hopeful · Porch-light warm",
  collections: ["Tim McGraw Tee","A Perfectly Good Heart Cap"],
  intro:"She wrote her first chapter on a porch swing and called it the whole world.",
  navbarTint: "rgba(192,207,222,0.88)",
},
  {
    slug: "fearless",
    name: "The Superstar Collection",
    tagline: "She wore fearless.",
    heroBg:
      "linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #78350f 100%)",
    cardGradient: "linear-gradient(160deg, #fef3c7 0%, #fbbf24 50%, #b45309 100%)",
    particleColor: "#fde68a",
    primaryColor: "#d97706",
    surfaceColor: "#fef3c7",
    textColor: "#451a03",
    mutedColor: "#92400e",
    glowColor: "rgba(251,191,36,0.45)",
    accentColor: "#7C2D12",
    particleType: "sparkles",
    mood: "Fairytale · Golden · Bleachers",
    collections: ["Golden Tee", "You Belong With Me Cap"],
    intro: "She believed in the slow dance, the white horse, the version of herself who said yes.",
    navbarTint: "rgba(254,243,199,0.85)",
  },
  {
    slug: "speak-now",
    name: "Wonderstruck Drop",
    tagline: "She had a marvelous time.",
    heroBg:
      "radial-gradient(ellipse at 70% 30%, #7c3aed 0%, #1e1b4b 60%, #0a0a1a 100%)",
    cardGradient: "linear-gradient(160deg, #7c3aed 0%, #1e1b4b 60%, #0a0a1a 100%)",
    particleColor: "#c4b5fd",
    primaryColor: "#7c3aed",
    surfaceColor: "#1e1b4b",
    textColor: "#ede9fe",
    mutedColor: "#a78bfa",
    glowColor: "rgba(124,58,237,0.4)",
    accentColor: "#c4b5fd",
    particleType: "petals",
    mood: "Enchanted · Marvelous · Purple",
    collections: ["Enchanted Oversized Tee", "Haunted Cap"],
    intro: "She walked into every room and let the curtains decide they were her stage.",
    navbarTint: "rgba(30,27,75,0.85)",
  },
  {
    slug: "red",
    name: "The Crimson Velvet Collection",
    tagline: "Losing him was blue.",
    heroBg:
      "linear-gradient(180deg, #dc2626 0%, #7c2d12 60%, #0c0a09 100%)",
    cardGradient: "linear-gradient(160deg, #dc2626 0%, #7c2d12 70%, #1c1917 100%)",
    particleColor: "#fecaca",
    primaryColor: "#dc2626",
    surfaceColor: "#1c1917",
    textColor: "#fef2f2",
    mutedColor: "#fca5a5",
    glowColor: "rgba(220,38,38,0.4)",
    accentColor: "#b45309",
    particleType: "leaves",
    mood: "Autumn · Heartbreak · Scarf Season",
    collections: ["All Too Well Varsity Tee", "Treacherous Cap"],
    intro: "She kept the scarf because the truth was the only thing it could keep warm.",
    easterEgg: "I forgot that you existed.",
    navbarTint: "rgba(28,25,23,0.85)",
  },
  {
    slug: "1989",
    name: "The Cyan Borealis Collection",
    tagline: "New York.",
    heroImage: "/images/1989-bg.png",
    heroBg: "#9ad9f5",
    particleType: "none",
    cardGradient: "linear-gradient(160deg, #0ea5e9 0%, #67e8f9 60%, #f8fafc 100%)",
    primaryColor: "#0ea5e9",
    surfaceColor: "#f8fafc",
    textColor: "#0c4a6e",
    mutedColor: "#0891b2",
    glowColor: "rgba(14,165,233,0.35)",
    accentColor: "#0891b2",
    particleColor: "#ffffff",
    mood: "Clean · Pop · Polaroid",
    collections: ["Style Oversized Tee", "New York City Cap"],
    intro: "She cropped her hair, called a cab, and made a Tuesday feel like a thesis.",
    navbarTint: "rgba(248,250,252,0.85)",
  },
  {
    slug: "reputation",
    name: "The Viper Collection",
    tagline: "I don't trust nobody.",
    heroBg:
      "radial-gradient(ellipse at 50% 50%, #1f1f1f 0%, #000000 70%)",
    cardGradient: "linear-gradient(160deg, #1f1f1f 0%, #000000 80%)",
    particleColor: "#d1d5db",
    primaryColor: "#d1d5db",
    surfaceColor: "#0a0a0a",
    textColor: "#fafafa",
    mutedColor: "#737373",
    glowColor: "rgba(209,213,219,0.25)",
    accentColor: "#9ca3af",
    particleType: "glitch",
    mood: "Defiant · Chrome · Snake-charmed",
    collections: ["Look What You Made Me Wear Tee", "I'm Sorry, The Old Cap Can't Come"],
    intro: "She burned it down and built something beautiful from the ash.",
    navbarTint: "rgba(0,0,0,0.85)",
  },
  {
    slug: "lover",
    name: "The Cotton Candy Collection",
    tagline: "I loved you in secret.",
    heroBg:
      "linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 40%, #c084fc 100%)",
    cardGradient: "linear-gradient(160deg, #fce7f3 0%, #f9a8d4 50%, #c084fc 100%)",
    particleColor: "#fff0f7",
    primaryColor: "#ec4899",
    surfaceColor: "#fce7f3",
    textColor: "#831843",
    mutedColor: "#be185d",
    glowColor: "rgba(236,72,153,0.35)",
    accentColor: "#c084fc",
    particleType: "hearts",
    mood: "Pastel · Devoted · Daylight",
    collections: ["London Boy Tee", "Lover Pastel Cap"],
    intro: "She believed in pink and meant every word of it.",
    navbarTint: "rgba(252,231,243,0.85)",
  },
{
    slug: "folklore",
    name: "The Woodland Tales Collection",
    tagline: "Hiding in my own lies.",
    heroBg:
      "linear-gradient(180deg, #e7e5e4 0%, #9ca3af 25%, #475569 45%, #166534 70%, #0f172a 100%)",
      heroImage: "/images/folklore-bg.png",
      cardGradient: "linear-gradient(160deg, #374151 0%, #166534 60%, #0f172a 100%)",
      particleColor: "#9ca3af",
      primaryColor: "#166534",
      surfaceColor: "#1f2937",
      textColor: "#f5f0eb",
      mutedColor: "#9ca3af",
      glowColor: "rgba(22,101,52,0.35)",
      accentColor: "#84cc16",
      particleType: "fog",
      mood: "Folklore · Forest · August",
      collections: ["Cardigan Vintage Tee", "Seven Cap"],
      intro: "She disappeared into the woods and came back with a novel.",
      navbarTint: "rgba(31,41,55,0.85)",
},
  {
    slug: "evermore",
    name: "The Autumn Ember Collection",
    tagline: "Oh, I've been down.",
    heroBg:
      "radial-gradient(ellipse at 30% 70%, #b45309 0%, #451a03 70%, #1c1917 100%)",
    cardGradient: "linear-gradient(160deg, #b45309 0%, #451a03 70%, #1c1917 100%)",
    particleColor: "#fbbf24",
    primaryColor: "#b45309",
    surfaceColor: "#1c1917",
    textColor: "#fef3c7",
    mutedColor: "#d6d3d1",
    glowColor: "rgba(180,83,9,0.35)",
    accentColor: "#f59e0b",
    particleType: "leaves",
    mood: "Rust · Devoted · Candlelit",
    collections: ["Willow Oversized Tee", "Champagne Problems Cap"],
    intro: "She named her ghosts and then they wrote her a song.",
    navbarTint: "rgba(28,25,23,0.85)",
  },
  {
    slug: "midnights",
    name: "3 AM Club Collection",
    tagline: "Meet me at midnight.",
    heroBg:
      "radial-gradient(ellipse at 20% 80%, #1a0a3a 0%, #0a0a1a 60%, #0d0d2b 100%)",
    cardGradient: "linear-gradient(160deg, #1a0a3a 0%, #0a0a1a 60%, #0d0d2b 100%)",
    particleColor: "#a78bfa",
    primaryColor: "#7c3aed",
    surfaceColor: "#120a2e",
    textColor: "#e2d9f3",
    mutedColor: "#8b7aa8",
    glowColor: "rgba(124,58,237,0.45)",
    accentColor: "#c4b5fd",
    particleType: "stars",
    mood: "Cosmic · Confessional · Sleepless",
    collections: ["Lavender Haze Drop Tee", "Anti-Hero Cap"],
    intro: "She counts the hours, names the things she lost, and calls it art.",
    navbarTint: "rgba(18,10,46,0.85)",
  },
  {
    slug: "tortured-poets",
    name: "Sad Poet Collection",
    tagline: "I love you, it's ruining my life.",
    heroBg:
      "linear-gradient(180deg, #fafaf9 0%, #e7e5e4 60%, #d6d3d1 100%)",
    cardGradient: "linear-gradient(160deg, #fafaf9 0%, #d6d3d1 100%)",
    particleColor: "#a8a29e",
    primaryColor: "#1c1917",
    surfaceColor: "#fafaf9",
    textColor: "#1c1917",
    mutedColor: "#78716c",
    glowColor: "rgba(28,25,23,0.2)",
    accentColor: "#57534e",
    particleType: "none",
    mood: "Quiet · Inked · Manuscript",
    collections: ["The Manuscript Tee", "Loml Cap"],
    intro: "She kept the receipts in iambic pentameter and called it survival.",
    navbarTint: "rgba(250,250,249,0.9)",
  },
  {
  slug: "showgirl",
  name: "The Showgirl Collection",
  tagline: "The greatest of all time.",
  heroBg:
    "radial-gradient(ellipse at 50% 0%, #FFA07A 0%, #FF4D1F 30%, #00BFA5 100%)",
  cardGradient:"linear-gradient(160deg, #FFA07A 0%, #FF4D1F 45%, #00BFA5 100%)",
  particleColor: "#9FF4E8",
  primaryColor: "#C93A14",
  surfaceColor: "#F2F0ED",
  textColor: "#7A2F18",
  mutedColor: "#FFFDF9",
  glowColor: "rgba(255,77,31,0.45)",
  accentColor: "#FFA07A",
  particleType: "sparkles",
  mood: "Spotlight · Encore · Glitter",
  collections: ["Showstopper Gold Tee","Opening Night Cap"],
  intro:"She took her bow and refused to leave the stage until the silence was hers.",
  navbarTint: "rgba(242,240,237,0.9)",
},
];

export const eraMap: Record<string, EraConfig> = Object.fromEntries(
  eras.map((e) => [e.slug, e]),
);

export const getNeighborEras = (slug: string) => {
  const idx = eras.findIndex((e) => e.slug === slug);
  return {
    prev: eras[(idx - 1 + eras.length) % eras.length],
    next: eras[(idx + 1) % eras.length],
  };
};

// "The Crimson Velvet Collection" → "Crimson Velvet", "3 AM Club Collection" → "3 AM Club"
export function shortEraName(name: string) {
  return name.replace(/^The\s+/, "").replace(/\s+(Collection|Drop)$/, "");
}
