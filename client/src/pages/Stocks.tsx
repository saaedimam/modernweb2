import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, RefreshCw, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchStocks } from '@/lib/api';
import { StockRow } from '@/types';
import { trackPageView, trackEvent } from '@/lib/analytics';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const marketSummary = [
  { label: 'DSE Index', value: 6247.85, change: 1.23, changeValue: 75.23 },
  { label: 'CSE Index', value: 17834.92, change: 0.67, changeValue: 118.45 },
  { label: 'Total Volume', value: '45.2M', change: null, changeValue: null, subtitle: 'Shares Traded Today' },
];

export default function Stocks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [exchangeFilter, setExchangeFilter] = useState<string>('all');
  const [filteredStocks, setFilteredStocks] = useState<StockRow[]>([]);

  const { data: stocks, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/stocks'],
    queryFn: fetchStocks,
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  useEffect(() => {
    trackPageView('/stocks');
  }, []);

  useEffect(() => {
    if (!stocks) return;

    let filtered = stocks;

    // Filter by exchange
    if (exchangeFilter !== 'all') {
      filtered = filtered.filter(stock => stock.exchange.toLowerCase() === exchangeFilter.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stock =>
        stock.symbol.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
      );
    }

    setFilteredStocks(filtered);
  }, [stocks, searchQuery, exchangeFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      trackEvent('stock_search', { query, results: filteredStocks.length });
    }
  };

  const handleRefresh = () => {
    refetch();
    trackEvent('stock_refresh');
  };

  const formatPrice = (price: number) => `৳${price.toFixed(2)}`;
  
  const formatChange = (changePct: number) => {
    const sign = changePct >= 0 ? '+' : '';
    return `${sign}${changePct.toFixed(2)}%`;
  };

  const getChangeColor = (changePct: number) => {
    return changePct >= 0 ? 'text-chart-2' : 'text-destructive';
  };

  const getChangeIcon = (changePct: number) => {
    return changePct >= 0 ? TrendingUp : TrendingDown;
  };

  return (
    <div className="pt-20" data-testid="stocks-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Stock Market <span className="bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">Data</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real-time stock prices from Dhaka Stock Exchange (DSE) and Chittagong Stock Exchange (CSE) with advanced filtering and analytics.
          </motion.p>
        </div>
      </Section>

      {/* Market Summary */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketSummary.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`market-summary-${index}`}
              >
                <Card className="glass-dark text-center hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                    <div className="text-3xl font-bold mb-2">
                      {typeof item.value === 'string' ? item.value : item.value.toLocaleString()}
                    </div>
                    {item.change !== null ? (
                      <div className={`flex items-center justify-center ${getChangeColor(item.change!)}`}>
                        {getChangeIcon(item.change!) === TrendingUp ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span>{formatChange(item.change!)} ({item.changeValue! > 0 ? '+' : ''}{item.changeValue})</span>
                      </div>
                    ) : (
                      <div className="text-muted-foreground">{item.subtitle}</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Stock Data Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12"
                data-testid="input-stock-search"
              />
            </div>
            
            {/* Exchange Filter */}
            <Select value={exchangeFilter} onValueChange={setExchangeFilter}>
              <SelectTrigger className="w-48" data-testid="select-exchange-filter">
                <SelectValue placeholder="All Exchanges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exchanges</SelectItem>
                <SelectItem value="dse">DSE</SelectItem>
                <SelectItem value="cse">CSE</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Refresh Button */}
            <Button
              onClick={handleRefresh}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
              data-testid="button-refresh-stocks"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <Card className="glass-dark border-destructive">
              <CardContent className="p-6 text-center">
                <div className="text-destructive mb-2">Failed to load stock data</div>
                <p className="text-muted-foreground mb-4">Please try refreshing or check your connection</p>
                <Button onClick={handleRefresh} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stock Data Table */}
          {!error && (
            <Card className="glass-dark overflow-hidden">
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="bg-primary/10 px-6 py-4 border-b border-border">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium">
                    <div>Symbol</div>
                    <div>Company Name</div>
                    <div>Price (৳)</div>
                    <div>Change</div>
                    <div>Exchange</div>
                    <div>Updated</div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-border">
                  {isLoading ? (
                    // Loading Skeletons
                    Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="px-6 py-4">
                        <div className="grid grid-cols-6 gap-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    ))
                  ) : filteredStocks.length > 0 ? (
                    // Stock Rows
                    filteredStocks.map((stock, index) => {
                      const ChangeIcon = getChangeIcon(stock.changePct);
                      return (
                        <motion.div
                          key={stock.symbol}
                          className="px-6 py-4 hover:bg-muted/20 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          data-testid={`stock-row-${stock.symbol}`}
                        >
                          <div className="grid grid-cols-6 gap-4 text-sm items-center">
                            <div className="font-mono font-medium">{stock.symbol}</div>
                            <div className="truncate">{stock.name}</div>
                            <div className="font-mono">{formatPrice(stock.price)}</div>
                            <div className="flex items-center">
                              <span className={`font-medium ${getChangeColor(stock.changePct)}`}>
                                {formatChange(stock.changePct)}
                              </span>
                              <ChangeIcon className={`w-4 h-4 ml-1 ${getChangeColor(stock.changePct)}`} />
                            </div>
                            <div>
                              <Badge 
                                variant={stock.exchange === 'DSE' ? 'default' : 'secondary'}
                                className={stock.exchange === 'DSE' ? 'bg-chart-1 text-white' : 'bg-chart-3 text-white'}
                              >
                                {stock.exchange}
                              </Badge>
                            </div>
                            <div className="text-muted-foreground">
                              {dayjs(stock.updated).fromNow()}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    // Empty State
                    <div className="px-6 py-16 text-center" data-testid="stocks-empty-state">
                      <div className="text-6xl mb-4">📈</div>
                      <h3 className="text-2xl font-semibold mb-2">No stocks found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or exchange filter.
                      </p>
                      <Button onClick={() => {
                        setSearchQuery('');
                        setExchangeFilter('all');
                      }}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Source Info */}
          <div className="mt-8 text-center">
            <Card className="glass-dark">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Data Source Information</h3>
                <p className="text-muted-foreground mb-4">
                  Stock data is sourced from official DSE and CSE APIs with automatic updates every 60 seconds during market hours.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div>Last Updated: {dayjs().format('HH:mm:ss')}</div>
                  <div>•</div>
                  <div>Market Hours: 10:00 AM - 2:30 PM (GMT+6)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
