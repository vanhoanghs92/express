const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const shortid = require('shortid');

db = low(adapter);

db.defaults({ users: [] }).write();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'A'
    });
});

app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', (req, res) => {
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

app.get('/users/:id', function(req, res) {
  const id = parseInt(req.params.id);
//   console.log(id);
  const user = db.get('users').find({ id: id }).value();
  console.log(user);
  res.render('users/view', {
      user: user
  });
});

app.get('/users/create', function (req, res) {
    res.render('users/create');
});

app.post('/users/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(8090, function () {
    console.log('app listen on port 8090');
});