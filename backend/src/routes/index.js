const express = require('express');
const router = express.Router();

const bookRoutes = require('./books-routes/index');
const userRoutes = require('./user-routes/index');
const transactionRoutes = require('./transaction-routes/index');

router.use('/books', bookRoutes);
router.use('/user', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;