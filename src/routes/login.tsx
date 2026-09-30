import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Wear The Eras" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 pt-24 pb-24 text-white">
      <div className="w-full max-w-md">
        <p className="text-[11px] tracked-tight opacity-60">WELCOME BACK</p>
        <h1 className="mt-2 font-display text-5xl">Sign in.</h1>
        <p className="mt-3 text-sm opacity-70">Welcome back.</p>
        <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="text-[11px] tracked-tight opacity-70">EMAIL</span>
            <input
              type="email"
              className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-white focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracked-tight opacity-70">PASSWORD</span>
            <input
              type="password"
              className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-white focus:outline-none"
            />
          </label>
          <button className="w-full bg-white py-4 text-[12px] tracked-tight text-black">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
