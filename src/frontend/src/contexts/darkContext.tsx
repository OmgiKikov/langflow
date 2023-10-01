import { createContext, useEffect, useState } from "react";
import { getRepoStars } from "../controllers/API";
import { darkContextType } from "../types/typesContext";

const initialValue = {
  dark: {},
  setDark: () => {},
  gradientIndex: 0,
  setGradientIndex: () => 0,
};

export const darkContext = createContext<darkContextType>(initialValue);

export function DarkProvider({ children }) {
  const [dark, setDark] = useState(
    JSON.parse(window.localStorage.getItem("isDark")!) ?? false
  );
  const [stars, setStars] = useState<number>(0);
  const [gradientIndex, setGradientIndex] = useState<number>(0);

  useEffect(() => {
    if (dark) {
      document.getElementById("body")!.classList.add("dark");
    } else {
      document.getElementById("body")!.classList.remove("dark");
    }
    window.localStorage.setItem("isDark", dark.toString());
  }, [dark]);

  return (
    <darkContext.Provider
      value={{
        dark,
        setDark,
        setGradientIndex,
        gradientIndex,
      }}
    >
      {children}
    </darkContext.Provider>
  );
}
