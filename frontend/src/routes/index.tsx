import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Clock, Wrench, Sparkles, Phone, Star, BadgeCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero-technician.jpg";
import washingMachine from "@/assets/washing-machine.jpg";
import airCooler from "@/assets/air-cooler.jpg";
import geyser from "@/assets/geyser.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mistry — Washing Machine, Air Cooler & Geyser Service" },
      { name: "description", content: "Same-day repair and installation for washing machines, air coolers, and geysers by certified technicians." },
      { property: "og:title", content: "Mistry — Trusted Home Appliance Repair" },
      { property: "og:description", content: "Book certified technicians for washing machines, air coolers and geysers." },
    ],
  }),
  component: Home,
});

const products = [
  {
    name: "Washing Machine",
    tag: "Front Load · Top Load · Semi-Auto",
    desc: "Drum cleaning, motor repair, water inlet, error code diagnosis and full installation.",
    img: washingMachine,
  },
  {
    name: "Air Cooler",
    tag: "Tower · Desert · Personal",
    desc: "Pump replacement, cooling pad swap, motor service, gas top-up and seasonal tune-ups.",
    img: airCooler,
  },
  {
    name: "Geyser",
    tag: "Instant · Storage · Gas",
    desc: "Heating element, thermostat, leak fix, anode rod replacement and safe wall installation.",
    img: geyser,
  },
];

const features = [
  { icon: ShieldCheck, title: "90-Day Warranty", desc: "On every repair and replaced part." },
  { icon: Clock, title: "Same-Day Service", desc: "Book before 2 PM, technician arrives today." },
  { icon: BadgeCheck, title: "Certified Experts", desc: "Background-verified, factory-trained." },
  { icon: Truck, title: "Free Doorstep Visit", desc: "No visit charge on confirmed bookings." },
];

const steps = [
  { n: "01", title: "Register your issue", desc: "Fill a 60-second form with product & problem details." },
  { n: "02", title: "Pick a time slot", desc: "Choose installation or repair at your convenience." },
  { n: "03", title: "Technician arrives", desc: "Diagnosis, transparent quote, on-spot repair." },
  { n: "04", title: "Pay after service", desc: "Approve the fix, pay securely, get a warranty card." },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(ellipse_at_top_right,white,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 text-primary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="size-3.5" /> Trusted by 12,000+ households
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95]">
              Appliance repair, <span className="text-[var(--color-mint)]">done right.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
              Washing machines, air coolers and geysers — diagnosed, repaired and installed by certified technicians, with a 90-day warranty on every job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register-issue"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mint)] text-primary px-6 py-3 font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
              >
                Register an Issue <ArrowRight className="size-4" />
              </Link>
              <a
                href="tel:+919599566502"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 text-primary-foreground px-6 py-3 font-semibold backdrop-blur hover:bg-white/10"
              >
                <Phone className="size-4" /> Call Now
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[var(--color-mint)] text-[var(--color-mint)]" />
                ))}
                <span className="ml-2">4.9 / 5</span>
              </div>
              <span>• 30k+ services completed</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img src={heroImg} alt="Certified technician repairing a washing machine" width={1600} height={1100} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-card text-card-foreground p-4 shadow-[var(--shadow-elegant)]">
              <div className="size-10 rounded-xl bg-[var(--color-mint)] grid place-items-center">
                <Wrench className="size-5 text-primary" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Today's slots open</div>
                <div className="text-muted-foreground">10 AM · 2 PM · 6 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Our Services</div>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold max-w-2xl">Three appliances. One reliable service.</h2>
          </div>
          <Link to="/register-issue" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
            Book now <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <article
              key={p.name}
              className="group relative rounded-3xl overflow-hidden bg-[var(--gradient-card)] border border-border shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">{p.tag}</div>
                <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <Link
                  to="/register-issue"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
                >
                  Book service <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-muted/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 border border-border">
                <div className="size-11 rounded-xl bg-[var(--gradient-hero)] grid place-items-center shadow-[var(--shadow-glow)]">
                  <f.icon className="size-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">How it works</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-extrabold">From broken to brand-new in 4 steps</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl p-6 border border-border bg-card">
              <div className="font-display text-5xl font-extrabold text-accent/30">{s.n}</div>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--gradient-hero)] p-10 md:p-16 text-primary-foreground">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-[var(--color-mint)]/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold">Got an appliance acting up?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg">
                Register your issue in 60 seconds and a certified technician will be at your doorstep — often the same day.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Link
                to="/register-issue"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mint)] text-primary px-7 py-4 text-base font-bold hover:opacity-90 transition"
              >
                Register Issue <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
