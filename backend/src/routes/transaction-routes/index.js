const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transaction-controller');

router.post('/borrowBook', transactionController.create);
router.post('/returnBook', transactionController.returnBook);
router.get('/isBorrowed', transactionController.getById);
router.get('/getBorrowedBooks', transactionController.getBorrowedBooks);

module.exports = router;