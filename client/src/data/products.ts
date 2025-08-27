import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton',
    description: 'Ultra-soft, breathable cotton perfect for luxury apparel and home textiles.',
    price: 450,
    currency: '৳',
    category: 'cotton',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['organic', 'breathable', 'luxury'],
  },
  {
    id: '2',
    name: 'Mulberry Silk',
    description: 'Finest quality mulberry silk with natural sheen and exceptional drape.',
    price: 1200,
    currency: '৳',
    category: 'silk',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['premium', 'natural', 'luxury'],
  },
  {
    id: '3',
    name: 'Merino Wool',
    description: 'Temperature-regulating merino wool ideal for premium garments.',
    price: 850,
    currency: '৳',
    category: 'wool',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    tags: ['sustainable', 'warm', 'premium'],
  },
  {
    id: '4',
    name: 'Tech Performance',
    description: 'Advanced moisture-wicking fabric for athletic and outdoor wear.',
    price: 680,
    currency: '৳',
    category: 'synthetic',
    image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.6,
    reviewCount: 201,
    tags: ['innovation', 'performance', 'technical'],
  },
  {
    id: '5',
    name: 'Eco Blend',
    description: 'Sustainable fabric made from recycled materials and organic fibers.',
    price: 520,
    currency: '৳',
    category: 'eco-friendly',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.5,
    reviewCount: 78,
    tags: ['recycled', 'eco-friendly', 'sustainable'],
  },
  {
    id: '6',
    name: 'Luxury Velvet',
    description: 'Rich, plush velvet with deep color saturation for upscale applications.',
    price: 950,
    currency: '৳',
    category: 'synthetic',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    inStock: true,
    rating: 4.8,
    reviewCount: 95,
    tags: ['luxury', 'plush', 'premium'],
  },
];

export function getProductsByCategory(category?: string): Product[] {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
