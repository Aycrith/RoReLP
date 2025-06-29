// Type definitions for Google Tag Manager and Analytics

declare global {
  interface Window {
    // Google Tag Manager Data Layer
    dataLayer?: Array<Record<string, unknown>>;
    
    // Google Analytics / Global Site Tag
    gtag?: (...args: unknown[]) => void;
    
    // For Google Tag Manager
    google_tag_manager?: {
      [key: string]: unknown;
    };
  }
}

export {};
