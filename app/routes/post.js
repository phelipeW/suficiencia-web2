const express = require('express');
const router = express.Router();
const postsController = require('../controllers/post');
const authenticateJWT = require("../middleware/authJwt")


// Unauthneticated routes
router.get('/', postsController.list);
router.put('/:id', postsController.like);

// Authenticated routes
router.use(authenticateJWT)
router.post('/create', postsController.create)

module.exports = router;