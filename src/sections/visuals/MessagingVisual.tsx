import { prefersReducedMotion } from "@/lib/device";

const channels = [
  { label: "SMS", y: 70 },
  { label: "WhatsApp", y: 180 },
  { label: "Email", y: 290 },
];

const route = (y: number) => `M 196 180 C 270 180, 290 ${y}, 360 ${y}`;

// Illustration of the routing flow: API → scheduler → provider → channel.
export default function MessagingVisual() {
  const animate = !prefersReducedMotion();
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Diagram: one API routes messages through Twilio or Vonage to SMS, WhatsApp and Email">
      <defs>
        <linearGradient id="mv-line" x1="0" x2="1">
          <stop offset="0" stopColor="#9fb4ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#9fb4ff" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="mv-glow">
          <stop offset="0" stopColor="#6f8cff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#6f8cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="180" r="120" fill="url(#mv-glow)" />

      {/* API in */}
      <path d="M 40 180 L 104 180" stroke="url(#mv-line)" strokeWidth="1.2" fill="none" />
      <rect x="14" y="160" width="40" height="40" rx="12" fill="#0b0b0d" stroke="rgba(255,255,255,.18)" />
      <text x="34" y="184" textAnchor="middle" fill="#a1a1a6" fontSize="10" fontFamily="var(--font-mono)">API</text>

      {/* Core */}
      <rect x="104" y="130" width="92" height="100" rx="22" fill="#141417" stroke="rgba(201,196,187,.5)" />
      <text x="150" y="172" textAnchor="middle" fill="#f5f5f7" fontSize="12" fontWeight="600">Spring</text>
      <text x="150" y="188" textAnchor="middle" fill="#f5f5f7" fontSize="12" fontWeight="600">Boot</text>
      <text x="150" y="210" textAnchor="middle" fill="#6e6e73" fontSize="8" fontFamily="var(--font-mono)">SCHEDULER</text>

      {channels.map((c) => (
        <g key={c.label}>
          <path id={`mv-${c.label}`} d={route(c.y)} stroke="url(#mv-line)" strokeWidth="1.2" fill="none" />
          <rect x="360" y={c.y - 22} width="104" height="44" rx="14" fill="#0b0b0d" stroke="rgba(255,255,255,.14)" />
          <circle cx="378" cy={c.y} r="3" fill="#7ee2b8" />
          <text x="390" y={c.y + 4} fill="#f5f5f7" fontSize="12">{c.label}</text>
        </g>
      ))}

      {animate &&
        channels.map((c, i) =>
          [0, 1].map((k) => (
            <circle key={`${c.label}-${k}`} r="2.6" fill="#e8ecff">
              <animateMotion dur={`${2.4 + i * 0.4}s`} begin={`${k * 1.2 + i * 0.3}s`} repeatCount="indefinite">
                <mpath href={`#mv-${c.label}`} />
              </animateMotion>
            </circle>
          )),
        )}

      {/* Providers */}
      <g fontFamily="var(--font-mono)" fontSize="9">
        <rect x="96" y="262" width="52" height="22" rx="11" fill="none" stroke="rgba(159,180,255,.6)" />
        <text x="122" y="276" textAnchor="middle" fill="#9fb4ff">TWILIO</text>
        <rect x="154" y="262" width="52" height="22" rx="11" fill="none" stroke="rgba(255,255,255,.18)" />
        <text x="180" y="276" textAnchor="middle" fill="#a1a1a6">VONAGE</text>
        <text x="150" y="306" textAnchor="middle" fill="#6e6e73">CONFIGURABLE PROVIDER</text>
      </g>
    </svg>
  );
}
