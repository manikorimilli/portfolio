import { ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { LineHoverLink } from "./ui/line-hover-link";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const resources = [
  { href: site.resume, label: "Resume" },
  { href: site.github, label: "GitHub" },
  { href: site.linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="panel p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
                M
              </span>
              <span className="text-sm font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Building digital experiences that create impact.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="pulse-dot" /> Available for opportunities
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <LineHoverLink
                    variant="slide"
                    href={l.href}
                    className="text-sm text-foreground/75 hover:text-foreground"
                  >
                    {l.label}
                  </LineHoverLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Resources
            </p>
            <ul className="flex flex-col gap-2.5">
              {resources.map((l) => (
                <li key={l.label}>
                  <LineHoverLink
                    variant="grow"
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/75 hover:text-foreground"
                  >
                    {l.label}
                  </LineHoverLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted">Crafted with passion ♥</p>
          <a
            href="#top"
            className="card flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted hover:text-foreground"
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
