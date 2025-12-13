// ============================================
// Japan Trip 2026 - 行程資料
// ============================================

const TRIP_DATA = {
  // 基本資訊
  info: {
    title: 'JAPAN 2026',
    dates: '1/22 - 1/31',
    destinations: '東京 & 輕井澤',
    startDate: '2026-01-22',
    endDate: '2026-01-31',
    days: 10
  },

  // 匯率設定
  settings: {
    exchangeRate: 0.215, // JPY to TWD
    budget: 200000 // 日圓
  },

  // 航班資訊
  flights: {
    outbound: {
      code: 'CX450',
      airline: 'Cathay Pacific',
      from: 'TPE',
      to: 'NRT',
      departTime: '12:50',
      arriveTime: '15:50',
      date: '2026-01-22',
      dateDisplay: '1月22日 (四)'
    },
    inbound: {
      code: 'CX451',
      airline: 'Cathay Pacific',
      from: 'NRT',
      to: 'TPE',
      departTime: '14:20',
      arriveTime: '18:40',
      date: '2026-01-31',
      dateDisplay: '1月31日 (六)'
    }
  },

  // 住宿資訊
  hotels: [
    {
      days: 'Day 1-3',
      name: 'Hotel Keihan Tokyo Yotsuya',
      nameJp: 'ホテル京阪 東京四谷',
      address: '東京都新宿區四谷',
      phone: '',
      checkIn: '2026-01-22',
      checkOut: '2026-01-25',
      location: 'Hotel Keihan Tokyo Yotsuya'
    },
    {
      days: 'Day 4-5',
      name: 'Seirai Asakusa Vacation Rental',
      nameJp: 'セイライ浅草',
      address: '4-6-7 Kotobuki, Taito Ward, Tokyo 111-0042',
      phone: '+81 70-4749-4704',
      checkIn: '2026-01-25',
      checkOut: '2026-01-27',
      note: '密碼鎖 (入住時提供)',
      location: '4-6-7 Kotobuki, Taito Ward, Tokyo'
    },
    {
      days: 'Day 6-8',
      name: 'Karuizawa Prince Hotel West',
      nameJp: '軽井沢プリンスホテル ウエスト',
      address: '輕井澤',
      phone: '',
      checkIn: '2026-01-27',
      checkOut: '2026-01-30',
      note: '含滑雪場設施',
      location: 'Karuizawa Prince Hotel West'
    },
    {
      days: 'Day 9',
      name: 'Hotel Villa Fontaine Tokyo-Ueno Okachimachi',
      nameJp: 'ホテルヴィラフォンテーヌ東京上野御徒町',
      address: '上野御徒町',
      phone: '',
      checkIn: '2026-01-30',
      checkOut: '2026-01-31',
      location: 'Hotel Villa Fontaine Tokyo-Ueno Okachimachi'
    }
  ],

  // 緊急聯絡電話
  emergency: {
    japan: [
      { name: '警察', number: '110' },
      { name: '消防/救護車', number: '119' },
      { name: '海上事故', number: '118' }
    ],
    travel: [
      { name: '日本旅遊熱線', number: '050-3816-2787' },
      { name: '台灣駐日代表處', number: '+81-3-3280-7811' }
    ],
    creditCard: [
      { name: 'Visa', number: '00531-44-0022' },
      { name: 'Mastercard', number: '00531-11-3886' }
    ],
    rental: [
      { name: 'Nippon Rent-A-Car', number: '0800-500-0919' }
    ]
  },

  // 每日行程
  itinerary: [
    // Day 1: 1/22 (四) - 抵達
    {
      day: 1,
      date: '2026-01-22',
      dateDisplay: '1月22日 (四)',
      title: '抵達東京',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '12:50',
          type: 'transport',
          icon: '✈️',
          title: '去程航班 CX450',
          subtitle: 'TPE → NRT',
          description: '國泰航空，預計 15:50 抵達成田機場',
          location: 'Narita Airport',
          tags: []
        },
        {
          time: '16:30',
          type: 'transport',
          icon: '🚃',
          title: '成田機場 → 東京',
          subtitle: '搭乘京成 Skyliner 或 N\'EX',
          description: '前往四谷住宿',
          location: 'Tokyo Station',
          tags: []
        },
        {
          time: '18:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-in',
          subtitle: 'Hotel Keihan Tokyo Yotsuya',
          description: '',
          location: 'Hotel Keihan Tokyo Yotsuya',
          tags: []
        }
      ]
    },

    // Day 2: 1/23 (五) - 東京探索
    {
      day: 2,
      date: '2026-01-23',
      dateDisplay: '1月23日 (五)',
      title: '東京探索 (分組行動)',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '09:00',
          type: 'activity',
          icon: '🪄',
          title: 'Group A: 哈利波特影城',
          subtitle: 'Warner Bros. Studio Tour Tokyo',
          description: 'The Making of Harry Potter',
          location: 'Warner Bros. Studio Tour Tokyo',
          tags: [
            { type: 'tip', text: '需預約' }
          ]
        },
        {
          time: '09:00',
          type: 'attraction',
          icon: '🗼',
          title: 'Group B: 東京塔 + 明治神宮',
          subtitle: '城市觀光',
          description: '',
          location: 'Tokyo Tower',
          tags: []
        },
        {
          time: '18:00',
          type: 'shopping',
          icon: '🛍️',
          title: '澀谷集合',
          subtitle: 'Alpen TOKYO + 晚餐',
          description: '運動用品採購、晚餐',
          location: 'Shibuya Alpen TOKYO',
          tags: []
        }
      ]
    },

    // Day 3: 1/24 (六) - 富士山自駕
    {
      day: 3,
      date: '2026-01-24',
      dateDisplay: '1月24日 (六)',
      title: '富士山自駕一日遊',
      location: 'Kawaguchiko',
      lat: 35.5162,
      lon: 138.7523,
      events: [
        {
          time: '08:00',
          type: 'transport',
          icon: '🚗',
          title: '取車出發',
          subtitle: 'Nippon Rent-A-Car 四谷営業所',
          description: '協立四谷ビル 1F',
          location: 'Nippon Rent-A-Car 四谷営業所',
          tags: [
            { type: 'warning', text: '⚠️ 請確認已配備雪胎！' }
          ]
        },
        {
          time: '10:30',
          type: 'attraction',
          icon: '🏯',
          title: '新倉山淺間公園',
          subtitle: 'Arakurayama Sengen Park',
          description: '拍攝富士山與五重塔經典合照的絕佳地點，需爬約 400 階石階抵達展望台',
          location: 'Arakurayama Sengen Park',
          tags: [
            { type: 'must-photo', text: '📸 必拍' },
            { type: 'tip', text: '🥾 需體力' }
          ]
        },
        {
          time: '12:00',
          type: 'restaurant',
          icon: '🍜',
          title: '河口湖畔午餐',
          subtitle: '山梨縣鄉土料理',
          description: '',
          location: 'Lake Kawaguchi',
          tags: [
            { type: 'must-eat', text: '🔥 必吃：餺飥麵 (ほうとう)' },
            { type: 'must-order', text: '📋 必點：南瓜餺飥套餐' }
          ]
        },
        {
          time: '13:00',
          type: 'attraction',
          icon: '🚡',
          title: '河口湖天上山公園',
          subtitle: 'Kachi Kachi Ropeway',
          description: '搭乘纜車至山頂，俯瞰河口湖與富士山全景',
          location: 'Kachi Kachi Ropeway',
          tags: [
            { type: 'must-photo', text: '📸 必拍' }
          ]
        },
        {
          time: '14:30',
          type: 'attraction',
          icon: '🌸',
          title: '大石公園',
          subtitle: 'Oishi Park (Natural Living Center)',
          description: '近距離觀賞富士山，湖畔散步拍攝倒影',
          location: 'Oishi Park Kawaguchiko',
          tags: [
            { type: 'must-photo', text: '📸 必拍' }
          ]
        },
        {
          time: '15:30',
          type: 'attraction',
          icon: '🏡',
          title: '西湖療癒之鄉根場',
          subtitle: 'Saiko Iyashi no Sato Nenba',
          description: '傳統茅草屋村落，富士山為背景的絕美場景',
          location: 'Saiko Iyashi no Sato Nenba',
          tags: []
        },
        {
          time: '17:00',
          type: 'transport',
          icon: '🚗',
          title: '返回東京',
          subtitle: '',
          description: '預計 20:00 前還車',
          location: 'Nippon Rent-A-Car 四谷営業所',
          tags: [
            { type: 'warning', text: '⚠️ 冬季日落早，注意山路結冰' }
          ]
        }
      ]
    },

    // Day 4: 1/25 (日) - 換飯店 + 分組活動
    {
      day: 4,
      date: '2026-01-25',
      dateDisplay: '1月25日 (日)',
      title: '換住宿 & 分組活動',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '10:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-out 四谷',
          subtitle: '搬行李至淺草',
          description: '',
          location: 'Hotel Keihan Tokyo Yotsuya',
          tags: []
        },
        {
          time: '11:00',
          type: 'attraction',
          icon: '🏯',
          title: 'Group B: 淺草寺 + 上野公園',
          subtitle: 'Senso-ji Temple',
          description: '東京最古老的寺廟，雷門、仲見世通',
          location: 'Senso-ji Temple Asakusa',
          tags: [
            { type: 'must-photo', text: '📸 必拍' }
          ]
        },
        {
          time: '14:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-in 淺草民宿',
          subtitle: 'Seirai Asakusa',
          description: '密碼鎖入住',
          location: '4-6-7 Kotobuki, Taito Ward, Tokyo',
          tags: []
        },
        {
          time: '18:00',
          type: 'activity',
          icon: '🎤',
          title: 'Group A: 東京巨蛋活動',
          subtitle: 'TOKYO DOME',
          description: '',
          location: 'Tokyo Dome',
          tags: []
        }
      ]
    },

    // Day 5: 1/26 (一) - 藝術與購物
    {
      day: 5,
      date: '2026-01-26',
      dateDisplay: '1月26日 (一)',
      title: '藝術與購物',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '10:00',
          type: 'attraction',
          icon: '🎨',
          title: 'teamLab',
          subtitle: 'Planets 或 Borderless',
          description: '沉浸式數位藝術體驗',
          location: 'teamLab Planets Tokyo',
          tags: [
            { type: 'must-photo', text: '📸 必拍' },
            { type: 'tip', text: '建議預約' }
          ]
        },
        {
          time: '14:00',
          type: 'shopping',
          icon: '🛍️',
          title: '銀座購物',
          subtitle: 'Ginza District',
          description: '高檔購物區',
          location: 'Ginza Tokyo',
          tags: []
        }
      ]
    },

    // Day 6: 1/27 (二) - 前往輕井澤
    {
      day: 6,
      date: '2026-01-27',
      dateDisplay: '1月27日 (二)',
      title: '前往輕井澤',
      location: 'Karuizawa',
      lat: 36.3489,
      lon: 138.6361,
      events: [
        {
          time: '09:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-out 淺草',
          subtitle: '',
          description: '',
          location: '4-6-7 Kotobuki, Taito Ward, Tokyo',
          tags: []
        },
        {
          time: '10:00',
          type: 'transport',
          icon: '🚄',
          title: '新幹線前往輕井澤',
          subtitle: '上野/東京站 → 輕井澤',
          description: '約 1 小時車程',
          location: 'Tokyo Station',
          tags: []
        },
        {
          time: '12:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-in 輕井澤王子',
          subtitle: 'Karuizawa Prince Hotel West',
          description: '',
          location: 'Karuizawa Prince Hotel West',
          tags: []
        },
        {
          time: '14:00',
          type: 'shopping',
          icon: '🛍️',
          title: '輕井澤 Outlet',
          subtitle: 'Karuizawa Prince Shopping Plaza',
          description: '日本最大的 Outlet 之一',
          location: 'Karuizawa Prince Shopping Plaza',
          tags: []
        }
      ]
    },

    // Day 7: 1/28 (三) - 滑雪
    {
      day: 7,
      date: '2026-01-28',
      dateDisplay: '1月28日 (三)',
      title: '滑雪日',
      location: 'Karuizawa',
      lat: 36.3489,
      lon: 138.6361,
      events: [
        {
          time: '09:00',
          type: 'activity',
          icon: '⛷️',
          title: '全天滑雪',
          subtitle: 'Karuizawa Prince Hotel Ski Resort',
          description: '飯店直通滑雪場',
          location: 'Karuizawa Prince Hotel Ski Resort',
          tags: []
        }
      ]
    },

    // Day 8: 1/29 (四) - 滑雪
    {
      day: 8,
      date: '2026-01-29',
      dateDisplay: '1月29日 (四)',
      title: '滑雪日',
      location: 'Karuizawa',
      lat: 36.3489,
      lon: 138.6361,
      events: [
        {
          time: '09:00',
          type: 'activity',
          icon: '⛷️',
          title: '全天滑雪',
          subtitle: 'Karuizawa Prince Hotel Ski Resort',
          description: '飯店直通滑雪場',
          location: 'Karuizawa Prince Hotel Ski Resort',
          tags: []
        }
      ]
    },

    // Day 9: 1/30 (五) - 返回東京
    {
      day: 9,
      date: '2026-01-30',
      dateDisplay: '1月30日 (五)',
      title: '返回東京',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '10:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-out 輕井澤',
          subtitle: '',
          description: '',
          location: 'Karuizawa Prince Hotel West',
          tags: []
        },
        {
          time: '11:00',
          type: 'transport',
          icon: '🚄',
          title: '新幹線返回東京',
          subtitle: '輕井澤 → 上野',
          description: '約 1 小時車程',
          location: 'Karuizawa Station',
          tags: []
        },
        {
          time: '13:00',
          type: 'shopping',
          icon: '🛍️',
          title: '上野/阿美橫町',
          subtitle: 'Ameyokocho',
          description: '最後採購機會',
          location: 'Ameyoko Shopping Street Ueno',
          tags: []
        },
        {
          time: '16:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-in 上野',
          subtitle: 'Hotel Villa Fontaine Tokyo-Ueno Okachimachi',
          description: '',
          location: 'Hotel Villa Fontaine Tokyo-Ueno Okachimachi',
          tags: []
        }
      ]
    },

    // Day 10: 1/31 (六) - 回程
    {
      day: 10,
      date: '2026-01-31',
      dateDisplay: '1月31日 (六)',
      title: '回程',
      location: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      events: [
        {
          time: '09:00',
          type: 'hotel',
          icon: '🏨',
          title: 'Check-out',
          subtitle: '',
          description: '',
          location: 'Hotel Villa Fontaine Tokyo-Ueno Okachimachi',
          tags: []
        },
        {
          time: '10:00',
          type: 'transport',
          icon: '🚃',
          title: '前往成田機場',
          subtitle: '京成 Skyliner',
          description: '上野 → 成田機場',
          location: 'Keisei Ueno Station',
          tags: []
        },
        {
          time: '14:20',
          type: 'transport',
          icon: '✈️',
          title: '回程航班 CX451',
          subtitle: 'NRT → TPE',
          description: '國泰航空，預計 18:40 抵達桃園機場',
          location: 'Narita Airport',
          tags: []
        }
      ]
    }
  ],

  // 景點攻略
  guides: [
    {
      id: 'arakurayama',
      icon: '🏯',
      title: '新倉山淺間公園攻略',
      subtitle: 'Arakurayama Sengen Park',
      intro: '位於山梨縣富士吉田市，是拍攝富士山與五重塔（忠靈塔）經典合照的最佳地點。春季櫻花盛開時尤其壯觀。',
      info: {
        duration: '1-1.5 小時',
        ticket: '免費',
        effort: '需爬約 400 階石階'
      },
      tips: [
        '清晨或傍晚光線最佳',
        '冬季需注意階梯可能結冰',
        '展望台有免費望遠鏡',
        '建議穿防滑鞋'
      ],
      location: 'Arakurayama Sengen Park'
    },
    {
      id: 'houtou',
      icon: '🍜',
      title: '河口湖美食攻略',
      subtitle: '山梨縣鄉土料理',
      intro: '餺飥麵 (ほうとう) 是山梨縣的代表性鄉土料理，使用寬扁烏龍麵搭配味噌湯底，加入南瓜、蔬菜一起燉煮，冬天吃特別暖心。',
      mustEat: [
        { name: '餺飥麵 (ほうとう)', desc: '南瓜味噌湯底，冬季必吃' },
        { name: '吉田烏龍麵', desc: '粗麵條，嚼勁十足' }
      ],
      restaurants: [
        { name: '小作 河口湖店', rating: '4.2' },
        { name: 'ほうとう不動', rating: '4.0' }
      ],
      location: 'Lake Kawaguchi restaurants'
    },
    {
      id: 'teamlab',
      icon: '🎨',
      title: 'teamLab 參觀攻略',
      subtitle: '沉浸式數位藝術',
      intro: 'teamLab 是日本知名的藝術團隊，以互動式沉浸體驗聞名。東京有兩個展館：Planets（豐洲）和 Borderless（麻布台）。',
      info: {
        duration: '2-3 小時',
        ticket: '需預購',
        effort: '需脫鞋，部分區域涉水'
      },
      tips: [
        '提前線上購票，現場常售罄',
        '穿短褲或可捲起的褲子',
        '避開週末人潮',
        '相機/手機可拍照'
      ],
      location: 'teamLab Planets Tokyo'
    },
    {
      id: 'karuizawa-outlet',
      icon: '🛍️',
      title: '輕井澤王子購物廣場',
      subtitle: 'Karuizawa Prince Shopping Plaza',
      intro: '規模最大的 Outlet 之一，湖畔有夢幻冬季點燈，品牌眾多。',
      info: {
        duration: '3-5 小時',
        ticket: '免費入場',
        effort: '步行即可到達 (飯店旁)'
      },
      tips: [
        '11月起至冬季結束有浪漫點燈活動',
        '品牌眾多，建議先做功課',
        '湖畔區域拍照絕美',
        '冬季戶外較冷，注意保暖'
      ],
      location: 'Karuizawa Prince Shopping Plaza'
    },
    {
      id: 'old-karuizawa',
      icon: '🏘️',
      title: '舊輕井澤銀座通',
      subtitle: '舊輕井澤商店街',
      intro: '輕井澤傳統的中心地帶，有特色小店、咖啡廳、名產店和聖保羅教堂。',
      info: {
        duration: '2 小時',
        ticket: '免費',
        effort: '從輕井澤站搭乘巴士或計程車'
      },
      tips: [
        '部分老店冬季可能縮短營業時間或休息',
        '建議早上前往',
        '聖保羅教堂值得一看',
        '可品嚐當地特色果醬和烘焙'
      ],
      location: '舊輕井澤銀座通'
    },
    {
      id: 'harunire',
      icon: '🌲',
      title: '榆樹街小鎮',
      subtitle: 'Harunire Terrace',
      intro: '沿溪流的特色商店街，有美食（如川上庵蕎麥麵）、咖啡和雜貨店。',
      info: {
        duration: '1-1.5 小時 (不含用餐)',
        ticket: '免費',
        effort: '從輕井澤站搭乘計程車或星野接駁車'
      },
      tips: [
        '距離星野溫泉「蜻蜓之湯」很近，可安排一起前往',
        '川上庵的蕎麥麵必吃',
        '溪流旁環境優美',
        '冬季氣氛特別好'
      ],
      location: 'Harunire Terrace'
    },
    {
      id: 'kogen-church',
      icon: '⛪',
      title: '輕井澤高原教會',
      subtitle: 'Karuizawa Kogen Church',
      intro: '浪漫的木造教堂，冬季聖誕前後有特別的「燭光之夜」等活動。',
      info: {
        duration: '0.5-1 小時',
        ticket: '免費',
        effort: '與榆樹街小鎮同區，可搭乘星野接駁車前往'
      },
      tips: [
        '聖誕活動期間的燈飾和氛圍極佳',
        '木造教堂建築獨特',
        '可與榆樹街小鎮一起安排',
        '適合情侶或家庭'
      ],
      location: 'Karuizawa Kogen Church'
    },
    {
      id: 'kumoba',
      icon: '🦢',
      title: '雲場池',
      subtitle: 'Kumoba Pond',
      intro: '有「天鵝湖」美譽的靜謐水池，冬日結冰或積雪時有獨特的寧靜美。',
      info: {
        duration: '1 小時',
        ticket: '免費',
        effort: '從輕井澤站步行約 15-20 分鐘或搭計程車'
      },
      tips: [
        '清晨前往，池畔的空氣特別清新',
        '冬季可能結冰，景色獨特',
        '繞池一圈約 20 分鐘',
        '適合散步拍照'
      ],
      location: 'Kumoba Pond'
    }
  ]
};

// 消費分類
const EXPENSE_CATEGORIES = [
  { id: 'food', icon: '🍜', name: '餐飲', color: '#FF8C42' },
  { id: 'transport', icon: '🚃', name: '交通', color: '#4DA8DA' },
  { id: 'ticket', icon: '🎫', name: '門票', color: '#A855F7' },
  { id: 'shopping', icon: '🛒', name: '購物', color: '#FF6B9D' },
  { id: 'other', icon: '📦', name: '其他', color: '#A0A0B0' }
];

// 導出資料
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRIP_DATA, EXPENSE_CATEGORIES };
}
