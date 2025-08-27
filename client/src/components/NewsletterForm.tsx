import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { subscribeNewsletter } from '@/lib/api';
import { trackFormSubmit } from '@/lib/analytics';

interface NewsletterFormProps {
  inline?: boolean;
}

export default function NewsletterForm({ inline = false }: NewsletterFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        variant: 'destructive',
        title: 'Email Required',
        description: 'Please enter your email address.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    if (!consent && !inline) {
      toast({
        variant: 'destructive',
        title: 'Consent Required',
        description: 'Please agree to receive our newsletter.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeNewsletter(email);
      
      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        setConsent(false);
        
        toast({
          title: 'Success!',
          description: result.message,
        });
        
        trackFormSubmit('newsletter', true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
      
      trackFormSubmit('newsletter', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="flex items-center space-x-2 text-chart-2" data-testid="newsletter-success">
        <CheckCircle className="w-5 h-5" />
        <span>Successfully subscribed!</span>
      </div>
    );
  }

  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-3" data-testid="newsletter-form-inline">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          disabled={isSubmitting}
          data-testid="input-newsletter-email"
        />
        <Button 
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
          data-testid="button-newsletter-subscribe"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="newsletter-form">
      <div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={isSubmitting}
          data-testid="input-newsletter-email"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter-consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked as boolean)}
          data-testid="checkbox-newsletter-consent"
        />
        <label 
          htmlFor="newsletter-consent" 
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I agree to receive newsletters and updates about products and sustainability initiatives.
        </label>
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isSubmitting || !consent}
        data-testid="button-newsletter-subscribe"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            <span>Subscribing...</span>
          </div>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Subscribe to Newsletter
          </>
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground">
        By subscribing, you agree to our Privacy Policy and Terms of Service. You can unsubscribe at any time.
      </p>
    </form>
  );
}
