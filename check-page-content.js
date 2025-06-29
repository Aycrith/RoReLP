const http = require('http');
const url = 'http://localhost:3000';

console.log('Fetching page content from:', url);

http.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Page fetch complete. Checking for structured data...\n');
    
    // Check for JSON-LD
    const jsonLdMatches = data.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    
    if (jsonLdMatches.length > 0) {
      console.log('✅ Found', jsonLdMatches.length, 'JSON-LD script tags:');
      jsonLdMatches.forEach((match, i) => {
        console.log(`\n--- JSON-LD #${i + 1} ---`);
        console.log(match.substring(0, 500) + (match.length > 500 ? '...' : ''));
      });
    } else {
      console.log('❌ No JSON-LD structured data found in the page.');
      
      // Check for any script tags that might contain schema.org data
      const scriptTags = data.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
      const potentialJsonLd = scriptTags.filter(tag => 
        tag.includes('@context') && 
        (tag.includes('schema.org') || tag.includes('json'))
      );
      
      if (potentialJsonLd.length > 0) {
        console.log('\nℹ️ Found potential JSON-LD content in script tags:');
        potentialJsonLd.forEach((tag, i) => {
          console.log(`\n--- Potential JSON-LD #${i + 1} ---`);
          console.log(tag.substring(0, 500) + (tag.length > 500 ? '...' : ''));
        });
      }
    }
    
    // Check for schema.org markup in the page
    const schemaOrgMatches = data.match(/item(type|scope)=\"[^\"]*\"/gi) || [];
    if (schemaOrgMatches.length > 0) {
      console.log('\nℹ️ Found schema.org markup in the page:');
      const uniqueSchemas = [...new Set(schemaOrgMatches)];
      uniqueSchemas.forEach(schema => console.log(`- ${schema}`));
    }
    
    // Check for common SEO meta tags
    const metaTags = data.match(/<meta[^>]*(name|property)="(description|keywords|og:|twitter:)[^>]*>/gi) || [];
    if (metaTags.length > 0) {
      console.log('\n🔍 Found SEO meta tags:');
      metaTags.forEach(tag => console.log(`- ${tag}`));
    }
    
    console.log('\n✅ Page content analysis complete.');
  });
  
}).on('error', (e) => {
  console.error(`Error fetching page: ${e.message}`);
});
