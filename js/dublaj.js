/* ==========================================================================
   dublaj.js — Dublajlarımız sayfası: dublaj kartları
   Veriler doğrudan burada tanımlı (fetch yok, dosya olarak da çalışır).
   ========================================================================== */

(function () {
  "use strict";

  var DUBS = [
    {
      title: "High School DxD Türkçe Dublaj",
      description: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası burada başlıyor.",
      cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
      siteLogo: "",
      siteName: "AnimeZer",
      url: "https://animezer.com/anime/high-school-dxd/sezon-1/bolum-1",
      episode: "01 / 12",
      quality: "1080p Türkçe Dublaj",
      date: "25.07.2026",
      team: "KoneHub Dublaj"
    }
  ];

  function renderDubs() {
    var grid = document.getElementById("dub-grid");
    if (!grid) return;

    if (!Array.isArray(DUBS) || DUBS.length === 0) {
      grid.innerHTML = '<p class="placeholder-note">Henüz bir dublaj projesi eklenmemiş.</p>';
      return;
    }

    grid.innerHTML = DUBS.map(function (dub, index) {
      var title = window.withPlaceholder(dub.title, "İsimsiz Proje");
      var description = window.withPlaceholder(dub.description, "");
      var cover = window.withPlaceholder(dub.cover, "");
      var siteLogo = window.withPlaceholder(dub.siteLogo, "");
      var siteName = window.withPlaceholder(dub.siteName, "");
      var episode = window.withPlaceholder(dub.episode, "-");
      var quality = window.withPlaceholder(dub.quality, "-");
      var date = window.withPlaceholder(dub.date, "-");
      var team = window.withPlaceholder(dub.team, "Eternal Production");
      var url = dub.url;
      var validUrl = window.isValidUrl(url);
      var delay = (index * 0.06).toFixed(2);

      return (
        '<article class="dub-card glass-card" style="animation-delay:' + delay + 's">' +
          (cover ? '<img class="dub-cover" src="' + cover + '" alt="' + window.escapeHtml(title) + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
          '<div class="dub-body">' +
            (siteLogo || siteName ? (
              '<div class="dub-site-row">' +
                (siteLogo ? '<img class="dub-site-logo" src="' + siteLogo + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
                (siteName ? '<span class="dub-site-name">' + window.escapeHtml(siteName) + '</span>' : '') +
              '</div>'
            ) : '') +
            '<h2 class="dub-title">' + window.escapeHtml(title) + '</h2>' +
            (description ? '<p class="dub-desc">' + window.escapeHtml(description) + '</p>' : '') +
            '<div class="dub-meta-grid">' +
              '<div class="dub-meta-item"><span class="label">Bölümler</span><span class="value">' + window.escapeHtml(episode) + '</span></div>' +
              '<div class="dub-meta-item"><span class="label">Kalite</span><span class="value">' + window.escapeHtml(quality) + '</span></div>' +
              '<div class="dub-meta-item"><span class="label">Yayın Tarihi</span><span class="value">' + window.escapeHtml(date) + '</span></div>' +
              '<div class="dub-meta-item"><span class="label">Seslendirme</span><span class="value">' + window.escapeHtml(team) + '</span></div>' +
            '</div>' +
            (validUrl
              ? '<a class="btn btn-primary dub-watch-btn" href="' + url + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-play"></i> İZLE</a>'
              : '<span class="btn btn-ghost dub-watch-btn" aria-disabled="true">Bağlantı yakında</span>') +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", renderDubs);
})();
