const express = require('express');
const auth = express.Router();

const controller = require('../controller/auth.controller');

auth.get('/login', controller.auth);
auth.post('/login', controller.postLogin);

module.exports = auth;
