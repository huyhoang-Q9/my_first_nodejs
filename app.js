const express = require('express');

const path = require('path');

const app = express();

const hbs = require('hbs');

const hostname = '127.0.0.1';

const port = 3000;

const bodyParser = require('body-parser');

/////////////////////////////////////////////////        connect database

const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'nodejs'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database đã được connect...');
});



/////////////////////////////////////////////////        nút sửa


app.get('/users/edit/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM users WHERE id = "${id}"`;
    db.query(sql, (err, row) => {
      if (err) throw err;
      res.render('users/edit', {
        title: 'Sửa thông tin',
        users: row[0]
      })
    })
  });

  app.post('/users/edit/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let sql = `UPDATE users SET name ="${name}", email="${email}" WHERE id ="${id}"`;
    db.query(sql, (err) => {
      if (err) throw err;
      console.log(`Sửa thành công người dùng: ${name}`);
      res.redirect('/');
    });
  });

/////////////////////////////////////////////////        nút sửa

/////////////////////////////////////////////////

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));

/////////////////////////////////////////////////        button edit - delete

app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.post('/users', (req, res) => {
    let nameInput = req.body.name;
    let emailInput = req.body.email;
    let data = { name: nameInput, email: emailInput };
    let sql = "INSERT INTO nodejs.users SET ?";
    let query = db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/users');
    });
});

app.get('/users', (req, res) => {
    let sql = "SELECT * FROM users";
    let query = db.query(sql, (err, users) => {
        if (err) throw err;
        res.render('users/index', {
            itemUser: users
        });
    });
});


/////////////////////////////////////////////////        store and create


app.get('/users/create', (req, res) => {
    res.render('users/create');
});

app.post('/users', (req, res) => {
    let name = req.body.name;
    let data = { name: name, email: req.body.email };
    let sql = "INSERT INTO nodejs.users SET ?";
    let query = db.query(sql, data, (err, results) => {
        if (err) throw err;
        // res.redirect(`/users`);
        console.log('Create success.');
    });
});




app.get('/', (req, res) => {
    res.render('index', {
        name: "M Fikri"
    });
});

/////////////////////////////////////////////////                route post

app.get('/post', (req, res) => {
    res.render('form');
});

app.post('/post', (req, res) => {
    res.render('index', {
        name: req.body.textname
    });
});

/////////////////////////////////////////////////                route uer

app.get('/user', (req, res) => {
    res.render('form');
});

app.post('/user', (req, res) => {
    res.render('index', {
        name: req.body.textname
    });
});

/////////////////////////////////////////////////

// app.get('/:name', (req, res) => {
//     res.render('index', {
//         name: req.params.name
//     });
// });

// app.get('/home', function (req, res) {
//     res.send('welcome to express');

// });

// app.get('/about', function (req, res) {
//     res.send('this is about page');
// });


/////////////////////////////////////////////////                route uer


app.listen(port, hostname, () => {
    console.log(`sever runnig at http://${hostname}:${port}/`);

});
