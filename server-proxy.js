const express = require('express');
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');

require('dotenv').config();

const port = process.env.PORT || 3000;

const corsConfig = {
  origin: ['http://localhost:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

const baseApiProxy = createProxyMiddleware({
  target: process.env.EXPO_PUBLIC_API_URL || '0.0.0.0:8080',
  changeOrigin: true,
});

const app = express();

app.use(cors(corsConfig));
app.use('/base/', baseApiProxy);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
