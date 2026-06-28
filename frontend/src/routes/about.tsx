import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Award, Wrench, Globe2, ArrowRight, Heart, Recycle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mistry — Trusted Appliance Service" },
      { name: "description", content: "Mistry is a service center dedicated to honest repair, fair pricing, and certified technicians for home appliances." },
      { property: "og:title", content: "About Mistry" },
      { property: "og:description", content: "Our story, mission, and the people behind dependable appliance service." },
    ],
  }),
  component: About,
});

const stats = [
  { v: "12K+", l: "Happy households" },
  { v: "30K+", l: "Services completed" },
  { v: "180+", l: "Certified technicians" },
  { v: "4.9★", l: "Average rating" },
];

const values = [
  { icon: ShieldCheck, t: "Honest diagnosis", d: "No upselling, no scare tactics. You hear what's wrong, plainly." },
  { icon: Heart, t: "Customer first", d: "From booking to follow-up, every step is built around you." },
  { icon: Recycle, t: "Genuine parts", d: "Only OEM or equivalent parts, with a written warranty." },
  { icon: Award, t: "Trained craft", d: "Continuous factory training keeps our techs ahead of new models." },
];

function About() {
  return (
    <div>
      {/* Intro */}
      <section className="bg-[var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-mint)] font-semibold">About Mistry</div>
            <h1 className="mt-3 text-5xl md:text-6xl font-extrabold leading-[1]">
              Service that actually <span className="text-[var(--color-mint)]">shows up.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Mistry started in 2017 with a simple idea: appliance repair should be as easy and trustworthy as ordering food online. Today, we serve thousands of homes with certified technicians, transparent pricing, and a 90-day warranty.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5">
                <div className="text-3xl md:text-4xl font-extrabold">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-primary-foreground/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Our Mission</div>
          <h2 className="mt-2 text-4xl font-extrabold">Make home appliance repair simple, honest, and fast.</h2>
          <p className="mt-5 text-muted-foreground">
            We're a team of engineers, technicians and operators obsessed with one thing — the moment your washing machine, air cooler or geyser comes back to life. Every workflow, from how we route service requests to how we train technicians, is designed around that moment.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/register-issue" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:opacity-90">
              Book a service <ArrowRight className="size-4" />
            </Link>
            <Link to="/career" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">
              Join the team
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, t: "180+ Technicians", d: "Background verified" },
            { icon: Wrench, t: "3 Categories", d: "Washing · Cooling · Heating" },
            { icon: Globe2, t: "14 Cities", d: "Pan-India presence" },
            { icon: Award, t: "ISO 9001", d: "Quality certified ops" },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-5">
              <div className="size-10 rounded-xl bg-[var(--gradient-hero)] grid place-items-center shadow-[var(--shadow-glow)]">
                <b.icon className="size-5 text-primary-foreground" />
              </div>
              <div className="mt-4 font-bold">{b.t}</div>
              <div className="text-sm text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">What we stand for</div>
            <h2 className="mt-2 text-4xl font-extrabold">Values that guide every visit</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl bg-card border border-border p-6">
                <v.icon className="size-7 text-accent" />
                <h3 className="mt-4 font-bold text-lg">{v.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
