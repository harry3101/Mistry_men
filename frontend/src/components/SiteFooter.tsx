import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-extrabold">Mistry Service Center</div>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-md">
            Trusted home appliance repair, installation, and maintenance for washing machines, air coolers, and geysers — backed by certified technicians.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">Pages</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[var(--color-mint)]">Home</Link></li>
            <li><Link to="/register-issue" className="hover:text-[var(--color-mint)]">Register Issue</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-mint)]">About</Link></li>
            <li><Link to="/career" className="hover:text-[var(--color-mint)]">Career</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a href="tel:+919599566502" className="hover:text-[var(--color-mint)] transition">+91 95995 66502</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a href="mailto:harshpathak657@gmail.com" className="hover:text-[var(--color-mint)] transition">harshpathak657@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0" />
              Challehra Gali No-2, Sec-44, Noida, UP
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60 flex justify-between">
          <span>© {new Date().getFullYear()} Mistry. All rights reserved.</span>
          <span>Made for reliable service.</span>
        </div>
      </div>
    </footer>
  );
}
