# Konechiba Senpai — Resmi Web Sitesi & Dublaj Portalı 🎬

Eternal Production çatısı altında Türkçe anime dublaj sanatçısı ve içerik üreticisi **Konechiba Senpai** için hazırlanan resmi web sitesi deposudur.

Proje; modern **Glassmorphism (Cam Efekti)** tasarım diline, Kırmızı/Siyah tema paletine, dinamik bakım moduna, sezonsal dublaj haznelerine (accordion) ve gelişmiş arama işlevine sahiptir.

---

## 🌟 Öne Çıkan Özellikler

- **Bakım Modu (Maintenance Mode)**: `bakim.json` dosyası üzerinden tek bir ayarla siteyi bakım moduna alma veya açma.
- **Sezonlu Dublaj Hazneleri & Arama**: Dublaj projelerini Sezon 1, Sezon 2, Sezon 3, Sezon 4 vb. haznelerde toplama, tıklayınca açılıp kapanan akordeon yapısı ve canlı arama çubuğu.
- **Dinamik Sponsor Yönetimi**: `sponsor.json` üzerinden sponsor bilgilerini kolayca güncelleme.
- **Karanlık / Aydınlık Tema (Dark & Light Theme)**: Kullanıcı tercihine göre değişen temalar ve yumuşak geçişler.
- **Mobil / PWA Uyumlu Responsive Tasarım**: Mobil cihazlar, tabletler ve masaüstü ekranlar için optimize edilmiştir.

---

## 🛠 Proje Dosya Yapısı

```
.
├── index.html              # Ana sayfa (Profil ve Sosyal Medya Kartları)
├── dublaj.html             # Dublaj projeleri, Sezon Hazneleri ve Arama Çubuğu
├── sponsorlar.html         # Sponsorlarımız sayfası
├── bakim.json              # Bakım modu kontrol ve içerik dosyası
├── sponsor.json            # Sponsor verileri
├── css/
│   └── style.css           # Tasarım, tema değişkenleri, glassmorphism ve responsive stiller
├── js/
│   ├── common.js           # Tema seçici, mobil menü, loading screen ve Bakım Modu denetleyicisi
│   ├── home.js             # Ana sayfa sosyal medya verileri ve kart oluşturucu
│   ├── dublaj.js           # Sezon hazneleri, akordeon ve canlı arama mantığı
│   └── sponsor.js          # Sponsor verilerini yükleyen script
└── destek/
    └── konechiba.html      # Bağış ve destek sayfası
```

---

## ⚙️ Bakım Modu Kullanımı (`bakim.json`)

Siteyi bakıma almak veya bakım modundan çıkarmak için kök dizindeki `bakim.json` (veya `data/bakim.json`) dosyasındaki `"active"` anahtarını değiştirmeniz yeterlidir:

```json
{
  "active": true,
  "title": "Sitemiz Bakımdadır",
  "message": "Sizlere daha iyi bir deneyim sunabilmek için sitemizde güncelleme ve bakım çalışmaları yapılmaktadır. En kısa sürede tekrar yayındayız!",
  "estimated_time": "Kısa bir süre sonra",
  "contact_info": "konechibailetisim@gmail.com"
}
```

- `"active": true` ➔ Site genelinde şık cam efektli bakım ekranı açılır, içerikler gizlenir.
- `"active": false` ➔ Site normal şekilde yayın yapmaya devam eder.

---

## 🎬 Yeni Dublaj & Sezon Ekleme (`js/dublaj.js`)

Dublaj projelerine yeni bir bölüm veya sezon eklemek için `js/dublaj.js` içindeki `DUBS_DATA` dizisine veri ekleyebilirsiniz:

```javascript
var DUBS_DATA = [
  {
    animeId: "high-school-dxd",
    animeTitle: "High School DxD Türkçe Dublaj",
    animeDescription: "Hyoudou Issei'nin maceraları...",
    seasons: [
      {
        seasonNumber: 1,
        seasonTitle: "Sezon 1",
        episodes: [
          {
            title: "High School DxD 1. Bölüm",
            description: "Bölüm açıklaması...",
            cover: "Görsel URL",
            siteLogo: "Logo URL",
            siteName: "AnimeZer",
            url: "https://animezer.com/...",
            episode: "01 / 12",
            quality: "1080p Türkçe Dublaj",
            date: "25.07.2026",
            team: "KoneHub Dublaj"
          }
        ]
      },
      {
        seasonNumber: 2,
        seasonTitle: "Sezon 2 (New)",
        episodes: []
      }
    ]
  }
];
```

---

## 🚀 Yerel Olarak Çalıştırma (Local Development)

Proje statik HTML/CSS/JS teknolojileriyle geliştirilmiştir. JSON dosyalarının HTTP protokolü üzerinden rahatça okunabilmesi için yerel bir sunucu çalıştırmanız önerilir:

### Python3 ile:
```bash
python3 -m http.server 8000
```

### Node.js (npx) ile:
```bash
npx serve .
```

Tarayıcınızda `http://localhost:8000` adresine giderek siteyi inceleyebilirsiniz.

---

## 📄 Lisans & Telif

© 2026 **Konechiba Senpai** | Powered by **Eternal Production**
All rights reserved. Made with ❤️ for the Anime Community.
