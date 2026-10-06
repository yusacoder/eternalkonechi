/* ==========================================================================
   dublaj.js — Dublajlarımız sayfası: Sezon hazneleri (accordions) ve arama
   ========================================================================== */

(function () {
  "use strict";

  var DUBS_DATA = [
    {
      animeId: "high-school-dxd",
      animeTitle: "High School DxD Türkçe Dublaj",
      animeDescription: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası.",
      cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
      seasons: [
        {
          seasonNumber: 1,
          seasonTitle: "Sezon 1",
          episodes: [
            {
              title: "High School DxD 1. Bölüm (AnimeZer)",
              description: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası burada başlıyor.",
              cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
              siteLogo: "https://animezer.com/icon.png?5d728f7f68b60a2e",
              siteName: "AnimeZer",
              url: "https://animezer.com/anime/high-school-dxd/sezon-1/bolum-1",
              episode: "01 / 12",
              quality: "1080p Türkçe Dublaj",
              date: "25.07.2026",
              team: "KoneHub Dublaj"
            },
            {
              title: "High School DxD 1. Bölüm (AniHub)",
              description: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası burada başlıyor.",
              cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
              siteLogo: "https://anihub.com.tr/icon.png",
              siteName: "AniHub",
              url: "https://anihub.com.tr/high-school-dxd-izle-1-bolum-izle",
              episode: "01 / 12",
              quality: "1080p Türkçe Dublaj",
              date: "14.08.2026",
              team: "KoneHub Dublaj"
            },
                {
              title: "High School DxD 1. Bölüm (Animim)",
              description: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası burada başlıyor.",
              cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
              siteLogo: "https://play-lh.googleusercontent.com/Ph0HtI57-oDxq897RYMu1X7jzlqBktAAFTdOA3ouRimYf2QAobiaILdV3VtJVAr53plWJ31669De-2kRICuEfw=s0-br30",
              siteName: "Animim",
              url: "https://animim.app/izle/6abe5f1b43dadacbb1c63e6b/1/1",
              episode: "01 / 12",
              quality: "1080p Türkçe Dublaj",
              date: "06.10.2026",
              team: "KoneHub Dublaj"
            }
            
          ]
        },
        {
          seasonNumber: 2,
          seasonTitle: "Sezon 2",
          episodes: [
            /* Sezon 2 gelecekteki bölümler için hazır hazne */
          ]
        },
        {
          seasonNumber: 3,
          seasonTitle: "Sezon 3",
          episodes: [
            /* Sezon 3 gelecekteki bölümler için hazır hazne */
          ]
        },
        {
          seasonNumber: 4,
          seasonTitle: "Sezon 4 (Hero)",
          episodes: [
            /* Sezon 4 gelecekteki bölümler için hazır hazne */
          ]
        }
      ]
    }
  ];

  // Açık olan sezonların durumunu saklar (varsayılan: 0. anime - 0. sezon açık)
  var openSeasons = { "0-0": true };
  var currentSearchQuery = "";

  function toggleSeason(animeIndex, seasonIndex) {
    var key = animeIndex + "-" + seasonIndex;
    openSeasons[key] = !openSeasons[key];
    renderDubs();
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    var q = query.toLowerCase().trim();
    var fields = [
      item.title,
      item.description,
      item.siteName,
      item.quality,
      item.team,
      item.episode,
      item.date
    ];
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] && String(fields[i]).toLowerCase().indexOf(q) !== -1) {
        return true;
      }
    }
    return false;
  }

  function renderDubs() {
    var container = document.getElementById("dub-container");
    if (!container) return;

    var query = currentSearchQuery.trim().toLowerCase();
    var hasAnyContent = false;

    var html = DUBS_DATA.map(function (anime, aIdx) {
      var animeTitle = window.withPlaceholder(anime.animeTitle, "İsimsiz Anime");
      var animeDesc = window.withPlaceholder(anime.animeDescription, "");

      var seasonsHtml = anime.seasons.map(function (season, sIdx) {
        var seasonKey = aIdx + "-" + sIdx;
        var isSearching = query.length > 0;

        // Bölüm filtreleme
        var filteredEpisodes = season.episodes.filter(function (ep) {
          if (!isSearching) return true;
          return matchesQuery(ep, query) ||
                 (season.seasonTitle && season.seasonTitle.toLowerCase().indexOf(query) !== -1) ||
                 (animeTitle && animeTitle.toLowerCase().indexOf(query) !== -1);
        });

        // Arama yapılıyorsa ve bu sezonda eşleşme varsa hazneyi otomatik aç
        var isOpen = isSearching ? (filteredEpisodes.length > 0) : !!openSeasons[seasonKey];

        if (filteredEpisodes.length > 0 || !isSearching) {
          hasAnyContent = true;
        } else if (isSearching) {
          return ""; // Arama modundayken hiç bölümü eşleşmeyen sezonu gizle
        }

        var epCountText = season.episodes.length > 0 ? season.episodes.length + " Bölüm" : "Yakında";

        var episodesListHtml = "";
        if (filteredEpisodes.length === 0) {
          episodesListHtml = '<p class="placeholder-note small">Bu sezona henüz bölüm eklenmedi.</p>';
        } else {
          episodesListHtml = filteredEpisodes.map(function (dub, epIdx) {
            var title = window.withPlaceholder(dub.title, "İsimsiz Bölüm");
            var description = window.withPlaceholder(dub.description, "");
            var cover = window.withPlaceholder(dub.cover || anime.cover, "");
            var siteLogo = window.withPlaceholder(dub.siteLogo, "");
            var siteName = window.withPlaceholder(dub.siteName, "");
            var episode = window.withPlaceholder(dub.episode, "-");
            var quality = window.withPlaceholder(dub.quality, "-");
            var date = window.withPlaceholder(dub.date, "-");
            var team = window.withPlaceholder(dub.team, "Eternal Production");
            var url = dub.url;
            var validUrl = window.isValidUrl(url);

            return (
              '<article class="dub-card glass-card">' +
                (cover ? '<img class="dub-cover" src="' + cover + '" alt="' + window.escapeHtml(title) + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
                '<div class="dub-body">' +
                  (siteLogo || siteName ? (
                    '<div class="dub-site-row">' +
                      (siteLogo ? '<img class="dub-site-logo" src="' + siteLogo + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
                      (siteName ? '<span class="dub-site-name">' + window.escapeHtml(siteName) + '</span>' : '') +
                    '</div>'
                  ) : '') +
                  '<h3 class="dub-title">' + window.escapeHtml(title) + '</h3>' +
                  (description ? '<p class="dub-desc">' + window.escapeHtml(description) + '</p>' : '') +
                  '<div class="dub-meta-grid">' +
                    '<div class="dub-meta-item"><span class="label">Bölüm</span><span class="value">' + window.escapeHtml(episode) + '</span></div>' +
                    '<div class="dub-meta-item"><span class="label">Kalite</span><span class="value">' + window.escapeHtml(quality) + '</span></div>' +
                    '<div class="dub-meta-item"><span class="label">Tarih</span><span class="value">' + window.escapeHtml(date) + '</span></div>' +
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

        return (
          '<div class="season-accordion ' + (isOpen ? 'is-open' : '') + '" data-anime="' + aIdx + '" data-season="' + sIdx + '">' +
            '<button type="button" class="season-header glass-card" onclick="window.toggleDubSeason(' + aIdx + ', ' + sIdx + ')">' +
              '<div class="season-title-group">' +
                '<span class="season-icon"><i class="fa-solid fa-layer-group"></i></span>' +
                '<span class="season-name">' + window.escapeHtml(season.seasonTitle) + '</span>' +
              '</div>' +
              '<div class="season-meta-group">' +
                '<span class="season-count-badge">' + window.escapeHtml(epCountText) + '</span>' +
                '<span class="season-chevron"><i class="fa-solid fa-chevron-down"></i></span>' +
              '</div>' +
            '</button>' +
            '<div class="season-content">' +
              '<div class="season-content-inner dub-grid">' +
                episodesListHtml +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }).join("");

      return (
        '<div class="anime-group">' +
          '<div class="anime-header">' +
            '<h2 class="anime-title">' + window.escapeHtml(animeTitle) + '</h2>' +
            (animeDesc ? '<p class="anime-desc">' + window.escapeHtml(animeDesc) + '</p>' : '') +
          '</div>' +
          '<div class="seasons-list">' +
            seasonsHtml +
          '</div>' +
        '</div>'
      );
    }).join("");

    if (!hasAnyContent) {
      container.innerHTML = '<div class="placeholder-note glass-card"><i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:10px; display:block; color:var(--accent);"></i>Aradığınız kritere uygun dublaj projesi veya bölüm bulunamadı.</div>';
    } else {
      container.innerHTML = html;
    }
  }

  // Global toggle fonksiyonu
  window.toggleDubSeason = function (animeIdx, seasonIdx) {
    toggleSeason(animeIdx, seasonIdx);
  };

  // Arama dinleyicisi
  function initSearch() {
    var searchInput = document.getElementById("dub-search");
    var clearBtn = document.getElementById("search-clear");

    if (!searchInput) return;

    searchInput.addEventListener("input", function (e) {
      currentSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = currentSearchQuery.length > 0 ? "block" : "none";
      }
      renderDubs();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        currentSearchQuery = "";
        clearBtn.style.display = "none";
        renderDubs();
        searchInput.focus();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    renderDubs();
  });
})();
