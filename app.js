const express = require ('express');
const session = require ('express-session');
const app = express();
const db = require('./config/database')
var mysql = require ('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
const booking = require('./models/booking');
const adminin = require('./models/adminin');
var upload = multer();
const user = require ('./models/user');



try {
    db.authenticate()
    console.log('Database connected successfully')
    user.sync()
} catch (error) {
    console.log(error)
}

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password : "",
    database: "checkin_hotels"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(upload.array());
app.use(express.static('/public'));


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen (3000, ()=>{
    console.log('Server berjalan di port 3000');
});

app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.get('/index.ejs', ( req, res)=> {
    res.render('index.ejs')
});

app.get('/dasboard.ejs', ( req, res)=> {
    res.render('dasboard.ejs')
});

app.get('/details1.ejs', ( req, res)=> {
    res.render('details1.ejs')
});
app.get('/details2.ejs', ( req, res)=> {
    res.render('details2.ejs')
});

app.get('/details3.ejs', ( req, res)=> {
    res.render('details3.ejs')
})

;app.get('/book.ejs', ( req, res)=> {
    res.render('book.ejs')
});

app.get('/succes.ejs', ( req, res)=> {
    res.render('succes.ejs')
});

app.get('/transaction.ejs', ( req, res)=> {
    res.render('transaction.ejs')
});

app.get('/regist.ejs', ( req, res)=> {
    res.render('regist.ejs')
});

app.get('/adminin.ejs', ( req, res)=> {
    res.render('adminin.ejs')
});

app.get('/login.ejs', ( req, res)=> {
    res.render('login.ejs')
});
app.get('/dashboard.ejs', ( req, res)=> {
    res.render('dashboard.ejs')
});
app.post('/tambah-book', (req,res) => {
    var checkin = req.body.checkin;
    var checkout = req.body.checkout;
    var room = req.body.room;
    var email = req.body.email;
    var phone = req.body.phone;
    var nama = req.body.nama;

    pool.query('insert into bookings(tanggal_checkin, tanggal_checkout, type_room, email, phone, nama)values (?,?,?,?,?,?)',[checkin, checkout, room, email, phone, nama], (error, results) => {
        if (error) {
            throw error;
        }
        res.redirect('/transaction.ejs')
    })
});

app.post('/regist', (req, res) => {
	const email = req.body.email
	const username = req.body.username
	const password = req.body.password

	const sql = "INSERT INTO users (email,username,password) VALUES ('" + req.body.email + "','" + req.body.username + "', '" + req.body.password + "')";

	pool.query(sql, function (err) {
	if (err) throw err;
	console.log("table created");
	});
    res.redirect('/login.ejs');
});

app.post('/adminin', (req, res) => {
    let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		pool.query('SELECT * FROM adminins WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/dashboard.ejs');
			} else{
				res.send('alert("Error");window.location.href = "/adminin.ejs";');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


app.post('/login', (req, res) => {
    let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.username = username;
				// Redirect to home page
				res.redirect('/index.ejs');
			} else{
				res.send('alert("Error");window.location.href = "/login.ejs";');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});
