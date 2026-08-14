/* ==========================================================================
   sponsor.js — Sponsorlarımız sayfası: sponsor kartlarını sponsor.json'dan yükler
   ========================================================================== */

(function () {
  "use strict";

  var DEFAULT_SPONSORS = [
    {
      name: "Eternal Production",
      logo: "https://photograph.eternalproduction.net/konechiba-senpai-logo.jpg",
      description: "Konechiba Senpai ve dublaj projelerimizin ana sponsoru ve yapımcı ekibi.",
      url: "https://www.eternalproduction.net"
    }
  ];

  function renderSponsors(sponsors) {
    var grid = document.getElementById("sponsor-grid");
    if (!grid) return;

    if (!Array.isArray(sponsors) || sponsors.length === 0) {
      grid.innerHTML = '<p class="placeholder-note">Henüz sponsor bulunmamaktadır.</p>';
      return;
    }

    grid.innerHTML = sponsors.map(function (sponsor, index) {
      var name = window.withPlaceholder(sponsor.name, "Sponsor");
      var description = window.withPlaceholder(sponsor.description, "");
      var logo = window.withPlaceholder(sponsor.logo, "");
      var url = sponsor.url;
      var validUrl = window.isValidUrl(url);
      var delay = (index * 0.06).toFixed(2);

      return (
        '<article class="sponsor-card glass-card" style="animation-delay:' + delay + 's">' +
          '<div class="sponsor-header">' +
            (logo
              ? '<img class="sponsor-logo" src="' + window.escapeHtml(logo) + '" alt="' + window.escapeHtml(name) + ' logosu" loading="lazy" onerror="this.parentElement.removeChild(this);">'
              : '<div class="sponsor-logo-fallback"><i class="fa-solid fa-handshake"></i></div>'
            ) +
            '<h2 class="sponsor-title">' + window.escapeHtml(name) + '</h2>' +
          '</div>' +
          '<div class="sponsor-body">' +
            (description ? '<p class="sponsor-desc">' + window.escapeHtml(description) + '</p>' : '') +
          '</div>' +
          '<div class="sponsor-footer">' +
            (validUrl
              ? '<a class="btn btn-primary sponsor-link-btn" href="' + window.escapeHtml(url) + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> SİTEYİ ZİYARET ET</a>'
              : '<span class="btn btn-ghost sponsor-link-btn" aria-disabled="true">Web sitesi yok</span>'
            ) +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function loadSponsors() {
    var jsonPaths = ["sponsor.json", "data/sponsor.json"];

    function tryFetch(index) {
      if (index >= jsonPaths.length) {
        // Fallback if fetch fails or is running without web server
        renderSponsors(DEFAULT_SPONSORS);
        return;
      }

      fetch(jsonPaths[index])
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          return response.json();
        })
        .then(function (data) {
          if (Array.isArray(data)) {
            renderSponsors(data);
          } else {
            tryFetch(index + 1);
          }
        })
        .catch(function () {
          tryFetch(index + 1);
        });
    }

    tryFetch(0);
  }

  document.addEventListener("DOMContentLoaded", loadSponsors);
})();
