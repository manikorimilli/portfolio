import { useState } from "react";
import { profile } from "@/lib/content";
import SplitReveal from "@/components/SplitReveal";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, href: profile.phoneHref },
    { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin, external: true },
    { label: "GitHub", value: profile.githubHandle, href: profile.github, external: true },
  ];

  return (
    <section data-section="contact" aria-labelledby="contact" className="relative overflow-hidden pt-section pb-16">
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-70" />
      <div className="shell relative">
        <div className="mb-8 flex items-center gap-4 border-b border-line pb-4" data-reveal>
          <span className="label text-fg">08</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          <span className="label">Contact</span>
          <span className="label ml-auto hidden items-center gap-2 sm:flex">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-ok" aria-hidden="true" /> Open to opportunities
          </span>
        </div>

        <SplitReveal as="h2" id="contact" className="text-mega font-semibold text-titanium">
          Let&rsquo;s build
          <br />
          what&rsquo;s next.
        </SplitReveal>

        <div data-reveal className="mt-14 flex flex-wrap items-center gap-3">
          <Magnetic strength={0.3}>
            <a href={`mailto:${profile.email}`} className="btn btn-primary h-16 px-8 text-lg" data-cursor="Write">
              <span>Start a conversation</span>
              <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button type="button" onClick={copy} className="btn btn-ghost h-16 px-6">
              <span className="font-mono text-sm">{copied ? "Copied to clipboard" : "Copy email"}</span>
            </button>
          </Magnetic>
          <span role="status" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </div>

        <ul className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.label} data-reveal className="border-b border-line lg:border-r lg:last:border-r-0">
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col gap-3 py-6 transition-colors duration-500 lg:px-6 lg:first:pl-0"
              >
                <span className="label flex items-center justify-between">
                  {l.label}
                  <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </span>
                <span className="link-line w-fit truncate text-lg text-muted transition-colors group-hover:text-fg">{l.value}</span>
                {l.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
