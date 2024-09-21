// captive-portal/index.js
const express = require('express');
const radius = require('radius');
const dgram = require('dgram');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/login-params', (req, res) => {
  // Extract Mikrotik parameters from query string
  const { mac, ip, username, link_login, link_orig, error } = req.query;
  res.json({ mac, ip, username, link_login, link_orig, error });
});

app.post('/api/login', (req, res) => {
  const { username, password, mac, ip, link_login, link_orig } = req.body;
  
  const packet = {
    code: 'Access-Request',
    identifier: 0,
    attributes: [
      ['User-Name', username],
      ['User-Password', password],
      ['Calling-Station-Id', mac], // MAC address
      ['Framed-IP-Address', ip],   // IP address
    ]
  };

  const secret = 'testing123'; // Replace with your actual shared secret
  const encoded = radius.encode(packet, secret);

  const client = dgram.createSocket('udp4');
  
  client.send(encoded, 0, encoded.length, 1812, 'freeradius', (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  client.on('message', (msg) => {
    const response = radius.decode(msg, secret);
    
    if (response.code === 'Access-Accept') {
      // Send success response with redirect URL
      res.json({ success: true, redirectUrl: `${link_login}?mac=${mac}&ip=${ip}&username=${username}&dst=${link_orig}` });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
    
    client.close();
  });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Captive portal listening at http://0.0.0.0:${port}`);
  });