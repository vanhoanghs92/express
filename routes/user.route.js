const express = require('express');
const router = express.Router();

const controller = require('../controller/user.controller');
const validation = require('../controller/validation/validation.user');
const middleRequireAuth = require('../middleware/auth.middleware');

router.get('/', middleRequireAuth.requiredAuth, controller.index);

router.get('/cookie', function (req, res, next) {
   res.cookie('userId', '1235');
   res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.getCreate);

router.post('/create', validation.postCreate, controller.postCreate);

router.get('/navigation', controller.getNav);

router.get('/:id', controller.getId);

module.exports = router;
