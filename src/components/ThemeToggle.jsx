"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEMES = ["light", "dark", "cupcake"]; // must match tailwind.config

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid hydration mismatch

  const toggle = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <div className="join">
      <button className="btn btn-sm join-item" onClick={toggle}>
        {resolvedTheme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
      
    </div>
  );
}
