/**
 * Generates structured data in JSON-LD format for the landing page
 * This helps search engines understand the content and context of the page
 */

type Organization = {
  '@type': string;
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  };
};

type LocalBusiness = Omit<Organization, '@type'> & {
  '@type': 'LocalBusiness';
  priceRange?: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification?: {
    '@type': string;
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }[];
};

type WebSite = {
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
};

/**
 * Generates organization schema for the business
 */
export const generateOrganizationSchema = (): Organization => ({
  '@type': 'Organization',
  name: 'Royalty Repair',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://royaltyrepair.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://royaltyrepair.com'}/logo.png`,
  sameAs: [
    'https://www.facebook.com/royaltyrepair',
    'https://www.instagram.com/royaltyrepair',
    'https://www.linkedin.com/company/royaltyrepair'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English']
  }
});

/**
 * Generates local business schema for the repair shop
 */
export const generateLocalBusinessSchema = (): LocalBusiness => {
  const orgSchema = generateOrganizationSchema();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { '@type': _, ...orgWithoutType } = orgSchema;
  return {
    '@type': 'LocalBusiness',
    ...orgWithoutType,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Repair Street',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78701',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '30.2672',
    longitude: '-97.7431'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '17:00'
    }
  ]
  };
};

/**
 * Generates website schema for search functionality
 */
export const generateWebsiteSchema = (): WebSite => ({
  '@type': 'WebSite',
  name: 'Royalty Repair',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://royaltyrepair.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://royaltyrepair.com'}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

/**
 * Generates FAQ schema for the FAQ section
 */
export const generateFaqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * Generates breadcrumb schema for better navigation understanding
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; item: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item
  }))
});

/**
 * Combines multiple schemas into a single script tag
 */
export const generateStructuredData = (schemas: Array<object>) => {
  return {
    __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2)
  };
};
