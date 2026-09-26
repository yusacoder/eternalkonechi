/* ==========================================================================
   home.js — Ana sayfa: profil + sosyal medya kartları
   Veriler doğrudan burada tanımlı (fetch yok, dosya olarak da çalışır).
   ========================================================================== */

(function () {
  "use strict";

  var DATA = {
    name: "Konechiba Senpai",
    logo: "https://photograph.eternalproduction.net/konechiba-senpai-logo.jpg",
    bio: "Merhaba! Ben Konechiba Senpai. High School DxD içerikleri, karakter analizleri, haberler ve eğlenceli paylaşımlar için doğru yerdesin. Sosyal medya hesaplarımdan beni takip etmeyi unutma! ✨",
    socials: [
      { name: "Instagram", username: "Konechiba Senpai Instagram", url: "https://www.instagram.com/konechiba._.senpai", icon: "instagram" },
      { name: "Instagram", username: "Ohayo Senpai Instagram", url: "https://www.instagram.com/ohayo._.senpai", icon: "instagram" },
      { name: "Instagram", username: "Chibi Senpai Instagram", url: "https://www.instagram.com/chibi._.senpai", icon: "instagram" },
      { name: "Instagram", username: "Konehub Instagram", url: "https://www.instagram.com/konehub_", icon: "instagram" },
      { name: "Instagram", username: "Konecistan Instagram", url: "https://www.instagram.com/konecistan", icon: "instagram" },
      { name: "Instagram", username: "Konezaki Instagram", url: "https://www.instagram.com/konezakisenpai", icon: "instagram" },
      { name: "Instagram", username: "Tsuki Senpai Instagram", url: "https://www.instagram.com/tsuki.__.senpai", icon: "instagram" },
      { name: "WhatsApp", username: "DxD sticker arşivi wp", url: "https://whatsapp.com/channel/0029VbDcR6mIN9iugkEYZo1Y", icon: "whatsapp" },
      { name: "TikTok", username: "Konechiba Senpai TikTok", url: "https://www.tiktok.com/@_konechiba._.senpai_", icon: "tiktok" },
      { name: "TikTok", username: "Ohayo Senpai TikTok", url: "https://www.tiktok.com/@ohayo._.senpai", icon: "tiktok" },
      { name: "YouTube", username: "Konechiba Senpai YouTube", url: "https://youtube.com/konechiba-senpai", icon: "youtube" },
      { name: "YouTube", username: "Ohayo Senpai YouTube", url: "https://www.youtube.com/@ohayosenpai666", icon: "youtube" },
      { name: "Pinterest", username: "Konechiba Senpai Pinterest", url: "https://tr.pinterest.com/konechiba_senpai/", icon: "pinterest" },
      { name: "Spotify", username: "Konechiba Senpai Spotify", url: "https://open.spotify.com/user/313xx55ztcjseth37xnml6eongry?si=SDeHvk4TRK-GlsyqxduwoA&utm_source=copy-link&nd=1&dlsi=c78b979b3a4e40b8", icon: "spotify" },
      { name: "Email", username: "Konechiba Senpai Email", url: "mailto:konechibailetisim@gmail.com", icon: "email" },
      { name: "Kick", username: "Konechiba Senpai Kick", url: "https://kick.com/konechiba_senpai", icon: "kick" }
    ]
  };

  var ICON_MAP = {
    instagram: "fa-brands fa-instagram",
    tiktok: "fa-brands fa-tiktok",
    threads: "fa-brands fa-threads",
    x: "fa-brands fa-x-twitter",
    twitter: "fa-brands fa-x-twitter",
    facebook: "fa-brands fa-facebook",
    youtube: "fa-brands fa-youtube",
    discord: "fa-brands fa-discord",
    github: "fa-brands fa-github",
    linkedin: "fa-brands fa-linkedin",
    steam: "fa-brands fa-steam",
    telegram: "fa-brands fa-telegram",
    reddit: "fa-brands fa-reddit",
    pinterest: "fa-brands fa-pinterest",
    spotify: "fa-brands fa-spotify",
    twitch: "fa-brands fa-twitch",
    patreon: "fa-brands fa-patreon",
    "ko-fi": "fa-solid fa-mug-hot",
    kofi: "fa-solid fa-mug-hot",
    soundcloud: "fa-brands fa-soundcloud",
    website: "fa-solid fa-globe",
    email: "fa-solid fa-envelope",
    kick: "fa-solid fa-bolt",
    bluesky: "fa-brands fa-bluesky",
    tumblr: "fa-brands fa-tumblr",
    whatsapp: "fa-brands fa-whatsapp"
  };

  function iconMarkup(social) {
    var icon = (social.icon || social.name || "").toString().trim();
    var lower = icon.toLowerCase();

    var looksLikeImage = /^https?:\/\//i.test(icon) || /\.(svg|png|jpg|jpeg|webp)$/i.test(icon);
    if (looksLikeImage) {
      return '<img src="' + icon + '" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'<i class=&quot;fa-solid fa-link&quot;></i>\'">';
    }

    var faClass = ICON_MAP[lower] || ICON_MAP[(social.name || "").toLowerCase()] || "fa-solid fa-link";
    return '<i class="' + faClass + '"></i>';
  }

  function renderHero() {
    var logoEl = document.getElementById("hero-logo");
    var nameEl = document.getElementById("hero-name");
    var bioEl = document.getElementById("hero-bio");

    var name = window.withPlaceholder(DATA.name, "Konechiba Senpai");
    var bio = window.withPlaceholder(DATA.bio, "Bio yakında eklenecek.");
    var logo = window.withPlaceholder(DATA.logo, "");

    if (nameEl) {
      var verifiedText = "Bu kullanıcı Eternal Yetenek Ajansı tarafından doğrulanmıştır.";
      nameEl.innerHTML =
        '<span>' + window.escapeHtml(name) + '</span> ' +
        '<span class="verified-badge" id="verified-badge" tabindex="0" role="button" aria-label="' + window.escapeHtml(verifiedText) + '">' +
          '<i class="fa-solid fa-circle-check"></i>' +
          '<span class="badge-tooltip">' + window.escapeHtml(verifiedText) + '</span>' +
        '</span>';

      document.title = name;

      var badgeEl = document.getElementById("verified-badge");
      if (badgeEl) {
        badgeEl.addEventListener("click", function (e) {
          e.stopPropagation();
          badgeEl.classList.toggle("active");
          if (window.showToast) {
            window.showToast(verifiedText, "success");
          }
        });
      }
    }
    if (bioEl) bioEl.textContent = bio;
    if (logoEl) {
      if (logo) {
        logoEl.src = logo;
        logoEl.style.visibility = "visible";
      } else {
        logoEl.style.visibility = "hidden";
      }
    }
  }

  function renderSocials() {
    var grid = document.getElementById("social-grid");
    if (!grid) return;

    var socials = DATA.socials;
    if (!Array.isArray(socials) || socials.length === 0) {
      grid.innerHTML = '<p class="placeholder-note">Henüz sosyal medya hesabı eklenmemiş.</p>';
      return;
    }

    grid.innerHTML = socials.map(function (social, index) {
      var url = social.url;
      var validUrl = window.isValidUrl(url);
      var username = window.withPlaceholder(social.username, "@kullaniciadi");
      var platform = window.withPlaceholder(social.name, "Platform");
      var delay = (index * 0.05).toFixed(2);

      return (
        '<a class="social-card glass-card" style="animation-delay:' + delay + 's" ' +
        (validUrl ? 'href="' + url + '" target="_blank" rel="noopener noreferrer"' : 'href="javascript:void(0)" aria-disabled="true"') +
        '>' +
          '<span class="social-icon">' + iconMarkup(social) + '</span>' +
          '<span class="social-text">' +
            '<span class="social-username">' + window.escapeHtml(username) + '</span>' +
            '<span class="social-platform">' + window.escapeHtml(platform) + '</span>' +
          '</span>' +
          '<span class="social-arrow">&#8250;</span>' +
        '</a>'
      );
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHero();
    renderSocials();
  });
})();
