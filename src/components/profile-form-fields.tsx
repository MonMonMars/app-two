"use client";

import {
  GENDER_OPTIONS,
  INTEREST_OPTIONS,
  MOCK_PHOTO_PRESETS,
} from "@/lib/constants";
import type { GenderIdentity, UserDatingProfile } from "@/types";
import {
  buttonSecondaryClassName,
  chipClassName,
  inputClassName,
  labelClassName,
} from "@/components/ui/field-styles";

type ProfileSection = "all" | "basics" | "photos" | "story" | "prefs";

type ProfileFormFieldsProps = {
  value: UserDatingProfile;
  onChange: (patch: Partial<UserDatingProfile>) => void;
  showPreferences?: boolean;
  section?: ProfileSection;
};

export function ProfileFormFields({
  value,
  onChange,
  showPreferences = true,
  section = "all",
}: ProfileFormFieldsProps) {
  const showBasics = section === "all" || section === "basics";
  const showPhotos = section === "all" || section === "photos";
  const showStory = section === "all" || section === "story";
  const showPrefs =
    showPreferences && (section === "all" || section === "prefs");
  const toggleInterest = (tag: string) => {
    const next = value.interests.includes(tag)
      ? value.interests.filter((t) => t !== tag)
      : [...value.interests, tag];
    onChange({ interests: next });
  };

  const toggleShowMe = (gender: GenderIdentity) => {
    if (value.showMe === "everyone") {
      onChange({ showMe: [gender] });
      return;
    }
    const set = new Set(value.showMe);
    if (set.has(gender)) {
      set.delete(gender);
    } else {
      set.add(gender);
    }
    onChange({
      showMe: set.size === 0 ? "everyone" : [...set],
    });
  };

  const addPhotoUrl = (url: string) => {
    if (value.photoUrls.includes(url)) {
      return;
    }
    onChange({ photoUrls: [...value.photoUrls, url].slice(0, 6) });
  };

  return (
    <div className="space-y-5">
      {showBasics ? (
        <>
          <div>
            <label className={labelClassName} htmlFor="profile-name">
              Name
            </label>
            <input
              id="profile-name"
              value={value.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className={inputClassName}
            />
          </div>
          <div>
            <label className={labelClassName} htmlFor="profile-age">
              Age
            </label>
            <input
              id="profile-age"
              type="number"
              min={18}
              max={99}
              value={value.age}
              onChange={(e) => onChange({ age: Number(e.target.value) || 18 })}
              className={inputClassName}
            />
          </div>
        </>
      ) : null}
      {showStory ? (
        <div>
          <label className={labelClassName} htmlFor="profile-bio">
            Bio
          </label>
          <textarea
            id="profile-bio"
            rows={4}
            value={value.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            className={inputClassName}
            placeholder="What should people know about you?"
          />
        </div>
      ) : null}
      {showPhotos ? (
        <div>
          <p className={labelClassName}>Photos</p>
          <p className="mt-1 text-xs text-zinc-500">
            Paste image URLs or pick a mock preset (public-safe placeholders).
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOCK_PHOTO_PRESETS.map((preset) => (
              <button
                key={preset.url}
                type="button"
                className={buttonSecondaryClassName}
                onClick={() => addPhotoUrl(preset.url)}
              >
                + {preset.label}
              </button>
            ))}
          </div>
          <input
            id="profile-photo-url"
            placeholder="https://…"
            className={`${inputClassName} mt-2`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                if (input.value.trim()) {
                  addPhotoUrl(input.value.trim());
                  input.value = "";
                }
              }
            }}
          />
          <ul className="mt-2 space-y-1 text-xs text-zinc-400">
            {value.photoUrls.map((url, i) => (
              <li key={url} className="flex items-center justify-between gap-2">
                <span className="truncate">
                  {i === 0 ? "Primary · " : ""}
                  {url}
                </span>
                <button
                  type="button"
                  className="text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400"
                  onClick={() =>
                    onChange({
                      photoUrls: value.photoUrls.filter((u) => u !== url),
                    })
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {showStory ? (
        <div>
          <p className={labelClassName}>Interests</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={chipClassName(value.interests.includes(tag))}
                onClick={() => toggleInterest(tag)}
                aria-pressed={value.interests.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {showPrefs ? (
        <>
          <div>
            <label className={labelClassName} htmlFor="profile-gender">
              I am
            </label>
            <select
              id="profile-gender"
              value={value.gender}
              onChange={(e) =>
                onChange({ gender: e.target.value as GenderIdentity })
              }
              className={inputClassName}
            >
              {GENDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className={labelClassName}>Show me</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className={chipClassName(value.showMe === "everyone")}
                onClick={() => onChange({ showMe: "everyone" })}
                aria-pressed={value.showMe === "everyone"}
              >
                Everyone
              </button>
              {GENDER_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={chipClassName(
                    value.showMe !== "everyone" &&
                      value.showMe.includes(o.value),
                  )}
                  onClick={() => toggleShowMe(o.value)}
                  aria-pressed={
                    value.showMe !== "everyone" &&
                    value.showMe.includes(o.value)
                  }
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClassName} htmlFor="age-min">
                Age min
              </label>
              <input
                id="age-min"
                type="number"
                min={18}
                max={value.ageRangeMax}
                value={value.ageRangeMin}
                onChange={(e) =>
                  onChange({ ageRangeMin: Number(e.target.value) || 18 })
                }
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="age-max">
                Age max
              </label>
              <input
                id="age-max"
                type="number"
                min={value.ageRangeMin}
                max={99}
                value={value.ageRangeMax}
                onChange={(e) =>
                  onChange({ ageRangeMax: Number(e.target.value) || 99 })
                }
                className={inputClassName}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
