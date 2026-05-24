const year = document.querySelector("#year");
const printButton = document.querySelector("#printResume");
const themeToggle = document.querySelector("#themeToggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");

const storageKey = "resume-theme";
let savedTheme = null;

try {
  savedTheme = localStorage.getItem(storageKey);
} catch {
  savedTheme = null;
}

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // The toggle should still work when storage is blocked.
  }

  if (!themeToggle || !themeToggleText || !themeToggleIcon) {
    return;
  }

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggleText.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggleIcon.textContent = isDark ? "☀" : "☾";
}

setTheme(currentTheme);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}
