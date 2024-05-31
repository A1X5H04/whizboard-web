"use client";

import { Desktop, Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";

function ThemeToggler() {
  const { theme, themes, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1 capitalize btn-square">
        {theme === "system" ? (
          <Desktop width={18} height={18} />
        ) : (
          <>
            {["dark", "coffee", "business", "night"].includes(theme || "") ? (
              <Moon width={18} height={18} />
            ) : (
              <Sun width={18} height={18} />
            )}
          </>
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-36 space-y-1"
      >
        {themes.map((t) => (
          <li key={t}>
            <button
              className={twMerge("capitalize", theme === t && "active")}
              onClick={() => setTheme(t)}
              disabled={theme === t}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThemeToggler;
