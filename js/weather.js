// ============================================
// Japan Trip 2026 - 天氣 API (Open-Meteo)
// ============================================

const WeatherAPI = {
  // Open-Meteo API (免費，無需 API key)
  baseUrl: 'https://api.open-meteo.com/v1/forecast',

  // 地點座標
  locations: {
    'Tokyo': { lat: 35.6762, lon: 139.6503, nameZh: '東京' },
    'Kawaguchiko': { lat: 35.5162, lon: 138.7523, nameZh: '河口湖・富士山' },
    'Karuizawa': { lat: 36.3489, lon: 138.6361, nameZh: '輕井澤' }
  },

  // WMO 天氣代碼對應圖示
  weatherIcons: {
    0: '☀️',   // Clear sky
    1: '🌤️',   // Mainly clear
    2: '⛅',   // Partly cloudy
    3: '☁️',   // Overcast
    45: '🌫️',  // Fog
    48: '🌫️',  // Depositing rime fog
    51: '🌧️',  // Light drizzle
    53: '🌧️',  // Moderate drizzle
    55: '🌧️',  // Dense drizzle
    61: '🌧️',  // Slight rain
    63: '🌧️',  // Moderate rain
    65: '🌧️',  // Heavy rain
    71: '🌨️',  // Slight snow
    73: '🌨️',  // Moderate snow
    75: '❄️',  // Heavy snow
    77: '❄️',  // Snow grains
    80: '🌦️',  // Slight rain showers
    81: '🌦️',  // Moderate rain showers
    82: '🌧️',  // Violent rain showers
    85: '🌨️',  // Slight snow showers
    86: '❄️',  // Heavy snow showers
    95: '⛈️',  // Thunderstorm
    96: '⛈️',  // Thunderstorm with hail
    99: '⛈️'   // Thunderstorm with heavy hail
  },

  // WMO 天氣描述
  weatherDescriptions: {
    0: '晴朗', 1: '大致晴朗', 2: '多雲', 3: '陰天',
    45: '霧', 48: '霧',
    51: '小雨', 53: '中雨', 55: '大雨',
    61: '小雨', 63: '中雨', 65: '大雨',
    71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒',
    80: '陣雨', 81: '陣雨', 82: '大陣雨',
    85: '小雪', 86: '大雪',
    95: '雷暴', 96: '雷暴', 99: '雷暴'
  },

  // 取得天氣資料
  async getWeather(location) {
    const loc = this.locations[location];
    if (!loc) {
      console.error('Unknown location:', location);
      return this.getMockWeather(location);
    }

    try {
      const url = `${this.baseUrl}?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&timezone=Asia/Tokyo&forecast_days=1`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return this.formatWeatherData(data, loc.nameZh);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      return this.getMockWeather(location);
    }
  },

  // 格式化天氣資料
  formatWeatherData(data, locationName) {
    const current = data.current;
    const hourlyData = data.hourly;
    const weatherCode = current.weather_code;
    const icon = this.weatherIcons[weatherCode] || '🌤️';
    const temp = Math.round(current.temperature_2m);
    
    // 取得未來 5 小時的預報
    const currentHour = new Date().getHours();
    const hourly = [];
    for (let i = 0; i < 5; i++) {
      const hourIndex = currentHour + i;
      if (hourIndex < hourlyData.time.length) {
        const hourCode = hourlyData.weather_code[hourIndex];
        hourly.push({
          time: i === 0 ? '現在' : `+${i}h`,
          icon: this.weatherIcons[hourCode] || '🌤️',
          temp: Math.round(hourlyData.temperature_2m[hourIndex])
        });
      }
    }
    
    return {
      location: locationName,
      temp: temp,
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      icon: icon,
      description: this.weatherDescriptions[weatherCode] || '晴朗',
      warning: this.getWeatherWarning(temp, weatherCode),
      hourly: hourly
    };
  },

  // 取得天氣警告
  getWeatherWarning(temp, weatherCode) {
    const warnings = [];
    
    // 低溫警告
    if (temp < 5) {
      warnings.push('低溫注意，請穿著保暖');
    }
    
    // 下雪警告
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
      warnings.push('山區可能有積雪，請注意路況');
    }
    
    // 雨天警告
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      warnings.push('有雨，請攜帶雨具');
    }
    
    // 雷暴警告
    if ([95, 96, 99].includes(weatherCode)) {
      warnings.push('有雷暴，請避免戶外活動');
    }

    return warnings.length > 0 ? warnings[0] : null;
  },

  // 模擬天氣資料 (API 無法連線時使用)
  getMockWeather(location) {
    const mockData = {
      'Tokyo': {
        location: '東京',
        temp: 8,
        feelsLike: 5,
        humidity: 50,
        windSpeed: 15,
        icon: '⛅',
        description: '多雲',
        warning: null,
        hourly: [
          { time: '現在', icon: '⛅', temp: 8 },
          { time: '01:00', icon: '☁️', temp: 7 },
          { time: '02:00', icon: '☁️', temp: 7 },
          { time: '03:00', icon: '☁️', temp: 6 },
          { time: '04:00', icon: '☀️', temp: 6 }
        ]
      },
      'Kawaguchiko': {
        location: '河口湖・富士山',
        temp: 2,
        feelsLike: -2,
        humidity: 45,
        windSpeed: 12,
        icon: '☀️',
        description: '晴朗',
        warning: '山區可能有積雪，請注意路況',
        hourly: [
          { time: '現在', icon: '☀️', temp: 2 },
          { time: '01:00', icon: '☀️', temp: 1 },
          { time: '02:00', icon: '⛅', temp: 0 },
          { time: '03:00', icon: '⛅', temp: 0 },
          { time: '04:00', icon: '☀️', temp: 1 }
        ]
      },
      'Karuizawa': {
        location: '輕井澤',
        temp: -3,
        feelsLike: -8,
        humidity: 60,
        windSpeed: 18,
        icon: '🌨️',
        description: '小雪',
        warning: '低溫注意，請穿著保暖',
        hourly: [
          { time: '現在', icon: '🌨️', temp: -3 },
          { time: '01:00', icon: '🌨️', temp: -4 },
          { time: '02:00', icon: '❄️', temp: -5 },
          { time: '03:00', icon: '❄️', temp: -5 },
          { time: '04:00', icon: '⛅', temp: -4 }
        ]
      }
    };

    return mockData[location] || mockData['Tokyo'];
  },

  // 渲染天氣卡片 HTML - 日式簡約風格
  renderWeatherCard(weather) {
    if (!weather) {
      return `
        <div class="weather-card">
          <div class="weather-header">
            <div>
              <div class="weather-location">載入天氣中...</div>
            </div>
          </div>
        </div>
      `;
    }

    // 每小時預報
    const hourlyHtml = weather.hourly ? weather.hourly.map(h => `
      <div class="weather-hour">
        <div class="weather-time">${h.time}</div>
        <div class="weather-icon">${h.icon}</div>
        <div class="weather-hour-temp">${h.temp}°</div>
      </div>
    `).join('') : '';

    const warningHtml = weather.warning 
      ? `<div class="weather-warning">⚠️ ${weather.warning}</div>`
      : '';

    return `
      <div class="weather-card">
        <div class="weather-header">
          <div>
            <div class="weather-location">${weather.location}</div>
            <div class="weather-subtitle">未來 24 小時預報</div>
          </div>
          <div class="weather-credit">Open-Meteo</div>
        </div>
        <div class="weather-forecast">
          ${hourlyHtml || `
            <div class="weather-hour">
              <div class="weather-time">現在</div>
              <div class="weather-icon">${weather.icon}</div>
              <div class="weather-hour-temp">${weather.temp}°</div>
            </div>
          `}
        </div>
        ${warningHtml}
      </div>
    `;
  }
};

// 導出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeatherAPI;
}
