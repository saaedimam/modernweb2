import { FabricKey } from '@/types';

// Fabric pricing data
export const fabricPrices: Record<FabricKey, number> = {
  cotton: 450,
  silk: 1200,
  wool: 850,
  synthetic: 680,
  'eco-blend': 520,
  velvet: 950,
};

// Calculate total price with bulk discounts
export function calculatePrice(quantity: number, fabric: FabricKey): number {
  if (!quantity || quantity <= 0) return 0;
  if (!fabric || !(fabric in fabricPrices)) return 0;

  const unitPrice = fabricPrices[fabric];
  let total = quantity * unitPrice;

  // Apply bulk discounts
  if (quantity >= 1000) {
    total *= 0.85; // 15% discount for 1000+ meters
  } else if (quantity >= 500) {
    total *= 0.90; // 10% discount for 500+ meters
  } else if (quantity >= 100) {
    total *= 0.95; // 5% discount for 100+ meters
  }

  return Math.round(total);
}

// Format currency with thousands separator
export function formatCurrency(amount: number, currency: string = '৳'): string {
  return `${currency}${amount.toLocaleString()}`;
}

// Get fabric name for display
export function getFabricDisplayName(key: FabricKey): string {
  const names: Record<FabricKey, string> = {
    cotton: 'Premium Cotton',
    silk: 'Mulberry Silk',
    wool: 'Merino Wool',
    synthetic: 'Tech Performance',
    'eco-blend': 'Eco Blend',
    velvet: 'Luxury Velvet',
  };
  return names[key] || key;
}
