/* ==========================================================================
   common.js — Ortak: hamburger menü, tema (dark/light), yardımcı fonksiyonlar
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Loading screen ---------- */
  function hideLoader() {
    var loader = document.getElementById("loading-screen");
    if (loader) {
      setTimeout(function () {
        loader.classList.add("is-hidden");
      }, 250);
    }
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  /* ---------- Hamburger / side menu ---------- */
  var hamburgerBtn = document.getElementById("hamburger-btn");
  var sideMenu = document.getElementById("side-menu");
  var sideOverlay = document.getElementById("side-overlay");
  var sideMenuClose = document.getElementById("side-menu-close");

  function openMenu() {
    sideMenu.classList.add("is-open");
    sideOverlay.classList.add("is-visible");
    hamburgerBtn.classList.add("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    sideMenu.classList.remove("is-open");
    sideOverlay.classList.remove("is-visible");
    hamburgerBtn.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn && sideMenu && sideOverlay) {
    hamburgerBtn.addEventListener("click", function () {
      if (sideMenu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    sideOverlay.addEventListener("click", closeMenu);
    if (sideMenuClose) sideMenuClose.addEventListener("click", closeMenu);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Dark / Light theme ---------- */
  var THEME_KEY = "eternal-production-theme";
  var themeToggleBtn = document.getElementById("theme-toggle-btn");
  var themeIcon = document.getElementById("theme-icon");
  var htmlEl = document.documentElement;

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    if (themeIcon) {
      themeIcon.classList.toggle("fa-moon", theme === "light");
      themeIcon.classList.toggle("fa-sun", theme === "dark");
    }
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* noop */ }
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    applyTheme(theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
      var current = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* noop */ }
    });
  }

  initTheme();

  /* ---------- Placeholder helper (global) ---------- */
  window.withPlaceholder = function (value, fallback) {
    if (value === undefined || value === null) return fallback;
    if (typeof value === "string" && value.trim() === "") return fallback;
    return value;
  };

  /* ---------- URL doğrulama (global) ---------- */
  window.isValidUrl = function (url) {
    if (!url || typeof url !== "string") return false;
    if (url.startsWith("mailto:") || url.startsWith("tel:")) return true;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  /* ---------- HTML escape (global) ---------- */
  window.escapeHtml = function (str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  /* ---------- Toast helper (global) ---------- */
  window.showToast = function (message, type) {
    var stack = document.getElementById("toast-stack");
    if (!stack) return;

    var toast = document.createElement("div");
    toast.className = "toast" + (type ? " " + type : "");
    toast.innerHTML = '<span style="margin-right:8px; font-size:1.1rem;"><i class="fa-solid fa-circle-check" style="color:#1d9bf0;"></i></span> ' + window.escapeHtml(message);

    stack.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      setTimeout(function () {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3500);
  };

  /* ---------- Bakım Modu (Maintenance Mode) ---------- */
  function checkMaintenanceMode() {
    var paths = ["bakim.json", "data/bakim.json", "../bakim.json", "../data/bakim.json"];

    function tryPath(idx) {
      if (idx >= paths.length) return;
      fetch(paths[idx])
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          if (data && (data.active === true || data.active === "true")) {
            renderMaintenanceOverlay(data);
          }
        })
        .catch(function () {
          tryPath(idx + 1);
        });
    }

    tryPath(0);
  }

  function renderMaintenanceOverlay(data) {
    var title = data.title || "Sitemiz Bakımdadır";
    var message = data.message || "Sizlere daha iyi bir deneyim sunabilmek için bakım çalışması yapıyoruz.";
    var estimated = data.estimated_time || "";
    var contact = data.contact_info || "";

    var appShell = document.getElementById("app-shell");
    if (appShell) {
      appShell.style.display = "none";
    }

    var overlay = document.createElement("div");
    overlay.id = "maintenance-screen";
    overlay.className = "maintenance-screen";

    overlay.innerHTML =
      '<div class="maintenance-card glass-card">' +
        '<div class="maintenance-icon-wrapper">' +
          '<i class="fa-solid fa-gears maintenance-gear"></i>' +
        '</div>' +
        '<h1 class="maintenance-title">' + window.escapeHtml(title) + '</h1>' +
        '<p class="maintenance-message">' + window.escapeHtml(message) + '</p>' +
        (estimated ? '<div class="maintenance-badge"><i class="fa-solid fa-clock"></i> ' + window.escapeHtml(estimated) + '</div>' : '') +
        (contact ? '<div class="maintenance-contact"><a href="mailto:' + window.escapeHtml(contact) + '" class="btn btn-primary"><i class="fa-solid fa-envelope"></i> ' + window.escapeHtml(contact) + '</a></div>' : '') +
      '</div>';

    document.body.appendChild(overlay);
  }

  checkMaintenanceMode();
})();
