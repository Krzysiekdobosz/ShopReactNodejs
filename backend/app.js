const express = require('express');
const cors = require('cors');
const { clientUrl } = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({ origin: clientUrl }));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/saved', require('./routes/savedRoutes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
