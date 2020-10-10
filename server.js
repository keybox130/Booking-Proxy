const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

app.use('/stays/:roomId', express.static(path.join(__dirname, 'public')));

// Photo-gallery
app.use('/photo/stays/:roomId', createProxyMiddleware({ target: `http://localhost:3001/`, changeOrigin: true}));
app.use('/photo/list', createProxyMiddleware({ target: `http://localhost:3001/`, changeOrigin: true}));

// Calendar
app.use('/calendar/stays/:roomId', createProxyMiddleware({ target: `http://localhost:3002/`, changeOrigin: true}));

// Reviews
app.use('/reviews/stays/:roomId', createProxyMiddleware({ target: `http://localhost:3003/`, changeOrigin: true}));

// More places
app.use('/moreplaces/stays/:roomId', createProxyMiddleware({ target: `http://localhost:3004/`, changeOrigin: true}));
app.use('/moreplaces/lists', createProxyMiddleware({ target: `http://localhost:3004/`, changeOrigin: true}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});