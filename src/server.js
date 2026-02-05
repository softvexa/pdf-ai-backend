const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

const demoState = {
  periodId: '20230414387',
  countdownSeconds: 34,
  availableColors: ['Green', 'Violet', 'Red'],
  numberGrid: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const sendFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/api/status' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'ok',
      message: 'Colour Trading App demo backend is running.'
    });
  }

  if (url === '/api/period' && method === 'GET') {
    return sendJson(res, 200, {
      periodId: demoState.periodId,
      countdownSeconds: demoState.countdownSeconds,
      availableColors: demoState.availableColors,
      numberGrid: demoState.numberGrid
    });
  }

  if (url === '/api/bets' && method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch (error) {
        return sendJson(res, 400, { error: 'Invalid JSON body.' });
      }

      const { userId, betType, selection, amount } = payload;

      if (!userId || !betType || !selection || !amount) {
        return sendJson(res, 400, {
          error: 'Missing required fields: userId, betType, selection, amount.'
        });
      }

      return sendJson(res, 201, {
        betId: `BET-${Date.now()}`,
        userId,
        betType,
        selection,
        amount,
        status: 'accepted',
        periodId: demoState.periodId
      });
    });

    return;
  }

  if (url === '/' || url === '/index.html') {
    return sendFile(res, path.join(publicDir, 'index.html'), 'text/html');
  }

  if (url === '/styles.css') {
    return sendFile(res, path.join(publicDir, 'styles.css'), 'text/css');
  }

  return sendFile(res, path.join(publicDir, 'index.html'), 'text/html');
});

server.listen(PORT, () => {
  console.log(`Colour Trading App demo backend listening on port ${PORT}`);
});
