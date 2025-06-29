'use client';

import { useEffect } from 'react';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structuredData';

/**
 * Component that injects structured data (JSON-LD) into the document head
 * Uses a client-side effect to dynamically add script tags
 */
export default function StructuredData() {
  useEffect(() => {
    // Create script tags for each schema
    const schemas = [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      generateWebsiteSchema()
    ];

    schemas.forEach((schema, index) => {
      // Create script element
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      
      // Add to document head
      document.head.appendChild(script);
    });

    // Cleanup function to remove script tags on component unmount
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
