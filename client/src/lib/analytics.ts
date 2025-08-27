// Web vitals and analytics tracking

interface WebVital {
  name: string;
  value: number;
  delta: number;
  id: string;
}

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

// Track web vitals for performance monitoring
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Dynamic import to avoid bundling in production if not needed
  import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
    onCLS(reportWebVital);
    onINP(reportWebVital);
    onFCP(reportWebVital);
    onLCP(reportWebVital);
    onTTFB(reportWebVital);
  }).catch(() => {
    // web-vitals not available, skip tracking
  });
}

function reportWebVital(metric: WebVital) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value);
  }

  // In production, you would send this to your analytics service
  // Example: sendToAnalytics('web-vital', metric);
}

// Track custom events
export function trackEvent(name: string, properties?: Record<string, any>) {
  const event: AnalyticsEvent = {
    name,
    properties,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event);
  }

  // In production, you would send this to your analytics service
  // Example: sendToAnalytics('custom-event', event);
}

// Track page views
export function trackPageView(path: string) {
  trackEvent('page_view', { path });
}

// Track CTA clicks
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', { cta_name: ctaName, location });
}

// Track form submissions
export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent('form_submit', { form_name: formName, success });
}

// Track product interactions
export function trackProductView(productId: string, productName: string) {
  trackEvent('product_view', { product_id: productId, product_name: productName });
}

// Track search queries
export function trackSearch(query: string, resultCount: number) {
  trackEvent('search', { query, result_count: resultCount });
}

// Error tracking
export function trackError(error: Error, context?: string) {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    context,
  });
}
