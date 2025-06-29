// Google Tag Manager Container ID
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';



// Check if GTM is available
export const isGTMAvailable = (): boolean => {
  return typeof window !== 'undefined' && Array.isArray(window.dataLayer) && !!GTM_ID;
};

// Push to data layer
export const pushToDataLayer = (...args: unknown[]): void => {
  if (isGTMAvailable() && window.dataLayer) {
    window.dataLayer.push(...args as Record<string, unknown>[]);
  } else if (process.env.NODE_ENV === 'development') {
    console.debug('[GTM] Data layer not available. Would have pushed:', args);
  }
};

// Track page view
export const pageview = (url: string): void => {
  if (!isGTMAvailable()) return;
  
  pushToDataLayer('pageview', url);
};

// Track custom events
type EventParams = {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

export const event = (params: EventParams): void => {
  if (!isGTMAvailable()) return;
  
  const { event: eventName, ...rest } = params;
  
  pushToDataLayer('event', eventName, rest);
};

// Enhanced ecommerce events
export const ecommerceEvent = (eventName: string, data: Record<string, unknown>): void => {
  if (!isGTMAvailable()) return;
  
  pushToDataLayer('event', eventName, {
    ecommerce: data,
  });
};

// User interaction tracking
export const trackClick = (element: string, category = 'UI Interaction'): void => {
  pushToDataLayer('event', 'element_click', {
    category,
    action: 'click',
    label: element,
  });
};

// Form interaction tracking
export const trackFormSubmit = (formName: string, status: 'success' | 'error' = 'success'): void => {
  pushToDataLayer('event', 'form_submit', {
    category: 'Form',
    action: 'submit',
    label: formName,
    status,
  });
};

// Error tracking
export const trackError = (error: Error, context: Record<string, unknown> = {}): void => {
  pushToDataLayer('event', 'error_occurred', {
    category: 'Error',
    action: 'error',
    label: error.message,
    ...context,
    stack: error.stack,
  });
};
