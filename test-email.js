const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if(key && val) acc[key.trim()] = val.join('=').trim().replace(/^\"|\"$/g, '');
  return acc;
}, {});

fetch('https://api.brevo.com/v3/smtp/email', {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'api-key': env.BREVO_API_KEY,
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    sender: {
      name: 'Founderscult',
      email: env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: 'test@example.com' }],
    subject: 'Test Email',
    htmlContent: '<p>Test</p>',
  }),
}).then(async r => {
  console.log('Status:', r.status);
  console.log(await r.json());
}).catch(console.error);
