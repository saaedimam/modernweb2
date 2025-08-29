import type { VercelRequest, VercelResponse } from '@vercel/node';

interface NewsletterData {
  email: string;
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
    const { email }: NewsletterData = req.body;

    // Basic validation
    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // In production, you would:
    // 1. Add to newsletter service (Mailchimp, ConvertKit, etc.)
    // 2. Send welcome email
    // 3. Save to database
    // 4. Track subscription analytics

    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString(),
      source: 'website'
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    });
  }
}