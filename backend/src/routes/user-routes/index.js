const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-controller');
const AuthRequestValidators = require('../../middlewares/auth-request-validators');

router.post('/signUp', AuthRequestValidators.validateUserAuthSignUp , userController.create);
router.post('/signIn', AuthRequestValidators.validateUserAuthSignIn, userController.signIn);
router.get('/isAuthenticated', userController.isAuthenticated);
router.get('/isAdmin', userController.isAdmin);

module.exports = router;