import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const popularPages = [
  { href: '/', label: 'Home', description: 'Main landing page' },
  { href: '/products', label: 'Products', description: 'Browse our fabric collection' },
  { href: '/about', label: 'About Us', description: 'Learn about our company' },
  { href: '/contact', label: 'Contact', description: 'Get in touch with us' },
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would redirect to a search results page
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" data-testid="not-found-page">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 404 Visual */}
          <div className="relative mb-8">
            <motion.div
              className="text-[12rem] md:text-[16rem] font-bold text-muted/20 leading-none"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              404
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="glass-dark rounded-2xl p-8 backdrop-blur-xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Page Not <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Found</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <Card className="glass-dark max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Search for what you need</h3>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search products, pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-404-search"
                    />
                  </div>
                  <Button type="submit" data-testid="button-404-search">
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-8">Popular Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPages.map((page, index) => (
                <motion.div
                  key={page.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <Link href={page.href}>
                    <Card className="glass-dark hover-lift cursor-pointer h-full" data-testid={`popular-page-${index}`}>
                      <CardContent className="p-6 text-center">
                        <h4 className="font-semibold mb-2">{page.label}</h4>
                        <p className="text-sm text-muted-foreground">{page.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-go-home"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              data-testid="button-go-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              Still can't find what you're looking for?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
