import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import { moveFocus, scrollToTarget } from "@/lib/scroll";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default function Footer() {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="shell relative flex flex-col gap-6 border-t border-line py-10 sm:flex-row sm:items-center sm:justify-between">
      <p className="label normal-case tracking-normal text-subtle">
        © {new Date().getFullYear()} {profile.name}. Designed and engineered in-house.
      </p>
      <p className="label flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
        Hyderabad <time className="text-fg tabular-nums">{time}</time> IST
      </p>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget(0);
          moveFocus("top");
        }}
        className="label link-line w-fit text-fg"
      >
        Back to top ↑
      </a>
    </footer>
  );
}
