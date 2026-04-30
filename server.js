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
    image: 'https://via.placeholder.com/800x400/00AA55/FFFFFF?text=HSI',
    source: 'HKEX',
    sourceUrl: 'https://www.hkex.com.hk',
    date: '2026-01-16',
    time: '16:00'
  }
];

const marketData = [
  { symbol: '^HSI', name: '恒生指數', nameEn: 'Hang Seng Index', price: 25893.54, change: 141.14, changePercent: 0.55, high: 26073.97, low: 25843.65, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EHSI' },
  { symbol: '^DJI', name: '道瓊斯', nameEn: 'Dow Jones', price: 48185.80, change: 275.88, changePercent: 0.58, high: 48323.95, low: 47690.27, source: 'Yahoo Finance', sourceUrl: 'https://finance.yahoo.com/quote/%5EDJI' },
  { symbol: 'BTC-USD', name: '比特幣', nameEn: 'Bitcoin', price: 72149.66, change: 1092.84, changePercent: 1.54, high: 72305.70, low: 71445.83, source: 'CoinMarketCap', sourceUrl: 'https://coinmarketcap.com/currencies/bitcoin/' }
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/api/news', (req, res) => {
  res.json({ success: true, data: news, lastUpdated: new Date().toISOString() });
});

app.get('/api/market', (req, res) => {
  res.json({ success: true, data: marketData, timestamp: new Date().toISOString() });
});

app.get('/api/status', (req, res) => {
  res.json({ success: true, status: 'online', serverTime: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'NOVA API is running', status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`NOVA API running on port ${PORT}`);
});
