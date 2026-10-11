"use client";

import { chipClassName, labelClassName } from "@/components/ui/field-styles";
import { INTEREST_OPTIONS } from "@/lib/constants";
import { useProfile } from "@/context/profile-provider";
import { useState } from "react";

export function DiscoverFiltersPanel() {
  const { discoverFilters, updateDiscoverFilters } = useProfile();
  const [open, setOpen] = useState(false);

  if (!discoverFilters) {
    return null;
  }

  const toggleTag = (tag: string) => {
    const next = discoverFilters.interestTags.includes(tag)
      ? discoverFilters.interestTags.filter((t) => t !== tag)
      : [...discoverFilters.interestTags, tag];
    updateDiscoverFilters({ interestTags: next });
  };

  return (
    <section className="mb-4 rounded-2xl border border-white/10 bg-zinc-900/60">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">
          Filters · {discoverFilters.maxDistanceMiles} mi radius
        </span>
        <span className="text-zinc-500">{open ? "▲" : "▼"}</span>
      </button>
      {open ? (
        <div className="space-y-4 border-t border-white/5 px-4 py-4">
          <div>
            <label className={labelClassName} htmlFor="distance-radius">
              Distance (mock GPS)
            </label>
            <input
              id="distance-radius"
              type="range"
              min={1}
              max={100}
              value={discoverFilters.maxDistanceMiles}
              onChange={(e) =>
                updateDiscoverFilters({
                  maxDistanceMiles: Number(e.target.value),
                })
              }
              className="mt-2 w-full accent-rose-500"
            />
            <p className="text-xs text-zinc-500">
              Show profiles within{" "}
              <strong className="text-zinc-300">
                {discoverFilters.maxDistanceMiles} miles
              </strong>{" "}
              (demo distances on cards).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClassName} htmlFor="filter-age-min">
                Age min
              </label>
              <input
                id="filter-age-min"
                type="number"
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white"
                value={discoverFilters.ageMin}
                onChange={(e) =>
                  updateDiscoverFilters({ ageMin: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="filter-age-max">
                Age max
              </label>
              <input
                id="filter-age-max"
                type="number"
                className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-sm text-white"
                value={discoverFilters.ageMax}
                onChange={(e) =>
                  updateDiscoverFilters({ ageMax: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div>
            <p className={labelClassName}>Must share an interest</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTEREST_OPTIONS.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={chipClassName(
                    discoverFilters.interestTags.includes(tag),
                  )}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={discoverFilters.interestTags.includes(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
