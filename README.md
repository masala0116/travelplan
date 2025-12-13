# 🗾 Japan Trip 2026 - Travel Planner

A mobile-first travel planning web app with Japanese Minimal Light theme design.

## ✨ Features

- **📅 行程 (Itinerary)** - Day-by-day itinerary with timeline view and hero image cards
- **📆 橫向日曆** - Horizontal calendar date selector with weekday labels
- **🌤️ 天氣預報** - Real-time weather from OpenWeatherMap API with hourly forecast
- **📍 導航按鈕** - One-tap Google Maps navigation
- **ℹ️ 資訊 (Info)** - Flights, hotels, emergency contacts
- **💰 記帳 (Budget)** - Expense tracker with JPY↔TWD conversion
- **📖 攻略 (Guide)** - Attraction guides including Tokyo, Kawaguchiko & Karuizawa spots

## 🎨 Design

**Japanese Minimal Light Theme** (日式極簡風)
- Warm white background (#FAF8F5)
- Soft pink accent color (#E8B4B8)
- Hero image cards with overlay text
- Horizontal scrolling hourly weather forecast
- Color-coded cards: Attractions (teal), Restaurants (coral), Transport (blue)

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/peterhu/travelplan.git
cd travelplan

# Serve locally (requires Node.js)
npx serve

# Open http://localhost:3000
```

## 📁 Project Structure

```
travelplan/
├── index.html          # Main HTML
├── css/
│   └── styles.css      # Japanese Minimal Light theme
├── js/
│   ├── data.js         # Trip data (itinerary, hotels, guides)
│   ├── weather.js      # OpenWeatherMap API integration
│   └── app.js          # Main application logic
└── README.md
```

## 🌐 Deploy to GitHub Pages

1. Push code to GitHub
2. Go to **Settings → Pages**
3. Select **Branch: main**, folder: **/ (root)**
4. Save and wait for deployment
5. Access at `https://peterhu.github.io/travelplan/`

## 📱 Screenshots

| Itinerary | Info | Budget |
|-----------|------|--------|
| Hero card + horizontal calendar | Flight & hotel info | Expense calculator |

## 🗺️ Guides Included

- 🏯 新倉山淺間公園 (Arakurayama)
- 🍜 河口湖美食攻略
- 🎨 teamLab 參觀攻略
- 🛍️ 輕井澤王子購物廣場
- 🏘️ 舊輕井澤銀座通
- 🌲 榆樹街小鎮 (Harunire Terrace)
- ⛪ 輕井澤高原教會
- 🦢 雲場池 (Kumoba Pond)

## 🔑 API Keys

- **Weather**: OpenWeatherMap (free tier, 1000 calls/day)
- **Navigation**: Uses Google Maps URL (no API key required)

## 📄 License

MIT License