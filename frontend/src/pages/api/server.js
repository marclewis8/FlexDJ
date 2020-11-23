const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: true });
const handle = app.getRequestHandler();

const devApiPaths = {
  '/api': {
    target: 'http://localhost:3001',
    pathRewrite: {
      '^/api': '/',
    },
    changeOrigin: true,
  },
};

const prodApiPaths = {
  '/api': {
    target: process.env.BACKEND_URL,
    pathRewrite: {
      '^/api': '/',
    },
    changeOrigin: true,
  },
};

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev) {
      server.use('/api', createProxyMiddleware(devApiPaths['/api']));
    } else {
      server.use('/api', createProxyMiddleware(prodApiPaths['/api']));
    }

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error:::::', err);
  });
