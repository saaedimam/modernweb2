import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/analytics';

const stats = [
  { value: '50+', label: 'Years of Excellence', color: 'text-primary' },
  { value: '10M+', label: 'Meters Produced Annually', color: 'text-chart-1' },
  { value: '200+', label: 'Global Partners', color: 'text-chart-2' },
];

export default function Hero() {
  const handleExploreProducts = () => {
    trackCTAClick('explore_products', 'hero');
    window.location.hash = 'products';
  };

  const handleWatchStory = () => {
    trackCTAClick('watch_story', 'hero');
    // In a real app, this would open a video modal
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-20"></div>
      
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-chart-1/20 rounded-full blur-3xl"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-chart-2/20 rounded-full blur-3xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            className="fluid-text font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="hero-title"
          >
            Future of{' '}
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Textile Manufacturing
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="hero-subtitle"
          >
            Leading the industry with sustainable practices, cutting-edge technology, and premium quality fabrics that define tomorrow's fashion.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-4 text-lg font-medium hover:bg-primary/90 hover-lift"
              onClick={handleExploreProducts}
              data-testid="button-explore-products"
            >
              Explore Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass px-8 py-4 text-lg font-medium hover:bg-primary/10 hover-lift"
              onClick={handleWatchStory}
              data-testid="button-watch-story"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Story
            </Button>
          </motion.div>
          
          {/* Key Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-dark rounded-xl p-6 hover-lift"
                whileHover={{ scale: 1.05 }}
                data-testid={`hero-stat-${index}`}
              >
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="scroll-indicator"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
