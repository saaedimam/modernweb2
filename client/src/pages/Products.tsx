import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductFilter from '@/components/ProductFilter';
import Reviews from '@/components/Reviews';
import PricingCalculator from '@/components/PricingCalculator';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { Product } from '@/types';
import { trackPageView, trackProductView } from '@/lib/analytics';
import { Zap, Leaf, Award, Truck } from 'lucide-react';

const categories = [
  {
    name: 'Premium Cotton',
    description: 'Ultra-soft, breathable cotton perfect for luxury apparel',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    features: ['Organic certified', 'GOTS compliant', 'Pre-shrunk'],
  },
  {
    name: 'Luxury Silk',
    description: 'Finest quality silk with natural sheen and exceptional drape',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    features: ['Mulberry silk', 'Natural protein fiber', 'Hypoallergenic'],
  },
  {
    name: 'Technical Fabrics',
    description: 'Advanced performance fabrics for modern applications',
    image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    features: ['Moisture-wicking', 'UV protection', 'Antimicrobial'],
  },
];

const features = [
  {
    icon: Zap,
    title: 'Advanced Technology',
    description: 'State-of-the-art manufacturing with AI-powered quality control',
  },
  {
    icon: Leaf,
    title: 'Sustainable Production',
    description: 'Eco-friendly processes with minimal environmental impact',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'ISO 9001 certified with rigorous testing standards',
  },
  {
    icon: Truck,
    title: 'Global Delivery',
    description: 'Reliable worldwide shipping with real-time tracking',
  },
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    trackPageView('/products');
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    trackProductView(product.id, product.name);
  };

  return (
    <div className="pt-20" data-testid="products-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Product Range</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Discover our extensive collection of high-quality fabrics, from luxury textiles to sustainable materials for every application.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Product Categories */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Product Categories</h2>
            <p className="text-xl text-muted-foreground">
              Explore our diverse range of premium textile solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`category-${index}`}
              >
                <Card className="glass-dark hover-lift card-3d overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Product Filter and Grid */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">All Products</h2>
            <p className="text-xl text-muted-foreground">
              Browse our complete collection with advanced filtering options
            </p>
          </div>

          <ProductFilter products={products} onProductSelect={handleProductSelect} />
        </div>
      </Section>

      {/* Product Features */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Our Products</h2>
            <p className="text-xl text-muted-foreground">
              Superior quality and innovation in every fabric we manufacture
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
                data-testid={`product-feature-${index}`}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing Calculator */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Calculate Your Price</h2>
            <p className="text-xl text-muted-foreground">
              Get instant pricing with bulk discounts for your fabric requirements
            </p>
          </div>

          <PricingCalculator />
        </div>
      </Section>

      {/* Reviews Section */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <Reviews />
        </div>
      </Section>
    </div>
  );
}
