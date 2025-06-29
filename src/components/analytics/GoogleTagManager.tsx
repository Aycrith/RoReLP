'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GTM_ID } from '@/lib/gtm';



const GoogleTagManager = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GTM if we're in the browser and have a GTM ID
    if (typeof window !== 'undefined' && GTM_ID) {
      // Ensure GTM is loaded
      if (!window.dataLayer) {
        window.dataLayer = [];
      }

      // Push the initial data layer
      (window.dataLayer as unknown as Array<Record<string, unknown>>).push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      // Load the GTM script
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(gtmScript);
    }
  }, []);

  useEffect(() => {
    // Track page views when URL changes
    if (pathname && typeof window !== 'undefined' && window.dataLayer) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      (window.dataLayer as unknown as Array<Record<string, unknown>>).push({
        event: 'pageview',
        page_path: url
      });
    }
  }, [pathname, searchParams]);

  return null;
};

// Helper function to get the GTM iframe
const GTMNoScript = () => (
  <noscript>
    <iframe
      src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
);

export { GoogleTagManager, GTMNoScript };
