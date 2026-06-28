import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Briefcase, MapPin, Clock, Sparkles, Heart, GraduationCap, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Careers — Join Mistry Service Center" },
      { name: "description", content: "We're hiring certified technicians, field engineers and customer service experts across India." },
      { property: "og:title", content: "Careers at Mistry" },
      { property: "og:description", content: "Build a career in trusted appliance service." },
    ],
  }),
  component: Career,
});

const perks = [
  { icon: IndianRupee, t: "Above-market pay", d: "Base salary + performance bonus + tips." },
  { icon: GraduationCap, t: "Paid training", d: "Factory certifications, fully sponsored." },
  { icon: Heart, t: "Health cover", d: "Family insurance and accident cover." },
  { icon: Sparkles, t: "Growth path", d: "Tech → Lead → City Manager in 36 months." },
];

const jobs = [
  { title: "Senior Service Technician", dept: "Field Operations", type: "Full-time", loc: "Bengaluru" },
  { title: "Field Engineer — Geyser", dept: "Field Operations", type: "Full-time", loc: "Hyderabad" },
  { title: "Customer Care Executive", dept: "Customer Success", type: "Full-time", loc: "Remote / Bengaluru" },
  { title: "Operations Lead", dept: "Operations", type: "Full-time", loc: "Mumbai" },
  { title: "Apprentice Technician", dept: "Field Operations", type: "Trainee", loc: "Pune" },
];

function Career() {
  return (
    <div>
      <section className="bg-[var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-mint)] font-semibold">Careers</div>
            <h1 className="mt-3 text-5xl md:text-6xl font-extrabold leading-[1]">
              Build a career in <span className="text-[var(--color-mint)]">honest service.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Whether you're a master technician or just starting out, Mistry offers paid training, fair pay, and a clear growth path. Join 180+ professionals fixing what matters in homes across India.
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-6">
          {perks.map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-6">
              <div className="size-11 rounded-xl bg-[var(--gradient-hero)] grid place-items-center shadow-[var(--shadow-glow)]">
                <p.icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Openings */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Open roles</div>
            <h2 className="mt-2 text-4xl font-extrabold">Current openings</h2>
          </div>
          <a href="mailto:harshpathak657@gmail.com" className="text-sm font-semibold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
            Don't see your role? Email us <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-hidden">
          {jobs.map((j, idx) => (
            <div
              key={j.title}
              className={`flex flex-wrap md:flex-nowrap items-center gap-4 p-5 md:p-6 hover:bg-muted/50 transition ${idx !== 0 ? "border-t border-border" : ""}`}
            >
              <div className="flex-1 min-w-[60%]">
                <h3 className="font-bold text-lg">{j.title}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Briefcase className="size-3.5" /> {j.dept}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {j.type}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {j.loc}</span>
                </div>
              </div>
              <a
                href={`mailto:harshpathak657@gmail.com?subject=Application: ${encodeURIComponent(j.title)}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90"
              >
                Apply <ArrowRight className="size-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Application CTA */}
        <div className="mt-12 rounded-3xl bg-[var(--gradient-hero)] text-primary-foreground p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Refer a technician, earn ₹5,000</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-lg">
              Know someone great with their hands? Refer them — when they're hired and complete 30 days, you get rewarded.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="mailto:harshpathak657@gmail.com?subject=Referral"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mint)] text-primary px-7 py-3 font-bold hover:opacity-90"
            >
              Refer now <ArrowRight className="size-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
