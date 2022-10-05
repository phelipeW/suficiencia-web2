const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const authenticateJWT = require("../middleware/authJwt")


// Unauthneticated routes
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Authenticated routes
router.use(authenticateJWT)
router.put('/:id', usersController.update)
router.get('/', usersController.get);
router.get('/:id', usersController.getOne);
router.delete('/:id', usersController.remove);

module.exports = router;