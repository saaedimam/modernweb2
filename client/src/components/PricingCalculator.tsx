import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { calculatePrice, formatCurrency, getFabricDisplayName } from '@/lib/pricing';
import { fabricOptions } from '@/data/fabrics';
import { FabricKey } from '@/types';

export default function PricingCalculator() {
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedFabric, setSelectedFabric] = useState<FabricKey | ''>('');
  
  const totalPrice = useMemo(() => {
    if (!quantity || !selectedFabric) return 0;
    return calculatePrice(quantity, selectedFabric);
  }, [quantity, selectedFabric]);

  const discountPercentage = useMemo(() => {
    if (quantity >= 1000) return 15;
    if (quantity >= 500) return 10;
    if (quantity >= 100) return 5;
    return 0;
  }, [quantity]);

  const originalPrice = useMemo(() => {
    if (!quantity || !selectedFabric) return 0;
    const fabric = fabricOptions.find(f => f.key === selectedFabric);
    return fabric ? quantity * fabric.price : 0;
  }, [quantity, selectedFabric]);

  const savings = originalPrice - totalPrice;

  return (
    <Card className="glass-dark max-w-2xl mx-auto" data-testid="pricing-calculator">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-2xl">
          <Calculator className="w-6 h-6 text-primary" />
          <span>Dynamic Pricing Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (meters) *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              step="1"
              value={quantity || ''}
              onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              placeholder="Enter quantity..."
              className="w-full"
              data-testid="input-quantity"
            />
          </div>
          
          {/* Fabric Selection */}
          <div className="space-y-2">
            <Label>Fabric Type *</Label>
            <Select value={selectedFabric} onValueChange={(value: FabricKey) => setSelectedFabric(value)}>
              <SelectTrigger data-testid="select-fabric-trigger">
                <SelectValue placeholder="Select fabric type" />
              </SelectTrigger>
              <SelectContent>
                {fabricOptions.map((fabric) => (
                  <SelectItem key={fabric.key} value={fabric.key} data-testid={`select-fabric-${fabric.key}`}>
                    {fabric.label} - ৳{fabric.price.toLocaleString()}/m
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculation Results */}
        <motion.div
          className="p-6 bg-primary/10 rounded-lg border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            {/* Unit Price */}
            {selectedFabric && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Unit Price:</span>
                <span data-testid="unit-price">
                  {formatCurrency(fabricOptions.find(f => f.key === selectedFabric)?.price || 0)}/m
                </span>
              </div>
            )}
            
            {/* Original Total */}
            {originalPrice > 0 && discountPercentage > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Original Total:</span>
                <span className="line-through text-muted-foreground" data-testid="original-price">
                  {formatCurrency(originalPrice)}
                </span>
              </div>
            )}
            
            {/* Discount */}
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Bulk Discount:</span>
                  <Badge variant="secondary" data-testid="discount-badge">
                    {discountPercentage}% OFF
                  </Badge>
                </div>
                <span className="text-chart-2 font-medium" data-testid="savings-amount">
                  -{formatCurrency(savings)}
                </span>
              </div>
            )}
            
            {/* Total Price */}
            <div className="flex justify-between items-center text-xl font-bold border-t border-primary/20 pt-4">
              <span>Total Price:</span>
              <motion.span
                className="text-primary"
                key={totalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                data-testid="total-price"
              >
                {formatCurrency(totalPrice)}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Bulk Discount Information */}
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Bulk Discount Tiers:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className={`p-2 rounded ${quantity >= 100 && quantity < 500 ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                  <div className="font-medium">100+ meters</div>
                  <div className="text-muted-foreground">5% discount</div>
                </div>
                <div className={`p-2 rounded ${quantity >= 500 && quantity < 1000 ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                  <div className="font-medium">500+ meters</div>
                  <div className="text-muted-foreground">10% discount</div>
                </div>
                <div className={`p-2 rounded ${quantity >= 1000 ? 'bg-primary/20 border border-primary' : 'bg-muted/50'}`}>
                  <div className="font-medium">1000+ meters</div>
                  <div className="text-muted-foreground">15% discount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
