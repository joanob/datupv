import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return {
    theme,
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      document.body.className = newTheme;
      setTheme(newTheme);
    },
  };
};
