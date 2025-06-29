import { test, expect } from '@playwright/test';

test('verify structured data is present', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('http://localhost:3000');
  
  // Check for JSON-LD script tags
  const jsonLdScripts = await page.$$eval(
    'script[type="application/ld+json"]',
    (scripts) => scripts.map(script => {
      try {
        return JSON.parse(script.textContent || '{}');
      } catch (e) {
        console.error('Error parsing JSON-LD:', e);
        return null;
      }
    }).filter(Boolean)
  );

  console.log(`Found ${jsonLdScripts.length} JSON-LD script tags`);
  
  // Verify we have at least one JSON-LD script
  expect(jsonLdScripts.length).toBeGreaterThan(0);
  
  // Check for expected schema types
  const schemaTypes = jsonLdScripts.map(schema => schema['@type']);
  console.log('Found schema types:', schemaTypes);
  
  // Verify expected schema types are present
  const expectedTypes = ['Organization', 'LocalBusiness', 'WebSite'];
  expectedTypes.forEach(type => {
    expect(schemaTypes).toContain(type);
  });
  
  // Check for required organization properties
  const organization = jsonLdScripts.find(s => s['@type'] === 'Organization');
  if (organization) {
    expect(organization.name).toBeTruthy();
    expect(organization.url).toBeTruthy();
    console.log('Organization data verified:', {
      name: organization.name,
      url: organization.url
    });
  }
  
  // Check for required local business properties
  const localBusiness = jsonLdScripts.find(s => s['@type'] === 'LocalBusiness');
  if (localBusiness) {
    expect(localBusiness.name).toBeTruthy();
    expect(localBusiness.address).toBeTruthy();
    console.log('LocalBusiness data verified:', {
      name: localBusiness.name,
      address: localBusiness.address
    });
  }
});
