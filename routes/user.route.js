const express = require('express');
const router = express.Router();

const controller = require('../controller/user.controller');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.getCreate);

router.post('/create', controller.postCreate);

router.get('/navigation', controller.getNav);

router.get('/:id', controller.getId);

module.exports = router;