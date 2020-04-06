const shortid = require('shortid');
const db = require('../db');

module.exports.index = function (req, res) {
    const page = parseInt(req.query.page || 1);
    const perPage = 6;

    const start = (page - 1)*perPage;
    const end = page*perPage;

    res.render('users/index', {
        users: db.get('users').value().slice(start, end)
    });
};

module.exports.search = function (req, res) {
    let name = req.query.q;
    const users = db.get('users').value();

    const matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(name) !== -1;
    });

    res.render('users/index', {
        users: matchUsers,
        value: name
    });
};

module.exports.getCreate = function (req, res) {
    res.render('users/create');
};

module.exports.getNav = function (req, res) {
    res.render('users/navigation');
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.replace(/\\/g, '/').split('/').slice(1).join('/');
    db.get('users').push(req.body).write();
    res.redirect('/users');
};

module.exports.getId = function (req, res) {
    const id = req.params.id;
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
};
