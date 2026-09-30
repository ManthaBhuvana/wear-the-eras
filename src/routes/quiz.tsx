import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { eraMap, shortEraName, type EraConfig } from "@/data/eraConfig";
import { productsByEra } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ParticleCanvas } from "@/components/ParticleCanvas";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Find Your Era — Wear The Eras" },
      {
        name: "description",
        content:
          "Five quick questions on your style, colours and mood — find the Wear The Eras collection that's yours.",
      },
    ],
  }),
  component: QuizPage,
});

type Slug = string;

interface Question {
  category: string;
  q: string;
  opts: { label: string; era: Slug }[];
}

// One question per required category: personal style, favourite colours,
// aesthetic preferences, fashion choices, personality/mood.
const QUESTIONS: Question[] = [
  {
    category: "Personal Style",
    q: "How would you describe your everyday style?",
    opts: [
      { label: "Effortless and a little romantic", era: "lover" },
      { label: "Sharp, structured, always intentional", era: "reputation" },
      { label: "Cosy oversized layers", era: "folklore" },
      { label: "Classic with a polished edge", era: "1989" },
    ],
  },
  {
    category: "Favourite Colours",
    q: "Which colour palette are you drawn to?",
    opts: [
      { label: "Deep crimson and burnt orange", era: "red" },
      { label: "Soft lavender and midnight blue", era: "midnights" },
      { label: "Pastel pink and lilac", era: "lover" },
      { label: "Muted forest green and grey", era: "folklore" },
    ],
  },
  {
    category: "Aesthetic Preferences",
    q: "Pick the aesthetic that calls to you.",
    opts: [
      { label: "Golden hour and string lights", era: "fearless" },
      { label: "City skyline and Polaroids", era: "1989" },
      { label: "Velvet curtains and spotlights", era: "showgirl" },
      { label: "Handwritten letters and old paper", era: "tortured-poets" },
    ],
  },
  {
    category: "Fashion Choices",
    q: "You've got one hour to get dressed. What do you reach for?",
    opts: [
      { label: "The oversized cardigan", era: "evermore" },
      { label: "Something with a bit of shine", era: "showgirl" },
      { label: "Head-to-toe black", era: "reputation" },
      { label: "A sundress and boots", era: "debut" },
    ],
  },
  {
    category: "Personality / Mood",
    q: "Which word feels most like you right now?",
    opts: [
      { label: "Confessional", era: "midnights" },
      { label: "Enchanted", era: "speak-now" },
      { label: "Defiant", era: "reputation" },
      { label: "Nostalgic", era: "evermore" },
    ],
  },
];

function QuizPage() {
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState<Record<string, number>>({});
  const [result, setResult] = useState<EraConfig | null>(null);

  const pick = (era: Slug) => {
    const next = { ...tally, [era]: (tally[era] ?? 0) + 1 };
    setTally(next);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0]![0];
      setResult(eraMap[winner]!);
    }
  };

  const restart = () => {
    setStep(0);
    setTally({});
    setResult(null);
  };

  if (result) return <Result era={result} onRetake={restart} />;

  const q = QUESTIONS[step]!;
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between text-[11px] tracked-tight text-muted-foreground uppercase">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span>{q.category}</span>
        </div>
        <div className="mt-3 h-[2px] w-full bg-charcoal/10">
          <div
            className="h-full bg-burgundy transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="mt-8 font-display text-3xl leading-tight md:text-4xl">
              {q.q}
            </h1>
            <div className="mt-10 grid gap-3">
              {q.opts.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o.era)}
                  className="border border-charcoal/20 px-6 py-5 text-left text-[15px] transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Result({ era, onRetake }: { era: EraConfig; onRetake: () => void }) {
  const recs = productsByEra(era.slug).slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* ERA VISUAL IDENTITY — hero reveal in the matched era's palette */}
      <section
        className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10"
        style={{ background: era.heroBg }}
      >
        <div className="noise-overlay" />
        <ParticleCanvas type={era.particleType} color={era.particleColor} />
        <div className="relative z-10">
          <p className="text-[11px] tracked-tight" style={{ color: era.textColor }}>
            YOUR ERA
          </p>
          <h1
            className="mt-4 font-display"
            style={{
              color: era.textColor,
              fontSize: "clamp(44px, 9vw, 88px)",
              lineHeight: 1.05,
            }}
          >
            {shortEraName(era.name)}
          </h1>
          <p
            className="mt-4 text-[13px] tracked-tight opacity-80"
            style={{ color: era.textColor }}
          >
            {era.mood}
          </p>
        </div>
      </section>

      {/* SHORT DESCRIPTION */}
      <section className="px-6 py-20 text-center md:px-10" style={{ background: era.surfaceColor }}>
        <p
          className="mx-auto max-w-xl font-script text-2xl leading-relaxed"
          style={{ color: era.textColor }}
        >
          {era.intro}
        </p>
      </section>

      {/* RECOMMENDED PRODUCTS */}
      <section className="px-6 pb-20 md:px-10" style={{ background: era.surfaceColor }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="text-center text-[11px] tracked-tight opacity-70"
            style={{ color: era.textColor }}
          >
            RECOMMENDED FOR YOU
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {recs.map((p) => (
              <ProductCard key={p.id} product={p} themed />
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section
        className="px-6 pb-24 text-center md:px-10"
        style={{ background: era.surfaceColor }}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/era/$slug"
            params={{ slug: era.slug }}
            className="px-8 py-4 text-[12px] tracked-tight transition-opacity hover:opacity-90"
            style={{ background: era.primaryColor, color: era.surfaceColor }}
          >
            SHOP THIS ERA
          </Link>
          <button
            onClick={onRetake}
            className="border px-8 py-4 text-[12px] tracked-tight transition-opacity hover:opacity-70"
            style={{ borderColor: era.primaryColor, color: era.textColor }}
          >
            RETAKE QUIZ
          </button>
        </div>
      </section>
    </motion.div>
  );
}
