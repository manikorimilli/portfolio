"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Magnetic from "./ui/Magnetic";
import { CandyButton } from "./ui/candy-button";
import { FaqAccordion } from "./ui/faq-accordion";
import { LineHoverLink } from "./ui/line-hover-link";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

// Answers to what people actually ask before reaching out.
const faqs = [
  {
    question: "What kind of roles are you open to?",
    answer:
      "Full-stack or frontend-leaning product engineering — ideally somewhere data, real-time behaviour or AI features are central to the product rather than bolted on.",
  },
  {
    question: "What are you strongest at?",
    answer:
      "Turning fuzzy product questions into shipped interfaces: React and TypeScript on the front, Node and SQL behind it, and the visualization work that makes the data legible.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes, for focused scopes — dashboards, analytics surfaces, AI-assisted features and design-heavy marketing builds. Email is the fastest way to start that conversation.",
  },
  {
    question: "What is your notice period?",
    answer:
      "I'm currently at DeeptaAI in Hyderabad and open to conversations. Reach out and I'll share specifics on timelines.",
  },
];

const info = [
  { icon: Mail, value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: MapPin, value: site.location, href: undefined },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend needed: compose the message into a mailto draft.
  // Swap for a Resend-backed API route when a domain is wired up.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-6">
      <div className="panel p-6 md:p-12">
        <SectionHeading title="Let's Build Something Great Together" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                Have a project in mind or want to collaborate? Feel free to
                reach out — I&apos;m always open to discussing ambitious
                products. The fastest route is{" "}
                <LineHoverLink
                  variant="sweep"
                  href={`mailto:${site.email}`}
                  className="font-medium text-accent"
                >
                  a direct email
                </LineHoverLink>
                .
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3">
              {info.map((c, i) => {
                const inner = (
                  <div className="card flex items-center gap-4 rounded-xl p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-elev/[0.04]">
                      <c.icon size={15} className="text-accent" />
                    </span>
                    <span className="text-sm">{c.value}</span>
                  </div>
                );
                return (
                  <Reveal key={c.value} delay={i * 0.07}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex gap-3">
                {[
                  { icon: LinkedinIcon, href: site.linkedin, label: "LinkedIn" },
                  { icon: GithubIcon, href: site.github, label: "GitHub" },
                ].map((s) => (
                  <Magnetic key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="card flex h-11 w-11 items-center justify-center rounded-xl text-foreground/80 hover:text-accent"
                    >
                      <s.icon size={17} />
                    </a>
                  </Magnetic>
                ))}
                <Magnetic>
                  <a
                    href={site.resume}
                    download
                    className="card flex h-11 items-center rounded-xl px-4 text-sm text-foreground/80 hover:text-accent"
                  >
                    Resume
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              className="card flex flex-col gap-4 rounded-2xl p-6 md:p-8"
            >
              {(
                [
                  { key: "name", label: "Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                ] as const
              ).map((field) => (
                <input
                  key={field.key}
                  type={field.type}
                  required
                  placeholder={field.label}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.key]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-elev/10 bg-elev/[0.03] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/50"
                />
              ))}
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full resize-none rounded-xl border border-elev/10 bg-elev/[0.03] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/50"
              />
              <Magnetic strength={0.25}>
                <CandyButton type="submit" className="group w-full py-4">
                  <span className="flex items-center justify-center gap-2.5">
                    Send Message
                    <Send
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </CandyButton>
              </Magnetic>
            </form>
          </Reveal>
        </div>

        {/* Vengeance UI accordion, answering the usual pre-contact questions */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <div className="hairline mb-10" />
            <FaqAccordion
              items={faqs}
              title="Before you write"
              className="!max-w-none !py-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
