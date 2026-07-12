import { useEffect, useState } from "react";

let manifest: Set<string> | null = null;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

export function loadTranslationManifest(): Promise<void> {
  if (!loading) {
    loading = fetch("/translations.json")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => [] as string[])
      .then((list: string[]) => {
        manifest = new Set(list);
        listeners.forEach((fn) => fn());
      });
  }
  return loading;
}

export function useTranslationManifest() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    loadTranslationManifest();
    return () => {
      listeners.delete(fn);
    };
  }, []);
}

export function localizedHtmlPath(path: string | undefined | null, lang: string): string {
  if (!path) return "";
  if (!lang || !lang.startsWith("en") || !manifest) return path;
  const en = path.replace(/\.html$/i, "_EN.html");
  return manifest.has(en) ? en : path;
}
