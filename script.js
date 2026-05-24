document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  const printButton = document.querySelector("#printResume");
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const storageKey = "resume-theme";
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // The toggle should still work when storage is blocked.
    }

    const isDark = theme === "dark";

    themeToggles.forEach((themeToggle) => {
      const themeToggleText = themeToggle.querySelector(".theme-toggle-text");
      const themeToggleIcon = themeToggle.querySelector(".theme-toggle-icon");

      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);

      if (themeToggleText) {
        themeToggleText.textContent = isDark ? "Light mode" : "Dark mode";
      }

      if (themeToggleIcon) {
        themeToggleIcon.textContent = isDark ? "☀" : "☾";
      }
    });
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

  themeToggles.forEach((themeToggle) => {
    themeToggle.addEventListener("click", () => {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  });
});
