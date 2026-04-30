const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// 簡單測試數據
const news = [
  {
    id: '1',
    title: '美聯儲維持利率不變',
    titleEn: 'Fed Holds Rates Steady',
    summary: '聯儲局連續第四次維持利率在5.25%-5.50%區間',
    summaryEn: 'The Federal Reserve held rates steady',
    content: '【美聯儲議息結果】\n\n聯邦公開市場委員會（FOMC）公布最新議息結果...',
    contentEn: '【Fed Meeting Results】\n\nThe FOMC announced its latest decision...',
    image: 'https://via.placeholder.com/800x400/0066FF/FFFFFF?text=Fed',
    source: 'Federal Reserve',
    sourceUrl: 'https://www.federalreserve.gov',
    date: '2026-01-16',
    time: '02:00'
  },
  {
    id: '2',
    title: '恒生指數升141點',
    titleEn: 'Hang Seng Index Up 141 Points',
    summary: '港股今日高開高走，科技股領漲',
    summaryEn: 'Hong Kong stocks opened higher',
    content: '【港股收市】\n\n恒生指數升141點...',
    contentEn: '【HK Market Close】\n\nHang Seng Index up 141 points...',
    image: 'https://via.placeholder.com/800x400/00AA55/FFFFFF?text=HSI',
    source: 'HKEX',
    sourceUrl: 'https://www.hkex.com.hk',
    date: '2026-01-16',
    time: '16:00'
  },
  {
    id: '3',
    title: '比特幣突破72000美元',
    titleEn: 'Bitcoin Breaks $72,000',
    summary: '加密貨幣市場全面回暖',
    summaryEn: 'Crypto market recovering',
    content: '【加密貨幣快訊】\n\n比特幣一度突破72000美元...',
    contentEn: '【Crypto News】\n\nBitcoin briefly broke $72,000...',
    image: 'https://via.placeholder.com/800x400/FF8800/FFFFFF?text=BTC',
    source: 'CoinMarketCap',
    sourceUrl: 'https://coinmarketcap.com',
    date: '2026-01-16',
    time: '16:00'
  },
  {
    id: '4',
    title: '金價回落至4750美元',
    titleEn: 'Gold Falls to $4,750',
    summary: '美元走強拖累貴金屬',
    summaryEn: 'Stronger dollar weighs on metals',
    content: '【貴金屬市場】\n\n現貨金價承壓...',
    contentEn: '【Precious Metals】\n\nSpot gold under pressure...',
    image: 'https://via.placeholder.com/800x400/FFCC00/000000?text=Gold',
    source: 'Investing.com',
    sourceUrl: 'https://www.investing.com',
    date: '2026-01-16',
    time: '16:00'
  }
];

const marketData = [
  { symbol: '^HSI', name: '恒生指數', nameEn: 'Hang Seng Index', price: 25893.54, change: 141.14, changePercent: 0.55, high: 26073.97, low: 25843.65, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EHSI' },
  { symbol: '^DJI', name: '道瓊斯', nameEn: 'Dow Jones', price: 48185.80, change: 275.88, changePercent: 0.58, high: 48323.95, low: 47690.27, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EDJI' },
  { symbol: '^GSPC', name: '標普500', nameEn: 'S&P 500', price: 6824.66, change: 41.85, changePercent: 0.62, high: 6835.31, low: 6761.55, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EGSPC' },
  { symbol: '^IXIC', name: '納斯達克', nameEn: 'Nasdaq', price: 22822.42, change: 187.42, changePercent: 0.83, high: 22836.75, low: 22529.21, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EIXIC' },
  { symbol: 'GC=F', name: '黃金', nameEn: 'Gold', price: 4793.20, change: -24.80, changePercent: -0.51, high: 4810.00, low: 4752.70, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/GC%3DF' },
  { symbol: 'CL=F', name: '原油', nameEn: 'Crude Oil', price: 97.66, change: -0.21, changePercent: -0.21, high: 100.42, low: 97.41, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/CL%3DF' },
  { symbol: 'BTC-USD', name: '比特幣', nameEn: 'Bitcoin', price: 72149.66, change: 1092.84, changePercent: 1.54, high: 72305.70, low: 71445.83, source: 'CoinMarketCap', sourceUrl: 'https://coinmarketcap.com/currencies/bitcoin/' },
  { symbol: 'ETH-USD', name: '以太幣', nameEn: 'Ethereum', price: 2215.92, change: 40.20, changePercent: 1.85, high: 2222.47, low: 2176.98, source: 'CoinMarketCap', sourceUrl: 'https://coinmarketcap.com/currencies/ethereum/' }
];

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API 端點
app.get('/api/news', (req, res) => {
  res.json({
    success: true,
    data: news,
    lastUpdated: new Date().toISOString(),
    nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
});

app.get('/api/market', (req, res) => {
  res.json({
    success: true,
    data: marketData,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    serverTime: new Date().toISOString(),
    status: 'online'
  });
});

// 健康檢查
app.get('/', (req, res) => {
  res.json({ message: 'NOVA API is running', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`NOVA API running on port ${PORT}`);
});
