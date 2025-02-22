const fs = require('fs');
const https = require('https');
const path = require('path');

const companies = {
  'microsoft': 'https://logo.clearbit.com/microsoft.com',
  'amazon': 'https://logo.clearbit.com/amazon.com',
  'google': 'https://logo.clearbit.com/google.com',
  'apple': 'https://logo.clearbit.com/apple.com',
  'meta': 'https://logo.clearbit.com/meta.com',
  'netflix': 'https://logo.clearbit.com/netflix.com',
  'tesla': 'https://logo.clearbit.com/tesla.com',
  'nvidia': 'https://logo.clearbit.com/nvidia.com',
  'adobe': 'https://logo.clearbit.com/adobe.com',
  'salesforce': 'https://logo.clearbit.com/salesforce.com',
  'intel': 'https://logo.clearbit.com/intel.com',
  'oracle': 'https://logo.clearbit.com/oracle.com',
  'ibm': 'https://logo.clearbit.com/ibm.com',
  'uber': 'https://logo.clearbit.com/uber.com',
  'airbnb': 'https://logo.clearbit.com/airbnb.com',
  'paypal': 'https://logo.clearbit.com/paypal.com',
  'twitter': 'https://logo.clearbit.com/twitter.com',
  'linkedin': 'https://logo.clearbit.com/linkedin.com',
  'stripe': 'https://logo.clearbit.com/stripe.com',
  'palantir': 'https://logo.clearbit.com/palantir.com'
};

const outputDir = path.join(process.cwd(), 'public', 'companies');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Download each logo
Object.entries(companies).forEach(([name, url]) => {
  const outputPath = path.join(outputDir, `${name}.png`);
  
  https.get(url, (response) => {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`Downloaded ${name} logo`);
      fileStream.close();
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name} logo:`, err.message);
  });
}); 