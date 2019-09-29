const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const db = require('../db');

router.get('/', function (req, res) {
    res.render('index', {
        name: 'A'
    });
});

router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

router.get('/search', (req, res) => {
    let name = req.query.name;
    const users =  db.get('users').value();

    const matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(name) !== -1;
    });

    res.render('users/index', {
        users: matchUsers,
        value: name
    });
});

router.get('/create', function (req, res) {
    res.render('users/create');
});

router.post('/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});


router.get('/:id', function(req, res) {
    const id = req.params.id;
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
  });  


module.exports = router;