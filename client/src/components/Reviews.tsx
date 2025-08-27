import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/types';
import { trackFormSubmit } from '@/lib/analytics';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Michael Johnson',
    email: 'michael@fashionbrand.uk',
    rating: 5,
    comment: 'Exceptional quality fabrics with consistent delivery timelines. Kattali Textile has been our trusted partner for premium textile sourcing for over 8 years.',
    createdAt: '2024-01-15T10:30:00Z',
    verified: true,
  },
  {
    id: '2',
    author: 'Sarah Chen',
    email: 'sarah@sustainablefashion.de',
    rating: 5,
    comment: 'Their sustainable manufacturing practices align perfectly with our brand values. The eco-friendly fabrics are of outstanding quality.',
    createdAt: '2024-01-10T14:20:00Z',
    verified: true,
  },
  {
    id: '3',
    author: 'Ahmed Rahman',
    email: 'ahmed@textileimports.bd',
    rating: 4,
    comment: 'Great quality products and professional service. The technical support team is very responsive and helpful.',
    createdAt: '2024-01-08T09:45:00Z',
    verified: false,
  },
];

export default function Reviews() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    rating: 0,
    comment: '',
  });

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => {
      const filled = i < rating;
      return (
        <Star
          key={i}
          className={`w-5 h-5 cursor-pointer transition-colors ${
            filled 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-muted-foreground hover:text-yellow-400'
          }`}
          onClick={() => interactive && onRatingChange?.(i + 1)}
        />
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author.trim() || !formData.comment.trim() || formData.rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all required fields and provide a rating.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: Review = {
        id: Date.now().toString(),
        author: formData.author,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
        createdAt: new Date().toISOString(),
        verified: false,
      };

      setReviews(prev => [newReview, ...prev]);
      setFormData({ author: '', email: '', rating: 0, comment: '' });

      toast({
        title: 'Review Submitted',
        description: 'Thank you for your feedback! Your review will be published after verification.',
      });

      trackFormSubmit('review', true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'Failed to submit your review. Please try again.',
      });
      trackFormSubmit('review', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-12" data-testid="reviews-section">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Customer Reviews</h2>
        <p className="text-xl text-muted-foreground mb-8">
          What our global partners say about our products and services.
        </p>
        
        {/* Average Rating */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <AnimatePresence>
          {reviews.slice(0, 4).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`review-card-${review.id}`}
            >
              <Card className="glass-dark hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.rating}.0 rating
                      </span>
                    </div>
                    {review.verified && (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{review.comment}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
                        <p className="text-xs text-muted-foreground">
                          {dayjs(review.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Review Form */}
      <Card className="glass-dark max-w-2xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Your name"
                  required
                  data-testid="input-reviewer-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  data-testid="input-reviewer-email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">
                Rating <span className="text-destructive">*</span>
              </label>
              <div className="flex space-x-2" data-testid="rating-stars">
                {renderStars(formData.rating, true, (rating) => 
                  setFormData({ ...formData, rating })
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Review <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Share your experience with our products and services..."
                rows={4}
                required
                data-testid="textarea-review"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
              data-testid="button-submit-review"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
