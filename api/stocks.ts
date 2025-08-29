import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock stock data - in production this would fetch from DSE/CSE APIs
const mockStocks = [
  {
    symbol: "GRAMEENPHONE",
    name: "Grameenphone Ltd.",
    price: 358.50,
    changePct: 2.34,
    exchange: "DSE",
    updated: new Date().toISOString(),
    volume: 125000,
    marketCap: 48500000000
  },
  {
    symbol: "SQURPHARMA",
    name: "Square Pharmaceuticals Ltd.",
    price: 245.80,
    changePct: -1.24,
    exchange: "DSE",
    updated: new Date().toISOString(),
    volume: 89000,
    marketCap: 32400000000
  },
  {
    symbol: "WALTONHIL",
    name: "Walton Hi-Tech Industries Ltd.",
    price: 1245.60,
    changePct: 5.67,
    exchange: "DSE",
    updated: new Date().toISOString(),
    volume: 45000,
    marketCap: 124560000000
  },
  {
    symbol: "BRAC",
    name: "BRAC Bank Ltd.",
    price: 56.30,
    changePct: 0.89,
    exchange: "CSE",
    updated: new Date().toISOString(),
    volume: 200000,
    marketCap: 23800000000
  },
  {
    symbol: "KATTALI",
    name: "Kattali Textile Ltd.",
    price: 156.75,
    changePct: 3.45,
    exchange: "DSE",
    updated: new Date().toISOString(),
    volume: 67000,
    marketCap: 15675000000
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Add small delay to simulate real API
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Filter by exchange if provided
    const { exchange } = req.query;
    let filteredStocks = mockStocks;
    
    if (exchange && typeof exchange === 'string' && exchange !== 'all') {
      filteredStocks = mockStocks.filter(stock => 
        stock.exchange.toLowerCase() === exchange.toLowerCase()
      );
    }

    return res.status(200).json(filteredStocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch stock data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}