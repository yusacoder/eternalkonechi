/* ==========================================================================
   dublaj.js — Dublajlarımız sayfası: Sezon ve Bölüm hazneleri (accordions) ve arama
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
              episodeNumber: 1,
              title: "1. Bölüm",
              description: "Hyoudou Issei, sıradan bir lise öğrencisiyken hayatı beklenmedik bir şekilde değişir ve şeytanlar dünyasına adım atar. Rias Gremory'nin hizmetkârı olarak yeni hayatına başlayan Issei'nin macerası burada başlıyor.",
              cover: "https://static.zerochan.net/Highschool.DxD.HERO.full.2281993.jpg",
              episodeCode: "01 / 12",
              date: "25.07.2026",
              team: "KoneHub Dublaj",
              sites: [
                {
                  siteName: "AnimeZer",
                  siteLogo: "https://animezer.com/icon.png?5d728f7f68b60a2e",
                  url: "https://animezer.com/anime/high-school-dxd/sezon-1/bolum-1",
                  quality: "1080p Türkçe Dublaj",
                  date: "25.07.2026",
                  team: "KoneHub Dublaj"
                },
                {
                  siteName: "AniHub",
                  siteLogo: "https://anihub.com.tr/icon.png",
                  url: "https://anihub.com.tr/high-school-dxd-izle-1-bolum-izle",
                  quality: "1080p Türkçe Dublaj",
                  date: "14.08.2026",
                  team: "KoneHub Dublaj"
                },
                    {
                  siteName: "RotaAnime",
                  siteLogo: "https://rotaani.me/_next/image?url=%2Flogo-rota.webp&w=96&q=75",
                  url: "https://rotaani.me/izle/high-school-dxd/1",
                  quality: "1080p Türkçe Dublaj",
                  date: "15.10.2026",
                  team: "KoneHub Dublaj"
                },
                {
                  siteName: "Animim",
                  siteLogo: "https://play-lh.googleusercontent.com/Ph0HtI57-oDxq897RYMu1X7jzlqBktAAFTdOA3ouRimYf2QAobiaILdV3VtJVAr53plWJ31669De-2kRICuEfw=s0-br30",
                  url: "https://animim.app/izle/6abe5f1b43dadacbb1c63e6b/1/1",
                  quality: "1080p Türkçe Dublaj",
                  date: "06.10.2026",
                  team: "KoneHub Dublaj"
                }
              ]
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
          seasonTitle: "Sezon 4",
          episodes: [
            /* Sezon 4 gelecekteki bölümler için hazır hazne */
          ]
        }
      ]
    }
  ];

  // Açık olan sezon ve bölüm durumlarını saklar
  var openSeasons = { "0-0": true };
  var openEpisodes = { "0-0-0": true };
  var currentSearchQuery = "";

  function toggleSeason(animeIndex, seasonIndex) {
    var key = animeIndex + "-" + seasonIndex;
    openSeasons[key] = !openSeasons[key];
    renderDubs();
  }

  function toggleEpisode(animeIndex, seasonIndex, epIndex) {
    var key = animeIndex + "-" + seasonIndex + "-" + epIndex;
    openEpisodes[key] = !openEpisodes[key];
    renderDubs();
  }

  function matchesQuery(ep, animeTitle, seasonTitle, query) {
    if (!query) return true;
    var q = query.toLowerCase().trim();

    if (animeTitle && animeTitle.toLowerCase().indexOf(q) !== -1) return true;
    if (seasonTitle && seasonTitle.toLowerCase().indexOf(q) !== -1) return true;

    var epFields = [
      ep.title,
      ep.description,
      ep.episodeCode,
      ep.date,
      ep.team
    ];

    for (var i = 0; i < epFields.length; i++) {
      if (epFields[i] && String(epFields[i]).toLowerCase().indexOf(q) !== -1) {
        return true;
      }
    }

    if (ep.sites && ep.sites.length > 0) {
      for (var j = 0; j < ep.sites.length; j++) {
        var site = ep.sites[j];
        if (
          (site.siteName && site.siteName.toLowerCase().indexOf(q) !== -1) ||
          (site.quality && site.quality.toLowerCase().indexOf(q) !== -1) ||
          (site.team && site.team.toLowerCase().indexOf(q) !== -1) ||
          (site.date && site.date.toLowerCase().indexOf(q) !== -1)
        ) {
          return true;
        }
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
          return matchesQuery(ep, animeTitle, season.seasonTitle, query);
        });

        // Arama yapılıyorsa ve bu sezonda eşleşme varsa hazneyi otomatik aç
        var isSeasonOpen = isSearching ? (filteredEpisodes.length > 0) : !!openSeasons[seasonKey];

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
          episodesListHtml = filteredEpisodes.map(function (ep, epIdx) {
            var epKey = aIdx + "-" + sIdx + "-" + epIdx;
            var isEpOpen = isSearching ? true : !!openEpisodes[epKey];

            var title = window.withPlaceholder(ep.title, "Bölüm " + (epIdx + 1));
            var description = window.withPlaceholder(ep.description, "");
            var cover = window.withPlaceholder(ep.cover || anime.cover, "");
            var episodeCode = window.withPlaceholder(ep.episodeCode, "-");
            var epDate = window.withPlaceholder(ep.date, "-");
            var epTeam = window.withPlaceholder(ep.team, "Eternal Production");
            var sites = ep.sites || [];

            var sitesHtml = "";
            if (sites.length === 0) {
              sitesHtml = '<p class="placeholder-note small">Bu bölüm için izleme seçeneği henüz eklenmedi.</p>';
            } else {
              sitesHtml = sites.map(function (site) {
                var siteName = window.withPlaceholder(site.siteName, "Platform");
                var siteLogo = window.withPlaceholder(site.siteLogo, "");
                var quality = window.withPlaceholder(site.quality, "1080p Dublaj");
                var date = window.withPlaceholder(site.date || epDate, "-");
                var team = window.withPlaceholder(site.team || epTeam, "KoneHub Dublaj");
                var url = site.url;
                var validUrl = window.isValidUrl(url);

                return (
                  '<a class="site-card-item glass-card' + (!validUrl ? ' disabled' : '') + '" ' +
                    (validUrl ? 'href="' + url + '" target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"') + '>' +
                    '<div class="site-card-left">' +
                      '<div class="site-logo-wrapper">' +
                        (siteLogo ? '<img class="site-logo-img" src="' + siteLogo + '" alt="' + window.escapeHtml(siteName) + '" loading="lazy" onerror="this.nextElementSibling.style.display=\'flex\'; this.style.display=\'none\';">' : '') +
                        '<div class="site-logo-fallback" ' + (siteLogo ? 'style="display:none;"' : '') + '><i class="fa-solid fa-play"></i></div>' +
                      '</div>' +
                      '<div class="site-info-group">' +
                        '<div class="site-name-row">' +
                          '<span class="site-name-title">' + window.escapeHtml(siteName) + '</span>' +
                          '<span class="site-badge quality">' + window.escapeHtml(quality) + '</span>' +
                        '</div>' +
                        '<div class="site-meta-sub">' +
                          '<span class="site-sub-item"><i class="fa-solid fa-users"></i> ' + window.escapeHtml(team) + '</span>' +
                          '<span class="site-sub-item"><i class="fa-regular fa-calendar"></i> ' + window.escapeHtml(date) + '</span>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="site-card-right">' +
                      (validUrl
                        ? '<span class="site-watch-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> İzle</span>'
                        : '<span class="site-watch-btn disabled">Yakında</span>') +
                    '</div>' +
                  '</a>'
                );
              }).join("");
            }

            return (
              '<article class="episode-accordion glass-card ' + (isEpOpen ? 'is-open' : '') + '" data-anime="' + aIdx + '" data-season="' + sIdx + '" data-episode="' + epIdx + '">' +
                '<button type="button" class="episode-header" onclick="window.toggleDubEpisode(' + aIdx + ', ' + sIdx + ', ' + epIdx + ')">' +
                  '<div class="episode-header-left">' +
                    (cover ? '<img class="episode-thumb" src="' + cover + '" alt="' + window.escapeHtml(title) + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
                    '<div class="episode-title-group">' +
                      '<div class="episode-top-meta">' +
                        '<span class="ep-code-badge">' + window.escapeHtml(episodeCode) + '</span>' +
                        '<span class="ep-sites-count"><i class="fa-solid fa-tv"></i> ' + sites.length + ' Platform</span>' +
                      '</div>' +
                      '<h3 class="episode-title">' + window.escapeHtml(title) + '</h3>' +
                    '</div>' +
                  '</div>' +
                  '<div class="episode-header-right">' +
                    '<span class="episode-chevron"><i class="fa-solid fa-chevron-down"></i></span>' +
                  '</div>' +
                '</button>' +
                '<div class="episode-content">' +
                  '<div class="episode-content-inner">' +
                    (description ? '<p class="episode-desc">' + window.escapeHtml(description) + '</p>' : '') +
                    '<div class="sites-section">' +
                      '<div class="sites-section-title"><i class="fa-solid fa-circle-play"></i> İzlemek İstediğiniz Platformu Seçin</div>' +
                      '<div class="sites-grid">' +
                        sitesHtml +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</article>'
            );
          }).join("");
        }

        return (
          '<div class="season-accordion ' + (isSeasonOpen ? 'is-open' : '') + '" data-anime="' + aIdx + '" data-season="' + sIdx + '">' +
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
              '<div class="season-content-inner episodes-list">' +
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

  // Global toggle fonksiyonları
  window.toggleDubSeason = function (animeIdx, seasonIdx) {
    toggleSeason(animeIdx, seasonIdx);
  };

  window.toggleDubEpisode = function (animeIdx, seasonIdx, epIdx) {
    toggleEpisode(animeIdx, seasonIdx, epIdx);
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
