const express = require('express');
const auth = express.Router();

const controller = require('../controller/auth.controller');

auth.get('/', controller.auth);

module.exports = auth;