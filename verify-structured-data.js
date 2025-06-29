const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  headers: {
    'Accept': 'text/html',
  },
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Check for JSON-LD scripts
    const jsonLdRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let count = 0;
    
    console.log('Searching for JSON-LD scripts...');
    
    while ((match = jsonLdRegex.exec(data)) !== null) {
      count++;
      try {
        const json = JSON.parse(match[1]);
        console.log(`\nFound JSON-LD Script #${count}:`);
        console.log(`Type: ${json['@type']}`);
        console.log('Content:', JSON.stringify(json, null, 2));
      } catch (e) {
        console.error(`Error parsing JSON-LD script #${count}:`, e.message);
      }
    }
    
    console.log(`\nTotal JSON-LD scripts found: ${count}`);
    
    if (count === 0) {
      console.log('No JSON-LD scripts found in the page source.');
    }
  });
});

req.on('error', (error) => {
  console.error('Error fetching page:', error);
});

req.end();
