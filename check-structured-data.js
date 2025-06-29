const https = require('https');
const http = require('http');

const url = 'http://localhost:3000';

const client = url.startsWith('https') ? https : http;

client.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Check for JSON-LD script tags
    const jsonLdMatches = data.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    
    if (jsonLdMatches.length > 0) {
      console.log('Found JSON-LD structured data:');
      jsonLdMatches.forEach((match, index) => {
        console.log(`\n--- JSON-LD #${index + 1} ---`);
        // Extract and format the JSON content
        const jsonContent = match.replace(/<[^>]*>/g, '').trim();
        try {
          // Try to parse and pretty-print the JSON
          const jsonObj = JSON.parse(jsonContent);
          console.log(JSON.stringify(jsonObj, null, 2));
        } catch (e) {
          console.log('Could not parse as JSON:');
          console.log(jsonContent.substring(0, 500) + (jsonContent.length > 500 ? '...' : ''));
        }
      });
    } else {
      console.log('No JSON-LD structured data found in the page.');
      
      // Check for any script tags that might contain structured data
      const scriptTags = data.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
      const potentialJsonLd = scriptTags.filter(tag => 
        tag.includes('@context') && 
        (tag.includes('schema.org') || tag.includes('json'))
      );
      
      if (potentialJsonLd.length > 0) {
        console.log('\nFound potential JSON-LD content in script tags:');
        potentialJsonLd.forEach((tag, index) => {
          console.log(`\n--- Potential JSON-LD #${index + 1} ---`);
          console.log(tag.substring(0, 500) + (tag.length > 500 ? '...' : ''));
        });
      }
    }
    
    // Check for any schema.org markup in the page
    const schemaOrgMatches = data.match(/item(type|scope)=\"[^\"]*\"/gi) || [];
    if (schemaOrgMatches.length > 0) {
      console.log('\nFound schema.org markup in the page:');
      const uniqueSchemas = [...new Set(schemaOrgMatches)];
      uniqueSchemas.forEach(schema => console.log(`- ${schema}`));
    }
  });
  
}).on('error', (e) => {
  console.error(`Error: ${e.message}`);
});
