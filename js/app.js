// ============================================
// Japan Trip 2026 - 主應用程式
// ============================================

const App = {
  // 狀態
  state: {
    currentTab: 'itinerary',
    currentDay: 1,
    expenses: [],
    calcValue: '0',
    selectedCategory: 'food',
    settings: {
      exchangeRate: 0.215,
      budget: 200000
    }
  },

  // 初始化
  init() {
    this.loadState();
    this.bindEvents();
    this.renderAll();
    this.loadWeather();
  },

  // 載入狀態
  loadState() {
    try {
      const saved = localStorage.getItem('tripState');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.expenses = parsed.expenses || [];
        this.state.settings = { ...this.state.settings, ...parsed.settings };
      }
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  },

  // 儲存狀態
  saveState() {
    try {
      localStorage.setItem('tripState', JSON.stringify({
        expenses: this.state.expenses,
        settings: this.state.settings
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  // 綁定事件
  bindEvents() {
    // Tab 切換
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchTab(btn.dataset.tab);
      });
    });

    // Day 選擇
    document.getElementById('prevDay')?.addEventListener('click', () => {
      if (this.state.currentDay > 1) {
        this.selectDay(this.state.currentDay - 1);
      }
    });

    document.getElementById('nextDay')?.addEventListener('click', () => {
      if (this.state.currentDay < TRIP_DATA.itinerary.length) {
        this.selectDay(this.state.currentDay + 1);
      }
    });

    // 計算機按鈕
    document.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleCalcInput(btn.dataset.value);
      });
    });

    // 記帳按鈕
    document.getElementById('addExpenseBtn')?.addEventListener('click', () => {
      this.addExpense();
    });

    // 分類選擇
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectCategory(btn.dataset.category);
      });
    });

    // 設定按鈕
    document.getElementById('settingsBtn')?.addEventListener('click', () => {
      this.openSettings();
    });

    // Modal 關閉
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeModals();
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModals();
        }
      });
    });

    // 設定儲存
    document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
      this.saveSettings();
    });
  },

  // 切換 Tab
  switchTab(tab) {
    this.state.currentTab = tab;

    // 更新 Tab 按鈕樣式
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // 更新內容
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tab}Tab`);
    });
  },

  // 選擇日期
  selectDay(day) {
    this.state.currentDay = day;
    this.renderDaySelector();
    this.renderItinerary();
    this.loadWeather();
  },

  // 載入天氣
  async loadWeather() {
    const dayData = TRIP_DATA.itinerary[this.state.currentDay - 1];
    if (!dayData) return;

    const weatherContainer = document.getElementById('weatherCard');
    if (!weatherContainer) return;

    // 顯示載入中
    weatherContainer.innerHTML = WeatherAPI.renderWeatherCard(null);

    // 取得天氣
    const weather = await WeatherAPI.getWeather(dayData.location);
    weatherContainer.innerHTML = WeatherAPI.renderWeatherCard(weather);
  },

  // 渲染全部
  renderAll() {
    this.renderDaySelector();
    this.renderItinerary();
    this.renderInfo();
    this.renderBudget();
    this.renderGuides();
  },

  // 渲染日期選擇器 - 橫向日曆樣式
  renderDaySelector() {
    const container = document.getElementById('dayChips');
    if (!container) return;

    // 取得星期幾的縮寫
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const html = TRIP_DATA.itinerary.map(day => {
      const date = new Date(day.date);
      const weekday = weekdays[date.getDay()];
      const dayNum = date.getDate();
      
      return `
        <button class="day-chip ${day.day === this.state.currentDay ? 'active' : ''}" 
                onclick="App.selectDay(${day.day})">
          <span class="day-chip-label">${weekday}</span>
          <span class="day-chip-date">${dayNum}</span>
        </button>
      `;
    }).join('');

    container.innerHTML = html;

    // 更新導航按鈕狀態
    const prevBtn = document.getElementById('prevDay');
    const nextBtn = document.getElementById('nextDay');
    if (prevBtn) prevBtn.disabled = this.state.currentDay <= 1;
    if (nextBtn) nextBtn.disabled = this.state.currentDay >= TRIP_DATA.itinerary.length;
  },

  // 渲染行程
  renderItinerary() {
    const dayData = TRIP_DATA.itinerary[this.state.currentDay - 1];
    if (!dayData) return;

    // 更新 Day Indicator (第一天, 第二天...)
    const dayIndicatorEl = document.getElementById('dayIndicatorNum');
    if (dayIndicatorEl) {
      const dayNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
      dayIndicatorEl.textContent = `第${dayNums[dayData.day - 1] || dayData.day}天`;
    }

    // 更新 Hero Card
    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
      const heroImages = {
        1: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', // Tokyo
        2: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80', // Tokyo 2
        3: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', // Tokyo 3
        4: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', // Kyoto
        5: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', // Japan
        6: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80', // Mt Fuji
        7: 'https://images.unsplash.com/photo-1576675784201-0e142b423952?w=800&q=80', // Karuizawa
        8: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80', // Tokyo night
        9: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=800&q=80', // Shibuya
        10: 'https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=800&q=80' // Airport
      };
      const imgUrl = heroImages[dayData.day] || heroImages[1];
      heroCard.innerHTML = `
        <img src="${imgUrl}" alt="${dayData.location}" class="hero-image">
        <div class="hero-overlay">
          <div class="hero-day-badge">DAY ${dayData.day} 📍 ${dayData.location}</div>
          <h2 class="hero-title">${dayData.title}</h2>
        </div>
      `;
    }

    // 更新標題
    const titleEl = document.getElementById('dayTitle');
    const subtitleEl = document.getElementById('daySubtitle');
    if (titleEl) titleEl.textContent = `Day ${dayData.day} · ${dayData.dateDisplay}`;
    if (subtitleEl) subtitleEl.textContent = dayData.title;

    // 渲染時間軸
    const timelineEl = document.getElementById('timeline');
    if (!timelineEl) return;

    const html = dayData.events.map(event => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${event.time}</div>
        <div class="event-card ${event.type}">
          <div class="card-header">
            <span class="card-icon">${event.icon}</span>
            <span class="card-type">${this.getTypeName(event.type)}</span>
          </div>
          <div class="card-title">${event.title}</div>
          ${event.subtitle ? `<div class="card-subtitle">${event.subtitle}</div>` : ''}
          ${event.description ? `<div class="card-description">${event.description}</div>` : ''}
          ${this.renderTags(event.tags)}
          ${event.location ? `
            <button class="nav-button" onclick="App.navigateTo('${event.location.replace(/'/g, "\\'")}')">
              📍 導航至此處 →
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    timelineEl.innerHTML = html;
  },

  // 取得類型名稱
  getTypeName(type) {
    const names = {
      attraction: '景點',
      restaurant: '餐廳',
      transport: '交通',
      hotel: '住宿',
      shopping: '購物',
      activity: '活動'
    };
    return names[type] || type;
  },

  // 渲染標籤
  renderTags(tags) {
    if (!tags || tags.length === 0) return '';

    const tagHtml = tags.map(tag => {
      const className = `tag tag-${tag.type}`;
      return `<span class="${className}">${tag.text}</span>`;
    }).join('');

    return `<div class="tags">${tagHtml}</div>`;
  },

  // 導航至地點
  navigateTo(location) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}&travelmode=driving`;
    window.open(url, '_blank');
  },

  // 渲染資訊頁
  renderInfo() {
    // 航班資訊
    const flightsEl = document.getElementById('flightInfo');
    if (flightsEl) {
      const { outbound, inbound } = TRIP_DATA.flights;
      flightsEl.innerHTML = `
        <div class="info-card">
          <div style="margin-bottom: 16px;">
            <div class="flight-code">🛫 去程 ${outbound.code}</div>
            <div class="flight-route">
              ${outbound.from} ${outbound.departTime}
              <span class="flight-arrow">→</span>
              ${outbound.to} ${outbound.arriveTime}
            </div>
            <div class="flight-details">${outbound.dateDisplay} │ ${outbound.airline}</div>
          </div>
          <div>
            <div class="flight-code">🛬 回程 ${inbound.code}</div>
            <div class="flight-route">
              ${inbound.from} ${inbound.departTime}
              <span class="flight-arrow">→</span>
              ${inbound.to} ${inbound.arriveTime}
            </div>
            <div class="flight-details">${inbound.dateDisplay} │ ${inbound.airline}</div>
          </div>
        </div>
      `;
    }

    // 住宿資訊
    const hotelsEl = document.getElementById('hotelInfo');
    if (hotelsEl) {
      const html = TRIP_DATA.hotels.map(hotel => `
        <div class="hotel-item">
          <div class="hotel-days">${hotel.days}</div>
          <div class="hotel-name">${hotel.name}</div>
          <div class="hotel-address">📍 ${hotel.address}</div>
          ${hotel.phone ? `<div class="hotel-phone">📞 ${hotel.phone}</div>` : ''}
          ${hotel.note ? `<div class="hotel-phone">ℹ️ ${hotel.note}</div>` : ''}
          <button class="nav-button mt-sm" onclick="App.navigateTo('${hotel.location.replace(/'/g, "\\'")}')">
            📍 導航至飯店
          </button>
        </div>
      `).join('');

      hotelsEl.innerHTML = `<div class="info-card">${html}</div>`;
    }

    // 緊急電話
    const emergencyEl = document.getElementById('emergencyInfo');
    if (emergencyEl) {
      const { emergency } = TRIP_DATA;
      const sections = [
        { title: '🚨 日本緊急電話', items: emergency.japan },
        { title: '🏥 旅遊求助', items: emergency.travel },
        { title: '💳 信用卡掛失', items: emergency.creditCard },
        { title: '🚗 租車公司', items: emergency.rental }
      ];

      const html = sections.map(section => `
        <div class="emergency-category">
          <div class="emergency-title">${section.title}</div>
          ${section.items.map(item => `
            <div class="emergency-item">
              <span>${item.name}</span>
              <a href="tel:${item.number}" class="emergency-number">${item.number}</a>
            </div>
          `).join('')}
        </div>
      `).join('');

      emergencyEl.innerHTML = `<div class="info-card"><div class="emergency-list">${html}</div></div>`;
    }
  },

  // 渲染預算頁
  renderBudget() {
    const { budget, exchangeRate } = this.state.settings;
    const totalSpent = this.state.expenses.reduce((sum, e) => sum + e.amount, 0);
    const remaining = budget - totalSpent;
    const percentage = Math.min((totalSpent / budget) * 100, 100);

    // 預算總覽
    const overviewEl = document.getElementById('budgetOverview');
    if (overviewEl) {
      overviewEl.innerHTML = `
        <div class="budget-total-label">預算總額</div>
        <div class="budget-total">¥ ${budget.toLocaleString()}</div>
        <div class="budget-progress">
          <div class="budget-progress-bar" style="width: ${percentage}%"></div>
        </div>
        <div class="budget-stats">
          <div class="budget-spent">已花費 ¥ ${totalSpent.toLocaleString()}</div>
          <div class="budget-remaining">剩餘 ¥ ${remaining.toLocaleString()}</div>
        </div>
      `;
    }

    // 計算機顯示
    this.updateCalcDisplay();

    // 消費列表
    this.renderExpenseList();
  },

  // 更新計算機顯示
  updateCalcDisplay() {
    const amountEl = document.getElementById('calcAmount');
    const convertedEl = document.getElementById('calcConverted');
    
    if (amountEl) {
      const value = parseInt(this.state.calcValue) || 0;
      amountEl.textContent = `¥ ${value.toLocaleString()}`;
    }
    
    if (convertedEl) {
      const value = parseInt(this.state.calcValue) || 0;
      const twd = Math.round(value * this.state.settings.exchangeRate);
      convertedEl.textContent = `≈ NT$ ${twd.toLocaleString()}`;
    }
  },

  // 處理計算機輸入
  handleCalcInput(value) {
    switch (value) {
      case 'C':
        this.state.calcValue = '0';
        break;
      case 'DEL':
        this.state.calcValue = this.state.calcValue.length > 1 
          ? this.state.calcValue.slice(0, -1) 
          : '0';
        break;
      default:
        if (this.state.calcValue === '0') {
          this.state.calcValue = value;
        } else if (this.state.calcValue.length < 10) {
          this.state.calcValue += value;
        }
    }
    this.updateCalcDisplay();
  },

  // 選擇分類
  selectCategory(category) {
    this.state.selectedCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
  },

  // 新增消費
  addExpense() {
    const amount = parseInt(this.state.calcValue) || 0;
    if (amount <= 0) return;

    const category = EXPENSE_CATEGORIES.find(c => c.id === this.state.selectedCategory);
    const noteInput = document.getElementById('expenseNote');
    const note = noteInput ? noteInput.value.trim() : '';
    
    this.state.expenses.push({
      id: Date.now(),
      amount: amount,
      category: this.state.selectedCategory,
      categoryIcon: category?.icon || '📦',
      categoryName: category?.name || '其他',
      date: new Date().toLocaleDateString('zh-TW'),
      twd: Math.round(amount * this.state.settings.exchangeRate),
      note: note
    });

    this.state.calcValue = '0';
    if (noteInput) noteInput.value = '';
    this.saveState();
    this.renderBudget();
  },

  // 刪除消費紀錄
  deleteExpense(id) {
    if (!confirm('確定要刪除這筆消費紀錄嗎？')) return;
    
    this.state.expenses = this.state.expenses.filter(e => e.id !== id);
    this.saveState();
    this.renderBudget();
  },

  // 清空所有消費紀錄
  clearAllExpenses() {
    if (!confirm('確定要清空所有消費紀錄嗎？此操作無法復原！')) return;
    
    this.state.expenses = [];
    this.saveState();
    this.renderBudget();
  },

  // 開啟編輯消費模態框
  openEditExpenseModal(id) {
    const expense = this.state.expenses.find(e => e.id === id);
    if (!expense) return;

    document.getElementById('editExpenseId').value = id;
    document.getElementById('editExpenseAmount').value = expense.amount;
    document.getElementById('editExpenseNote').value = expense.note || '';
    
    // 設定分類選擇
    document.querySelectorAll('.edit-category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === expense.category);
    });
    
    // 綁定分類按鈕事件
    document.querySelectorAll('.edit-category-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.edit-category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });

    document.getElementById('editExpenseModal').classList.add('active');
  },

  // 關閉編輯消費模態框
  closeEditExpenseModal() {
    document.getElementById('editExpenseModal').classList.remove('active');
  },

  // 儲存編輯的消費
  saveEditedExpense() {
    const id = parseInt(document.getElementById('editExpenseId').value);
    const amount = parseInt(document.getElementById('editExpenseAmount').value) || 0;
    const note = document.getElementById('editExpenseNote').value.trim();
    const activeBtn = document.querySelector('.edit-category-btn.active');
    const categoryId = activeBtn ? activeBtn.dataset.category : 'other';

    if (amount <= 0) {
      alert('請輸入有效的金額');
      return;
    }

    const category = EXPENSE_CATEGORIES.find(c => c.id === categoryId);
    const expense = this.state.expenses.find(e => e.id === id);
    
    if (expense) {
      expense.amount = amount;
      expense.category = categoryId;
      expense.categoryIcon = category?.icon || '📦';
      expense.categoryName = category?.name || '其他';
      expense.twd = Math.round(amount * this.state.settings.exchangeRate);
      expense.note = note;
    }

    this.saveState();
    this.renderBudget();
    this.closeEditExpenseModal();
  },

  // 渲染消費列表
  renderExpenseList() {
    const listEl = document.getElementById('expenseList');
    if (!listEl) return;

    if (this.state.expenses.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">💰</div>
          <div class="empty-state-text">還沒有消費記錄</div>
        </div>
      `;
      return;
    }

    // 按時間倒序
    const sorted = [...this.state.expenses].reverse();

    const html = sorted.map(expense => `
      <div class="expense-item">
        <div class="expense-info" onclick="App.openEditExpenseModal(${expense.id})">
          <div class="expense-icon ${expense.category}">${expense.categoryIcon}</div>
          <div class="expense-details">
            <div class="expense-name">${expense.categoryName}</div>
            <div class="expense-date">${expense.date}${expense.note ? ` · <span class="expense-note">${expense.note}</span>` : ''}</div>
          </div>
        </div>
        <div class="expense-right">
          <div class="expense-amount" onclick="App.openEditExpenseModal(${expense.id})">
            <div class="expense-jpy">¥ ${expense.amount.toLocaleString()}</div>
            <div class="expense-twd">≈ NT$ ${expense.twd.toLocaleString()}</div>
          </div>
          <button class="expense-edit-btn" onclick="App.openEditExpenseModal(${expense.id})">✎</button>
          <button class="expense-delete-btn" onclick="App.deleteExpense(${expense.id})">✕</button>
        </div>
      </div>
    `).join('');

    listEl.innerHTML = `<div class="expense-list">${html}</div>`;
  },

  // 渲染攻略頁
  renderGuides() {
    const container = document.getElementById('guideList');
    if (!container) return;

    const html = TRIP_DATA.guides.map(guide => `
      <div class="guide-card">
        <div class="guide-header">
          <span class="guide-icon">${guide.icon}</span>
          <div>
            <div class="guide-title">${guide.title}</div>
            ${guide.subtitle ? `<div class="card-subtitle">${guide.subtitle}</div>` : ''}
          </div>
        </div>
        
        ${guide.intro ? `
          <div class="guide-section">
            <div class="guide-text">${guide.intro}</div>
          </div>
        ` : ''}
        
        ${guide.info ? `
          <div class="guide-info">
            ${guide.info.duration ? `<span class="guide-info-item">⏰ ${guide.info.duration}</span>` : ''}
            ${guide.info.ticket ? `<span class="guide-info-item">🎫 ${guide.info.ticket}</span>` : ''}
            ${guide.info.effort ? `<span class="guide-info-item">🚶 ${guide.info.effort}</span>` : ''}
          </div>
        ` : ''}
        
        ${guide.tips ? `
          <div class="guide-section">
            <div class="guide-section-title">💡 攻略提示</div>
            <ul class="guide-list">
              ${guide.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${guide.mustEat ? `
          <div class="guide-section">
            <div class="guide-section-title">🔥 必吃美食</div>
            ${guide.mustEat.map(food => `
              <div class="tags mb-sm">
                <span class="tag tag-must-eat">${food.name}</span>
              </div>
              <div class="guide-text">${food.desc}</div>
            `).join('')}
          </div>
        ` : ''}
        
        ${guide.restaurants ? `
          <div class="guide-section">
            <div class="guide-section-title">📋 推薦餐廳</div>
            <ul class="guide-list">
              ${guide.restaurants.map(r => `<li>${r.name} ⭐ ${r.rating}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        <button class="nav-button" onclick="App.navigateTo('${guide.location.replace(/'/g, "\\'")}')">
          📍 導航至此處 →
        </button>
      </div>
    `).join('');

    container.innerHTML = html;
  },

  // 開啟設定
  openSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.classList.add('active');
      
      // 填入目前設定
      const rateInput = document.getElementById('exchangeRateInput');
      const budgetInput = document.getElementById('budgetInput');
      
      if (rateInput) rateInput.value = this.state.settings.exchangeRate;
      if (budgetInput) budgetInput.value = this.state.settings.budget;
    }
  },

  // 關閉 Modal
  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
  },

  // 儲存設定
  saveSettings() {
    const rateInput = document.getElementById('exchangeRateInput');
    const budgetInput = document.getElementById('budgetInput');
    
    if (rateInput) {
      this.state.settings.exchangeRate = parseFloat(rateInput.value) || 0.215;
    }
    if (budgetInput) {
      this.state.settings.budget = parseInt(budgetInput.value) || 200000;
    }
    
    this.saveState();
    this.renderBudget();
    this.closeModals();
  },

  // 清除消費記錄
  clearExpenses() {
    if (confirm('確定要清除所有消費記錄嗎？')) {
      this.state.expenses = [];
      this.saveState();
      this.renderBudget();
    }
  }
};

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
