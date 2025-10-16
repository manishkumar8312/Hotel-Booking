import React, { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  // initialize synchronously from localStorage or system preference to avoid flash
  const [theme, setTheme] = useState(() => {
    try {
      const stored = typeof window !== "undefined" && localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  // apply and persist before paint to prevent default flash
  useLayoutEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch {}
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;