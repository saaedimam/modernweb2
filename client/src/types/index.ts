export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: 'cotton' | 'silk' | 'wool' | 'synthetic' | 'eco-friendly';
  image: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  email?: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export interface StockRow {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  exchange: 'DSE' | 'CSE';
  updated: string;
}

export type FabricKey = 'cotton' | 'silk' | 'wool' | 'synthetic' | 'eco-blend' | 'velvet';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: 'quote' | 'partnership' | 'sustainability' | 'other';
  message: string;
}

export interface NewsletterFormData {
  email: string;
  consent: boolean;
}

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}
