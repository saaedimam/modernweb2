// A/B testing utilities using localStorage for persistence

type VariantKey = string;
type TestKey = string;

interface ABTest {
  key: TestKey;
  variants: VariantKey[];
  weights?: number[];
}

// Get variant assignment for a test
export function getVariant(testKey: TestKey, variants: VariantKey[], weights?: number[]): VariantKey {
  // Check if user already has an assignment
  const storageKey = `ab_test_${testKey}`;
  const existing = localStorage.getItem(storageKey);
  
  if (existing && variants.includes(existing)) {
    return existing;
  }

  // Assign new variant based on weights or equal distribution
  let selectedVariant: VariantKey;
  
  if (weights && weights.length === variants.length) {
    selectedVariant = getWeightedRandomVariant(variants, weights);
  } else {
    selectedVariant = variants[Math.floor(Math.random() * variants.length)];
  }

  // Store assignment
  localStorage.setItem(storageKey, selectedVariant);
  
  return selectedVariant;
}

// Get weighted random variant
function getWeightedRandomVariant(variants: VariantKey[], weights: number[]): VariantKey {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < variants.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return variants[i];
    }
  }
  
  return variants[0]; // fallback
}

// Check if user is in a specific variant
export function isVariant(testKey: TestKey, variant: VariantKey): boolean {
  const storageKey = `ab_test_${testKey}`;
  return localStorage.getItem(storageKey) === variant;
}

// Force set variant (useful for testing)
export function setVariant(testKey: TestKey, variant: VariantKey): void {
  const storageKey = `ab_test_${testKey}`;
  localStorage.setItem(storageKey, variant);
}

// Clear all test assignments
export function clearAllTests(): void {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('ab_test_'));
  keys.forEach(key => localStorage.removeItem(key));
}

// Example test definitions
export const AB_TESTS = {
  HERO_CTA: {
    key: 'hero_cta',
    variants: ['explore_products', 'get_quote'],
    weights: [0.5, 0.5],
  },
  PRICING_DISPLAY: {
    key: 'pricing_display',
    variants: ['table', 'cards'],
    weights: [0.6, 0.4],
  },
} as const;
