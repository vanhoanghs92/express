const db = require('../db');

module.exports.requiredAuth = function (req, res, next) {
  if(!req.cookies.userId) {
   res.redirect('/auth/login');
   return;
  }

  const user = db.get('users').find({ id: req.cookies.userId }).value();
  console.log(user);

  if(!user) {
    console.log('!user');
    res.redirect('/auth/login');
    return;
  }

  next();
};
