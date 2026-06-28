# 💳 FinApp

> Şəxsi maliyyə idarəetmə paneli — React + Vite + Tailwind CSS ilə qurulmuş müasir fintech tətbiqi.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter)

---

## 📸 Səhifələr

| Səhifə | Təsvir |
|---|---|
| `/login` | İstifadəçi girişi |
| `/register` | Qeydiyyat |
| `/dashboard` | Ana panel — statistika və sürətli keçidlər |
| `/dashboard/cards` | Bank kartlarını idarə et |
| `/dashboard/clients` | Təsadüfi müştəri məlumatı |
| `/dashboard/contact` | Əlaqə formu |

---

## ✨ Xüsusiyyətlər

- 🔐 **Auth sistemi** — Qeydiyyat, giriş, çıxış (`localStorage` əsaslı)
- 🛡️ **Qorunan route-lar** — Login olmadan dashboard-a girmək mümkün deyil
- 💳 **Kart idarəetməsi** — Kart əlavə et, sil, balansı gör
- 👤 **Müştəri fetch** — Async mock API ilə təsadüfi müştəri məlumatı
- 📬 **Əlaqə formu** — Validasiyalı, state-li form
- 📱 **Responsive dizayn** — Mobil sidebar + desktop layout
- 🎨 **Dark theme** — Müasir fintech görünüşü

---

## 🚀 Başlamaq

### Tələblər

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Qurulum

```bash
# Layihəni klonla
git clone <repo-url>
cd React-Project

# Paketləri quraşdır
npm install

# Development server-i işə sal
npm run dev
```

Brauzerini aç: **http://localhost:5173**

### Build

```bash
# Production üçün build et
npm run build

# Build-i önizlə
npm run preview
```

---

## 📁 Layihə Strukturu

```
src/
├── assets/
│   └── index.css          # Tailwind + custom utilities
├── Components/
│   ├── FetchClients.js    # Mock async API
│   └── Layout.jsx         # Sidebar + responsive layout
├── context/
│   └── AuthContext.jsx    # Auth state (login/register/logout)
├── pages/
│   ├── LoginPage.jsx      # Giriş səhifəsi
│   ├── RegisterPage.jsx   # Qeydiyyat səhifəsi
│   ├── DashboardHome.jsx  # Ana panel
│   ├── CardsPage.jsx      # Kart idarəetməsi
│   ├── ClientsPage.jsx    # Müştəri məlumatları
│   └── ContactPage.jsx    # Əlaqə formu
└── App.jsx                # Routing + AuthProvider
```

---

## 🛠️ İstifadə edilən texnologiyalar

| Texnologiya | Versiya | Məqsəd |
|---|---|---|
| [React](https://react.dev) | 18 | UI framework |
| [Vite](https://vitejs.dev) | 5 | Build tool + dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Stilləmə |
| [React Router](https://reactrouter.com) | 6 | Client-side routing |

---

## 🔑 Test üçün

Qeydiyyatdan keçmək üçün `/register` səhifəsinə get, istənilən email və şifrə ilə hesab yarat. Məlumatlar `localStorage`-da saxlanılır.

---

## 📝 Lisenziya

MIT © 2025
