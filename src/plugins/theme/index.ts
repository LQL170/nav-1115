import { storage } from "../storage";
import { store } from "../store";

const media = window.matchMedia("(prefers-color-scheme: dark)");

function sys({ matches }: { matches: boolean }) {
  const theme = storage.get("theme") ?? (matches ? "dark" : "light");
  toggleTheme(theme);
}

export function toggleTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("theme", theme);
  storage.set("theme", theme);
  store.theme.value = theme;
}

media.addEventListener("change", ({ matches }) => {
  toggleTheme(matches ? "dark" : "light");
});

sys(media);
