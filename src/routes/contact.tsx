import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Wear The Eras" },
      { name: "description", content: "Get in touch with the Wear The Eras team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "a customer"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@wearttheeras.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-32 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] tracked-tight opacity-60">SUPPORT</p>
        <h1 className="mt-2 font-display text-5xl">Contact Us</h1>
        <p className="mt-4 text-sm leading-relaxed opacity-70">
          Questions about an order, a collab idea, or just want to say hi —
          we read everything.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="text-[11px] tracked-tight opacity-60">
              Name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none focus:border-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[11px] tracked-tight opacity-60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none focus:border-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-[11px] tracked-tight opacity-60">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm outline-none focus:border-white"
            />
          </div>
          <button
            type="submit"
            className="bg-white px-7 py-4 text-[12px] tracked-tight text-black"
          >
            SEND MESSAGE
          </button>
        </form>

        <p className="mt-10 text-xs opacity-50">
          Prefer email directly? Reach us at hello@wearttheeras.com
        </p>
      </div>
    </div>
  );
}
