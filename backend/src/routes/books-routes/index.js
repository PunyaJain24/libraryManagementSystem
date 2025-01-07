const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/book-controller');

router.post('/create', bookController.create);
router.put('/update/:id', bookController.update);
router.get('/getList', bookController.getList);
router.get('/getBook', bookController.getBook);
router.post('/remove/:id', bookController.remove);

module.exports = router;