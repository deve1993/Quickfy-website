"use client";

import { useTranslationsContext } from "./TranslationsProvider";

export function useTranslations(namespace?: string) {
  const { messages } = useTranslationsContext();

  return function t(
    key: string,
    params?: Record<string, string | number>
  ): string {
    // Build the full key path
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");

    // Navigate through the nested object
    let value: any = messages;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Return the key itself if translation not found (fallback)
        console.warn(`Translation missing for key: ${fullKey}`);
        return fullKey;
      }
    }

    // If value is not a string, return the key
    if (typeof value !== "string") {
      console.warn(`Translation for key "${fullKey}" is not a string`);
      return fullKey;
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((result, [param, val]) => {
        return result.replace(new RegExp(`\\{${param}\\}`, "g"), String(val));
      }, value);
    }

    return value;
  };
}
