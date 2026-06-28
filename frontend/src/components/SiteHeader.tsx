import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/register-issue", label: "Register Issue" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-9 rounded-xl bg-[var(--gradient-hero)] grid place-items-center shadow-[var(--shadow-glow)] group-hover:scale-105 transition">
            <Wrench className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold text-base tracking-tight">Mistry</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Service Center</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-full transition hover:text-foreground hover:bg-muted"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground rounded-full bg-muted" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/register-issue"
          className="hidden md:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-elegant)]"
        >
          Book a Service
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-10 rounded-lg border border-border grid place-items-center"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-foreground" />
            <span className="block w-5 h-0.5 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
