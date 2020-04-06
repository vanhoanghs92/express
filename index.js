require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const port = 8090;

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECTION_SECRET));
app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: 'A'
    });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(8090, function () {
    console.log(`router listen on port ${port}`);
});
