const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const authenticateJWT = require("../middleware/authJwt")

router.post('/register', usersController.register);

router.post('/login', usersController.login);

router.put('/:id',[authenticateJWT], usersController.update)
router.get('/', [authenticateJWT], usersController.get);
router.get('/:id',[authenticateJWT], usersController.getOne);
router.delete('/:id',[authenticateJWT], usersController.remove);

module.exports = router;