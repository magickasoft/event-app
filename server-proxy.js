const express = require('express');
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');

require('dotenv').config();

const port = process.env.PORT || 3000;

const corsConfig = {
  origin: 'http://localhost:8081',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
};

const authApiProxy = createProxyMiddleware({
  target: process.env.EXPO_AUTH_API_URL || 'http://localhost:8000',
  changeOrigin: true,
});

const s3ApiProxy = createProxyMiddleware({
  target: process.env.EXPO_S3_API_URL || 'http://localhost:8001',
  changeOrigin: true,
});

const baseApiProxy = createProxyMiddleware({
  target: process.env.EXPO_BASE_API_URL || 'http://localhost:8002',
  changeOrigin: true,
});

const app = express();

app.use(cors(corsConfig));
app.use('/auth/', authApiProxy);
app.use('/s3/', s3ApiProxy);
app.use('/base/', baseApiProxy);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
