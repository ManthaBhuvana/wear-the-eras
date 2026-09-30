export interface MemeItem {
  id: string;
  /** Optional era slug (from eraConfig) this meme ties back to. */
  era?: string;
  /** Short caption / punchline shown under the visual. */
  caption: string;
  /** Real meme image/gif URL, once one exists. */
  imageUrl?: string;
  /** Fallback label shown inside the placeholder tile when no imageUrl is set. */
  mediaLabel?: string;
}

// Empty by design — this section is a "future addition" per the brief.
// Drop entries in here (era is optional; imageUrl is optional too, and a
// placeholder tile renders until one's provided) and MemeSection below will
// pick them up automatically. No other file needs to change.
export const memes: MemeItem[] = [];
