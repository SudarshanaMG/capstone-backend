require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Service URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const USERINPUT_SERVICE_URL = process.env.USERINPUT_SERVICE_URL || 'http://localhost:3002';
const CONTRACTOR_SERVICE_URL = process.env.CONTRACTOR_SERVICE_URL || 'http://localhost:3003';
const ESTIMATION_SERVICE_URL = process.env.ESTIMATION_SERVICE_URL || 'http://localhost:3004';
const MATERIAL_SERVICE_URL = process.env.MATERIAL_SERVICE_URL || 'http://localhost:3005';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Gateway is running' });
});

app.use('/api/users', createProxyMiddleware({ target: USER_SERVICE_URL, changeOrigin: true, pathRewrite: {
  '^/api/users': '/api/users',
} }));
app.use('/api/input', createProxyMiddleware({ target: USERINPUT_SERVICE_URL, changeOrigin: true,   pathRewrite: {
  '^/api/input': '/api/users',
} }));
app.use('/api/contractor', createProxyMiddleware({ target: CONTRACTOR_SERVICE_URL, changeOrigin: true, pathRewrite: {
  '^/api/contractor': '/api/contractor',
} }));
app.use('/api/estimation', createProxyMiddleware({ target: ESTIMATION_SERVICE_URL, changeOrigin: true, pathRewrite: {
  '^/api/estimation': '/api/estimation',
} }));
app.use('/api/material', createProxyMiddleware({ target: MATERIAL_SERVICE_URL, changeOrigin: true, pathRewrite: {
  '^/api/material': '/api/material',
} }));


// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
  });