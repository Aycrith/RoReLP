// Google Analytics measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Log page views
 * @param url - The URL of the page being viewed
 */
export const pageview = (url: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  } catch (error) {
    console.error('Error tracking pageview:', error);
  }
};

/**
 * Log specific events
 * @param params - Event parameters
 */
export const event = (params: EventParams): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const { action, category, label, value, ...rest } = params;
  
  try {
    window.gtag('event', action, {
      event_category: category,
      ...(label && { event_label: label }),
      ...(value !== undefined && { value }),
      ...rest,
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Initialize Google Analytics
 */
export const initGA = (): void => {
  // Skip if not in browser or missing measurement ID
  if (
    typeof window === 'undefined' ||
    !GA_MEASUREMENT_ID ||
    !document
  ) {
    return;
  }

  // Skip if already initialized
  if (window.gtag && typeof window.gtag === 'function') {
    return;
  }

  try {
    // Initialize data layer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Define gtag function with proper typing
    const gtagFn = (...args: unknown[]): void => {
      window.dataLayer?.push(...args as Record<string, unknown>[]);
    };
    
    // Cast to Window['gtag'] to match our global type
    window.gtag = gtagFn as unknown as Window['gtag'];

    // Set the initial timestamp
    if (window.gtag) {
      window.gtag('js', new Date().toISOString());

      // Configure gtag
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
        send_page_view: false, // We'll handle page views manually
        debug_mode: process.env.NODE_ENV === 'development',
      });
    }

    // Load the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onerror = () => {
      console.error('Failed to load Google Analytics script');
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
};

/**
 * Track page views with additional context
 * @param url - The URL of the page being viewed
 */
export const trackPageView = (url: string): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  try {
    pageview(url);
    
    // Additional context can be added here
    event({
      action: 'page_view',
      category: 'Engagement',
      label: url,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};
