import { useState } from 'react';
import { Share2, Link, Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';

interface SocialShareProps {
  title?: string;
  url?: string;
  description?: string;
}

export default function SocialShare({ 
  title = 'Kattali Textile Ltd - Premium Textile Manufacturing',
  url = window.location.href,
  description = 'Leading textile manufacturer specializing in premium fabrics, sustainable production, and innovative manufacturing solutions.'
}: SocialShareProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: 'Link Copied',
        description: 'The link has been copied to your clipboard.',
      });
      
      trackEvent('share', { method: 'copy_link', url });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Failed to copy link to clipboard.',
      });
    }
  };

  const handleSocialShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    trackEvent('share', { method: platform, url });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" data-testid="button-share">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" data-testid="share-popover">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Share this page</h4>
          
          <div className="space-y-2">
            {/* Copy Link */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleCopyLink}
              data-testid="button-copy-link"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2 text-chart-2" />
              ) : (
                <Link className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            
            {/* Facebook */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleSocialShare('facebook')}
              data-testid="button-share-facebook"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
            
            {/* Twitter */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleSocialShare('twitter')}
              data-testid="button-share-twitter"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            
            {/* LinkedIn */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleSocialShare('linkedin')}
              data-testid="button-share-linkedin"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
