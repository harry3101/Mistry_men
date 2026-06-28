import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { submitServiceRequest } from "@/lib/api";

export const Route = createFileRoute("/register-issue")({
  head: () => ({
    meta: [
      { title: "Register an Issue — Mistry Service Center" },
      { name: "description", content: "Book a technician for your washing machine, air cooler or geyser in 60 seconds." },
      { property: "og:title", content: "Register Issue — Mistry" },
      { property: "og:description", content: "Quick booking form for repair and installation." },
    ],
  }),
  component: RegisterIssue,
});

const PRODUCTS = ["Washing Machine", "Air Cooler", "Geyser"] as const;

const ISSUES: Record<(typeof PRODUCTS)[number], string[]> = {
  "Washing Machine": [
    "Not turning on",
    "Drum not spinning",
    "Water not draining",
    "Excess vibration / noise",
    "Water leakage",
    "Error code displayed",
    "Door not locking",
  ],
  "Air Cooler": [
    "Not cooling enough",
    "Water pump not working",
    "Fan motor noise",
    "Water leakage",
    "Cooling pads need replacement",
    "Power / switch issue",
    "Bad odour",
  ],
  Geyser: [
    "No hot water",
    "Water heating too slow",
    "Tripping the MCB",
    "Water leakage from tank",
    "Strange noise during heating",
    "Thermostat issue",
    "Rust / discoloured water",
  ],
};

const SERVICE_TYPES = ["Repair", "Installation", "Annual Maintenance", "Inspection / Quote"];
const TIME_SLOTS = ["09:00 – 11:00", "11:00 – 13:00", "13:00 – 15:00", "15:00 – 17:00", "17:00 – 19:00"];

function RegisterIssue() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<(typeof PRODUCTS)[number] | "">("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    issue: "",
    service: "Repair",
    date: "",
    slot: TIME_SLOTS[0],
    notes: "",
  });

  const issues = useMemo(() => (product ? ISSUES[product] : []), [product]);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\+?[0-9\s-]{10,15}$/.test(form.phone)) {
      toast.error("Please enter a valid name and phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!form.address.trim()) {
      toast.error("Please enter your address.");
      return;
    }
    if (!product || !form.issue || !form.date) {
      toast.error("Please complete product, issue, and date.");
      return;
    }

    setLoading(true);
    try {
      await submitServiceRequest({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        product,
        issue: form.issue,
        serviceType: form.service,
        preferredDate: form.date,
        timeSlot: form.slot,
        notes: form.notes.trim() || undefined,
      });
      setSubmitted(true);
      toast.success("Your request is confirmed!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Toaster />
        <div className="mx-auto size-16 rounded-full bg-[var(--color-mint)] grid place-items-center">
          <CheckCircle2 className="size-8 text-primary" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold">Request received</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks {form.name.split(" ")[0]}! Our technician will reach you on <strong>{form.date}</strong> between <strong>{form.slot}</strong>. A confirmation email has been sent to <strong>{form.email}</strong>.
        </p>
        <button
          onClick={() => { setSubmitted(false); setProduct(""); setForm({ name: "", email: "", phone: "", address: "", issue: "", service: "Repair", date: "", slot: TIME_SLOTS[0], notes: "" }); }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90"
        >
          Book another service
        </button>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {/* Hero strip */}
      <section className="bg-[var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
            <Wrench className="size-3.5" /> Free doorstep visit
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">Register your service request</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Tell us about your appliance and pick a time. A certified technician will reach you — same-day slots available.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 -mt-10 pb-20">
        <form
          onSubmit={onSubmit}
          className="bg-card rounded-3xl border border-border shadow-[var(--shadow-elegant)] p-6 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full name" required>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Aman Verma"
                className={inputCls}
                maxLength={80}
                required
              />
            </Field>

            <Field label="Phone number" required>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 95995 66502"
                inputMode="tel"
                className={inputCls}
                maxLength={15}
                required
              />
            </Field>

            <Field label="Email address" required className="md:col-span-2">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
                maxLength={120}
                required
              />
            </Field>

            <Field label="Address" required className="md:col-span-2">
              <textarea
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Flat / Street / Area / City / Pincode"
                rows={3}
                maxLength={300}
                className={inputCls + " resize-none"}
                required
              />
            </Field>

            <Field label="Product" required>
              <select
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value as typeof product);
                  update("issue", "");
                }}
                className={inputCls}
                required
              >
                <option value="">Select product</option>
                {PRODUCTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field label="Issue" required>
              <select
                value={form.issue}
                onChange={(e) => update("issue", e.target.value)}
                className={inputCls}
                disabled={!product}
                required
              >
                <option value="">{product ? "Select issue" : "Select product first"}</option>
                {issues.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </Field>

            <Field label="Service type" required>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_TYPES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => update("service", s)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      form.service === s
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Preferred date" required>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => update("date", e.target.value)}
                className={inputCls}
                required
              />
            </Field>

            <Field label="Meeting time slot" required className="md:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => update("slot", t)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      form.slot === t
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background border-border hover:border-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Additional notes (optional)" className="md:col-span-2">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Brand, model, warranty status, anything else useful…"
                rows={3}
                maxLength={500}
                className={inputCls + " resize-none"}
              />
            </Field>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              By submitting, you agree to our service terms. Visit charge is waived on confirmed jobs.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? (<><Loader2 className="size-4 animate-spin" /> Submitting…</>) : "Submit Request"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition disabled:opacity-50";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
