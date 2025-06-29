'use client';

import React from 'react';
import Head from 'next/head';
import { generateStructuredData } from '@/lib/structuredData';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * StructuredData component renders JSON-LD structured data in the document head
 * This helps search engines understand the content and context of the page
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = generateStructuredData(Array.isArray(data) ? data : [data]);
  
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd}
        key="structured-data"
      />
    </Head>
  );
};

export default StructuredData;
