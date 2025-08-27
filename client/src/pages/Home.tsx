import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProductFilter from '@/components/ProductFilter';
import PricingCalculator from '@/components/PricingCalculator';
import Reviews from '@/components/Reviews';
import Section from '@/components/layout/Section';
import { products } from '@/data/products';
import { trackPageView } from '@/lib/analytics';

const features = [
  {
    icon: '🌱',
    title: 'Sustainable Manufacturing',
    description: 'Eco-friendly processes with 95% waste reduction and renewable energy',
  },
  {
    icon: '⚡',
    title: 'Advanced Technology',
    description: 'AI-powered quality control and IoT-enabled production systems',
  },
  {
    icon: '🏆',
    title: 'Premium Quality',
    description: 'ISO 9001 certified with rigorous quality assurance standards',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    description: '200+ partners across 50+ countries with reliable logistics',
  },
];

export default function Home() {
  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <div data-testid="home-page">
      <Hero />

      {/* Key Features */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Kattali Textile</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five decades of excellence in textile manufacturing with cutting-edge technology and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-dark rounded-xl p-6 text-center hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`feature-${index}`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Products */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our premium collection of high-quality fabrics, from luxury textiles to sustainable materials.
            </p>
          </div>

          <ProductFilter products={products.slice(0, 6)} />
        </div>
      </Section>

      {/* Pricing Calculator */}
      <Section background="muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Instant Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Calculate pricing for your fabric requirements with our dynamic pricing calculator including bulk discounts.
            </p>
          </div>

          <PricingCalculator />
        </div>
      </Section>

      {/* Customer Reviews */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <Reviews />
        </div>
      </Section>
    </div>
  );
}
