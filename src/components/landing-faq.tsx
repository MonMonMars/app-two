"use client";

import { LANDING_FAQ_ITEMS } from "@/lib/landing-faq";
import { useState } from "react";

export function LandingFaq() {
  const [openId, setOpenId] = useState<string | null>(
    LANDING_FAQ_ITEMS[0]?.id ?? null,
  );

  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-bold text-white">
        FAQ — monetization & safety
      </h2>
      <ul className="mt-4 space-y-2">
        {LANDING_FAQ_ITEMS.map((item) => {
          const open = openId === item.id;
          return (
            <li
              key={item.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                <span className="text-zinc-500" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <p className="border-t border-white/5 px-4 py-3 text-sm leading-relaxed text-zinc-400">
                  {item.answer}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
