import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import NewsletterForm from '@/components/NewsletterForm';
import { submitContactForm } from '@/lib/api';
import { trackPageView, trackFormSubmit } from '@/lib/analytics';
import { ContactFormData } from '@/types';

const offices = [
  {
    title: 'Head Office',
    address: ['Kattali Industrial Area', 'Chittagong-4000, Bangladesh'],
    phone: '+880-31-2345678',
    icon: MapPin,
    color: 'bg-primary',
  },
  {
    title: 'Corporate Office',
    address: ['Gulshan Avenue', 'Dhaka-1212, Bangladesh'],
    phone: '+880-2-9876543',
    icon: MapPin,
    color: 'bg-chart-1',
  },
];

const quickContacts = [
  {
    title: 'Sales Hotline',
    value: '+880-1700-123456',
    icon: Phone,
    color: 'bg-chart-2',
  },
  {
    title: 'Email',
    value: 'info@kattalitextile.com',
    icon: Mail,
    color: 'bg-chart-4',
  },
  {
    title: 'Business Hours',
    value: 'Mon-Fri: 9AM-6PM',
    icon: Clock,
    color: 'bg-chart-5',
  },
];

const inquiryTypes = [
  { value: 'quote', label: 'Request Quote' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'quote',
    message: '',
  });

  useEffect(() => {
    trackPageView('/contact');
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: 'Message Sent Successfully!',
          description: result.message,
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          inquiryType: 'quote',
          message: '',
        });
        
        trackFormSubmit('contact', true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
      
      trackFormSubmit('contact', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20" data-testid="contact-page">
      {/* Hero Section */}
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to start your next project? Contact our team of experts to discuss your textile needs and discover how we can bring your vision to life.
          </motion.p>
        </div>
      </Section>

      {/* Contact Form and Info */}
      <Section background="muted">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                  
                  {isSubmitted ? (
                    <div className="text-center py-8" data-testid="contact-success">
                      <CheckCircle className="w-16 h-16 text-chart-2 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Message Sent Successfully!</h4>
                      <p className="text-muted-foreground mb-6">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            First Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Your first name"
                            required
                            data-testid="input-first-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Last Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Your last name"
                            required
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          required
                          data-testid="input-email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+880-1700-123456"
                          data-testid="input-phone"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Inquiry Type <span className="text-destructive">*</span>
                        </label>
                        <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger data-testid="select-inquiry-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us about your project or inquiry..."
                          rows={4}
                          required
                          data-testid="textarea-message"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                        data-testid="button-submit-contact"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Office Locations */}
              <Card className="glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Our Locations</h3>
                  <div className="space-y-6">
                    {offices.map((office, index) => (
                      <div key={office.title} className="flex items-start space-x-4" data-testid={`office-${index}`}>
                        <div className={`w-12 h-12 ${office.color} rounded-lg flex items-center justify-center`}>
                          <office.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{office.title}</h4>
                          <div className="text-muted-foreground space-y-1">
                            {office.address.map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                            <p>{office.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                  <div className="space-y-4">
                    {quickContacts.map((contact, index) => (
                      <div key={contact.title} className="flex items-center space-x-4" data-testid={`quick-contact-${index}`}>
                        <div className={`w-10 h-10 ${contact.color} rounded-lg flex items-center justify-center`}>
                          <contact.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.title}</p>
                          <p className="text-muted-foreground">{contact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="glass-dark">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
                  <p className="text-muted-foreground mb-6">
                    Stay updated with our latest innovations, sustainability initiatives, and industry insights.
                  </p>
                  <NewsletterForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Map Section */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <Card className="glass-dark overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 bg-muted flex items-center justify-center">
                {/* Placeholder for map - in a real app, you would integrate with Google Maps or similar */}
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    Map integration available with Google Maps API
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
