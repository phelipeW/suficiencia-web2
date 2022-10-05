const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');


router.post('/:id', commentsController.create);
router.get('/:id', commentsController.list);

module.exports  = router;