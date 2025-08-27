import { FabricKey } from '@/types';

export const fabricOptions: Array<{ key: FabricKey; label: string; price: number }> = [
  { key: 'cotton', label: 'Premium Cotton', price: 450 },
  { key: 'silk', label: 'Mulberry Silk', price: 1200 },
  { key: 'wool', label: 'Merino Wool', price: 850 },
  { key: 'synthetic', label: 'Tech Performance', price: 680 },
  { key: 'eco-blend', label: 'Eco Blend', price: 520 },
  { key: 'velvet', label: 'Luxury Velvet', price: 950 },
];

export function getFabricByKey(key: FabricKey) {
  return fabricOptions.find(fabric => fabric.key === key);
}

export function getFabricPrice(key: FabricKey): number {
  const fabric = getFabricByKey(key);
  return fabric?.price || 0;
}
