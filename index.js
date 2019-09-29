const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route');

const port = 8090;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'A'
    });
});

app.use('/users', userRoutes);

app.listen(8090, function () {
    console.log(`router listen on port ${port}`);
});
