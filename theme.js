(function () {
  "use strict";

  var KEY = "v1shay-theme";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function getMode() {
    try {
      return localStorage.getItem(KEY) || "auto";
    } catch (e) {
      return "auto";
    }
  }

  function apply(mode) {
    root.dataset.themeMode = mode;

    if (mode === "light" || mode === "dark") {
      root.dataset.theme = mode;
    } else {
      root.removeAttribute("data-theme");
    }

    document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-theme-choice") === mode ? "true" : "false"
      );
    });
  }

  function setMode(mode) {
    try {
      localStorage.setItem(KEY, mode);
    } catch (e) {}
    apply(mode);
  }

  function bind() {
    apply(getMode());

    document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
      button.addEventListener("click", function () {
        setMode(button.getAttribute("data-theme-choice"));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  if (media.addEventListener) {
    media.addEventListener("change", function () {
      if (getMode() === "auto") apply("auto");
    });
  }
})();
