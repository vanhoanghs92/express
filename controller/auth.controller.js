const db = require('../db');

module.exports.auth = function (req, res) {
  res.render('auths/index', {
    users: db.get('users').value()
  });
};