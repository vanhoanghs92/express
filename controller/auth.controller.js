const md5 = require('md5');
const db = require('../db');

module.exports.auth = function (req, res) {
  res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
 const email = req.body.email;
 const user = db.get('users').find({email: email}).value();
 const password = req.body.password;

 if(!user) {
   res.render('auth/login', {
     errors: [
       'user doesnt exit'
     ]
   });
   return;
 }

 if(md5(user.password) !== md5(password)) {
   res.render('auth/login', {
     errors: [
       'wrong password'
     ]
   });
   return;
 }

 res.cookie('userId', user.id, {
     signed: true
 });
 res.redirect('/users');
};
