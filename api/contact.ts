import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: 'quote' | 'partnership' | 'sustainability' | 'other';
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Basic validation
    if (!formData.firstName?.trim() || !formData.lastName?.trim() || 
        !formData.email?.trim() || !formData.message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-reply email

    console.log('Contact form submission:', {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      type: formData.inquiryType,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
}